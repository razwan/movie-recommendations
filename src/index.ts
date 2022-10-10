import readline from "readline";

import { readCSV } from "./csv";
import { findMovie, getMoviesFromRows, getOutput } from "./movie";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt: () => Promise<string> = () => {
    return new Promise( resolve => {
        rl.question('Enter the name of a movie: ', (name: string) => {
            resolve( name );
        });
    } );
}

(async () => {
    const rows = await readCSV("./src/movies.csv");
    const movies = getMoviesFromRows( rows ); 
    const titleToSearch = await prompt();
    const found = findMovie( titleToSearch, movies );

    if ( found ) {
        console.log( getOutput( found ) );
    }
})();
