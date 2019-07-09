import React, { Component } from 'react'
import Game from './Game'
import ResultTable from "./Result/ResultTable"
import style from './style.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        size: 3,
        sizeWin: 3,
        isGameRun: false,
        isGameOver: false,
        winner: "",
        resultTable: "",
        computerFirst: false
        };
        this.playTheGame = this.playTheGame.bind(this),
        this.gameOver = this.gameOver.bind(this)
    }

    aiFirst = (OnOff) => (
        this.setState({computerFirst: OnOff}, function(){console.log(this.state.computerFirst)})

    )

    changeFirstTurn = () => {
        const checkbox = document.getElementById("checkboxAIFirst");
        checkbox.addEventListener('change', event => {
            if(event.target.checked){
                this.aiFirst(true)
            } else {
                this.aiFirst(false)
            }
        });
    }

    onChangeSize = (value) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(value)) value = 3;
        this.setState({size: value})
    }

    onBlurSize = (value) => {
        Number(value) < 3 ? value = 3 : (Number(value) > 10 ? value = 10 : true);
        if (this.state.sizeWin > value) this.state.sizeWin = value;
        this.setState({size: Number(value)})
    }

    onChangeSizeWin = (value) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(value)) value = 3;

        this.setState({sizeWin: value})
    }

    onBlurSizeWin = (value) => {
        const size = this.state.size;
        Number(value) < 3 ? value = 3 : (Number(value) > size ? value = size : true);
        this.setState({sizeWin: Number(value)})
    }

    playTheGame = (isIt) => {
        this.setState({isGameOver: false});
        this.setState({isGameRun: isIt});
        if (!isIt) {
            this.setState({computerFirst: false})
        }
    }

    gameOver(isIt, newWinner, table){
        this.setState({isGameRun: false});
        this.setState({winner: newWinner});
        this.setState({resultTable: table});
        this.setState({isGameOver: isIt});
    }

    render() {
        if (this.state.isGameRun) {
            return (
                <Game playTheGame={this.playTheGame}
                gameOver={this.gameOver}
                size={this.state.size}
                sizeWin={this.state.sizeWin}
                aiFirst={this.state.computerFirst}
                />
            )
        }

        if (this.state.isGameOver) {
            return (
                <div style={style.start}>
                    <div style={style.gameEnd}>Игра окончена</div>
                    {ResultTable(this.state.resultTable, this.state.winner)}
                    <div style={style.buttons}>
                            <div style={style.button}><button onClick={() => this.playTheGame(true)}>Повторить партию</button></div>
                            <div style={style.button}><button onClick={() => this.playTheGame(false)}>Начать новую игру</button></div>
                    </div>
                </div>
            )
        }

        return (
            <div style={style.start}>
                <div style={style.gameName}>Добро пожаловать в игру крестики-нолики</div>
                <div style={style.rowStart}>
                    <div>{"Компьютер ходит первый"}</div>
                    <input type={'checkbox'} id="checkboxAIFirst" onClick={() => this.changeFirstTurn()}/>
                </div>
                <div style={style.rowStart}>
                    <div style={style.customize}>{"Размер поля (3 - 10): "}</div>
                    <input
                        style={style.inputNumberStyle}
                        value={this.state.size}
                        onChange={(e) => this.onChangeSize(e.target.value)}
                        onBlur={(e) => this.onBlurSize(e.target.value)}
                    />
                    <div style={style.customize}>{"Победа при количестве: "}</div>
                    <input
                        style={style.inputNumberStyle}
                        value={this.state.sizeWin}
                        onChange={(e) => this.onChangeSizeWin(e.target.value)}
                        onBlur={(e) => this.onBlurSizeWin(e.target.value)}
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