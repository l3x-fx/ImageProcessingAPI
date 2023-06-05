import express from 'express';
import { resizer } from './utils/resizer';

const app = express();
const port = 3000;

app.get('/api/image', resizer, (req, res) => {

    const pathOut: string = `./assets/thumb/${req.query.filename}_${req.query.width}_${req.query.height}.jpg`;
    //res.sendFile(pathOut, { root: './src' });
    res.send('lala')
});

app.listen(port, () => {
    console.log('Server is listening');
});
