const core = require('core');
const BlobTile = require('BlobTile');
const Player = require('Player');

var gameConfig = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    state: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(gameConfig);
var player;

function preload() {
    game.load.image('floor', 'dist/img/floor.png');
    game.load.image('player', 'dist/img/player.png');
    game.load.image('blob', 'dist/img/blob.png');
}

function create() {
    game.world.setBounds(0, 0, core.gameAreaSize.x*core.tileSize, core.gameAreaSize.y*core.tileSize);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.blobTiles = game.add.group();
    
    game.world.tiles = new Array(core.gameAreaSize.x);
    for (var i=0;i<=core.gameAreaSize.x;i++) {
        game.world.tiles[i] = new Array(core.gameAreaSize.y+1);
    }
    
    game.stage.backgroundColor = '#555555';
    
    var blob = new BlobTile(game, 13, 15);
    
    player = new Player(game, 10, 10);
    game.add.existing(player);
    game.physics.arcade.enable(player);
    
    game.camera.follow(player);
}

function update() {
    game.physics.arcade.collide(player, game.blobTiles, function () {
        console.log("collision");
    });
}
