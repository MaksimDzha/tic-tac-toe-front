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
    width: 600,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffcc00',
    borderRadius: 10
  },
   buttons:{
     margin: 5,
     display: 'flex',
     justifyContent: 'center',
   }
};

const Game = ({users, playTheGame}) => (
    <div style={style.game}>
        <div style={style.gameName}>Игра началась</div>
        <div style={style.buttons}>
            <button onClick={() => playTheGame(false)}>Закончить игру</button>
        </div>
    </div>
)



export default Game;