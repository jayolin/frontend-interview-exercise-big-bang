import classes from "./Scoreboard.module.css";
import { useGame } from "../../context/GameContext";
import { useCallback } from "react";
import { GameChoice } from "../../types/game";

interface Props {
  playerId: number;
  playerChoice: GameChoice | null;
  playerUsername: string;
}

function PlayerSelection(props: Props) {
  const { playerId, playerChoice, playerUsername } = props;
  const { winnerId } = useGame();

  const getSelectionCardClasses = useCallback(
    (playerId: number, winnerId: number | null) => {
      const classesArr = [classes.selectionCard];
      if (!winnerId) {
        classesArr.push(classes.noSelection);
      } else if (winnerId === -1) {
        classesArr.push(classes.draw);
      } else if (winnerId === playerId) {
        classesArr.push(classes.winner);
      } else {
        classesArr.push(classes.loser);
      }

      return classesArr.join(" ");
    },
    []
  );

  return (
    <div>
      <h4 className={classes.playerName}>{playerUsername}</h4>
      <div className={getSelectionCardClasses(playerId, winnerId)}>
        {playerChoice && (
          <img height={100} src={`/icons/${playerChoice}.svg`} alt={`Player ${playerId} chose ${playerChoice}`} />
        )}
      </div>
    </div>
  );
}

export default PlayerSelection;
