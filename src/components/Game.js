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

const nextStep = () => (
    console.log("Ход!")
)

class Cell extends React.Component {
  render() {
    return (
      <div style={style.icon} onClick = {this.props.onChange}>{this.props.value}</div>
    );
  }
}

class BattleTable extends React.Component{

  state = {
    table: [
        ["1","2","3"],
        ["4","",""],
        ["","8","9"]
    ],

  };
    changeValue = (rowID, cellID) => {
        const {table} = this.state;
        const newTable = [...table];
        const newRow = [...table[rowID]];
        newRow[cellID] = "X";
        newTable[rowID] = newRow;
        this.setState({table: newTable});
    }
    render(){
     const {size, users} = this.props;
     const {table} = this.state;
    return(
    <div style={style.row}>
       {console.log(users[1])}
           <div style={style.playerName}>{users[0]}<br />играет за "X"</div>
           <div style={style.column}>
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

const Game = ({playTheGame, size, users}) => (
    <div style={style.game}>
        <div style={style.gameName}>Игра началась</div>
        <div><BattleTable size={size} users={users} /></div>
        <div style={style.buttons}>
            <button onClick={() => playTheGame(false)}>Закончить игру</button>
        </div>
    </div>
)



export default Game;