import fs from "fs/promises";

import { getMoviesFromCSVFormat } from "./movie";

export const getFileContents: ( filepath: string ) => Promise<string | undefined> = async ( filepath ) => {
    try {
        return await fs.readFile( filepath, { encoding: 'utf8' });
    } catch (err) {
        console.log( err );
    }
}

export const getMoviesFromCSVFile = async ( filepath: string, delimiter: string ) => {
    const contents = await getFileContents( filepath );
    return contents ? getMoviesFromCSVFormat( contents, delimiter ) : [];
}
