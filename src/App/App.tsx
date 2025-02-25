import { useState } from 'react';
import { GameProvider } from '../context/GameContext'
import './App.css'
import Game from '../components/Game/Game';
import GameIntro from '../components/GameIntro/GameIntro';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <GameProvider>
      <h2 className="title">Rock, Paper, Scissors, Lizard, Spock</h2>
      <main>
        {hasStarted ? (
          <Game onReset={() => setHasStarted(false)} />
        ) : (
          <GameIntro onRequestStart={() => setHasStarted(true)} />
        )}
      </main>
    </GameProvider>
  )
}

export default App
