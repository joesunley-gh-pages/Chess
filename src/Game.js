class Game {
    // constructor(){
    //     this.grid = Array(8).fill().map(() => Array(8).fill('-'));
    //     this.whiteGo = true;
    //     this.castling = {
    //         black: {
    //             queenside: true,
    //             kingside: true
    //         },
    //         queen: {
    //             queenside: true,
    //             kingside: true
    //         }
    //     }
    //     this.enPassant = "-";
    //     this.halfMoveClock = 0;
    //     this.fullMoveClock = 1;
    // }
    constructor(fenString) {
        let res = createGameState(fenString);
        this.fenString = fenString;
        this.grid = res.grid;
        this.whiteGo = res.whiteGo;
        this.castling = res.castling;
        this.enPassant = res.enPassant;
        this.halfMoveClock = res.halfMoveClock;
        this.fullMoveClock = res.fullMoveClock;

    }
    // constructor(wG, c, e, hMC, fMC){
    //     this.whiteGo = wG;
    //     this.castling = c;
    //     this.enPassant = e;
    //     this.halfMoveClock = hMC;
    //     this.fullMoveClock = fMC;
    // }

    getMoves(pos){
        let piece = this.grid[pos.x][pos.y];

        switch (piece) {
            case 'k':
            case 'K':
                return PieceMoves.King(pos, this.grid);
            case 'q':
            case 'Q':
                return PieceMoves.Queen(pos, this.grid);
            case 'b':
            case 'B':
                return PieceMoves.Bishop(pos, this.grid);
            case 'n':
            case 'N':
                return PieceMoves.Knight(pos, this.grid);
            case 'r':
            case 'R':
                return PieceMoves.Rook(pos, this.grid);
            case 'p':
            case 'P':
                return PieceMoves.Pawn(pos, this.grid);
            default:
                return [];
        }
    }

}