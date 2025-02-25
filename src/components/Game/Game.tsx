import { useGame } from "../../context/GameContext";
import { GameChoice } from "../../types/game";
import Player from "../Player/Player";
import Scoreboard from "../Scoreboard/Scoreboard";
import classes from "./Game.module.css";

interface Props {
  onReset?: () => void;
}

function Game(props: Props) {
  const { onReset } = props;
  const { play, reset, statusMessage, loading } = useGame();

  const generateRandomChoice = () => {
    const values = Object.values(GameChoice);
    return values[Math.floor(Math.random() * values.length)] as GameChoice;
  };

  const handlePlayerChoice = (choice: GameChoice) => {
    const computerChoice = generateRandomChoice();
    play(choice, computerChoice);
  };

  return (
    <div className={classes.root}>
      <Scoreboard />
      <p aria-live="polite">{statusMessage}</p>
      <div>
        <Player
          playerId={1}
          onChoice={handlePlayerChoice}
        />
      </div>
      <div>
        <button
          className={classes.resetButton}
          disabled={loading}
          onClick={() => {
            reset();
            onReset?.();
          }}
          aria-label="Reset the game"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Game;
