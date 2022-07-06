import React from 'react'
import Hints from '../models/Hints';
import Row from './Row'

interface IGridProps {
   words: string[],
   hints: Hints[][],
   currentWordNumber: number;
   wordSize?: number,
}

export default function Grid({ words, hints, wordSize = 5, currentWordNumber }: IGridProps) {
   return (
      <div className='grid'>
         {words.map((word, index) => (
            <Row key={index} hints={index < currentWordNumber ? hints[index] : undefined} word={word} size={wordSize} current={currentWordNumber === index} />
         ))}
      </div>
   )
}

