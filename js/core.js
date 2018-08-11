const tileSize = 32;

/* In tiles */
const gameAreaSize = {
    x: 50,
    y: 38
}

function isValidTileCoordinate(x, y) {
    if (x < 0 || x > gameAreaSize.x) return false;
    if (y < 0 || y > gameAreaSize.y) return false;
    return true;
}

function getTileAt(game, x, y) {
    if (!isValidTileCoordinate(x, y)) return undefined;
    
    return game.world.tiles[x][y]
}

module.exports = {
    tileSize,
    gameAreaSize,
    isValidTileCoordinate,
    getTileAt,
};
