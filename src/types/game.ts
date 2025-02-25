export enum GameChoice {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
  LIZARD = "lizard",
  SPOCK = "spock",
}

export interface GameState {
  round: number;
  playerOneUsername: string;
  playerOneScore: number;
  playerTwoUsername: string;
  playerTwoScore: number;
}