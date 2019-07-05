import React from 'react'
import Cell from './Cell'
import BattleField from './BattleField'

const ai = (table, changeValue) => {

    const newTable = [...table];
    const size = newTable.length;
    var x = Math.floor(Math.random()*(size));
    var y = Math.floor(Math.random()*(size));
    console.log("table[x][y] = " + newTable[x][y]);
    while (newTable[x][y] == " ") {
        console.log("Вошли в цикл");
        x = Math.floor(Math.random()*(size));
        y = Math.floor(Math.random()*(size));
    }
    console.log("Вышли из цикла");
    console.log("x= " + x + " y= " + y);
    const element = document.getElementById('BattleField');
    console.log(element.log);
    changeValue(newTable, x, y);
}

export default ai;