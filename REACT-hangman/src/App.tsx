// npm run dev

import { useCallback, useEffect, useState } from 'react'
import words from "./wordList.json"
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanKeyboard } from './components/HangmanKeyboard';
import { HangmanWord } from './components/HangmanWord';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState((getWord));

  //type the array to string[] so TS knows only to expect strings in the array
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  //all incorrect letters are the ones which are not in the wordToGuess
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  //check if player is winner or loser
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  console.log(wordToGuess);

  //every single time our component re-renders, it recreates the function again & rerunning the event handler
  const addGuessedLetters = useCallback((letter: string) => {
      if(guessedLetters.includes(letter) || isLoser || isWinner) {
        return;
      }
      //get all the previous currentLetters & add the new letter to them
      setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if(!key.match(/^[a-z]$/)) {
        return;
      }
      e.preventDefault;
      addGuessedLetters(key);
    }

    document.addEventListener("keypress", handler);

    //remove keypress event listener when event is done working
    return () => {
      document.removeEventListener("keypress", handler);
    } 
  }, [guessedLetters])

  //when pressed enter get a brand new word
  useEffect(() =>{
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if(key !== "Enter") {
        return;
      }
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    }

    document.addEventListener("keypress", handler);

    //remove keypress event listener when event is done working
    return () => {
      document.removeEventListener("keypress", handler);
    } 
  },[])

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner!"}
        {isLoser && "Nice try"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{alignSelf: "stretch"}}>
        <HangmanKeyboard activeLetters={guessedLetters.filter(letter => 
          wordToGuess.includes(letter)
        )} inactiveLetters = {incorrectLetters} addGuessedLetter = {addGuessedLetters} disabled={isWinner || isLoser}
      />
      </div>
      
    </div>
  )
}

export default App
