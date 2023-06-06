import express, { Request } from 'express';
import { resizer } from './utils/resizer';
import fs from 'fs';

const app = express();
const port = 3000;

app.get(
    '/api/image',
    resizer,
    (req: express.Request, res: express.Response): void => {
        const pathOut: string = `./assets/thumb/${req.query.filename}_${req.query.width}_${req.query.height}.jpg`;
        res.sendFile(pathOut, { root: './src' });

    }
);

app.listen(port, () => {
    console.log('Server is listening');
});

export default app;
