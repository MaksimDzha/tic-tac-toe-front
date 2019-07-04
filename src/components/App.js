import React, { Component } from 'react'
import Game from './Game'
import ResultTable from "./ResultTable"
import style from './style.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        size: 3,
        isGameRun: false,
        isGameOver: false,
        winner: "",
        resultTable: "",
        users: ["Player 1", "Player 2"]
        };
        this.playTheGame = this.playTheGame.bind(this),
        this.gameOver = this.gameOver.bind(this)
    }

    changeName = (id, value) => (
        this.setState(this.state.users.splice(id, 1, value))
    )

    playTheGame(isIt){
        this.setState({isGameOver: false});
        this.setState({isGameRun: isIt});
    }

    gameOver(isIt, newWinner, result){
        this.setState({isGameRun: false});
        this.setState({winner: newWinner});
        this.setState({resultTable: result});
        this.setState({isGameOver: isIt});
    }

    validName = () => {
        var users = this.state.users;
        var empty = false;
        users[0] == "" ? (users[0] = "Player 1", empty = true) : true;
        users[1] == "" ? (users[1] = "Player 2", empty = true) : true;
        if (empty) this.setState({users: users});
    }

    render() {
        if (this.state.isGameRun) {
            this.validName();
            return (
                <Game playTheGame={this.playTheGame}
                gameOver={this.gameOver}
                size={this.state.size}
                users={this.state.users}/>
            )
        }

        if (this.state.isGameOver) {
            return (
                <div style={style.start}>
                    {ResultTable(this.state.resultTable, this.state.winner)}
                    <div style={style.buttons}>
                        <button onClick={() => this.playTheGame(true)}>Повторить партию</button>
                        <button onClick={() => this.playTheGame(false)}>Начать новую игру</button>
                    </div>
                </div>
            )
        }

        return (
            <div style={style.start}>
                <div style={style.gameName}>Добро пожаловать в игру крестики-нолики</div>
                <div style={style.row}>
                    <div>{"Введите имя игрока 1 (X): "}</div>
                    <input
                        value={this.state.users[0]}
                        onChange={(e) => this.changeName(0, e.target.value)}
                    />
                </div>
                <div style={style.row}>
                    <div>{"Введите имя игрока 2 (O): "}</div>
                    <input
                        value={this.state.users[1]}
                        onChange={(e) => this.changeName(1, e.target.value)} />
                </div>
                <div style={style.buttons}>
                    <button onClick={() => this.playTheGame(true)}>Начать игру</button>
                </div>
            </div>
        )
    }
}

export default App;