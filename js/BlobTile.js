const core = require('core');
const BaseTile = require('BaseTile');

function BlobTile(game, tileX, tileY) {    
    BaseTile.call(this, game, tileX, tileY, 'blob');
    
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.game.blobTiles.add(this);
    
    this.body.immovable = true;
    this.body.moves = false;
    
    game.time.events.loop(500, this.randomGrow.bind(this));
}

BlobTile.prototype = Object.create(BaseTile.prototype);
BlobTile.prototype.constructor = BlobTile;

BlobTile.prototype.grow = function (x, y) {
    var newX = this.tileX + x;
    var newY = this.tileY + y;
    
    if (!core.isValidTileCoordinate(newX, newY)) return;
    if (core.getTileAt(this.game, newX, newY)) return;
    
    var newTile = new BlobTile(this.game, newX, newY);
};

BlobTile.prototype.randomGrow = function () {
    if (Math.random() > 0.25) return;
    
    var dir = Math.floor(Math.random() * 4);
    
    switch (dir) {
    case 0:
        return this.grow(1, 0);
    case 1:
        return this.grow(-1, 0);
    case 2:
        return this.grow(0, 1);
    case 3:
    default:
        return this.grow(0, -1);
    }
};

module.exports = BlobTile;
