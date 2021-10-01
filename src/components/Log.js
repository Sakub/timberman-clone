const Log = () => {
	const logTypes = {
		LEFT_BRANCH: 'left_branch',
		RIGHT_BRANCH: 'right_branch',
		NO_BRANCH: 'no_branch',
	};

	function generateLog() {
		let keys = Object.keys(logTypes);
		return logTypes[keys[(keys.length * Math.random()) << 0]];
	}
	return <div className={`log log--${generateLog()}`}></div>;
};

export default Log;
