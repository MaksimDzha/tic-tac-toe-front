import React, { Component } from 'react'
import style from './style.css'

const ResultTable = (table, winner, line) => (
    <div>
        <div style={style.column}>
            <div style={style.winner}>{(winner == "") ? "Ничья!" : (winner)}</div>
            {table.map((row, indexX) => {
                return (
                    <div style={style.row} key={indexX}>{
                        row.map((value, indexY) => {
                            return(
                                <div style={(value[0] == "win") ? style.iconWin : style.icon} key={indexY}>{
                                    value[1]
                                }</div>
                            )
                        })
                    }</div>
                )}
            )}
        </div>
    </div>

)

export default ResultTable;