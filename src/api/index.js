import instance from './config.js';

export async function getLunBoImg(){
    return await instance.get('/getlunbo');
}