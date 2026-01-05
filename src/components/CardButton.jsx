import { decodeEntity } from "html-entities";

function CardButton({
  index,
  emoji,
  selectedCardEntry,
  matchedCardEntry,
  handleClick,
}) {
  const buttonContent =
    selectedCardEntry || matchedCardEntry
      ? decodeEntity(emoji.htmlCode[0])
      : "?";
  const btnAria = matchedCardEntry
    ? `${decodeEntity(emoji.name)}. Matched.`
    : selectedCardEntry
      ? `${decodeEntity(emoji.name)}. Not matched yet.`
      : "Card upside down.";

  // handle styles
  const buttonStyle = matchedCardEntry
    ? "text-6xl"
    : selectedCardEntry
      ? "text-5xl"
      : "text-7xl";

  return (
    <button
      className={`w-full h-full cursor-pointer ${buttonStyle}`}
      onClick={selectedCardEntry ? null : handleClick}
      disabled={matchedCardEntry}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite">
      {buttonContent}
    </button>
  );
}

export default CardButton;

/* Button styles 

.btn--emoji__front,
.btn--emoji__back--selected {
    backface-visibility: hidden;    
}

.btn--emoji__back--matched {
    backface-visibility: unset;
    background-color: var(--btn-disabled);
    border: 2px solid var(--btn-disabled);
    cursor: not-allowed;
}
*/
