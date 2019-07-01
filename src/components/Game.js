import React from 'react';

const style = {
  game: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  gameName: {
    margin: 10,
    height: 60,
    width: 300,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffcc00',
    borderRadius: 10
  },
    icon: {
      marginRight: 10,
      height: 80,
      width: 80,
      fontSize: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'Gold',
      borderRadius: 20
    },
    column: {
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    row: {
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row'
    },
   buttons:{
     margin: 10,
     display: 'flex',
     justifyContent: 'center',
   }
};

const nextStep = () => (
    console.log("Ход!")
)



class Cell extends React.Component {
  state = {
    value: "",
  };

  render() {
    return (
      <div style={style.icon} onClick={() => this.setState({value: "X"})}>{this.state.value}</div>
    );
  }
}

const BattleTable = (size) => (
  <div style={style.column}>
    <div style={style.row}>
        <Cell /><Cell /><Cell />
    </div>
    <div style={style.row}>
        <Cell /><Cell /><Cell />
    </div>
    <div style={style.row}>
        <Cell /><Cell /><Cell />
    </div>
  </div>
)

const Game = ({users, playTheGame, size}) => (
    <div style={style.game}>
        <div style={style.gameName}>Игра началась</div>
        <div><BattleTable size={size} /></div>
        <div style={style.buttons}>
            <button onClick={() => playTheGame(false)}>Закончить игру</button>
        </div>
    </div>
)



export default Game;