import { findMovie, getMoviesFromCSVFormat } from '../movie';

const generateMovie = () => {
    return {
        description: '',
        duration: 90,
        genre: '',
        poster: '',
        score: 0.5,
        title: 'Once upon a time in Hollywood',
        year: 1990,
    };
}

test( 'movie is found when search term is exact match', () => {
    // arrange
    const movie = generateMovie();
    movie.title = 'Once upon a time in Hollywood';
    const searchTerm = movie.title;
    const movies = [ movie ];

    // act
    const found = findMovie( searchTerm, movies );

    // assert
    expect( found.length ).toBe( 1 );
} )

test( 'no movies are found when search term is empty', () => {
    // arrange
    const searchTerm = '';
    const movie = generateMovie();
    movie.title = 'Once upon a time in Hollywood';
    const movies = [ movie ];

    // act
    const found = findMovie( searchTerm, movies );

    // assert
    expect( found.length ).toBe( 0 );
} )

test( 'search is case insensitive', () => {
    // arrange
    const movie = generateMovie();
    movie.title = 'Once upon a time in Hollywood';
    const movies = [ movie ];
    const searchTerms = [ movie.title.toLowerCase(), movie.title.toUpperCase() ];

    searchTerms.forEach( searchTerm => {
        // act
        const found = findMovie( searchTerm, movies );

        // assert
        expect( found.length ).toBe( 1 );
    } );
} )

test( 'data read from csv format is converted into a movie object', async () => {
    // arrange
    const content = `title,genre,poster,year,duration,score,description
For My Father (Sof Shavua B'Tel Aviv),Drama,http://dummyimage.com/240x180.png/dddddd/000000,1992,71,0.63,"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."`;

    // act
    const movies = await getMoviesFromCSVFormat( content, ',' ); 

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
