import React from 'react'
import Hints from '../models/Hints';

interface IRowProps {
   word: string;
   current: boolean;
   hints?: Hints[] | undefined;
   size?: number;
}

export default function Row({ word, hints, current, size = 5 }: IRowProps) {

   const cells: JSX.Element[] = [];
   for (let i = 0; i < size; i++) {
      cells.push(
         <div key={i} className={hints ? `cell ${hints[i]}` : 'cell'} >
            {word[i] ?? ""}
         </div>
      )
   }

   return (
      <div className={current ? 'row current' : 'row'}>
         {cells}
      </div >
   )
}
