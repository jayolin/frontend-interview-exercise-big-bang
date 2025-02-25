import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { GameChoice, GameState } from "../types/game";
import { DEFAULT_GAME_STATE, DEFAULT_STATUS_MESSAGE, GAME_RULES } from "../constants";
import GameSessionStorage from "../utils/GameSessionStorage";
import { toSentenceCase } from "../utils/common";

type UpdateGameState = (
  updatedState:
    | ((oldValue: GameState) => Partial<GameState>)
    | Partial<GameState>
) => void;

interface GameContext {
  gameState: GameState;
  playerOneChoice: GameChoice | null;
  playerTwoChoice: GameChoice | null;
  winnerId: number | null;
  play: (p1: GameChoice, p2: GameChoice) => void;
  updateGameState: UpdateGameState;
  reset: () => void;
  statusMessage: string;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

const GameContext = createContext<GameContext>({
  gameState: DEFAULT_GAME_STATE,
  playerOneChoice: null,
  playerTwoChoice: null,
  winnerId: null,
  play: () => {},
  reset: () => {},
  updateGameState: () => {},
  statusMessage: "",
  loading: false,
});

function GameProvider(props: Props) {
  const { children } = props;
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [playerOneChoice, setPlayerOneChoice] = useState<GameChoice | null>(
    null
  );
  const [playerTwoChoice, setPlayerTwoChoice] = useState<GameChoice | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState(DEFAULT_STATUS_MESSAGE);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<number>();

  const updateGameState: UpdateGameState = (updatedState) => {
    setGameState((oldValue) => {
      const update =
        typeof updatedState === "function"
          ? updatedState(oldValue)
          : updatedState;
      const newValue: GameState = { ...oldValue, ...update };
      GameSessionStorage.setState(newValue);
      return newValue;
    });
  };

  const determineWinner = (p1Choice: GameChoice, p2Choice: GameChoice) => {
    setPlayerOneChoice(p1Choice);
    setPlayerTwoChoice(p2Choice);

    if (p1Choice === p2Choice) {
      setWinnerId(-1);
      updateGameState((gs) => ({
        round: gs.round + 1,
        playerOneScore: gs.playerOneScore + 1,
        playerTwoScore: gs.playerTwoScore + 1,
      }));
      setStatusMessage("It's a tie!");
      return;
    }

    if (GAME_RULES[p1Choice].includes(p2Choice)) {
      setWinnerId(1);
      updateGameState((gs) => ({
        round: gs.round + 1,
        playerOneScore: gs.playerOneScore + 1,
      }));
      setStatusMessage(`${gameState.playerOneUsername} wins!`);
    } else {
      setWinnerId(2);
      updateGameState((gs) => ({
        round: gs.round + 1,
        playerTwoScore: gs.playerTwoScore + 1,
      }));
      setStatusMessage(`${gameState.playerTwoUsername} wins!`);
    }
  };

  const play = (p1Choice: GameChoice, p2Choice: GameChoice) => {
    let intervals = 0;
    setLoading(true);
    setStatusMessage("Counting...");
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setWinnerId(null);

    intervalRef.current = window.setInterval(() => {
      if (intervals < 5) {
        intervals++;
        const text = Object.values(GameChoice)[intervals - 1];
        setStatusMessage(`${toSentenceCase(text)}...`);
      } else {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        determineWinner(p1Choice, p2Choice);
        setLoading(false);
      }
    }, 500);
  };

  const reset = () => {
    GameSessionStorage.removeState();
    setGameState(DEFAULT_GAME_STATE);
    setWinnerId(null);
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setLoading(false);
    setStatusMessage(DEFAULT_STATUS_MESSAGE);
  };

  useEffect(() => {
    try {
      const savedGameState = GameSessionStorage.getState();
      if (savedGameState) {
        setGameState(savedGameState);
      }
    } catch (err) {
      console.log(`Could not get players storage, ${err}`);
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        playerOneChoice,
        playerTwoChoice,
        winnerId,
        play,
        reset,
        updateGameState,
        statusMessage,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;

function useGame() {
  return useContext(GameContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { GameProvider, useGame };