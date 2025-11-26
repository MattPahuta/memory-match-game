import { useState, useEffect } from "react";
import Start from "./components/Start";
import MemoryGrid from "./components/MemoryGrid";
import { shuffle } from "./utils/utils";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // ** Detect matching cards
  useEffect(() => {
    console.log(selectedCards)
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
    if (emojisData.length && emojisData.length === matchedCards.length) {
      setIsGameOver(true);
    }
  }, [matchedCards, emojisData]);

  console.log(`Is game over? ${isGameOver}`)

  // ** Start Game - Retrieve data from API
  async function startGame(event) {
    event.preventDefault();
    const url = 'https://emojihub.yurace.pro/api/all/category/animals-and-nature';

    try {
      const response= await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from API. Status: ${response.status}`);
      }
      const data = await response.json();
      const dataSlice = getDataSlice(data);
      const emojisArray = getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameStarted(true);
      setIsGameOver(false);
    } catch (error) {
      console.error(error.message)
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
    for (let i = 0; i < 5; i++) {
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
  function getEmojisArray(data) {
    // create an array with data and copied data
    const pairedEmojisArray = [...data, ...data];
    return shuffle(pairedEmojisArray);
  }

  console.log(selectedCards)

  function turnCard(name, index) {

    const selectedCardEntry = selectedCards.find(emoji => emoji.index === index);
    // if there are 0 or 1 cards in the array
    if (!selectedCardEntry && selectedCards.length < 2) {
      setSelectedCards((prevCards) => [...prevCards, {name, index}])
      // if there are 2 cards in the array
    } else if (!selectedCardEntry && selectedCards.length === 2) {
      setSelectedCards([{name, index}]);
    }

  }

  return (
    <>
      <h1 className="mb-6 sm:mb-10 text-3xl font-bold">Memory / Match</h1>
      <main className="">
        { !isGameStarted && <Start handleSubmit={startGame} /> }
        { isGameStarted && <MemoryGrid data={emojisData} handleClick={turnCard} />}
      </main>
    </>
  )
}

export default App
