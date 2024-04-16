import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = "X";
  currentPlayer =
    gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveCurrentPlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    // destructuring
    const { position, player } = turn;
    const { row, col } = position;
    gameBoard[row][col] = player;
  }

  let winner;

  for (let combination of WINNING_COMBINATIONS) {
    let firstPositionSymbol =
      gameBoard[combination[0].row][combination[0].column];
    let secondPositionSymbol =
      gameBoard[combination[1].row][combination[1].column];
    let thirdPositionSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstPositionSymbol &&
      firstPositionSymbol === secondPositionSymbol &&
      secondPositionSymbol === thirdPositionSymbol
    ) {
      winner = firstPositionSymbol;
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

  function handlePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      //deriving active player from previous state
      let activePlayer = deriveCurrentPlayer(prevTurns);

      // adding latest turn to the start of the array
      let updatedTurns = [
        { position: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={currentPlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={currentPlayer === "O"}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard board={gameBoard} onTurn={handlePlayerChange} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
