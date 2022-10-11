import fs from 'fs';
import path from 'path';

import { readCSV } from '../csv';
import { getMoviesFromRows } from '../movie';

describe( 'csv parsing', () => {
    const filepath = path.resolve( __dirname, 'test.csv' );

    afterAll( () => {
        fs.unlink( filepath, ( err ) => {
            if ( err ) throw err;
        } )
    } );

    test( 'data read from .csv is converted into a movie object', async () => {
        // arrange
        const content = `title,genre,poster,year,duration,score,description
For My Father (Sof Shavua B'Tel Aviv),Drama,http://dummyimage.com/240x180.png/dddddd/000000,1992,71,0.63,"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."`;
        
        const writeFile: () => Promise<void> = () => {
            return new Promise( ( resolve, reject ) => {
                fs.writeFile( filepath,  content, ( err ) => {
                    if ( err ) throw err;

                    resolve();
                } );
            } );
        }

        await writeFile();

        // act
        const rows = await readCSV( filepath );
        const movies = getMoviesFromRows( rows ); 

        // assert
        expect( movies ).toStrictEqual( [ {
            title: `For My Father (Sof Shavua B'Tel Aviv)`,
            genre: `Drama`,
            poster: `http://dummyimage.com/240x180.png/dddddd/000000`,
            year: 1992,
            duration: 71,
            score: 0.63,
            description: `Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.`
        } ] )
    } )
} );
