import { useEffect, useRef } from "react";
import Button from "./Button";

function ErrorCard({ handleClick }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  return (
    <div
      tabIndex={0}
      ref={divRef}
      className="wrapper wrapper--accent">
      <p className="p--large">Sorry, there was an error.</p>
      <p className="p--regular">
        Please come back later or click the button below to try
        restarting the game.
      </p>
      <Button handleClick={handleClick}>Restart game</Button>
    </div>
  );
}

export default ErrorCard;
