var rows = 6;
var cols = 5;

var row = 0;
var col = 0;
var gameover = false;
var word = "MYASS";

window.onload = function() {
    initialize();
}

function initialize() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameover) return;
        if (e.code >= "KeyA" && e.code <= "KeyZ") {
            if (col < cols) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        } else if (e.code == "Backspace") {
            if (0 < col && col <= cols) {
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        } else if (e.code == "Enter") {
            update();
            row += 1;
            col = 0;
        }
        if (!gameover && row == rows) {
            gameover = true;
            document.getElementById("ans").innerText = "The word was: "+ word;
        }
    });
}

function update() {
    let correct = 0;
    for (let c = 0; c <cols; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        if (word[c] == letter) {
            currTile.classList.add("yougood");
            correct += 1;
        } else if (word.includes(letter)) {
            currTile.classList.add("y");
        } else {
            currTile.classList.add("youdumb");
        }
    }
    if (correct ==cols) {
        gameover = true;
        document.getElementById("ans").innerText = "The word was: " + word;
    }
}
