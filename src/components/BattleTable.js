import React, { Component } from 'react'
import style from './style.css'
import Cells from './Cells'
import check from './Logic/check'
import createTable from './Logic/createTable'
import ai from './Logic/ai'
import ai3x3 from './Logic/ai3x3'

class BattleTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            table: createTable(this.props.size),
            step: "X"
        }
        this.playerTurn = this.playerTurn.bind(this);
        this.aiTurn = this.aiTurn.bind(this)
    };

    nextStep = (newTable) => {
        const tStep = this.state.step == "X" ? "O" : "X";
        const size = this.props.size;
        const newCount = this.state.count + 1;
        if (newCount > size*size) this.props.gameOver(true, "", newTable);
        this.setState({step: tStep});
        this.setState({count: this.state.count + 1});
        if ((tStep == "O")&(newCount <= size*size)&(this.props.aiOn)) this.aiTurn(newTable);
    }

    aiTurn = (newTable) => {
        ai(newTable);
        if (check(newTable, this.props.sizeWin)){
               this.props.gameOver(true, "Computer", newTable);
           }
        this.setState({table: newTable}, function(){this.nextStep(newTable)});
    }

    playerTurn = (table, rowID, cellID) => {
        const newTable = [...table];
        const newRow = [...table[rowID]];
        if (newRow[cellID] == "") {
            newRow[cellID] = this.state.step;
            newTable[rowID] = newRow;
            if (check(newTable, this.props.sizeWin)){
                    const winner = this.state.step == "X" ? this.props.users[0] : this.props.users[1];
                    this.props.gameOver(true, winner, newTable);
                }
            this.setState({table: newTable}, function(){this.nextStep(newTable)});
        }
    }

    render(){
        const users = this.props.users;
        return(
            <div style={style.column}>
                <div style={style.playerName}>{
                    this.state.step === "X" ? ('Ход ' + users[0] + ' (X)') : ('Ход ' + users[1] + ' (O)')
                }
                </div>
                <div>{Cells(this.state.table, this.playerTurn)}</div>
            </div>
        )
    }
}


export default BattleTable;