import { CSVRows } from '../csv';
import { getMoviesFromRows } from '../movie';

test( '', () => {
    const rows = [
        [ 'title','genre','poster','year','duration','score','description' ],
        [
            `For My Father (Sof Shavua B'Tel Aviv)`,
            `Drama`,
            `http://dummyimage.com/240x180.png/dddddd/000000`,
            `1992`,
            `71`,
            `0.63`,
            "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."
        ]
    ] as CSVRows;

    const movies = getMoviesFromRows( rows );

    expect( movies[0] ).toEqual( {
        title: expect.any( String ),
        genre: expect.any( String ),
        poster: expect.any( String ),
        year: expect.any( Number ),
        duration: expect.any( Number ),
        score: expect.any( Number ),
        description: expect.any( String ),
    } )
} )