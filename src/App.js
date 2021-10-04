import { useState, useEffect, useRef } from 'react';
import './App.css';
import Score from './components/Score.js';
import Player from './components/Player.js';
import Tree from './components/Tree.js';

function App() {
	const [points, setPoints] = useState(0);

	const player = useRef(null);
	const tree = useRef(null);

	const DIRECTIONS = {
		LEFT: 'player--left',
		RIGHT: 'player--right',
	};

	function increaseScore() {
		setPoints(currPoints => currPoints + 1);
		tree.current.pushNewLog();
	}

	function movePlayer(direction) {
		player.current.classList.remove(DIRECTIONS.LEFT, DIRECTIONS.RIGHT);

		player.current.classList.add(direction);
		increaseScore();
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

	return (
		<div className='App'>
			<Score points={points} />
			<Tree ref={tree} />
			<Player playerRef={player} />
		</div>
	);
}

export default App;
