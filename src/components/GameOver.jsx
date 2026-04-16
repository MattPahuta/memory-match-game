import Button from "./Button";
import { useRef, useEffect } from "react";

function GameOver({ handleClick }) {
  const gameOverRef = useRef(null);

  useEffect(() => {
    gameOverRef.current.focus();
  }, []);

  return (
    <div ref={gameOverRef} tabIndex={-1}>
      <p>You've matched all the cards!</p>
      <Button handleClick={handleClick}>Play again</Button>
    </div>
  );
}

export default GameOver;
