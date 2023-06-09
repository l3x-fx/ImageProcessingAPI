import express from 'express';
import { resizer } from './utils/resizer';

const app = express();
const port = 3000;

app.get(
    '/api/image',
    resizer,
    (req: express.Request, res: express.Response): void => {
        const pathOut = `./assets/thumb/${req.query.filename}_${req.query.width}_${req.query.height}.jpg`;
        res.sendFile(pathOut, { root: './src' });
    }
);

app.listen(port, () => {
    console.log('Server is listening');
});

export default app;
