const core = require('core');

function BaseTile(game, tileX, tileY, key) {
    if(tileX < 0 || tileX > core.gameAreaSize.x) {
        throw new Error("Tile X position "+tileX+" outside of world bounds!");
    }
    
    if(tileY < 0 || tileY > core.gameAreaSize.y) {
        throw new Error("Tile Y position "+tileY+" outside of world bounds!");
    }
    
    this.tileX = tileX;
    this.tileY = tileY;
    
    if (game.world.tiles[tileX][tileY]) {
        game.world.tiles[tileX][tileY].destroy();
    }
    
    game.world.tiles[tileX][tileY] = this;
    
    Phaser.Sprite.call(this, game, tileX*core.tileSize, tileY*core.tileSize, key);    
}

BaseTile.prototype = Object.create(Phaser.Sprite.prototype);
BaseTile.prototype.constructor = BaseTile;

module.exports = BaseTile;
