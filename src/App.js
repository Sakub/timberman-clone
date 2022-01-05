import { useState, useEffect, useRef } from 'react';
import './App.css';
import Score from './components/Score.js';
import Player from './components/Player.js';
import Tree from './components/Tree.js';
import GameResetModal from './components/GameResetModal';

function App() {
  const DIRECTIONS = {
    LEFT: 'player--left',
    RIGHT: 'player--right',
  };

  const [points, setPoints] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);

  const player = useRef(null);
  const tree = useRef(null);

  const gameOver = () => {
    player.current.classList.remove(DIRECTIONS.LEFT, DIRECTIONS.RIGHT);
    player.current.classList.add(DIRECTIONS.LEFT);

    setGameRunning(false);
  };

  const resetGame = () => {
    tree.current.resetTree();
    setPoints(0);
    setGameRunning(true);
  };

  function increaseScore() {
    setPoints(currPoints => currPoints + 1);
    tree.current.pushNewLog();
  }

  function movePlayer(direction) {
    if (gameRunning) {
      const nextBranch = tree.current.logType.props.type;
      if (
        (direction === DIRECTIONS.RIGHT && nextBranch === 'right_branch') ||
        (direction === DIRECTIONS.LEFT && nextBranch === 'left_branch')
      )
        return gameOver();
      player.current.classList.remove(DIRECTIONS.LEFT, DIRECTIONS.RIGHT);

      player.current.classList.add(direction);
      increaseScore();
    }
  }

  function useKey(key, cb) {
    const callbackRef = useRef(cb);

    useEffect(() => {
      callbackRef.current = cb;
    });

    useEffect(() => {
      function handle(event) {
        if (event.code === key) callbackRef.current(event);
      }
      document.addEventListener('keyup', handle);
      return () => document.removeEventListener('keydown', handle);
    }, [key]);
  }

  useKey('KeyA', () => movePlayer(DIRECTIONS.LEFT));
  useKey('KeyL', () => movePlayer(DIRECTIONS.RIGHT));

  useKey('Enter', () => {
    if (!gameRunning) resetGame();
  });

  return (
    <div className='App'>
      {gameRunning ? (
        <Score points={points} />
      ) : (
        <GameResetModal score={points} resetGame={resetGame} />
      )}
      <Tree ref={tree} />
      <Player playerRef={player} />
    </div>
  );
}

export default App;
