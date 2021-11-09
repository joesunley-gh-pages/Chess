let game = new Game("4R3/2np4/ppPP2b1/pR6/2P2p2/5K1n/5B2/2k5 w - - 0 1");

function setup() {
    console.log(game);
    createCanvas((8 * scale) + (2 * xOffset), (8 * scale) + (2 * yOffset));
    drawBoard();
    drawFenString(game.fenString);
}
// Rand Comment

function draw() {
    // drawBoard();
    // drawIndexes();
    // drawLocs();
}

function reDrawBoard() {
    drawBoard();
    drawFenString(game.fenString);
}

let scale = 40;
let xOffset = 5;
let yOffset = 5;

function drawBoard() {
    background(240);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            drawTile(i, j);
        }
    }
}

function drawTile(i, j) {
    strokeWeight(scale / 30);
    stroke(0);

    if (i % 2 === 0) {
        if (j % 2 === 1) {
            fill(184, 139, 74);
        } else {
            fill(227, 193, 111);
        }
    } else {
        if (j % 2 === 0) {
            fill(184, 139, 74);
        } else {
            fill(227, 193, 111);
        }
    }
    rect((i * scale) + xOffset, (j * scale) + yOffset, scale);
}

function drawAtLoc(file, rank) {
    let index = chessToIndex(file, rank);
    let x = (index.x * scale) + xOffset;
    let y = (index.y * scale) + yOffset;

    draw({
        x: x,
        y: y
    }, val);
}

function drawFenString(fenString) {
    let r = createGameState(fenString);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let c = r.grid[i][j];

            if (c !== '-'){
                drawText(i, j, c);
            }
        }
    }
}



function mouseClicked() {
    let s = getClicked(mouseX, mouseY);
    drawMoves(s);
}

function getClicked(i, j) {
    let x = floor((i - xOffset) / scale);
    let y = floor((j - yOffset) / scale);

    return {
        x: x,
        y: y
    };
}