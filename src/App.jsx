import { useState, useEffect } from "react";
import StartForm from "./components/StartForm";
import MemoryGrid from "./components/MemoryGrid";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";
import { shuffle } from "./utils/utils";

function App() {
  const initialFormData = {
    category: "animals-and-nature",
    number: 10,
  };

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // ** Detect matching cards
  useEffect(() => {
    console.log(selectedCards);
    // selectedCards contain two matching cards?
    if (
      selectedCards.length === 2 &&
      selectedCards[0]?.name === selectedCards[1]?.name
    ) {
      // - add the cards to matchedCards, keeping any previous matched cards contained within
      setMatchedCards((prevCards) => [
        ...prevCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  // ** Check if all cards have been matched (winning condition)
  useEffect(() => {
    if (
      emojisData.length &&
      emojisData.length === matchedCards.length
    ) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards, emojisData]);

  console.log(`Is game over? ${areAllCardsMatched}`);

  // ** Handle form select options
  function handleFormChange(e) {
    console.log(`${e.target.name}: ${e.target.value}`);
  }

  // ** Start Game - Retrieve data from API
  async function startGame(event) {
    event.preventDefault();
    const url =
      `https://emojihub.yurace.pro/api/all/category/${formData.category}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from API. Status: ${response.status}`,
        );
      }
      const data = await response.json();
      const dataSlice = getDataSlice(data);
      const emojisArray = getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameStarted(true);
      setAreAllCardsMatched(false);
    } catch (error) {
      console.error(error.message);
      setIsError(true);
    }
  }

  // ** Collect the random emojis
  // ** ToDo: Combine getDataSlice and getRandomIndices?
  function getDataSlice(data) {
    // get array of random indicies
    const randomIndices = getRandomIndices(data);
    // map over the indicies array to create the targeted emojis
    return randomIndices.map((index) => data[index]);
  }

  // ** Get 5 random emojis from the emoji data
  // ** ToDo: enhance to select 16 (4x4 grid) or 36 (6x6 grid)
  // ** move to utils??
  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNumber = Math.floor(Math.random() * data.length);
      // prevent duplicates of random index
      if (!randomIndicesArray.includes(randomNumber)) {
        randomIndicesArray.push(randomNumber);
      } else {
        i--;
      }
    }
    // return an array of the random indices
    return randomIndicesArray;
  }

  // ** Build the memory card array (for the grid)
  // ** - 2x of each emoji
  function getEmojisArray(data) {
    // create an array with data and copied data
    const pairedEmojisArray = [...data, ...data];
    return shuffle(pairedEmojisArray);
  }

  console.log(selectedCards);

  function turnCard(name, index) {
    // const selectedCardEntry = selectedCards.find(emoji => emoji.index === index);
    // if there are 0 or 1 cards in the array
    if (selectedCards.length < 2) {
      setSelectedCards((prevCards) => [
        ...prevCards,
        { name, index },
      ]);
      // if there are 2 cards in the array
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameStarted(false);
    setAreAllCardsMatched(false);
    setMatchedCards([]);
    setSelectedCards([]);
  }

  function resetError() {
    setIsError(false);
  }

  return (
    <>
      <h1 className="mb-6 sm:mb-10 text-3xl font-bold">
        Memory / Match
      </h1>
      <main className="">
        {!isGameStarted && !isError && (
          <StartForm
            handleSubmit={startGame}
            handleChange={handleFormChange}
          />
        )}
        {isGameStarted && !areAllCardsMatched && (
          <AssistiveTechInfo
            emojisData={emojisData}
            matchedCards={matchedCards}
          />
        )}
        {areAllCardsMatched && <GameOver handleClick={resetGame} />}
        {isGameStarted && (
          <MemoryGrid
            data={emojisData}
            handleClick={turnCard}
            selectedCards={selectedCards}
            matchedCards={matchedCards}
          />
        )}
        {isError && <ErrorCard handleClick={resetError} />}
      </main>
    </>
  );
}

export default App;
