import React from 'react';
import {useState} from "react";
import Player from "./components/player/Player.jsx";
import GameBoard from "./components/game-board/GameBoard.jsx";
import Log  from "./components/log/Log.jsx";
import GameOverview from "./components/messages/GameOver.jsx";

import {WINNING_COMBINATIONS} from "./Utils.js";
import GameOver from "./components/messages/GameOver.jsx";


const initialGameBoar  = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);
  const gameBoard = [...initialGameBoar.map(internArray =>[...internArray])];

  const [playersName, setPlayersName] = useState({
      'X' : 'Player 1',
      '0' : 'Player 2'
  });
  let winner;


  for (const turn of gameTurns) {
        const {square,player} = turn;
        const{row, col} = square;

        gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

      if(firstSquareSymbol &&
          firstSquareSymbol === secondSquareSymbol &&
          firstSquareSymbol === thirdSquareSymbol) {
        winner = playersName[firstSquareSymbol];
      }
  }

  const hasDraw = gameTurns.length ===9 && !winner

  function handleSelectSquare(rowIndex,colIndex) {

      setActivePlayer((currentPlayer) => currentPlayer === 'X' ? '0' : 'X');
      setGameTurns((prevTurns) => {
          let currentPlayer = 'X'

          if ( prevTurns.length > 0 && prevTurns[0].player === 'X') {
              currentPlayer = '0'
          }
          const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},...prevTurns]

      return updatedTurns
      });
  }

  function handleRematch(){
      setGameTurns([])
    }

  function handlePlayerNameChange(symbol, name){
    setPlayersName((prevPlayer) => {
        return {...prevPlayer,[symbol]: name}
    });
  }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
                name="Player 1"
                symbol="X"
                isActive={activePlayer === 'X'}
                handlePlayerNameChange={handlePlayerNameChange}
            />
            <Player
                name="Player 2"
                symbol="O"
                isActive={activePlayer === 'O'}
                handlePlayerNameChange={handlePlayerNameChange}
            />
          </ol>
            {(winner || hasDraw) && <GameOver  handleRematch={handleRematch} winner={winner} />}
          <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
        </div>
           <Log  turns={gameTurns}/>
      </main>
  )
}

export default App
