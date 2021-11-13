const express = require('express')
const router = express.Router()
const Main = require('../middleware/main')
router.get('/',(req,res,next)=>{
        let tag = parseInt(req.query.tag)
        Main.getBossZpData().then(result =>{ 
          let info = JSON.parse(result)
          if(tag===1){
            res.render('index.html',{
              data:info[1]
            })
          }else if(tag===2){
            res.render('index.html',{
              data:info[2]
            })
          }else if(tag===3){
            res.render('index.html',{
              data:info[3]
            })
          }else{
            res.render('index.html',{
              data:info[0]
            })
          }
      }).catch(err =>{
          next(err)
      })
})

router.get('/echarts',(req,res,next)=>{
  //处理数据真的太难了，爬取到的数据参差不齐，好难！！！
    /* Main.getLiePinData().then(result =>{
        let liepin = JSON.parse(result)
        let nodejs = []
        let bj = liepin.北京.golang
        let sh = liepin.上海.golang
        let hz = liepin.杭州.golang
        let sz = liepin.深圳.golang
        let gz = liepin.广州.golang

        let bjnd = Main.getRandomArr(bj,30)
        let shnd = Main.getRandomArr(sh,30)
        let hznd = Main.getRandomArr(hz,30)
        let sznd = Main.getRandomArr(sz,30)
        let gznd = Main.getRandomArr(gz,30)
        console.log(shnd);
        var bjnode = Main.getS(bjnd)
        let shnode = Main.getS(shnd)
        let hznode = Main.getS(hznd)
        let sznode = Main.getS(sznd)
        let gznode = Main.getS(gznd) 
        nodejs.push(bjnode,shnode,hznode,sznode,gznode)
        console.log(nodejs); 
        res.render('echarts.html',{
          nodejs
        })
     }).catch(err =>{
        next(err)
    }) */
    res.render('echarts.html')
    
})
module.exports = router;