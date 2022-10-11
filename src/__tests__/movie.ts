import { CSVRows } from '../csv';
import { getMoviesFromRows, matchMovie } from '../movie';

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
    const found = movies.filter( movie => matchMovie( searchTerm, movie ) );

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
    const found = movies.filter( movie => matchMovie( searchTerm, movie ) );

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
        const found = movies.filter( movie => matchMovie( searchTerm, movie ) );

        // assert
        expect( found.length ).toBe( 1 );
    } );
} )
