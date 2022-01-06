import { useState, useEffect, useRef } from 'react';

import Score from './components/Score.js';
import Player from './components/Player.js';
import Tree from './components/Tree.js';
import GameResetModal from './components/GameResetModal';
import TimeBar from './components/TimeBar.js';

import './App.css';

function App() {
  const DIRECTIONS = {
    LEFT: 'player--left',
    RIGHT: 'player--right',
  };

  const [points, setPoints] = useState(0);
  const [highscore, setHighscore] = useState(
    parseInt(localStorage.getItem('highscore')) || 0
  );

  const [timeLeft, setTimeLeft] = useState(100);
  const [gameRunning, setGameRunning] = useState(true);

  const player = useRef(null);
  const tree = useRef(null);

  useEffect(() => {
    setInterval(() => {
      if (gameRunning && timeLeft > 0) {
        setTimeLeft(timeLeft => {
          if (timeLeft - 10 === 0) return gameOver();
          return timeLeft - 10;
        });
      }
    }, 700);
  }, []);

  const gameOver = () => {
    if (points > highscore) {
      setHighscore(points);
      localStorage.setItem('highscore', points);
    }
    player.current.classList.remove(DIRECTIONS.LEFT, DIRECTIONS.RIGHT);
    player.current.classList.add(DIRECTIONS.LEFT);

    setGameRunning(false);
  };

  const resetGame = () => {
    if (tree.current) tree.current.resetTree();
    setPoints(0);
    setGameRunning(true);
    setTimeLeft(100);
  };

  const increaseScore = () => {
    setPoints(currPoints => currPoints + 1);
    tree.current.pushNewLog();
  };

  const movePlayer = direction => {
    if (!gameRunning) return;

    const nextBranch = tree.current.logType.props.type;

    if (
      (direction === DIRECTIONS.RIGHT && nextBranch === 'right_branch') ||
      (direction === DIRECTIONS.LEFT && nextBranch === 'left_branch')
    )
      return gameOver();
    if (timeLeft + 10 <= 100) setTimeLeft(timeLeft => timeLeft + 10);
    player.current.classList.remove(DIRECTIONS.LEFT, DIRECTIONS.RIGHT);

    player.current.classList.add(direction);
    increaseScore();
  };

  const useKey = (key, cb) => {
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
  };

  useKey('KeyA', () => movePlayer(DIRECTIONS.LEFT));
  useKey('KeyL', () => movePlayer(DIRECTIONS.RIGHT));

  useKey('Enter', () => {
    if (!gameRunning) resetGame();
  });

  return (
    <div className='App'>
      {gameRunning ? (
        <div>
          <TimeBar time={timeLeft} />
          <Score points={points} />
        </div>
      ) : (
        <GameResetModal
          score={points}
          highscore={highscore}
          resetGame={resetGame}
        />
      )}
      <Tree ref={tree} />
      <Player playerRef={player} />
    </div>
  );
}

export default App;
