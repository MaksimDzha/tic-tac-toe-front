import React, { Component } from 'react'

const check = (checkTable, sizeWin) => {
    const size = checkTable.length;
    for (var i=0; i<size-sizeWin+1; i++) {
    	for (var j=0; j<size-sizeWin+1; j++) {
            if (checkDiag(checkTable, "X" ,i, j, sizeWin) ||
                checkDiag(checkTable, "O", i, j, sizeWin) ||
                checkLines(checkTable, "X", i, j, sizeWin) ||
                checkLines(checkTable, "O", i, j, sizeWin))
                return true;
            }
        }
    return false;
}

const checkDiag = (checkTable, elem, offsetX, offsetY, sizeWin) => {
    var toRight = true;
    var toLeft = true;
    for (var i=0; i<sizeWin; i++) {
        toRight &= (checkTable[i+offsetX][i+offsetY] == elem);
        toLeft &= (checkTable[sizeWin-i-1+offsetX][i+offsetY] == elem);
    }
    if (toRight || toLeft) return true;
    return false;
}

const checkLines = (checkTable, elem, offsetX, offsetY, sizeWin) => {
    for (var i=offsetX; i<sizeWin+offsetX; i++) {
        var columns = true;
        var rows = true;
        for (var j=offsetY; j<sizeWin+offsetY; j++) {
            columns &= (checkTable[i][j] == elem);
            rows &= (checkTable[j][i] == elem);
        }
        if (columns || rows) return true;
    }
    return false;
}

export default check;