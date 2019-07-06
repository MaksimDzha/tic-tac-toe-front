import React, { Component } from 'react'
import style from './style.css'
import Cells from './Cells'
import check from './check'
import createTable from './createTable'
import ai from './ai'

class BattleTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
        count: 1,
        table: createTable(this.props.size),
        step: true}
        this.changeValue = this.changeValue.bind(this)
    };

    nextStep = () => {
        var tStep = this.state.step;
        this.setState({step: (tStep == true ? false : true)});
        this.setState({count: this.state.count + 1});
    }

    changeValue = (table, rowID, cellID) => {
        const newTable = [...table];
        const size = this.props.size;
        if (this.state.count >= size*size) this.props.gameOver(true, "", newTable);
        const newRow = [...table[rowID]];
        if (newRow[cellID] == "") {
            newRow[cellID] = this.state.step == true ? "X" : "O";
            newTable[rowID] = newRow;
            if (check(newTable, this.props.sizeWin)){
                    const winner = this.state.step == true ? this.props.users[0] : this.props.users[1];
                    this.props.gameOver(true, winner, newTable);
                }
            this.setState({table: newTable});
            this.nextStep();
        }
    }

    render(){
        const users = this.props.users;
        return(
            <div style={style.column}>
                <div style={style.playerName}>{
                    this.state.step === true ? ('Ход ' + users[0] + ' (X)') : ('Ход ' + users[1] + ' (O)')
                }
                </div>
                <div id = "cells">{Cells(this.state.table, this.changeValue)}</div>
            </div>
        )
    }
}


export default BattleTable;