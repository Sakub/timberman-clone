import Log from './Log.js';
import { useState } from 'react';

const Tree = () => {
	const [logs, setLogs] = useState([generateLogs(4)]);

	function generateLogs(n) {
		let logs = [];
		for (let i = 0; i < n; i++) logs.push(<Log />);

		return logs;
	}

	return <div className='tree'>{logs.map(log => log)}</div>;
};

export default Tree;
