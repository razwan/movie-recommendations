import * as csv from "csv";
import { getAdvice } from './advice';

export interface Movie {
    description: string,
    duration: number,
    genre: string,
    poster: string,
    score: number,
    title: string,
    year: number,
};

export type Movies = Array<Movie>;

export const getOutput: ( movie: Movie ) => string = movie => {
    let output = '';

    output += `Title: ${ movie.title }\n`;
    output += `Year: ${ movie.year }\n`;
    output += `Rating: ${ movie.score }\n\n`;
    output += `Description: ${ movie.description }`;
    output += `\n\n${ getAdvice( movie.score ) }`;

    return output;
}

export const getHTMLOutput: ( movie: Movie ) => string = movie => {
    let output = '';

    const advice = getAdvice( movie.score );
    const adviceOutput = advice ? `<p class="h2">${ advice }</p>` : '';

    output += '<div class="bg-light p-4 mt-4">';
    output += '<div class="movie">';
    output += '<div class="movie-poster">';
    output += `<img src="${ movie.poster }" />`;
    output += '</div>';
    output += '<dl>';
    output += `<dt>Title</dt><dd>${ movie.title }<dd>`;
    output += `<dt>Year</dt><dd>${ movie.year }<dd>`;
    output += `<dt>Rating</dt><dd>${ movie.score }<dd>`;
    output += `<dt>Description</dt><dd>${ movie.description }<dd>`;
    output += '</dl>';
    output += '</div>';
    output += adviceOutput;
    output += '</div>';

    return output;
}

const createMovie: ( obj: Record<string, string> ) => Movie = ( obj ) => {
    return {
        description: obj.description,
        duration: Number( obj.duration ),
        genre: obj.genre,
        poster: obj.poster,
        score: Number( obj.score ),
        title: obj.title,
        year: Number( obj.year ),
    };
}

const parseCSV: ( content: string ) => Promise<Array<Array<string>>> = ( content: string ) => {
    return new Promise( ( resolve, reject ) => {
        csv.parse( content, ( err, records ) => {
            resolve( records );
        } );
    } );
}

export const getMoviesFromCSVFormat: ( content: string, delimiter: string ) => Promise<Array<Movie>> = async ( content, delimiter ) => {
    const rows = await parseCSV( content )
    const fields = rows.splice(0, 1)[0] as Array<string>;

    return rows.map( movieFields => {
        const obj: Record<string, string> = {};
    
        fields.forEach( ( field, index ) => {
            obj[ field ] = movieFields[ index ];
        } );

        return createMovie( obj );
    } );
}

const matchMovie = ( title: string, movie: Movie ) => {
    const titleIsNotEmpty = title.trim().length;
    const titleMatches = movie.title.toLowerCase().indexOf( title.toLowerCase() ) > -1;
    return titleIsNotEmpty && titleMatches;
}

export const findMovie = ( title: string, movies: Array<Movie> ) => {
    return movies.filter( movie => matchMovie( title, movie ) );
}
