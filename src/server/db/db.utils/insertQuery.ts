
import db from "../db.connect";


export const insertQuery = async (query: string, value: any) => {
    // return new Promise<void>((resolve, reject) => {
    //     db.run(query, value, (err) => {
    //         if(err) {
    //             reject(err);
    //         } else {
    //             resolve();            
    //         }
    //     })
    // })
}

export default insertQuery;