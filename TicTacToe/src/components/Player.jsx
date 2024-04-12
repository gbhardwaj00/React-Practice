import { useState } from "react";

export default function Player({ initialName, symbol }) {
  //not editing player name field initially, set to false
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // good practice to use instead of setIsEditing(!isEditing);
    // reason -> React schedules the above expression and can give unexpected results
    setIsEditing((editing) => !editing);
  }

  function handleNameChanges(event) {
    console.log(event.target.value);
    setPlayerName(event.target.value);
  }

  let buttonText;
  let playerNameElement;

  if (isEditing) {
    playerNameElement = <input type="text" value={playerName} onChange={handleNameChanges} required />;
    buttonText = "Save";
  } else {
    playerNameElement = <span className="player-name">{playerName}</span>;
    buttonText = "Edit";
  }

  return (
    <>
      <li>
        <span className="player">
          {playerNameElement}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{buttonText}</button>
      </li>
    </>
  );
}
