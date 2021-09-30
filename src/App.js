import { useState } from 'react';
import './App.css';
import Score from './components/Score.js';

function App() {
	const [points, setPoints] = useState(0);
	return (
		<div className='App'>
			<Score points={points} />
		</div>
	);
}

export default App;
