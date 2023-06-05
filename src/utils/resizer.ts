import express from 'express';
import sharp from 'sharp';
import fs from 'fs';

export const resizer = async (
    req: express.Request,
    res: express.Response,
    next: Function
): Promise<void> => {
    const Img = {
        filename: req.query.filename as string,
        width: req.query.width as string,
        height: req.query.height as string,
    };
    const pathIn = `./src/assets/full/${Img.filename}.jpg`;
    const pathOut = `./src/assets/thumb/${Img.filename}_${Img.width}_${Img.height}.jpg`;

    if (!fs.existsSync(pathOut)) {
        await sharp(pathIn)
            .resize(parseInt(Img.width), parseInt(Img.height))
            .toFile(pathOut)  
    }
    next();
};
