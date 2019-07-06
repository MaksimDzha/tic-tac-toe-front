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
        computer: false,
        users: ["Player 1", "Player 2"]
        };
        this.playTheGame = this.playTheGame.bind(this),
        this.gameOver = this.gameOver.bind(this)
    }

    aiOn = (OnOff) => (
        this.setState({computer: OnOff})
    )

    changeInputName = () => {
        const checkbox = document.getElementById("checkboxAI");
        var aiOn = false;
        checkbox.addEventListener('change', event => {
            if(event.target.checked){
                this.aiOn(true)
            } else {
                this.aiOn(false)
            }
        });
    }

    inputName = () => (
        <div style={style.rowStart}>
            <div>{"Введите имя игрока 1 (X): "}</div>
            <input
                style={style.inputNameStyle}
                value={this.state.users[0]}
                placeholder={"Введите имя первого игрока"}
                onChange={(e) => this.onChangeName(0, e.target.value)}
            />
        </div>
    )

    inputNames = () => (
        <div>
            <div style={style.rowStart}>
                <div>{"Введите имя игрока 1 (X): "}</div>
                <input
                    style={style.inputNameStyle}
                    value={this.state.users[0]}
                    placeholder={"Введите имя первого игрока"}
                    onChange={(e) => this.onChangeName(0, e.target.value)}
                />
            </div>
            <div style={style.rowStart}>
                <div>{"Введите имя игрока 2 (O): "}</div>
                <input
                    style={style.inputNameStyle}
                    value={this.state.users[1]}
                    placeholder={"Введите имя второго игрока"}
                    onChange={(e) => this.onChangeName(1, e.target.value)}
                />
            </div>
        </div>
    )

    onChangeName = (id, value) => {
        this.setState(this.state.users.splice(id, 1, value))
    }

    onChangeSize = (value) => {
            const regex = /^[0-9]*$/;
            if (!regex.test(value)) value = 3;
            this.setState({size: value})
        }

    onBlurSize = (value) => {
        Number(value) < 3 ? value = 3 : (Number(value) > 10 ? value = 10 : true);
        this.setState({size: Number(value)})
    }

    onChangeSizeWin = (value) => {
        const regex = /^[0-9]+([0-9])*$/;
        if (!regex.test(value)) value = 3;
        this.setState({sizeWin: value})
    }

    onBlurSizeWin = (value) => {
        const size = this.state.size;
        Number(value) < 3 ? value = 3 : (Number(value) > size ? value = size : true);
        this.setState({sizeWin: Number(value)})
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
        if (!isIt) this.setState({computer: false})
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
                users={this.state.users}
                aiOn={this.state.computer}/>
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
                <div>{this.state.computer ? this.inputName() : this.inputNames()}</div>
                <div style={style.rowStart}>
                    <div>{"Хотите с компьютером?"}</div>
                    <input type={'checkbox'} id="checkboxAI" onClick={() => this.changeInputName()}/>
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