import { GameProvider } from '../context/GameContext'
import './App.css'

function App() {
  return (
    <GameProvider>
      <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
    </GameProvider>
  )
}

export default App
