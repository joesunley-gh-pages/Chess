function drawIndexes() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            textAlign(CENTER, CENTER);
            textSize(26);

            text(i + "," + j, i * scale + scale / 2 + scale / 10, j * scale + scale / 2 + scale / 10);
        }
    }
}

function drawLocs() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            textAlign(CENTER, CENTER);
            textSize(26);

            let x = "abcdefgh" [i];

            text(x + (8 - j), i * scale + scale / 2 + scale / 10, j * scale + scale / 2 + scale / 10);
        }
    }
}

function drawMoves(pos) {
    reDrawBoard();
    let result = game.getMoves(pos);
    console.log(result);
    for (i = 0; i < result.length; i++) {
        let p = result[i];

        strokeWeight(0.5);
        fill(187, 190, 100);
        circle(p.x * scale + scale / 2 + xOffset, p.y * scale + scale / 2 + yOffset, 10);
    }
}

function drawText(x, y, t) {
    textAlign(CENTER, CENTER);
    textSize(26);

    text(t, x * scale + scale / 2 + xOffset, y * scale + scale / 2 + yOffset);
}