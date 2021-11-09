function chessToIndex(file, rank) {
    let s = "abcdefgh";
    let f = s.indexOf(file.toString().toLowerCase());

    let r = 8 - rank;

    return {
        x: f,
        y: r
    };

}

