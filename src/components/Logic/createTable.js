import React from 'react'

const createLine = (size) => {
    const line = [""];
    for(var i = 0; i<size; i++)
        line.splice(i, 1, "");
    return line;
}

const createTable = (size) => {
    const newTable = [""];
    for(var i = 0; i<size; i++){
        newTable.splice(i, 1, createLine(size));
    }
    return newTable;
}


export default createTable;