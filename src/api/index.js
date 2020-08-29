import instance from './config.js';

export async function getLunBoImg(){
    return await instance.get('/getlunbo');
}

export async function getRecommend(limit=6){
    return await instance.get(`/recommend?limit=${limit}`);
}

export async function getNewsList(page = 1,pagesize = 10){
    return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

