import React, { Component } from 'react';


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
    playerName: {
      margin: 10,
      height: 60,
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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

class Cell extends Component {
  render() {
    return (
      <div style={style.icon} onClick = {this.props.onChange}>{this.props.value}</div>
    );
  }
}

class BattleTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
        count: 1,
        step: true,
        table: [
            ["","",""],
            ["","",""],
            ["","",""]
        ]}
        this.changeValue = this.changeValue.bind(this)
    };

    nextStep = () => {
        var tStep = this.state.step;
        this.setState({step: (tStep == true ? false : true)});
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);
    }

    changeValue = (rowID, cellID) => {
        const {table} = this.state;
        const newTable = [...table];
        const newRow = [...table[rowID]];
        if (newRow[cellID] == "") {
            newRow[cellID] = this.state.step == true ? "X" : "O";
            newTable[rowID] = newRow;
            if (this.check(newTable)){
                    const winner = this.state.step == true ? this.props.users[0] : this.props.users[1];
                    this.props.gameOver(true, winner, newTable);

                }
            this.setState({table: newTable});
            this.nextStep();
        }
    }

    check = (checkTable) => {
        if (this.checkDiag(checkTable, "X") ||
            this.checkDiag(checkTable, "O") ||
            this.checkLines(checkTable, "X") ||
            this.checkLines(checkTable, "O"))
            return true;
        return false;
    }

    checkDiag = (checkTable, elem) => {
        var toRight = true;
        var toLeft = true;
        var i = 0;
        checkTable.forEach((row, indexY) => {
            row.forEach((value, indexX) => {
                if (indexX == indexY) toRight &=(value == elem);
                if ((indexX == 2-i)&(indexY == i)) toLeft &= (value == elem);
            })
            i++;
        })
        if (toRight || toLeft) return true;
        return false;
    }

    checkLines = (checkTable, elem) => {
        var columns = true;
        var rows = true;
        var result = false;
        checkTable.forEach((row, indexY) => {
            row.forEach((value, indexX) => {
                        rows &= (value == elem);
                        columns &= (checkTable[indexX][indexY] == elem);
            })
            if (rows || columns) result = true;
            columns = true;
            rows = true;
        })
        return result;
    }


    render(){
        const {size, users} = this.props;
        const {table} = this.state;
        return(
        <div style={style.row}>
            <div style={style.playerName}>{users[0]}<br />играет за "X"</div>
            <div style={style.column}>
            <div style={style.playerName}>
                {
                    this.state.step === true ? ('Ход ' + users[0] + ' (X)') : ('Ход ' + users[1] + ' (O)')
                }
            </div>
            {table.map((row, indexX) => {
                return (
                    <div style={style.row} key={indexX}>{
                        row.map((cell, indexY) => {
                            return(
                                <Cell
                                    value={cell}
                                    key={indexY}
                                    onChange={() => this.changeValue(indexX, indexY)}
                                />
                            )
                        })
                    }</div>
                )
            })}
            </div>
            <div style={style.playerName}>{users[1]}<br />играет за "O"</div>
        </div>
       )
    }
}

const Game = ({playTheGame, gameOver, size, users}) => (


    <div style={style.game}>
        <div style={style.gameName}>Игра началась</div>
        <div><BattleTable gameOver={gameOver} size={size} users={users} /></div>
        <div style={style.buttons}>
            <button onClick={() => playTheGame(false)}>Закончить игру</button>
        </div>
    </div>
)



export default Game;