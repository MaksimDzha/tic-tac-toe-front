import React from 'react'
import style from './style.css'
import BattleTable from './BattleTable'

const Game = ({playTheGame, gameOver, size, sizeWin, users, aiOn}) => (
    <div style={style.game}>
        <div style={style.gameBegin}>Игра началась!</div>
        <div><BattleTable gameOver={gameOver} size={size} sizeWin={sizeWin} users={users} aiOn={aiOn}/></div>
        <div style={style.buttons}>
            <button onClick={() => playTheGame(false)}>Закончить игру</button>
        </div>
    </div>
)

export default Game;