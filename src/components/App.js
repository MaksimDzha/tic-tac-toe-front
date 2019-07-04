import React, { Component } from 'react'
import Game from './Game'
import style from './style.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        size: 3,
        isGameRun: false,
        isGameOver: false,
        winner: "Ничья",
        resultTable: "",
        users: ["Player 1", "Player 2"]
        };
        this.playTheGame = this.playTheGame.bind(this),
        this.gameOver = this.gameOver.bind(this)
    }

    changeName = (id, value) => (
        this.setState(this.state.users.splice(  id, 1, value))
    )

    playTheGame(isIt){
        this.setState({isGameOver: false});
        this.setState({isGameRun: isIt});
    }

    gameOver(isIt, newWinner,result){
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
                users={this.state.users}/>
            )
        }

        if (this.state.isGameOver) {
            return (
                <div style={style.start}>
                    <div style={style.gameName}>Игра окончена</div>
                    <div style={style.column}>
                        <div>{this.state.winner}</div>
                        <div>{this.state.resultTable}</div>
                    </div>
                    <div style={style.buttons}>
                        <button onClick={() => this.playTheGame(false)}>Начать новую игру</button>
                    </div>
                </div>
            )
        }

        return (
            <div style={style.start}>
                <div style={style.gameName}>Добро пожаловать в игру крестики-нолики</div>
                <div style={style.row}>
                    <div>Введите имя игрока 1:</div>
                    <input onChange={(e) => this.changeName(0, e.target.value)} />
                </div>
                <div style={style.row}>
                    <div>Введите имя игрока 2:</div>
                    <input onChange={(e) => this.changeName(1, e.target.value)} />
                </div>
                <div style={style.buttons}>
                    <button onClick={() => this.playTheGame(true)}>Начать игру</button>
                </div>
            </div>
        )
    }
}

export default App;