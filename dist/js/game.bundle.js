/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/BaseTile.js":
/*!************************!*\
  !*** ./js/BaseTile.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const core = __webpack_require__(/*! core */ \"./js/core.js\");\r\n\r\nfunction BaseTile(game, tileX, tileY, key) {\r\n    if(tileX < 0 || tileX > core.gameAreaSize.x) {\r\n        throw new Error(\"Tile X position \"+tileX+\" outside of world bounds!\");\r\n    }\r\n    \r\n    if(tileY < 0 || tileY > core.gameAreaSize.y) {\r\n        throw new Error(\"Tile Y position \"+tileY+\" outside of world bounds!\");\r\n    }\r\n    \r\n    this.tileX = tileX;\r\n    this.tileY = tileY;\r\n    \r\n    if (game.world.tiles[tileX][tileY]) {\r\n        game.world.tiles[tileX][tileY].destroy();\r\n    }\r\n    \r\n    game.world.tiles[tileX][tileY] = this;\r\n    \r\n    Phaser.Sprite.call(this, game, tileX*core.tileSize, tileY*core.tileSize, key);\r\n    \r\n    var scaleFactor = core.tileSize / core.tileBaseSize;\r\n    this.scale.setTo(scaleFactor, scaleFactor);\r\n}\r\n\r\nBaseTile.prototype = Object.create(Phaser.Sprite.prototype);\r\nBaseTile.prototype.constructor = BaseTile;\r\n\r\nBaseTile.prototype.destroy = function () {\r\n    delete this.game.world.tiles[this.tileX][this.tileY];\r\n    Phaser.Sprite.prototype.destroy.call(this);\r\n};\r\n\r\nmodule.exports = BaseTile;\r\n\n\n//# sourceURL=webpack:///./js/BaseTile.js?");

/***/ }),

/***/ "./js/BlobTile.js":
/*!************************!*\
  !*** ./js/BlobTile.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const core = __webpack_require__(/*! core */ \"./js/core.js\");\r\nconst BaseTile = __webpack_require__(/*! BaseTile */ \"./js/BaseTile.js\");\r\n\r\nfunction BlobTile(game, tileX, tileY) {    \r\n    BaseTile.call(this, game, tileX, tileY, 'blob');\r\n    \r\n    this.maxHealth = 100;\r\n    this.health = this.maxHealth;\r\n    this.healPerTick = 0.5;\r\n    \r\n    this.sleeping = false;\r\n    this.growEvent = null;\r\n    \r\n    this.events.onKilled.add(this.onKilled.bind(this));\r\n    this.game.add.existing(this);\r\n    this.game.blobTiles.add(this);\r\n    this.game.physics.arcade.enable(this);\r\n    \r\n    this.body.immovable = true;\r\n    this.body.moves = false;\r\n    \r\n    this.scheduleGrowLoop();\r\n}\r\n\r\nBlobTile.prototype = Object.create(BaseTile.prototype);\r\nBlobTile.prototype.constructor = BlobTile;\r\n\r\nfunction createNewBlob(game, tileX, tileY) {\r\n    new BlobTile(game, tileX, tileY);\r\n}\r\n\r\nBlobTile.prototype.scheduleGrowLoop = function () {\r\n    if (!this.growEvent) {\r\n        var growLoopTime = 500 + this.game.rnd.integerInRange(-150, 150);\r\n        this.growEvent = this.game.time.events.loop(growLoopTime, this.randomGrow.bind(this));\r\n    }\r\n};\r\n\r\nBlobTile.prototype.setSleeping = function (v) {\r\n    if(this.sleeping !== v) {\r\n        if (v) {\r\n            if (this.growEvent) {\r\n                this.game.time.events.remove(this.growEvent);\r\n                this.growEvent = null;\r\n            }\r\n            \r\n            this.game.blobTiles.remove(this);\r\n            this.game.sleepingBlobTiles.add(this);\r\n        } else {\r\n            this.scheduleGrowLoop();\r\n            this.game.sleepingBlobTiles.remove(this);\r\n            this.game.blobTiles.add(this);\r\n        }\r\n    }\r\n    \r\n    this.sleeping = v;\r\n};\r\n\r\nBlobTile.prototype.onKilled = function () {\r\n    this.game.blobTiles.remove(this);\r\n    \r\n    var adjTiles = [\r\n        {x: -1, y: -1},\r\n        {x: -1, y: 0},\r\n        {x: -1, y: 1},\r\n        {x: 0, y: -1},\r\n        {x: 0, y: 1},\r\n        {x: 1, y: -1},\r\n        {x: 1, y: 0},\r\n        {x: 1, y: 1},\r\n    ].map((p) => core.getTileAt(this.game, this.tileX+p.x, this.tileY+p.y))\r\n    .filter((t) => t && t.alive && t instanceof BlobTile);\r\n    \r\n    adjTiles.forEach(function (t) {\r\n        t.setSleeping(false);\r\n    })\r\n    \r\n    this.destroy();\r\n};\r\n\r\nBlobTile.prototype.grow = function (x, y) {\r\n    if (!this.alive) return;\r\n    if (this.health < this.maxHealth) return;\r\n    \r\n    var newX = this.tileX + x;\r\n    var newY = this.tileY + y;\r\n    \r\n    if (!core.isValidTileCoordinate(newX, newY)) return;\r\n    if (core.getTileAt(this.game, newX, newY)) return;\r\n    \r\n    var newTile = new BlobTile(this.game, newX, newY);\r\n};\r\n\r\nBlobTile.prototype.randomGrow = function () {\r\n    if (!this.alive) return;\r\n    if (this.health < this.maxHealth) return;\r\n    if (Math.random() > 0.5) return;\r\n    \r\n    var dir = this.game.rnd.between(0, 3);\r\n    \r\n    switch (dir) {\r\n    case 0:\r\n        return this.grow(0, 1);\r\n    case 1:\r\n        return this.grow(0, -1);\r\n    case 2:\r\n        return this.grow(1, 0);\r\n    case 3:\r\n    default:\r\n        return this.grow(-1, 0);\r\n    }\r\n};\r\n\r\nBlobTile.prototype.update = function () {\r\n    if (this.sleeping) return;\r\n    \r\n    this.alpha = this.game.math.clamp(this.health / this.maxHealth, 0.15, 1.0);\r\n    \r\n    if(this.health < this.maxHealth) {\r\n        this.heal(this.healPerTick);\r\n    } else if (this.health > this.maxHealth) {\r\n        this.health = this.maxHealth;\r\n    }\r\n    \r\n    if (\r\n        core.getTileAt(this.game, this.tileX+1, this.tileY)\r\n        && core.getTileAt(this.game, this.tileX-1, this.tileY)\r\n        && core.getTileAt(this.game, this.tileX, this.tileY+1)\r\n        && core.getTileAt(this.game, this.tileX, this.tileY-1)\r\n    ) {\r\n        this.setSleeping(true);\r\n    }\r\n};\r\n\r\nmodule.exports = {\r\n    BlobTile,\r\n    createNewBlob,\r\n};\r\n\n\n//# sourceURL=webpack:///./js/BlobTile.js?");

