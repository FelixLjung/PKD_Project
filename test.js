"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node1 = "3F";
var node2 = "7A";
var line1 = [node1, "-----", node2];
var line2 = ["|", "      ", "|"];
var line3 = ["|", "      ", "|"];
var line4 = [node1, "-----", node2];
var board = [line1, line2, line3, line4];
var outputColor = "color:green; font-size:20px;";
var board1 = [
    ["      ", node1],
    ["   /  ", "|", "  \\     "],
    ["  /  ", " |", "   \\"],
    [node1, "---", node2, "---", node1],
    [" \\   ", " |", "   / "],
    ["  \\   ", "|", "  / "],
    ["     ", node2, "     "]
];
function print_to_board(board) {
    for (var i = 0; i < board.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(board[i]));
    }
    function helper(line) {
        var str = "";
        for (var j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
}
print_to_board(board1);
console.log('\x1b[36m%s\x1b[0m', " Kung Felix ");
