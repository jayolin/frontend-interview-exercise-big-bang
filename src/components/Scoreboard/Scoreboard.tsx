import classes from "./Scoreboard.module.css";
import { useGame } from "../../context/GameContext";
import PlayerSelection from "./PlayerSelection";

function Scoreboard() {
  const { gameState, playerOneChoice, playerTwoChoice } = useGame();
  const {
    playerOneUsername,
    playerTwoUsername,
    playerOneScore,
    playerTwoScore,
    round,
  } = gameState;

  return (
    <div className={classes.root}>
      <PlayerSelection
        playerChoice={playerOneChoice}
        playerId={1}
        playerUsername={playerOneUsername}
      />

      <div>
        <h2>
          {playerOneScore} : {playerTwoScore}
        </h2>
        <small>Round {round}</small>
      </div>

      <PlayerSelection
        playerChoice={playerTwoChoice}
        playerId={2}
        playerUsername={playerTwoUsername}
      />
    </div>
  );
}

export default Scoreboard;
