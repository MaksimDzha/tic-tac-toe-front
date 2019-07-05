import React, { Component } from 'react'
import style from './style.css'

class Cell extends Component {
    render() {
        return (
            <div style={style.icon} onClick = {this.props.onChange}>{this.props.value}</div>
        );
    }
}


export default Cell;