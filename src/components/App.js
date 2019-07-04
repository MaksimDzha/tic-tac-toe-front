import React, { Component } from 'react';
import Game from './Game';

// import './style.css'

const style = {
  start: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  gameName: {
    margin: 10,
    height: 60,
    width: 600,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffcc00',
    borderRadius: 10
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttons:{
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
  }
};


const endGame = ({playTheGame, table, winner}) => (
        <div style={style.game}>
            <div style={style.gameName}>Игра окончена</div>
            <div>table</div>
            <div style={style.buttons}>
                <button onClick={() => playTheGame(false)}>Начать новую игру</button>
            </div>
        </div>
)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        size: 3,
        isGameRun: false,
        isGameOver: false,
        users: ["Player 1", "Player 2"]
        };
        this.playTheGame = this.playTheGame.bind(this),
        this.gameOver = this.gameOver.bind(this)
    }

    changeName = (id, value) => (
    this.setState(this.state.users.splice(id, 1, value))
    )

    playTheGame(isGameRun){
        this.setState({isGameRun});
    }

    gameOver(isGameOver){
            this.setState({isGameOver});
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
            <EndGame playTheGame={this.playTheGame} table={this.props.newTable} winner={this.props.winner}/>
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