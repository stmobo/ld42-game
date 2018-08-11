const core = require('core');
const BaseTile = require('BaseTile');

function WallTile(game, tileX, tileY) {    
    console.log("Creating new wall tile at "+tileX+" "+tileY);
    BaseTile.call(this, game, tileX, tileY, 'wall');
    
    this.maxHealth = 100;
    this.health = this.maxHealth;
    
    this.game.add.existing(this);
    this.game.wallTiles.add(this);
    this.game.physics.arcade.enable(this);
    
    this.body.immovable = true;
    this.body.moves = false;
}

WallTile.prototype = Object.create(BaseTile.prototype);
WallTile.prototype.constructor = WallTile;

WallTile.prototype.update = function () {
    this.alpha = this.game.math.clamp(this.health / this.maxHealth, 0.15, 1.0);
};

function createWall(game, tileX, tileY) {
    if (core.tileIsEmpty(game, tileX, tileY)) { new WallTile(game, tileX, tileY); }
    if (core.tileIsEmpty(game, tileX+1, tileY)) { new WallTile(game, tileX+1, tileY); }
    if (core.tileIsEmpty(game, tileX, tileY+1)) { new WallTile(game, tileX, tileY+1); }
    if (core.tileIsEmpty(game, tileX+1, tileY+1)) { new WallTile(game, tileX+1, tileY+1); }
}

module.exports = {
    WallTile,
    createWall
}
