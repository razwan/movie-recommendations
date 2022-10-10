import { getAdvice } from '../advice';

test( 'it should give proper advice', () => {
    const badRatings = [ 0, 0.2, 0.3 ];
    const adviceForBadRating = 'Avoid the movie at all costs!';

    const goodRatings = [ 0.9, 1 ];
    const adviceForGoodRating = 'You should watch this movie right now!';
    
    badRatings.forEach( rating => {
        expect( getAdvice( rating ) ).toEqual( adviceForBadRating );
    } );

    goodRatings.forEach( rating => {
        expect( getAdvice( rating ) ).toEqual( adviceForGoodRating );
    } );
} )
