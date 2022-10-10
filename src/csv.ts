import * as csv from "csv";
import fs from "fs";

export type CSVRow = Array<string>;
export type CSVRows = Array<CSVRow>;

export const readCSV = (path: string) => {
    return new Promise<CSVRows>( ( resolve, reject ) => {
        const rows: CSVRows = [];

        fs.createReadStream(path)
            .pipe(csv.parse({ delimiter: "," }))
            .on("data", row => {
                rows.push( row );
            })
            .on("end", () => {
                resolve( rows );
            })
    });
}
