import React from 'react'
import style from './style.css'
import BattleTable from './BattleTable'

const Game = ({playTheGame, gameOver, size, sizeWin, aiFirst}) => (
    <div style={style.game}>
        <div style={style.gameBegin}>Игра началась!</div>
        <div><BattleTable
            gameOver={gameOver}
            size={size}
            sizeWin={sizeWin}
            aiFirst={aiFirst}
            />
        </div>
        <div style={style.buttons}>
            <div style={style.button}><button onClick={() => playTheGame(true)}>Начать заново</button></div>
            <div style={style.button}><button onClick={() => playTheGame(false)}>Закончить игру</button></div>
        </div>
    </div>
)

export default Game;