import React, { Component } from 'react'
import style from './style.css'
import Cell from './Cell.js'
import check from './check.js'

class BattleTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
        count: 1,
        step: true,
        table: [
            ["","",""],
            ["","",""],
            ["","",""]
        ]}
        this.changeValue = this.changeValue.bind(this)
    };

    nextStep = () => {
        var tStep = this.state.step;
        this.setState({step: (tStep == true ? false : true)});
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);
    }

    changeValue = (rowID, cellID) => {
        const {table} = this.state;
        const newTable = [...table];
        const newRow = [...table[rowID]];
        if (newRow[cellID] == "") {
            newRow[cellID] = this.state.step == true ? "X" : "O";
            newTable[rowID] = newRow;
            if (check(newTable)){
                    const winner = this.state.step == true ? this.props.users[0] : this.props.users[1];
                    this.props.gameOver(true, winner, newTable);

                }
            this.setState({table: newTable});
            this.nextStep();
        }
    }

    render(){
        const {size, users} = this.props;
        const {table} = this.state;
        return(
        <div style={style.row}>
            <div style={style.playerName}>{users[0]}<br />играет за "X"</div>
            <div style={style.column}>
            <div style={style.playerName}>
                {
                    this.state.step === true ? ('Ход ' + users[0] + ' (X)') : ('Ход ' + users[1] + ' (O)')
                }
            </div>
            {table.map((row, indexX) => {
                return (
                    <div style={style.row} key={indexX}>{
                        row.map((cell, indexY) => {
                            return(
                                <Cell
                                    value={cell}
                                    key={indexY}
                                    onChange={() => this.changeValue(indexX, indexY)}
                                />
                            )
                        })
                    }</div>
                )
            })}
            </div>
            <div style={style.playerName}>{users[1]}<br />играет за "O"</div>
        </div>
        )
    }
}

const Game = ({playTheGame, gameOver, size, users}) => (
    <div style={style.game}>
        <div style={style.gameBegin}>Игра началась</div>
        <div><BattleTable gameOver={gameOver} size={size} users={users} /></div>
        <div style={style.buttons}>
            <button onClick={() => playTheGame(false)}>Закончить игру</button>
        </div>
    </div>
)

export default Game;