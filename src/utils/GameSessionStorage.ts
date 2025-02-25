import { GAME_STORAGE_STATE_KEY } from "../constants";
import { GameState } from "../types/game";

class GameSessionStorage {
  private static storage = window.sessionStorage;

  static get(key: string) {
    return this.storage.getItem(key);
  }

  static set(key: string, item: string) {
    try {
      window.sessionStorage.setItem(key, item);
    } catch (err) {
      console.warn(`Failed to store item ${key}`, err);
    }
  }

  static remove(key: string) {
    this.storage.removeItem(key);
  }

  static getState(): GameState | null {
    try {
      const gameStateJSON = this.get(GAME_STORAGE_STATE_KEY);
      if (!gameStateJSON) {
        throw new Error("State not found");
      }

      return JSON.parse(gameStateJSON) as GameState;
    } catch (err) {
      console.warn(`Error fetching game state, ${err}`);
      return null;
    }
  }

  static setState(state: GameState) {
    return this.set(GAME_STORAGE_STATE_KEY, JSON.stringify(state));
  }

  static removeState() {
    this.remove(GAME_STORAGE_STATE_KEY);
  }
}

export default GameSessionStorage;
