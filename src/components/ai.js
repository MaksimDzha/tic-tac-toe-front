import React from 'react'
import App from './App'
import Game from './Game'
import Cells from './Cells'
import Cell from './Cell'

const ai = (table) => {

    const size = table.length;
    var x = Math.floor(Math.random()*(size));
    var y = Math.floor(Math.random()*(size));
    while (!table[x][y] == "") {
        x = Math.floor(Math.random()*(size));
        y = Math.floor(Math.random()*(size));
    }
    table[x][y] = "O";
}

export default ai;