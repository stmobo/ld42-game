const core = require('core');
const BaseTile = require('BaseTile');

function BlobTile(game, tileX, tileY) {    
    BaseTile.call(this, game, tileX, tileY, 'blob');
    
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.healPerTick = 0.5;
    
    this.sleeping = false;
    this.growEvent = null;
    
    this.events.onKilled.add(this.onKilled.bind(this));
    this.game.add.existing(this);
    this.game.blobTiles.add(this);
    this.game.physics.arcade.enable(this);
    
    this.body.immovable = true;
    this.body.moves = false;
    
    this.scheduleGrowLoop();
}

BlobTile.prototype = Object.create(BaseTile.prototype);
BlobTile.prototype.constructor = BlobTile;

function createNewBlob(game, tileX, tileY) {
    new BlobTile(game, tileX, tileY);
}

BlobTile.prototype.scheduleGrowLoop = function () {
    if (!this.growEvent) {
        var growLoopTime = 500 + this.game.rnd.integerInRange(-150, 150);
        this.growEvent = this.game.time.events.loop(growLoopTime, this.randomGrow.bind(this));
    }
};

BlobTile.prototype.setSleeping = function (v) {
    if(this.sleeping !== v) {
        if (v) {
            if (this.growEvent) {
                this.game.time.events.remove(this.growEvent);
                this.growEvent = null;
            }
            
            this.game.blobTiles.remove(this);
            this.game.sleepingBlobTiles.add(this);
        } else {
            this.scheduleGrowLoop();
            this.game.sleepingBlobTiles.remove(this);
            this.game.blobTiles.add(this);
        }
    }
    
    this.sleeping = v;
};

BlobTile.prototype.onKilled = function () {
    this.game.blobTiles.remove(this);
    
    var adjTiles = [
        {x: -1, y: -1},
        {x: -1, y: 0},
        {x: -1, y: 1},
        {x: 0, y: -1},
        {x: 0, y: 1},
        {x: 1, y: -1},
        {x: 1, y: 0},
        {x: 1, y: 1},
    ].map((p) => core.getTileAt(this.game, this.tileX+p.x, this.tileY+p.y))
    .filter((t) => t && t.alive && t instanceof BlobTile);
    
    adjTiles.forEach(function (t) {
        t.setSleeping(false);
    })
    
    this.destroy();
};

BlobTile.prototype.grow = function (x, y) {
    if (!this.alive) return;
    if (this.health < this.maxHealth) return;
    
    var newX = this.tileX + x;
    var newY = this.tileY + y;
    
    if (!core.isValidTileCoordinate(newX, newY)) return;
    if (core.getTileAt(this.game, newX, newY)) return;
    
    var newTile = new BlobTile(this.game, newX, newY);
};

BlobTile.prototype.randomGrow = function () {
    if (!this.alive) return;
    if (this.health < this.maxHealth) return;
    if (Math.random() > 0.5) return;
    
    var dir = this.game.rnd.between(0, 3);
    
    switch (dir) {
    case 0:
        return this.grow(0, 1);
    case 1:
        return this.grow(0, -1);
    case 2:
        return this.grow(1, 0);
    case 3:
    default:
        return this.grow(-1, 0);
    }
};

BlobTile.prototype.update = function () {
    if (this.sleeping) return;
    
    if(this.health < this.maxHealth) {
        this.heal(this.healPerTick);
    } else if (this.health > this.maxHealth) {
        this.health = this.maxHealth;
    }
    
    this.alpha = this.game.math.clamp(this.health / this.maxHealth, 0.15, 1.0);
    
    if (
        core.getTileAt(this.game, this.tileX+1, this.tileY)
        && core.getTileAt(this.game, this.tileX-1, this.tileY)
        && core.getTileAt(this.game, this.tileX, this.tileY+1)
        && core.getTileAt(this.game, this.tileX, this.tileY-1)
    ) {
        this.setSleeping(true);
    }
};

module.exports = {
    BlobTile,
    createNewBlob,
};
