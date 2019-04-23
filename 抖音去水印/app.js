const superagent = require('superagent');
const fs = require('fs');
let API = "https://api.appsign.vip:2688";
let url = 'http://v.douyin.com/8QDAgu/'
let header = {
    "User-Agent": "Aweme/2.8.0 (iPhone; iOS 11.0; Scale/2.00)"
}
async function getToken(){
    let res = await superagent.get(API + '/token/douyin/version/2.7.0');
    data = JSON.parse(res.text);
    let token =data["token"];
    console.log(token)
    return token
}

async function getDevice(){
    let res = await superagent.get(API + '/douyin/device/new/version/2.7.0').set(header);
    data = JSON.parse(res.text);
    return data.data
}
async function getAwemeIdByShortUrl(url){
    let res = await superagent.get(url);
    console.log(res)
}
getAwemeIdByShortUrl(url)