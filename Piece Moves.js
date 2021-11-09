class PieceMoves{
    static King(pos, grid){
        let tiles = []
        let piece = grid[pos.x][pos.y];
        let isWhite = "RNBQKP".includes(piece);

        if (this.#isInCheck(isWhite ? 'K' : 'k', grid)){

        } else {
            let rawMoves = this.#kingRawMoves(pos);
            tiles = this.#removeFriendlies(rawMoves, piece, grid);
        }
        
        return tiles;
    }

    static #isInCheck(pos, grid){
        return false;

        let king = grid[pos.x][pos.y];
        let chars = "RNBQKP".includes(king) ? "RNBQKP" : "rnbqkp";

        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                let piece = grid[i][j];
                if (chars.includes(piece)){
                    let moves;
                }
            }
        }

    }
    // static #isInCheck(piece, grid){

    // }

    static Queen(pos, grid){
        let tiles = []
        let piece = grid[pos.x][pos.y];
        let isWhite = "RNBQKP".includes(piece);

        if (this.#isInCheck(isWhite ? 'K' : 'k', grid)){

        } else {
            tiles = this.#diagonalTiles(pos, grid);
            tiles.concat(this.#straightTiles(pos, grid));
        }
        
        return tiles;
    }

    static Bishop(pos, grid){
        let tiles = []
        let piece = grid[pos.x][pos.y];
        let isWhite = "RNBQKP".includes(piece);

        if (this.#isInCheck(isWhite ? 'K' : 'k', grid)){

        } else {
            tiles = this.#diagonalTiles(pos, grid);
        }

        return tiles;
    }

    static Rook(pos, grid){
        let tiles = []
        let piece = grid[pos.x][pos.y];
        let isWhite = "RNBQKP".includes(piece);

        if (this.#isInCheck(isWhite ? 'K' : 'k', grid)){

        } else {
            tiles = this.#straightTiles(pos, grid);
        }

        return tiles;
    }
    static Knight(pos, grid){
        let tiles = []
        let piece = grid[pos.x][pos.y];
        let isWhite = "RNBQKP".includes(piece);

        if (this.#isInCheck(isWhite ? 'K' : 'k', grid)){
        } else {
            let rawMoves = this.#knightRawMoves(pos);
            tiles = this.#removeFriendlies(rawMoves, piece, grid);
        }

        return tiles;
    }
    static Pawn(pos, grid){
        let tiles = []
        let piece = grid[pos.x][pos.y];
        let isWhite = "RNBQKP".includes(piece);

        if (this.#isInCheck(isWhite ? 'K' : 'k', grid)){
        } else {
            let rawMoves = this.#pawnRawMoves(pos, grid);
            tiles = this.#removeFriendlies(rawMoves, piece, grid);
        }

        return tiles;
    }

    static #pawnRawMoves(pos, grid){
        let isWhite = "RNBQKP".includes(grid[pos.x][pos.y]);
        let validMoves = [];

        for (let i  = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (i === pos.x && j === pos.y) {
                    continue;
                }
                if (pos.x === i && (1 === (isWhite ? (pos.y - j) : (j - pos.y)))){
                    validMoves.push({x: i, y: j});
                }
            }
        }

        if (pos.y === (isWhite ? 6 : 1) && grid[pos.x][isWhite ? 5 : 2] === '-'){
            validMoves.push({x: pos.x, y: (isWhite ? 4 : 3)});
        }

        return validMoves;
    }
    static #knightRawMoves(pos){
        let validMoves = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i === pos.x && j === pos.y) {
                    continue;
                }
                let q1 = abs(pos.x - i) === 1;
                let q2 = abs(pos.y - j) === 2;

                let q3 = abs(pos.x - i) === 2;
                let q4 = abs(pos.y - j) === 1;

                if ((q1 && q2) || (q3 && q4)) {
                    validMoves.push({
                        x: i,
                        y: j
                    });
                }
            }
        }

        return validMoves;
    }
    static #kingRawMoves(pos){
        let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === pos.x && j === pos.y) {
                continue;
            }
            if (abs(i - pos.x) <= 1 && abs(j - pos.y) <= 1) {
                validMoves.push({
                    x: i,
                    y: j
                });
            }
        }
    }

    return validMoves;
    }
    static #removeFriendlies(tiles, piece, grid){
        let valid = Object.assign([], tiles);
        let friendlyChars =  "RNBQKP".includes(piece) ? "RNBQKP" : "rnbqkp";

        for (let i = 0; i < tiles.length; i++){
            let t = tiles[i];
            if (friendlyChars.includes(grid[t.x][t.y])){
                valid.splice(valid.indexOf(t), 1);
            }
        }
        return valid;
    }

    static #diagonalTiles(pos, grid){
        let diagDirs = ["ne", "se", "sw", "nw"];
        let tiles = [];
        for (let i = 0; i < 4; i++){
            tiles = tiles.concat(this.#visibleTiles(this.#rawDiagonal(pos, diagDirs[i]), grid, pos));
    }
    return tiles;
    }
    static #straightTiles(pos, grid){
        let straDirs = ['n', 'e', 's', 'w'];
        let tiles = [];
        for (let i = 0; i < 4; i++){
            tiles.concat(this.#visibleTiles(this.#rawStraight(pos, straDirs[i]), grid, pos));
        }
        return tiles;
    }

    static #rawDiagonal(startPos, direction){
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
    static #rawStraight(startPos, direction){
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

    static #visibleTiles(tiles, grid, startPos){
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

}