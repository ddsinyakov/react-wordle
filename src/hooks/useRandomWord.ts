import { useState, useEffect } from "react";

export default function useRandomWord(): string | null {
   const [word, setWords] = useState<string | null>(null);

   useEffect(() => {
      const fetchWords = async () => {
         // just for delay...
         await new Promise(resolve => setTimeout(resolve, 100));
         // -----------------

         let responce = await fetch(`http://localhost:3000/words.json`, {
            method: "GET"
         });

         if (!responce.ok) {
            throw new Error("Bad request");
         }

         const words = await (responce.json() as Promise<string[]>);

         const word = words[Math.floor(Math.random() * words.length)];

         setWords(word);
      }

      fetchWords();
   }, []);

   return word;
}