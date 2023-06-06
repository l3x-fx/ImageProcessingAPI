import express from 'express';
import sharp from 'sharp';
import fs from 'fs';

export const resizer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const Img = {
        filename: req.query.filename as string,
        width: req.query.width as string,
        height: req.query.height as string,
    };

    const pathIn = `./src/assets/full/${Img.filename}.jpg`;
    const pathOut = `./src/assets/thumb/${Img.filename}_${Img.width}_${Img.height}.jpg`;

    if (!Img.filename || !Img.width || !Img.height) {
        res.send(
            'Please provide all 3 information: filename, width and height!'
        );
    } else if (
        !/^[1-9][0-9]*$/.test(Img.width) ||
        !/^[1-9][0-9]*$/.test(Img.height)
    ) {
        res.send('Please provide height and width as positive numbers!');
    } else if (!fs.existsSync(pathIn)) {
        res.send('Please provide an existing filename!');
    } else {
        if (!fs.existsSync(pathOut)) {
            await sharp(pathIn)
                .resize(parseInt(Img.width), parseInt(Img.height))
                .toFile(pathOut)
                .catch((err) => next(err));
        }
    }

    next();
};
