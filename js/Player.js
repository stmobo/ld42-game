const core = require('core');

function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    game.add.existing(this);
    game.physics.arcade.enable(this);
    
    this.body.collideWorldBounds = true;
    
    this.health = 100;
    this.anchor.setTo(0.5, 0.5);
    
    this.weapon = game.add.weapon(300, 'fire');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bulletLifespan = 500;
    this.weapon.fireRate = 5;
    this.weapon.bulletSpeed = 500;
    //this.weapon.bulletInheritSpriteSpeed = true;
    this.weapon.bulletAngleVariance = 15;
    this.weapon.bulletRotateToVelocity = true;
    
    this.weapon.trackSprite(this, this.offsetX - (this.width / 2), this.offsetY - (this.height / 2), true);
    
    this.moveSpeed = 256;
    
    this.buttons = game.input.keyboard.addKeys({
        'left': Phaser.KeyCode.A,
        'right': Phaser.KeyCode.D,
        'up': Phaser.KeyCode.W,
        'down': Phaser.KeyCode.S,
        'fire': Phaser.KeyCode.SPACEBAR
    });
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    if (!this.alive) return;
    
    if (this.buttons.left.isDown !== this.buttons.right.isDown) {
        if (this.buttons.left.isDown) {
            this.body.velocity.x = -this.moveSpeed;
        } else if (this.buttons.right.isDown) {
            this.body.velocity.x = this.moveSpeed;
        }
    } else {
        this.body.velocity.x = 0;
    }
    
    if (this.buttons.up.isDown !== this.buttons.down.isDown) {
        if (this.buttons.up.isDown) {
            this.body.velocity.y = -this.moveSpeed;
        } else if (this.buttons.down.isDown) {
            this.body.velocity.y = this.moveSpeed;
        }
    } else {
        this.body.velocity.y = 0;
    }
    
    this.rotation = this.game.math.angleBetween(this.centerX, this.centerY, this.game.input.worldX, this.game.input.worldY);
    
    if (this.buttons.fire.isDown) {
        this.weapon.fire();
    }
    
    this.game.physics.arcade.collide(this.weapon.bullets, this.game.blobTiles, (bullet, blob) => {
        bullet.kill();
        blob.damage(10);
    });
};

module.exports = Player;
