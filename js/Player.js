const core = require('core');

function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    
    this.moveSpeed = 128;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    var left = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    var right = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    var up = this.game.input.keyboard.isDown(Phaser.Keyboard.UP);
    var down = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
    
    if (left !== right) {
        if (left) {
            this.body.velocity.x = -this.moveSpeed;
        } else if (right) {
            this.body.velocity.x = this.moveSpeed;
        }
    } else {
        this.body.velocity.x = 0;
    }
    
    if (up !== down) {
        if (up) {
            this.body.velocity.y = -this.moveSpeed;
        } else if (down) {
            this.body.velocity.y = this.moveSpeed;
        }
    } else {
        this.body.velocity.y = 0;
    }
};

module.exports = Player;
