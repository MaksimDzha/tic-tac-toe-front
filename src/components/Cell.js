import React, { Component } from 'react'
import style from './style.css'

const Cell = (props) => (
        <div style={style.icon} onClick = {props.playerChange}>{props.value}</div>
)


export default Cell;