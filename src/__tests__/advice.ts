import { getAdvice } from '../advice';

// trivial test, coupled to implementation
test( 'it should give proper advice', () => {
    const badRatings = [ 0, 0.2, 0.3 ];
    const adviceForBadRating = 'Avoid the movie at all costs!';

    const goodRatings = [ 0.9, 1 ];
    const adviceForGoodRating = 'You should watch this movie right now!';

    const neutralRatings = [ 0.5, 0.6, 0.8 ];
    const adviceForNeutralRating = '';
    
    badRatings.forEach( rating => {
        expect( getAdvice( rating ) ).toEqual( adviceForBadRating );
    } );

    goodRatings.forEach( rating => {
        expect( getAdvice( rating ) ).toEqual( adviceForGoodRating );
    } );

    neutralRatings.forEach( rating => {
        expect( getAdvice( rating ) ).toEqual( adviceForNeutralRating );
    } );
} )
