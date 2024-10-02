rend.js.js
    function clearBoard() {
        for (let x = 0; x < ROWs; x++) {
            for (let y = 0; y < COLs; y++) {
                drawSQD_shape(x, y, "white");
            }
        }
    }
    
    function drwShAEpez(coords, color) {
        coords.forEach(([x, y]) => {
            drawSQD_shape(x, y, color);
        });
    }
    
    function i() {
        clearBoard();
        drwShAEpez([[1, 0], [1, 1], [1, 2], [1, 3]], "cyan");
    }
    
    function t() {
        clearBoard();
        drwShAEpez([[1, 1], [1, 2], [0, 1], [2, 1]], "purple");
    }
    
    function o() {
        clearBoard();
        drwShAEpez([[1, 2], [1, 1], [2, 1], [2, 2]], "yellow");
    }
    
    function z() {
        clearBoard();
        drwShAEpez([[0, 1], [1, 1], [1, 2], [2, 2]], "red");
    }
    
    function s() {
        clearBoard();
        drwShAEpez([[3, 1], [2, 1], [2, 2], [1, 2]], "green");
    }
    
    function j() {
        clearBoard();
        drwShAEpez([[2, 0], [2, 1], [2, 2], [1, 2]], "blue");
    }
    
    function l() {
        clearBoard();
        drwShAEpez([[2, 0], [2, 1], [2, 2], [3, 2]], "orange");
    }
    