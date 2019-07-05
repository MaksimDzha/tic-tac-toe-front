import React, { Component } from 'react'
import style from './style.css'

class Cell extends Component {
    render() {
        return (
            <div style={style.icon} onClick = {this.props.onChange}>{this.props.value}</div>
        );
    }
}

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