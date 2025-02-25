import { createContext, ReactNode, useContext, useState } from "react";
import { GameChoice, GameState } from "../types/game";
import { DEFAULT_GAME_STATE } from "../constants";
import GameSessionStorage from "../utils/GameSessionStorage";

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

  const play = (p1Choice: GameChoice, p2Choice: GameChoice) => {
    
  };

  const reset = () => {
    
  };

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