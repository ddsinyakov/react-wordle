import { keyboardKey } from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import Grid from './components/Grid';
import useRandomWord from './hooks/useRandomWord';
import Hints from './models/Hints';



function App() {
  const word = useRandomWord();
  console.log(word)
  const [currentTry, setCurrentTry] = useState<number>(0);
  const [tries, setTries] = useState<string[]>(
    new Array<string>(6).fill("", 0, 6)
  )
  const [hints, setHints] = useState<Hints[][]>([]);

  useEffect(() => {
    const keyDownHandler = (event: keyboardKey) => {
      if (event.key === "Backspace") {

        if (tries[currentTry].length > 0) {
          setTries(prevTries => {
            prevTries[currentTry] = prevTries[currentTry].slice(0, -1)
            return [...prevTries];
          })
        }

      }
      else if (event.key === "Enter") {

        if (tries[currentTry].length === word?.length) {
          setCurrentTry(currentTry + 1);

          setHints(prevHints => {
            const nHints: Hints[] = [];

            for (let i = 0; i < tries[currentTry].length; i++) {
              if (tries[currentTry][i] === word[i]) {
                nHints.push(Hints.OnPlace);
              } else if (word.includes(tries[currentTry][i])) {
                nHints.push(Hints.Exist);
              } else {
                nHints.push(Hints.None);
              }
            }

            prevHints.push(nHints);
            return [...prevHints];
          })
        }

      }
      else if (event.keyCode &&
        ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122))) {

        if (word && tries[currentTry].length < word.length) {
          setTries(prevTries => {
            prevTries[currentTry] += event.key;
            return [...prevTries];
          });
        }

      }
    }

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [currentTry, tries, word]);

  console.log(hints)

  if (!word) {
    return (
      <div className='container'>
        Loading...
      </div>
    )
  }

  return (
    <div className='container'>
      <Grid words={tries} hints={hints} wordSize={word.length} currentWordNumber={currentTry} />
    </div>
  );
}

export default App;
