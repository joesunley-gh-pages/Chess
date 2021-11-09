function createGameState(fen) {
    let lines = fen.split(' ');
    let board = lines[0].split('/');

    let gameGrid = Array(8).fill().map(() => Array(8));
    let reversedGrid = Array(8).fill().map(() => Array(8));

    for (let i = 0; i < board.length; i++) {
        let file = board[i];
        let gridfile = Array(8);
        let currentIndex = 0;

        for (let j = 0; j < file.length; j++) {
            let c = file[j];
            if (isInt(c)) {
                let n = parseInt(c);

                for (let k = currentIndex; k < (n + currentIndex); k++) {
                    gridfile[k] = '-';
                    currentIndex++;
                    n--;
                }
            } else {
                gridfile[currentIndex] = c;
                currentIndex++;
            }
        }
        gameGrid[i] = gridfile;

    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            reversedGrid[i][j] = gameGrid[j][i];
        }
    }

    let whiteGo;

    if (lines[1] === "w") {
        whiteGo = true;
    } else {
        whiteGo = false;
    }

    let castling = castlingFunc(lines[2]);
    let enPassant = lines[3];
    let halfMoveClock = parseInt(lines[4]);
    let fullMoveClock = parseInt(lines[5]);

    let s = {
        grid: reversedGrid,
        whiteGo: whiteGo,
        castling: castling,
        enPassant: enPassant,
        halfMoveClock: halfMoveClock,
        fullMoveClock: fullMoveClock
    };


    return s;

}

function castlingFunc(s) {
    let white = {
        queenside: false,
        kingside: false
    };
    let black = {
        queenside: false,
        kingside: false
    };

    if (s === "-") {
        return {
            black: black,
            white: white
        };
    }

    if (s.includes('q')) {
        black.queenside = true;
    }
    if (s.includes('k')) {
        black.kingside = true;
    }
    if (s.includes('Q')) {
        white.queenside = true;
    }
    if (s.includes('K')) {
        white.kingside = true;
    }

    return {
        black: black,
        white: white
    };
}

function isInt(s) {
    return !isNaN(s - parseInt(s));
}