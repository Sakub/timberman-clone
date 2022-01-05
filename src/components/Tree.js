import Log from './Log.js';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Tree = forwardRef((props, ref) => {
  const logTypes = {
    LEFT_BRANCH: 'left_branch',
    RIGHT_BRANCH: 'right_branch',
    NO_BRANCH: 'no_branch',
  };

  const startTree = [
    <Log type={logTypes.RIGHT_BRANCH} />,
    <Log type={logTypes.NO_BRANCH} />,
    <Log type={logTypes.LEFT_BRANCH} />,
    <Log type={logTypes.NO_BRANCH} />,
  ];

  const [logs, setLogs] = useState(startTree);
  function selectRandomLogType() {
    let keys = Object.keys(logTypes);
    return logTypes[keys[(keys.length * Math.random()) << 0]];
  }

  useImperativeHandle(ref, () => ({
    logType: logs.at(logs.length - 2),
    pushNewLog() {
      setLogs([<Log type={selectRandomLogType()} />, ...logs.slice(0, -1)]);
    },
    resetTree() {
      setLogs(startTree);
    },
  }));

  return <div className='tree'>{logs.map(log => log)}</div>;
});

export default Tree;
