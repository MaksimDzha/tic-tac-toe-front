import React, { Component } from 'react'

const check = (checkTable) => {
    if (checkDiag(checkTable, "X") ||
        checkDiag(checkTable, "O") ||
        checkLines(checkTable, "X") ||
        checkLines(checkTable, "O"))
        return true;
    return false;
}

const checkDiag = (checkTable, elem) => {
    var toRight = true;
    var toLeft = true;
    var i = 0;
    checkTable.forEach((row, indexY) => {
        row.forEach((value, indexX) => {
            if (indexX == indexY) toRight &=(value == elem);
            if ((indexX == 2-i)&(indexY == i)) toLeft &= (value == elem);
        })
        i++;
    })
    if (toRight || toLeft) return true;
    return false;
}

const checkLines = (checkTable, elem) => {
    var columns = true;
    var rows = true;
    var result = false;
    checkTable.forEach((row, indexY) => {
        row.forEach((value, indexX) => {
                    rows &= (value == elem);
                    columns &= (checkTable[indexX][indexY] == elem);
        })
        if (rows || columns) result = true;
        columns = true;
        rows = true;
    })
    return result;
}

export default check;