import { Movie, Movies, getHTMLOutput, matchMovie } from "./movie";

const STORAGE_ITEM = 'movies';

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
  const response = await fetch( 'http://localhost:3000/movies' );

  return await response.json();
}

const getMovies: () => Promise<Movies> = async ( resetCache = false ) => {
  const storage = localStorage.getItem( STORAGE_ITEM );

  if ( storage && ! resetCache ) {
    return JSON.parse( storage );
  }

  const movies = await fetchMovies();
  localStorage.setItem( STORAGE_ITEM, JSON.stringify( movies ) );
  const clearButton = getClearCacheButton();
  clearButton!.disabled = false;
  return movies;
}

const getClearCacheButton = () => {
  return document.querySelector( '#clear' ) as HTMLButtonElement;
}

const handleClearCacheButton = () => {
  const clearButton = getClearCacheButton();
  
  clearButton?.addEventListener( 'click', () => {
    localStorage.removeItem( STORAGE_ITEM );
    clearButton.disabled = true;
  } );
}

(async() => {
  await ready();
  await getMovies();

  const input: HTMLInputElement | null = document.querySelector( '#input' );
  const form: HTMLButtonElement | null = document.querySelector( '#form' );
  const container: HTMLElement | null = document.querySelector( '#container' );

  handleClearCacheButton();

  form?.addEventListener( 'submit', async (e: Event) => {
    e.preventDefault();
    const movies = await getMovies();
    const searchTerm = input?.value ?? '';
    const found = movies.filter( movie => matchMovie( searchTerm, movie ) );

    if ( container ) {
      container.innerHTML = found.reduce( ( acc: string, curr: Movie ) => {
        return acc + getHTMLOutput( curr );
      }, '' );
    }
  } )
  
})();
