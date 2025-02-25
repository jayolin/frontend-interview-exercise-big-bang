import { GameChoice, GameState } from "./types/game";

export const GAME_RULES = {
  [GameChoice.SCISSORS]: [GameChoice.PAPER, GameChoice.LIZARD],
  [GameChoice.PAPER]: [GameChoice.ROCK, GameChoice.SPOCK],
  [GameChoice.ROCK]: [GameChoice.SCISSORS, GameChoice.LIZARD],
  [GameChoice.LIZARD]: [GameChoice.PAPER, GameChoice.SPOCK],
  [GameChoice.SPOCK]: [GameChoice.SCISSORS, GameChoice.ROCK],
};

export const GAME_STORAGE_STATE_KEY = "game_state_storage_key";
export const DEFAULT_GAME_STATE: GameState = {
  round: 1,
  playerOneUsername: "",
  playerOneScore: 0,
  playerTwoUsername: "",
  playerTwoScore: 0,
};