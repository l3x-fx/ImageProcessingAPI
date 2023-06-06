import fs from 'fs';
import { resizer } from "../../utils/resizer";
import express from 'express';

describe('Resizer middleware', () => {
    
    let req: any ={}
    let res:any = {}
    let next:any
    const imgPath ='./src/assets/thumb/dunes_200_200.jpg'

    beforeEach(()=> {
        req = {
            query: {
                filename: 'dunes',
                width: '200',
                height: '200',
            },
        };

        res = {
            send: jasmine.createSpy('send'),
        };

        next = jasmine.createSpy('next');
    })

    afterEach(()=> {
            fs.unlink(imgPath, (err) => {
                throw err;
        })

    })
    
    it('tests the resizing', async () => {
        

        await resizer(req, res, next)
        
        expect(fs.existsSync(imgPath)).toBe(true)

    });
});