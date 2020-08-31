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
//getgoods?pageindex=number
export async function getGoods(pageindex = 1){
    return await instance.get(`/getgoods?pageindex=${pageindex}`);
}
//新闻详情
export async function getNew(id){
    return await instance.get(`/getnew/${id}`);
}
//获取对象新闻的评论
export async function getComments(id,page){
    return await instance.get(`/getcomments/${id}?pageindex=${page}`);
}

//添加评论
export async function postComment(id,content){
    return await instance.post(`/postcomment/${id}`,content);
}
//getthumbimages/
export async function getThumBimages(id){
    return await instance.get(`/getthumbimages/${id}`);
}
//getgoodsinfo
export async function getGoodsInfo(id){
    return await instance.get(`/getgoodsinfo/${id}`);
}
