import React, { Component } from 'react'
import style from './style.css'
import BattleField from './BattleField.js'
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
        const table = this.state.table;
        const newTable = [...table];
        if (this.state.count >= 9) this.props.gameOver(true, "", newTable);
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
        const users = this.props.users;
        return(
            <div style={style.column}>
                <div style={style.playerName}>{
                    this.state.step === true ? ('Ход ' + users[0] + ' (X)') : ('Ход ' + users[1] + ' (O)')
                }
                </div>
                {BattleField(this.state.table, this.changeValue)}
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