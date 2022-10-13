import readline from "readline";

import { getMoviesFromCSVFile } from "./utils";
import { findMovie, getMoviesFromCSVFormat, getOutput } from "./movie";

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
    const movies = await getMoviesFromCSVFile( "./src/movies.csv", "," );
    const titleToSearch = await prompt();
    const found = findMovie( titleToSearch, movies );

    found.forEach( movie => {
        console.log( getOutput( movie ) );
    } )
})();
