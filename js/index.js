const core = require('core');
const {BlobTile, createNewBlob} = require('BlobTile');
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
var tileCursor;

function preload() {
    game.load.image('floor', 'dist/img/floor.png');
    game.load.image('player', 'dist/img/player.png');
    game.load.image('blob', 'dist/img/blob.png');
    game.load.image('fire', 'dist/img/projectile.png');
    game.load.image('cursor', 'dist/img/cursor.png');
    game.load.image('wall', 'dist/img/wall.png');
}

function create() {
    game.world.setBounds(0, 0, core.gameAreaSize.x*core.tileSize, core.gameAreaSize.y*core.tileSize);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.blobTiles = game.add.group();
    game.sleepingBlobTiles = game.add.group();
    game.wallTiles = game.add.group();
    
    game.world.tiles = new Array(core.gameAreaSize.x);
    for (var i=0;i<=core.gameAreaSize.x;i++) {
        game.world.tiles[i] = new Array(core.gameAreaSize.y+1);
    }
    
    game.stage.backgroundColor = '#dddddd';
    
    createNewBlob(game, 0, 0);
    createNewBlob(game, 0, core.gameAreaSize.y);
    createNewBlob(game, core.gameAreaSize.x, 0);
    createNewBlob(game, core.gameAreaSize.x, core.gameAreaSize.y);
    
    player = new Player(game, 50, 50);
    
    game.camera.follow(player);
    
    tileCursor = game.add.image(100, 150, 'cursor');
    tileCursor.bringToTop();
    
    game.input.mouse.capture = true;
}

function update() {
    game.physics.arcade.collide(player, game.blobTiles, function (player, blob) {
        player.damage(100);
    });
    
    game.physics.arcade.collide(player, game.wallTiles);
    
    var cursorPos = core.getCursorTilePos(game);
    tileCursor.x = cursorPos.x * core.tileSize;
    tileCursor.y = cursorPos.y * core.tileSize;
}
