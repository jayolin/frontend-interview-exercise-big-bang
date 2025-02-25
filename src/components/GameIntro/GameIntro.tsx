import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import classes from "./GameIntro.module.css";
import { GameState } from "../../types/game";
import GameSessionStorage from "../../utils/GameSessionStorage";

interface Props {
  onRequestStart?: () => void;
}

function GameIntro(props: Props) {
  const { onRequestStart } = props;
  const { updateGameState, reset } = useGame();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [playerOneUsername, setPlayerOneUsername] = useState<string>("");
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startNewGame = () => {
    if (!playerOneUsername) {
      setErrorMessage("Player 1's username is required");
      return;
    }

    updateGameState({
      playerOneUsername,
      playerTwoUsername: "Computer",
    });
    onRequestStart?.();
  };

  const handleContinueGame = () => onRequestStart?.();
  const handleNewGame = () => {
    reset();
    setGameState(null);
  };

  useEffect(() => {
    const gs = GameSessionStorage.getState();
    setGameState(gs);
  }, []);

  return (
    <div className={classes.root}>
      {gameState ? (
        <>
          <div>
            <button onClick={handleContinueGame}>Continue Game</button>
          </div>
          <div>
            <button onClick={handleNewGame}>Start New Game</button>
          </div>
        </>
      ) : (
        <>
          {errorMessage && <p aria-live="polite">{errorMessage}</p>}
          <label htmlFor="playerUsername">Enter a Username:</label>
          <div>
            <input
              type="text"
              id="playerUsername"
              placeholder="Enter a Username"
              className={classes.input}
              value={playerOneUsername}
              onChange={(ev) => setPlayerOneUsername(ev.currentTarget.value)}
            />
          </div>
          <div>
            <button onClick={startNewGame}>Start New Game</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GameIntro;
