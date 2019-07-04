import React, { Component } from 'react'
import style from './style.css'

const ResultTable = (table, winner) => (
    <div>
        <div style={style.gameBegin}>Игра окончена</div>
        <div style={style.column}>
            <div style={style.playerName}>{(winner == "") ? "Ничья!" : ("Победитель: " + winner)}</div>
            {table.map((row, indexX) => {
                return (
                    <div style={style.row} key={indexX}>{
                        row.map((value, indexY) => {
                            return(
                                <div style={style.icon} key={indexY}>{value}</div>
                            )
                        })
                    }</div>
                )}
            )}
        </div>
    </div>

)

export default ResultTable;