/***/ }),

/***/ "./js/Player.js":
/*!**********************!*\
  !*** ./js/Player.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const core = __webpack_require__(/*! core */ \"./js/core.js\");\r\n\r\nfunction Player(game, x, y) {\r\n    Phaser.Sprite.call(this, game, x, y, 'player');\r\n    game.add.existing(this);\r\n    game.physics.arcade.enable(this);\r\n    \r\n    this.body.collideWorldBounds = true;\r\n    \r\n    this.health = 100;\r\n    this.anchor.setTo(0.5, 0.5);\r\n    \r\n    this.weapon = game.add.weapon(300, 'fire');\r\n    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;\r\n    this.weapon.bulletLifespan = 500;\r\n    this.weapon.fireRate = 5;\r\n    this.weapon.bulletSpeed = 500;\r\n    //this.weapon.bulletInheritSpriteSpeed = true;\r\n    this.weapon.bulletAngleVariance = 15;\r\n    this.weapon.bulletRotateToVelocity = true;\r\n    \r\n    this.weapon.trackSprite(this, this.offsetX - (this.width / 2), this.offsetY - (this.height / 2), true);\r\n    \r\n    this.moveSpeed = 256;\r\n    \r\n    this.buttons = game.input.keyboard.addKeys({\r\n        'left': Phaser.KeyCode.A,\r\n        'right': Phaser.KeyCode.D,\r\n        'up': Phaser.KeyCode.W,\r\n        'down': Phaser.KeyCode.S,\r\n        'fire': Phaser.KeyCode.SPACEBAR\r\n    });\r\n}\r\n\r\nPlayer.prototype = Object.create(Phaser.Sprite.prototype);\r\nPlayer.prototype.constructor = Player;\r\n\r\nPlayer.prototype.update = function () {\r\n    if (!this.alive) return;\r\n    \r\n    if (this.buttons.left.isDown !== this.buttons.right.isDown) {\r\n        if (this.buttons.left.isDown) {\r\n            this.body.velocity.x = -this.moveSpeed;\r\n        } else if (this.buttons.right.isDown) {\r\n            this.body.velocity.x = this.moveSpeed;\r\n        }\r\n    } else {\r\n        this.body.velocity.x = 0;\r\n    }\r\n    \r\n    if (this.buttons.up.isDown !== this.buttons.down.isDown) {\r\n        if (this.buttons.up.isDown) {\r\n            this.body.velocity.y = -this.moveSpeed;\r\n        } else if (this.buttons.down.isDown) {\r\n            this.body.velocity.y = this.moveSpeed;\r\n        }\r\n    } else {\r\n        this.body.velocity.y = 0;\r\n    }\r\n    \r\n    this.rotation = this.game.math.angleBetween(this.centerX, this.centerY, this.game.input.worldX, this.game.input.worldY);\r\n    \r\n    if (this.buttons.fire.isDown) {\r\n        this.weapon.fire();\r\n    }\r\n    \r\n    this.game.physics.arcade.collide(this.weapon.bullets, this.game.blobTiles, (bullet, blob) => {\r\n        bullet.kill();\r\n        blob.damage(10);\r\n    });\r\n};\r\n\r\nmodule.exports = Player;\r\n\n\n//# sourceURL=webpack:///./js/Player.js?");

