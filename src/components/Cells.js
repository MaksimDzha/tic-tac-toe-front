import React, { Component } from 'react'
import style from './style.css'
import Cell from './Cell'

const Cells = (table, playerTurn) => (
    table.map((row, indexX) => {
        return (
            <div style={style.row} key={indexX}>{
                row.map((cell, indexY) => {
                    return(
                        <Cell
                            value={cell}
                            key={indexY}
                            playerChange={() => playerTurn(table, indexX, indexY)}
                        />
                    )
                })
            }</div>
        )
    })
)

export default Cells;