function CardButton({content, selectedCardEntry, matchedCardEntry, handleClick}) {

  const buttonContent = (selectedCardEntry || matchedCardEntry) ? content : "?";

  // handle styles
  const buttonStyle = 
    matchedCardEntry ? 'text-6xl' 
    : selectedCardEntry ? 'text-5xl' 
    : 'text-7xl';

  return (
    <button
      className={`w-full h-full cursor-pointer ${buttonStyle}`}
      onClick={handleClick}>
      {buttonContent}
    </button>
  )
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