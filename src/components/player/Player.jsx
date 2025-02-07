import React from "react";
import {useState} from "react";


export default function Player({name, symbol, isActive, handlePlayerNameChange}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    let player =  <span className="player-name">{playerName}</span>

    if(isEditing){
        player = <input type="text" defaultValue={name} onChange={handleChange}  required/>
    }

    function handleClick(){
        setIsEditing((editing) =>!editing);
        handlePlayerNameChange(symbol, playerName);

    }

    function handleChange(e){
        setPlayerName(e.target.value);
    }
    return (
        <li className={ isActive ? "active" :'' }>
            <span className="player">
                {player}
                  <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>
                {isEditing ? 'Save': 'Edit'}
            </button>
        </li>
    )
}