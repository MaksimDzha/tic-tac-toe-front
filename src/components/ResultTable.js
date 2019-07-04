import React, { Component } from 'react'
import style from './style.css'

const ResultTable = (table, winner) => (
    <div>
        <div style={style.gameBegin}>Игра окончена</div>
        <div style={style.column}>
            <div style={style.playerName}>{(winner == "") ? "Ничья!" : ("Победитель: " + winner)}</div>
            {table.map((row, indexY) => {
                return (
                    <div style={style.row}>{
                        row.map((value, indexX) => {
                            return(
                                <div style={style.icon}>{value}</div>
                            )
                        })
                    }</div>
                )}
            )}
        </div>
    </div>

)

export default ResultTable;