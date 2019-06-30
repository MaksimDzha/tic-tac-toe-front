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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isGameRun: false,
        users: null
        };
        this.playTheGame = this.playTheGame.bind(this)
    }

    playTheGame(isGameRun){
        this.setState({isGameRun});
    }

  render() {
      if (this.state.isGameRun) {
        return (
          <Game users={this.users} playTheGame={this.playTheGame} />
        )
      }

      return (
      <div style={style.start}>
          <div style={style.gameName}>Добро пожаловать в игру крестики-нолики</div>
          <div style={style.row}>
              <div>Введите имя игрока 1:</div>
              <input />
          </div>
          <div style={style.row}>
              <div>Введите имя игрока 2:</div>
              <input />
          </div>
          <div style={style.buttons}>
              <button onClick={() => this.setState({isGameRun: true})}>Начать игру</button>
          </div>
      </div>
      )
  }
}

export default App;