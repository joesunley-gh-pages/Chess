function getDirectionalMoves(startPos, piece, grid) {
    switch (piece) {
        case 'k':
        case 'K':
            return kingMoves(startPos);
        case 'q':
        case 'Q':
            return getAllDiagonal(startPos, grid).push(getAllStraight(startPos, grid));
        case 'b':
        case 'B':
            return getAllDiagonal(startPos, grid);
        case 'n':
        case 'N':
            return knightMoves(startPos);
        case 'r':
        case 'R':
            return getAllStraight(startPos, grid);
        case 'P':
            return whitePawnMoves(startPos);
        case 'p':
            return blackPawnMoves(startPos);
        default:
            return [];
    }
}

//#region Directional Moves

function kingMoves(startPos) {
    let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === startPos.x && j === startPos.y) {
                continue;
            }
            if (abs(i - startPos.x) <= 1 && abs(j - startPos.y) <= 1) {
                validMoves.push({
                    x: i,
                    y: j
                });
            }
        }
    }

    return validMoves;
}

function bishopMoves(startPos) {
    let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === startPos.x && j === startPos.y) {
                continue;
            }
            if (abs(i - startPos.x) === abs(j - startPos.y)) {
                validMoves.push({
                    x: i,
                    y: j
                });
            }
        }
    }

    return validMoves;
}

function rookMoves(startPos) {
    let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === startPos.x && j === startPos.y) {
                continue;
            }
            if (startPos.x === i || startPos.y === j) {
                validMoves.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    return validMoves;
}

function queenMoves(startPos) {
    return rookMoves(startPos).concat(bishopMoves(startPos));
}

function knightMoves(startPos) {
    let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === startPos.x && j === startPos.y) {
                continue;
            }
            let q1 = abs(startPos.x - i) === 1;
            let q2 = abs(startPos.y - j) === 2;

            let q3 = abs(startPos.x - i) === 2;
            let q4 = abs(startPos.y - j) === 1;

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

function whitePawnMoves(startPos) {
    let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === startPos.x && j === startPos.y) {
                continue;
            }
            if (startPos.x === i && startPos.y - j === 1) {
                validMoves.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (startPos.y === 6) {
        validMoves.push({
            x: startPos.x,
            y: 4
        });
    }

    return validMoves;
}

function blackPawnMoves(startPos) {
    let validMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === startPos.x && j === startPos.y) {
                continue;
            }
            if (startPos.x === i && j - startPos.y === 1) {
                validMoves.push({
                    x: i,
                    y: j
                });
            }
        }
    }

    if (startPos.y === 1) {
        validMoves.push({
            x: startPos.x,
            y: 3
        });
    }

    return validMoves;
}

//#endregion


function filterEmptySquares(grid, startPos){
    let piece = grid[startPos.x][startPos.y];
    let dirMoves = getDirectionalMoves(startPos, piece, grid);
    let validMoves = [];

    for (let i = 0; i < dirMoves.length; i++){
        let p = dirMoves[i];

        if (grid[p.x][p.y] === '-'){
            validMoves.push(p);
        }

        if ("RNBQKP".includes(piece)) {
            // White
            if ("rnbqkp".includes(grid[p.x][p.y])) {
                validMoves.push(p);
            }
        } else if ("rnbqkp".includes(piece)) {
            // Black
            if ("RNBQKP".includes(grid[p.x][p.y])) {
                validMoves.push(p);
            }
        }
    }

    return validMoves;
}





