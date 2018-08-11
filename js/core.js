const tileBaseSize = 32; // size of tile graphics
const tileSize = 16;     // size of tiles in game (graphics will be scaled)

/* In tiles */
const gameAreaSize = {
    x: 75,
    y: 75
}

function isValidTileCoordinate(x, y) {
    if (x < 0 || x > gameAreaSize.x) return false;
    if (y < 0 || y > gameAreaSize.y) return false;
    return true;
}

function getTileAt(game, x, y) {
    if (!isValidTileCoordinate(x, y)) return undefined;
    return game.world.tiles[x][y];
}

function tileIsEmpty(game, x, y) {
    if (!isValidTileCoordinate(x, y)) return false;
    if (getTileAt(game, x, y)) return false;
    return true;
}

module.exports = {
    tileSize,
    tileBaseSize,
    gameAreaSize,
    isValidTileCoordinate,
    getTileAt,
    tileIsEmpty,
};
