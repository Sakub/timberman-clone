const GameResetModal = ({ score, resetGame }) => {
  return (
    <form className='gameResetModal'>
      <p className='modal__header'>GAME OVER!</p>
      <p className='modal__score'>Your score: {score}</p>

      <button
        type='submit'
        className='modal__button'
        onClick={() => resetGame()}
      >
        PLAY AGAIN
      </button>
    </form>
  );
};

export default GameResetModal;
