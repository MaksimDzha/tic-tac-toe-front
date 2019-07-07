import React from 'react'
import createTable from './createTable'

const newCheck = (table, sizeWin) => {

    var checkTable = createTable(table.length);
    table.forEach((row, x) => {
        row.forEach((item, y) => {
            if (item == "") checkTable[x][y] = 0
                else (item == "X") ? checkTable[x][y] = 1 : checkTable[x][y] = -1
        })
    });

    var res = scanRows(checkTable, sizeWin);
    if ((res != null) && (res.length >= sizeWin))
        return res;

    res = scanColumns(checkTable, sizeWin);
    if ((res != null) && (res.length >= sizeWin))
        return res;

    res = scanDiagonals(checkTable, sizeWin);
    if ((res != null) && (res.length >= sizeWin))
        return res;

    return null;
}

const scanRows = (checkTable, sizeWin) => {
    for (let r = 0; r < checkTable.length; r++) {
        var line = scanRow(checkTable, sizeWin, r);
        if (line != null) {
            return line;
        }
    }
    return null;
}

const scanColumns = (checkTable, sizeWin) => {
    for (let c = 0; c < checkTable.length; c++) {
        var line = scanCol(checkTable, sizeWin, c);
        if (line != null) {
            return line;
        }
    }
    return null;
}

const scanDiagonals= (checkTable, sizeWin) => {
    for (var i = 0; i < checkTable.length; i++) {
        var line = scanUpDiagonal(true, checkTable, sizeWin, i);
        if (line != null)
            return line;
        line = scanDownDiagonal(true, checkTable, sizeWin, i);
        if (line != null)
            return line;
        line = scanUpDiagonal(false, checkTable, sizeWin, i);
        if (line != null)
            return line;
        line = scanDownDiagonal(false, checkTable, sizeWin, i);
        if (line != null)
            return line;
    }
    return null;
}

const scanCol = (checkTable, sizeWin, index) => {
    return scanLine(checkTable, 0, index, 1, 0, sizeWin);
}

const scanRow = (checkTable, sizeWin, index) => {
    return scanLine(checkTable, index, 0, 0, 1, sizeWin);
}

const scanUpDiagonal = (direct, checkTable, sizeWin, index) => {
    if (direct) {
        return scanLine(checkTable, 0, index, 1, 1, sizeWin);
    } else {
        return scanLine(checkTable, 0, index, 1, -1, sizeWin);
    }
}

const scanDownDiagonal = (direct, checkTable, sizeWin, index) => {
    if (direct) {
        return scanLine(checkTable, checkTable.length - 1, index, -1, 1, sizeWin);
    } else {
        return scanLine(checkTable, checkTable.length - 1, index, -1, -1, sizeWin);
    }
}

const scanLine = (checkTable, r, c, rInc, cInc, sizeWin) => {

    var p = checkTable[r][c];
    var list = [];
    while ((r >= 0) && (r < checkTable.length) && (c >= 0) && (c < checkTable[0].length)) {
        if (checkTable[r][c] == 0) {
            list = [];
        }
        else if (checkTable[r][c] == p) {
            list.splice(list.length, 1, [r, c]);
            if (list.length >= sizeWin) {
                return list;
            }
        }
        else {
            p = checkTable[r][c];
            list = [];
            list.push([r, c]);
        }
        r += rInc;
        c += cInc;
    }
    return null;
}

export default newCheck;