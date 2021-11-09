//#region Working

function getAllDiagonal(startPos, grid){
    let diagDirs = ["ne", "se", "sw", "nw"];
    let tiles = [];
    for (let i = 0; i < 4; i++){
        tiles = tiles.concat(getVisibleTiles(diagonalTiles(startPos, diagDirs[i]), grid, startPos));
    }
    return tiles;
}
function getAllStraight(startPos, grid){
    let straDirs = ['n', 'e', 's', 'w'];
    let tiles = [];
    for (let i = 0; i < 4; i++){
        tiles.concat(getVisibleTiles(straightTiles(startPos, straDirs[i]), grid, startPos));
    }
    return tiles;
}

function diagonalTiles(startPos, direction){
    let tiles = [];
    let p = Object.assign({}, startPos);
    switch (direction.toLowerCase()){
        case "nw":
            while (p.x >= 0 && p.y >= 0){
                if(p.x !== startPos.x || p.y !== startPos.y){
                    tiles.push(Object.assign({}, p));
                }
                p.x--;
                p.y--;
            }
            break;
        case "ne":
            while (p.x < 8 && p.y >= 0){
                if(p.x !== startPos.x || p.y !== startPos.y){
                    tiles.push(Object.assign({}, p));
                }
                p.x++;
                p.y--;
            }
            break;
        case "sw":
            while (p.x >= 0 &&  p.y < 8){
                if(p.x !== startPos.x || p.y !== startPos.y){
                    tiles.push(Object.assign({}, p));
                }
                p.x--;
                p.y++;
            }
            break;
        case "se":
            while (p.x < 8 && p.y < 8){
                if(p.x !== startPos.x || p.y !== startPos.y){
                    tiles.push(Object.assign({}, p));
                }
                p.x++;
                p.y++;
            }
            break;
        default:
            return [];
    }
    return tiles;
}
function straightTiles(startPos, direction){
    let tiles = [];
    let p = Object.assign({}, startPos);
    switch (direction.toLowerCase()){
        case 'n':
            while (p.y >= 0){
                if(p.y !== startPos.y){
                    tiles.push(Object.assign({}, p));
                }
                p.y--;
            }
            break;
        case 'e':
            while (p.x < 8){
                if (p.x !== startPos.x){
                    tiles.push(Object.assign({}, p));
                }
                p.x++;
            }
            break;
        case 's':
            while (p.y < 8){
                if(p.y !== startPos.y){
                    tiles.push(Object.assign({}, p));
                }
                p.y++;
            }
            break;
        case 'w':
            while (p.x >= 0){
                if(p.x !== startPos.x){
                    tiles.push(Object.assign({}, p));
                }
                p.x--;
            }
            break;
        default: 
            return [];
    }
    return tiles;
}

function getVisibleTiles(tiles, grid, startPos){
    let valid = [];

    for (let i = 0; i < tiles.length; i++){
        let t = tiles[i];

        if (grid[t.x][t.y] === '-'){
            valid.push(Object.assign({}, t));
        }
        else {
            let char = ("rnbqkp".includes(grid[startPos.x][startPos.y])) ? "RNBQKP" : "rnbqkp";
            if (char.includes(grid[t.x][t.y])){
                valid.push(Object.assign({}, t));
            }
            return valid;
        }
    }
    return valid;
}

//#endregion

function getMoves(startPos, grid){
    let piece = grid[startPos.x][startPos.y];

    switch (piece) {
        case 'k':
        case 'K':
        case 'q':
        case 'Q':
        case 'b':
        case 'B':
        case 'n':
        case 'N':
        case 'r':
        case 'R':
        case 'P':
        case 'p':
        default:
            return [];
    }
}