import React, { Component } from 'react'
import style from './style.css'
import Cells from './Cells'
import newCheck from './Logic/newCheck'
import createTable from './Logic/createTable'
import aiHard from './Logic/aiHard'

class BattleTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            computerPlay: "O",
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
        if ((newCount == size*size)&&(this.state.computerPlay == "X"))
            this.aiTurn(newTable);
        if (newCount >= size*size) {
            var resultTable = createTable(newTable.length);
            newTable.forEach((row, indexX) =>
                row.forEach((item, indexY) => (
                    resultTable[indexX][indexY] = ["", item]
                ))
            )
            this.props.gameOver(true, "", resultTable, null);
        }
        this.setState({step: tStep});
        this.setState({count: this.state.count + 1});
        if ((tStep == this.state.computerPlay)&&(newCount < size*size))
            this.aiTurn(newTable);
    }

    aiTurn = (newTable) => {
        aiHard(newTable, this.props.sizeWin, this.state.computerPlay, 0);
        const line = newCheck(newTable, this.props.sizeWin);
        if (line != null){
            newTable.forEach((row, indexX) =>
                row.forEach((item, indexY) => (
                    newTable[indexX][indexY] = ["", item]
                ))
            )
            line.forEach((item) => {newTable[item[0]][item[1]][0] = "win"})
            this.props.gameOver(true, "Вы проиграли", newTable);
        }
        this.setState({table: newTable}, function(){this.nextStep(newTable)});
    }

    playerTurn = (table, rowID, cellID) => {
        const newTable = [...table];
        const newRow = [...table[rowID]];
        if (newRow[cellID] == "") {
            newRow[cellID] = this.state.step;
            newTable[rowID] = newRow;
            const line = newCheck(newTable, this.props.sizeWin);
            if (line != null){
                newTable.forEach((row, indexX) =>
                    row.forEach((item, indexY) => (
                        newTable[indexX][indexY] = ["", item]
                    ))
                )
                line.forEach((item) => {newTable[item[0]][item[1]][0] = "win"})
                this.props.gameOver(true, "Вы победили. Поздравляем!", newTable);
            }
            this.setState({table: newTable}, function(){this.nextStep(newTable)});
        }
    }

    render(){
        if (this.state.count == 0 && this.props.aiFirst) {
            this.setState({computerPlay: "X"});
            const newCount = this.state.count + 1;
            var aiTable = createTable(this.props.size);
            for (let i = 0; i < this.props.size; i++)
                for (let j = 0; j < this.props.size; j++)
                    aiTable[i][j] = "";
            this.setState({count: newCount}, function(){this.aiTurn(aiTable)});
        }
        return(
            <div style={style.column}>
                <div style={style.playerName}>{
                    this.state.step === "X" ? 'Ваш ход - X' : 'Ваш ход - O'
                }
                </div>
                <div>{Cells(this.state.table, this.playerTurn)}</div>
            </div>
        )
    }
}


export default BattleTable;