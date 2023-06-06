import fs from 'fs';
import { resizer } from '../../utils/resizer';
import express from 'express';
import { Request } from 'express';
import { Response } from 'express';

describe('Resizer middleware', () => {
    const imgPath: string = './src/assets/thumb/dunes_200_200.jpg';

    afterEach(async () => {
        try {
            await fs.promises.unlink(imgPath);
        } catch (err) {
            console.error('Error occurred during cleanup:', err);
        }
    });

    it('tests the resizing', async () => {
        const req: Partial<Request> = {
            query: {
                filename: 'dunes',
                width: '200',
                height: '200',
            },
        };

        const res: Partial<Response> = {
            send: jasmine.createSpy('send'),
        };

        const next = jasmine.createSpy('next');

        await resizer(req as Request, res as express.Response, next);
        expect(fs.existsSync(imgPath)).toBe(true);
    });
});
