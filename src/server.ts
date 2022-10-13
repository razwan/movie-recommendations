import express from 'express';
import path from 'path';

import { getMoviesFromCSVFile } from './utils';
import { getMoviesFromCSVFormat } from './movie';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get( '/', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
} );

app.get( '/movies', async (req, res) => {
    const movies = await getMoviesFromCSVFile( "./src/movies.csv", "," );

    res.type( 'application/json' );
    res.send( JSON.stringify( movies ) );
} );

app.listen( port, () => {
    console.log(`App listening on port ${ port }`) 
} );
