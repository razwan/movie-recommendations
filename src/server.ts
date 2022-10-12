import express from 'express';
import { readCSV } from './csv';
import { getMoviesFromRows } from './movie';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get( '/', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
} );

app.get( '/movies', async (req, res) => {
    const rows = await readCSV("./src/movies.csv");
    const movies = getMoviesFromRows( rows ); 

    res.type( 'application/json' );
    res.send( JSON.stringify( movies ) )
} );

app.listen( port, () => {
    console.log(`Example app listening on port ${port}`) 
} );
