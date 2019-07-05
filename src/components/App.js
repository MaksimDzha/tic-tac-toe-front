import React, { Component } from 'react'
import Game from './Game'
import ResultTable from "./ResultTable"
import style from './style.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        size: 6,
        sizeWin: 4,
        isGameRun: false,
        isGameOver: false,
        winner: "",
        resultTable: "",
        users: ["Player 1", "Player 2"]
        };
        this.playTheGame = this.playTheGame.bind(this),
        this.gameOver = this.gameOver.bind(this)
    }

    onChangeName = (id, value) => {
        this.setState(this.state.users.splice(id, 1, value))
    }

    checkName = (id, value) => {
        if (value == "") {
            id == 0 ? value = "Player 1" : value = "Player 2";
            this.setState(this.state.users.splice(id, 1, value));
        }
        const regex = /^[а-яА-яёЁa-zA-Z0-9]+([_\s\-]?[а-яА-яёЁa-zA-Z0-9])*$/;
        if (!regex.test(value)) {
            id == 0 ? value = "Player 1" : value = "Player 2";
            this.setState(this.state.users.splice(id, 1, value));
        }
    }

    playTheGame(isIt){
        const users = this.state.users;
        const checkUsers = [...users];
        users.forEach((value, id) => {this.checkName(id, value)});
        this.setState({isGameOver: false});
        this.setState({isGameRun: isIt});
    }

    gameOver(isIt, newWinner, result){
        this.setState({isGameRun: false});
        this.setState({winner: newWinner});
        this.setState({resultTable: result});
        this.setState({isGameOver: isIt});
    }

    render() {
        if (this.state.isGameRun) {
            return (
                <Game playTheGame={this.playTheGame}
                gameOver={this.gameOver}
                size={this.state.size}
                sizeWin={this.state.sizeWin}
                users={this.state.users}/>
            )
        }

        if (this.state.isGameOver) {
            return (
                <div style={style.start}>
                    <div style={style.gameEnd}>Игра окончена</div>
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
                <div style={style.rowStart}>
                    <div>{"Введите имя игрока 1 (X): "}</div>
                    <input
                        style={style.inputStyle}
                        value={this.state.users[0]}
                        placeholder={"Введите имя первого игрока"}
                        onChange={(e) => this.onChangeName(0, e.target.value)}
                    />
                </div>
                <div style={style.rowStart}>
                    <div>{"Введите имя игрока 2 (O): "}</div>
                    <input
                        style={style.inputStyle}
                        value={this.state.users[1]}
                        placeholder={"Введите имя второго игрока"}
                        onChange={(e) => this.onChangeName(1, e.target.value)}
                    />
                </div>
                <div style={style.buttons}>
                    <button onClick={() => {this.playTheGame(true)}}>
                        Начать игру
                    </button>
                </div>
            </div>
        )
    }
}

export default App;