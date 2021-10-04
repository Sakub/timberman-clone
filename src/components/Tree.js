import Log from './Log.js';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Tree = forwardRef((props, ref) => {
	const logTypes = {
		LEFT_BRANCH: 'left_branch',
		RIGHT_BRANCH: 'right_branch',
		NO_BRANCH: 'no_branch',
	};
	const [logs, setLogs] = useState([
		<Log />,
		<Log type={logTypes.RIGHT_BRANCH} />,
		<Log />,
		<Log />,
	]);
	function selectRandomLogType() {
		let keys = Object.keys(logTypes);
		return logTypes[keys[(keys.length * Math.random()) << 0]];
	}
	useImperativeHandle(ref, () => ({
		pushNewLog() {
			setLogs([<Log type={selectRandomLogType()} />, ...logs.slice(0, -1)]);
		},
	}));

	return <div className='tree'>{logs.map(log => log)}</div>;
});

export default Tree;
