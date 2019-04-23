const fs = require('fs');
const superagent = require('superagent');
let url = "https://wx.vanmilk.com/wx/mall/sys/sysCat/tree?methCd=9000&typeStatus=1"
superagent.get(url).end((err, res) => {
    if (err) {
        console.log(err)
    }
    let province = []
    let city = {}
    let dist = {}
    console.log(res)
    for (let i of res.body) {
        let obj = {}
        obj.cd = i.cd
        obj.nmCn = i.nmCn
        province.push(obj)
        let city2 = []
        for (let j of i.childSysCatDtozList) {
            let obj2 = {}
            obj2.cd = j.cd
            obj2.nmCn = j.nmCn
            city2.push(obj2)
            let dist2 = []
            for (let m of j.childSysCatDtozList) {
                let obj3 = {}
                obj3.cd = m.cd
                obj3.nmCn = m.nmCn
                dist2.push(obj3)
            }
            dist[j.cd] = dist2
        }
        city[i.cd] = city2
    }
    let addInfo = {
        province,
        city,
        dist
    }
    fs.writeFileSync('./add', JSON.stringify(addInfo));

    

})