enum Advice {
    VIEW = 'You should watch this movie right now!',
    AVOID = 'Avoid the movie at all costs!'
}

export const getAdvice: ( score: number ) => string = ( score ) => {

    if ( score > 0.8 ) {
        return Advice.VIEW;
    }

    if ( score < 0.5 ) {
        return Advice.AVOID;
    }

    return '';
}
