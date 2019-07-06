import React from 'react'
import App from './App'
import Game from './Game'
import Cells from './Cells'
import Cell from './Cell'

const ai = (table) => {
    console.log("Мы в ai!");
    const size = table.length;
    var x = Math.floor(Math.random()*(size));
    var y = Math.floor(Math.random()*(size));
    console.log("До проверки table[" + x + "][" + y + "]= " + table[x][y]);
    while (!table[x][y] == "") {
        console.log("После проверки table[" + x + "][" + y + "]= " + table[x][y]);
        x = Math.floor(Math.random()*(size));
        y = Math.floor(Math.random()*(size));
    }
    console.log("После проверки table[" + x + "][" + y + "]= " + table[x][y]);
    table[x][y] = "O";
}

export default ai;