const fs = require('fs');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const cheerio = require('cheerio');
let htmlUrl = 'http://www.27270.com/ent/meinvtupian/list_11_'
let pageNum = 1;
let downPath = './data/'
init()
async function init() {
    pageNum++;
    for (let i = 1; i < pageNum; i++) {
        thtmlUrl = `${htmlUrl}${i}.html`
        let html = await getHtml(thtmlUrl);
        createFile(html);
    }
}

function getImg(imgUrl, path) {
    superagent.get(imgUrl).end((err, res) => {
        if (err) {
            console.log(err)
        }
        fs.writeFileSync(path, res.body);
        console.log(`${path}下载完成`)
    })
}

function createFile(html) {
    let $ = cheerio.load(html);
    $('.MeinvTuPianBox ul li').each((i, v) => {
        let $ = cheerio.load(v);
        let href = $('a').attr('href');
        let name = $('a').attr('title');
        let filePath = `${downPath}${name}`
        fs.mkdirSync(filePath);
        console.log(`目录：${name}创建完成`)
        getPicUrl(href, filePath);

    });
}
async function getPicUrl(href, filePath) {
    let arr = href.split('.')
    for (var i = 1; i < 99; i++) {
        let url = `${arr[0]}.${arr[1]}.${arr[2]}_${i}.${arr[3]}`
        let picHtml = await getHtml(url);
        let $ = cheerio.load(picHtml);
        let src = $('#picBody>p>a>img').attr('src');
        if (src) {
            let path = `${filePath}/${i}.jpg`
            getImg(src, path)
        } 
    }
}
async function getHtml(htmlUrl) {
    let res = await superagent.get(htmlUrl).charset('gbk').catch(err => {
        return
     });
    return res.text;
}