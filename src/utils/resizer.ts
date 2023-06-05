import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import {promises as fsPromises} from 'fs';

export const resizer = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    const Img = {
        filename: req.query.filename as string,
        width: req.query.width as string,
        height: req.query.height as string,
    };
    const pathIn = `./assets/full/${Img.filename}.jpg`;
    const pathOut = `./assets/thumb/${Img.filename}_${Img.width}_${Img.height}.jpg`;
    console.log('PATHIN' + pathIn);
    console.log('PATHOUT' + pathOut);

    if (!fs.existsSync(pathOut)) {

        sharp(pathIn)
                .resize(parseInt(Img.width), parseInt(Img.height))
                .toFile(pathOut, (err)=> {console.log(err)})
                
    }

    next();
};
