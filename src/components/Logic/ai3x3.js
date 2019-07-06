import React from 'react'

// возвращает список индексов пустых клеток доски
const emptyIndices = (board) => {
    return  board.filter(s => s != "O" && s != "X");
}

// победные комбинации с учётом индексов
const winning = (board, player) => {
    if(
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
      } else {
        return false;
      }
}

// основная минимакс-функция
const minimax = (newBoard, player) => {
    // человек
    var huPlayer = "X";

    // ИИ
    var aiPlayer = "O";

    //доступные клетки
    var availSpots = emptyIndices(newBoard);

    // проверка на терминальное состояние (победа / поражение / ничья)
    if (winning(newBoard, huPlayer)){
        return {score:-10};
    }
    else if (winning(newBoard, aiPlayer)){
        return {score:10};
        }
        else if (availSpots.length === 0){
            return {score:0};
    }

    // массив для хранения всех объектов
    var moves = [];

    // цикл по доступным клеткам
    for (var i = 0; i < availSpots.length; i++){
        var move = {};
  	    move.index = newBoard[availSpots[i]];

        // совершить ход за текущего игрока
        newBoard[availSpots[i]] = player;

        //получить очки, заработанные после вызова минимакса от противника текущего игрока
        if (player == aiPlayer){
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        // очистить клетку
        newBoard[availSpots[i]] = move.index;

        // положить объект в массив
        moves.push(move);
    }

    // если это ход ИИ, пройти циклом по ходам и выбрать ход с наибольшим количеством очков
    var bestMove;
    if(player === aiPlayer){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {

        // иначе пройти циклом по ходам и выбрать ход с наименьшим количеством очков
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    // вернуть выбранный ход (объект) из массива ходов
    return moves[bestMove];
}



const ai3x3 = (table) => {
    const board = [].concat(...table);
    var origBoard = [];
    for (let i = 0; i < 8; i++)
        board[i] == "" ? origBoard[i] = i : origBoard[i] = board[i];
    var bestSpot = minimax(origBoard, "O");
    console.log(bestSpot.index);
    if (bestSpot.index < 3) table[0][bestSpot.index] = "O"
        else if (bestSpot.index < 6) table[1][bestSpot.index-2] = "O"
            else table[2][bestSpot.index-5] = "O"
}

export default ai3x3;