/***/ }),

/***/ "./js/core.js":
/*!********************!*\
  !*** ./js/core.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const tileBaseSize = 32; // size of tile graphics\r\nconst tileSize = 16;     // size of tiles in game (graphics will be scaled)\r\n\r\n/* In tiles */\r\nconst gameAreaSize = {\r\n    x: 75,\r\n    y: 75\r\n}\r\n\r\nfunction isValidTileCoordinate(x, y) {\r\n    if (x < 0 || x > gameAreaSize.x) return false;\r\n    if (y < 0 || y > gameAreaSize.y) return false;\r\n    return true;\r\n}\r\n\r\nfunction getTileAt(game, x, y) {\r\n    if (!isValidTileCoordinate(x, y)) return undefined;\r\n    return game.world.tiles[x][y];\r\n}\r\n\r\nfunction tileIsEmpty(game, x, y) {\r\n    if (!isValidTileCoordinate(x, y)) return false;\r\n    if (getTileAt(game, x, y)) return false;\r\n    return true;\r\n}\r\n\r\nmodule.exports = {\r\n    tileSize,\r\n    tileBaseSize,\r\n    gameAreaSize,\r\n    isValidTileCoordinate,\r\n    getTileAt,\r\n    tileIsEmpty,\r\n};\r\n\n\n//# sourceURL=webpack:///./js/core.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const core = __webpack_require__(/*! core */ \"./js/core.js\");\r\nconst {BlobTile, createNewBlob} = __webpack_require__(/*! BlobTile */ \"./js/BlobTile.js\");\r\nconst Player = __webpack_require__(/*! Player */ \"./js/Player.js\");\r\n\r\nvar gameConfig = {\r\n    width: 800,\r\n    height: 600,\r\n    renderer: Phaser.AUTO,\r\n    antialias: true,\r\n    multiTexture: true,\r\n    state: {\r\n        preload: preload,\r\n        create: create,\r\n        update: update\r\n    }\r\n}\r\n\r\nvar game = new Phaser.Game(gameConfig);\r\nvar player;\r\n\r\nfunction preload() {\r\n    game.load.image('floor', 'dist/img/floor.png');\r\n    game.load.image('player', 'dist/img/player.png');\r\n    game.load.image('blob', 'dist/img/blob.png');\r\n    game.load.image('fire', 'dist/img/projectile.png');\r\n}\r\n\r\nfunction create() {\r\n    game.world.setBounds(0, 0, core.gameAreaSize.x*core.tileSize, core.gameAreaSize.y*core.tileSize);\r\n    game.physics.startSystem(Phaser.Physics.ARCADE);\r\n    \r\n    game.blobTiles = game.add.group();\r\n    game.sleepingBlobTiles = game.add.group();\r\n    \r\n    game.world.tiles = new Array(core.gameAreaSize.x);\r\n    for (var i=0;i<=core.gameAreaSize.x;i++) {\r\n        game.world.tiles[i] = new Array(core.gameAreaSize.y+1);\r\n    }\r\n    \r\n    game.stage.backgroundColor = '#555555';\r\n    \r\n    createNewBlob(game, 0, 0);\r\n    createNewBlob(game, 0, core.gameAreaSize.y);\r\n    createNewBlob(game, core.gameAreaSize.x, 0);\r\n    createNewBlob(game, core.gameAreaSize.x, core.gameAreaSize.y);\r\n    \r\n    player = new Player(game, 50, 50);\r\n    \r\n    game.camera.follow(player);\r\n}\r\n\r\nfunction update() {\r\n    game.physics.arcade.collide(player, game.blobTiles, function (player, blob) {\r\n        player.damage(100);\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });