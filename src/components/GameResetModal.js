const GameResetModal = ({ score, highscore, resetGame }) => {
  return (
    <div className='gameResetModal'>
      <p className='modal__header'>GAME OVER!</p>
      <p className='modal__score'>Your highscore: {highscore}</p>
      <p className='modal__score'>Your score: {score}</p>

      <button className='modal__button' onClick={() => resetGame()}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameResetModal;
