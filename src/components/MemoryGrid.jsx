import { decodeEntity } from 'html-entities';
import CardButton from './CardButton';

function MemoryGrid({ handleClick, data, selectedCards, matchedCards }) {
  return (
    <ul className="mx-auto w-full max-w-4xl py-5 sm:py-12 grid gap-4 auto-rows-[minmax(150px,auto)] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {data.map((emoji, index) => {
        // check for selected card
        // resolves to the object selected or undefined
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index);
        // check if card is matched
        // resolves to the matched objecct or undefined
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index);
        
        // ToDo: rename to isCardSelected and isCardMatched??
        console.log('selectedCard: ', selectedCardEntry);
        console.log('matchedCard: ', matchedCardEntry);

        // Handle styling
        const cardStyle = matchedCardEntry
          ? 'bg-green-400'
          : selectedCardEntry
          ? 'bg-slate-400'
          : 'bg-slate-600 ';

        // generate a memory card (li) w/button
        return (
          <li
            key={index}
            className={`group rounded-xl hover:bg-amber-100 ${cardStyle}`}
          >
            <CardButton
              content={decodeEntity(emoji.htmlCode[0])}
              selectedCardEntry={selectedCardEntry}
              matchedCardEntry={matchedCardEntry}
              handleClick={() => handleClick(emoji.name, index)}
            />
          </li>
        )
      })}
    </ul>
  );
}

export default MemoryGrid;

/* Animated memory card

.card-item--selected,
.card-item--matched,
.btn--emoji__back--selected,
.btn--emoji__back--matched {
    transform: rotateY(180deg);
}

.card-item--selected {
    transition: .6s;
    transform-style: preserve-3d;
}

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