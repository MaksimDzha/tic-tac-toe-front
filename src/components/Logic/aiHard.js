import React from 'react'
import createTable from './createTable'
import newCheck from './newCheck'

const scoreLine = (line, aiTable, sizeWin, move, player) => {
    const res1 = scoreHalfLine(aiTable, sizeWin, move, player, line[0], line[1]);
    var investigated1 = res1[0];
    var count1 = res1[1];
    var inrow1= res1[2];
    const res2 = scoreHalfLine(aiTable, sizeWin, move, player, -line[0], -line[1]);
    const investigated2 = res2[0];
    const count2 = res2[1];
    const inrow2= res2[2];
    count1 = count1 + count2 - 1;
    investigated1 = investigated1 + investigated2 - 1;
    inrow1 = inrow1 + inrow2 - 1;
    const result = [investigated1, count1, inrow1];
    return result;
}

const scoreHalfLine = (aiTable, sizeWin, move, player, rowInc, colInc) => {
    var r = move[0] + rowInc;
    var c = move[1] + colInc;
    var investigated = 1;
    var count = 1;
    var inrow = 1;
    var inRow = true;
    while ((investigated < sizeWin) && (r >= 0) && (r < aiTable.length)
            && (c >= 0) && (c < aiTable.length)
            && (aiTable[r][c] == player || aiTable[r][c] == 0)) {
        if (aiTable[r][c] == player) {
            count++;
            if (inRow)
                inrow++;
        } else {
            inRow = false;
        }
        investigated++;
        r += rowInc;
        c += colInc;
    }
    const res = [investigated, count, inrow];
    return res;
}


const G = (k) => {
    return f(k + 2);
}

const Q = (k) => {
    return f(k + 2);
}

const f = (k) => {
    if (k < 0) {
        return null;
    }
    if (k == 1)
        return k;
    return k * f(k - 1);
}

const heuristicScore = (aiTable, player, m, sizeWin) => {
    var res = 0;
    const lineValues = [[0,-1],[-1,0],[-1,-1],[-1,1]];
    var investigated;
    var count;
    var inrow;
    var scoreNext;
    lineValues.forEach((line) => {
        scoreNext = scoreLine(line, aiTable, sizeWin, m, player);
        investigated = scoreNext[0];
        count = scoreNext[1];
        inrow = scoreNext[2];
        if (investigated < sizeWin) {
            return;
        }
        if (inrow >= sizeWin) {
            res = 2147483647;
            return (player == "-1") ? res : -res;
        }
        res += G(inrow) + count;
    })
    lineValues.forEach((line) => {
        scoreNext = scoreLine(line, aiTable, sizeWin, m, -player);
        investigated = scoreNext[0];
        count = scoreNext[1];
        inrow = scoreNext[2];
        if (investigated < sizeWin) {
            return;
        }
        res += Q(inrow) + count;
    })
    return (player == "-1") ? res : -res;
}

const isGameOver = (aiTable, sizeWin) => {
    const line = newCheck(aiTable, sizeWin);
    const noTurn = isFullField(aiTable);
    return ((line != null) || noTurn);
}

const isFullField = (aiTable) => {
    for (let i = 0; i < aiTable.length; i++) {
        for (let j = 0; j < aiTable[0].length; j++) {
            if (aiTable[i][j] == 0)
                return false;
        }
    }
    return true;
}

const alphaBeta = (aiTable, move, player, alpha, beta, depth, maxDepth, sizeWin) => {
    const finish = isGameOver(aiTable, sizeWin);
    if (finish || depth == maxDepth) {
        var score = heuristicScore(aiTable, player, move, sizeWin);
        return score;
    }
    var score = -2147483681;
    const moves = getMoves(aiTable, player);
    moves.forEach( (m) => {
        aiTable[m[0]][m[1]] = player;
        var res = -alphaBeta(aiTable, move, -player, -beta, -score, depth + 1, maxDepth, sizeWin);
        aiTable[m[0]][m[1]] = 0;
        score = (res > score) ? res : score;
        if (score > beta) {
            return score;
        }
    })
    return score;
}

const score = (aiTable, player, m, sizeWin, maxDepth) => {
    return -alphaBeta(aiTable, m, player, -2147483681, 2147483647, 0, maxDepth, sizeWin);
}

const getMoves = (aiTable, player) => {
    var moves = [];
    for (let r = 0; r < aiTable.length; r++) {
        for (let c = 0; c < aiTable.length; c++) {
            if (aiTable[r][c] == 0) {
                moves.splice(moves.length, 1, [r, c]);
            }
        }
    }
    return moves;
}

const getBestMove = (aiTable, sizeWin, player, maxDepth) => {
    const moves = getMoves(aiTable, player);
    if (moves.length == 1)
        return moves[0];
    var maxScore = -2147483681;
    var bestMove = null;
    var thisScore;
    moves.forEach( (m) => {
        aiTable[m[0]][m[1]] = player;
        thisScore = score(aiTable, -player, m, sizeWin, maxDepth);
        aiTable[m[0]][m[1]] = 0;
        if (thisScore > maxScore) {
            bestMove = m;
            maxScore = thisScore;
        }
    })
    return bestMove;
}

const aiHard = (table, sizeWin, computerPlay, maxDepth) => {
    const player = computerPlay == "X" ? 1 : -1;
    var aiTable = createTable(table.length);
    table.forEach((row, x) => {
        row.forEach((item, y) => {
            if (item == "") aiTable[x][y] = 0
                else (item == "X") ? aiTable[x][y] = 1 : aiTable[x][y] = -1
        })
    });
    const m = getBestMove(aiTable, sizeWin, -1, maxDepth);
    player == 1 ? table[m[0]][m[1]] = "X" : table[m[0]][m[1]] = "O";
}

export default aiHard;