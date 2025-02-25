import { useGame } from "../../context/GameContext";
import { GameChoice } from "../../types/game";
import classes from "./Player.module.css";

interface Props {
  playerId: number;
  onChoice?: (choice: GameChoice) => void;
}

function Player(props: Props) {
  const { loading } = useGame();
  const { playerId, onChoice } = props;

  const handleChoice = (choice: GameChoice) => {
    onChoice?.(choice);
  };

  return (
    <div className={classes.root}>
      {Object.values(GameChoice).map((choice) => (
        <button
          key={`${playerId}-choice-${choice}`}
          onClick={() => handleChoice(choice)}
          disabled={loading}
          aria-disabled={loading}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}

export default Player;
