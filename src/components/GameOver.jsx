import Button from "./Button";

function GameOver({ handleClick }) {
  return (
    <div>
      <p>You've matched all the cards!</p>
      <Button handleClick={handleClick}>
        Play again
      </Button>
    </div>
  )
}

export default GameOver;