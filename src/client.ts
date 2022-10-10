import { findMovie, getHTMLOutput } from "./movie";

const ready = () => {
  return new Promise<void>( ( resolve, reject ) => {
    if (document.readyState !== 'loading'){
      resolve();
    } else {
      document.addEventListener( 'DOMContentLoaded', () => { resolve() } );
    }
  } )
}

const fetchMovies = async () => {
  const response = await fetch( 'http://localhost:3000/movies', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
  } );

  return await response.json();
}

const getMovies = async ( resetCache = false ) => {
  const storage = localStorage.getItem( 'movies' );

  if ( storage && ! resetCache ) {
    return JSON.parse( storage );
  }

  const movies = await fetchMovies();
  localStorage.setItem( 'movies', JSON.stringify( movies ) );
  return movies;
}

(async() => {
  await ready();
  await getMovies();
  const input: HTMLInputElement | null = document.querySelector( '#input' );
  const submit: HTMLButtonElement | null = document.querySelector( '#submit' );
  const container: HTMLElement | null = document.querySelector( '#container' );

  submit?.addEventListener( 'click', async (e: Event) => {
    e.preventDefault();
    const movies = await getMovies();
    const searchTerm = input?.value ?? '';
    const foundMovie = findMovie( searchTerm, movies );

    if ( container && foundMovie ) {
      container.innerHTML = getHTMLOutput( foundMovie );
    }
  } )
  
})();
