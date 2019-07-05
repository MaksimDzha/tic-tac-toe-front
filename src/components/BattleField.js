import React, { Component } from 'react'
import style from './style.css'
import Cell from './Cell'

const BattleField = (table, changeValue) => (
    table.map((row, indexX) => {
        return (
            <div style={style.row} key={indexX}>{
                row.map((cell, indexY) => {
                    return(
                        <Cell
                            value={cell}
                            key={indexY}
                            onChange={() => changeValue(table, indexX, indexY)}
                        />
                    )
                })
            }</div>
        )
    })
)

export default BattleField;