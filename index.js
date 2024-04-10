var PlayerRed = "R";
var PlayerYellow = "Y";
var currPlayer = "PlayerRed";

var gameOver = "false";
var board;

var rows = 6;
var columns = 7;

window.onload = function(){
    setGame();
}

function setGame() {
    board =[];

    for (let r = 0; r < rows; r++) {
        let row =[];
        for (let c = 0; c < columns; c++) {
            //js
            row.push(' ');
            
            //html
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
        }
    }
}