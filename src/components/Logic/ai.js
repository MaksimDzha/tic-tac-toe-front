import React from 'react'

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