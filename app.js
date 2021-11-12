
const puppeteer = require('puppeteer');
const fs = require('fs')
const express = require('express')

let app = express()
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('express-art-template'))

app.use(express.static('public'))

const url = 'https://www.zhipin.com/c101020100-p100114/';


//方法一
/* (async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo:500,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  let data = []
  for(let i = 1; i<=6; i++){
    await page.goto(url + '?page='+i);
    await page.waitForSelector('#main > div > div.job-list > ul>li')
    let job = await page.$$eval(
      ".job-primary .info-primary .primary-box .job-title .job-name a",
      (el) => el.map((h) => h.innerText)
    );
    let area = await page.$$eval(
      ".job-primary .info-primary .primary-box .job-title .job-area-wrapper .job-area",
      (el) => el.map((h) => h.innerText)
    );
    let salary = await page.$$eval(
      ".job-primary .info-primary .primary-box .job-limit .red",
      (el) => el.map((h) => h.innerText)
    );

    data.push({
      job : job,
      area : area,
      salary : salary
    })
  }
  console.log(data); 

   await browser.close();
  fs.writeFile('data.json',JSON.stringify(data,null,'\t'),(err)=>{
    if(err){
      console.log(err);
    }
  }) 
})(); */
 


//方法二
/* (async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo:500,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  let data = []
  for(let i = 1; i<=4; i++){
    await page.goto(url + '?page='+i);
    await page.waitForSelector('#main > div > div.job-list > ul>li')
    const res = await page.evaluate(()=>{
      let $ = window.$
      let info = []
      let item = $('.job-primary .info-primary .primary-box')
      item.each((index,ite)=>{
        let job = $(ite).find('a').text()
        let area = $(ite).find('.job-area').text()
        let salary = $(ite).find('.red').text()
        info.push({
          job : job,
          area : area,
          salary : salary
        })
      })
      return info
    })
    data.push(res)
  }
  console.log(data);
   
  
   await browser.close();
  fs.writeFile('data.json',JSON.stringify(data,null,'\t'),(err)=>{
    if(err){
      console.log(err);
    }
  }) 
})();
 */



const getData = ()=>{
  return new  Promise((resolve,reject)=>{
    fs.readFile('data.json',(err,data)=>{
      if(err){
        console.log('读取失败');
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
  
} 

app.get('/',(req,res)=>{
  let tag = parseInt(req.query.tag)
  console.log(tag);
  getData().then(result =>{ 
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
  })
})

app.listen(3000,()=>{
  console.log('Running..............');
})

 /*  console.log(cheerio.load(html));
  $('ul > li').each((index,item)=>{
    console.log(index,item);
    job : $('.job-primary .info-primary .primary-box .job-title .job-name a').text()
    area : $('.job-primary .info-primary .primary-box .job-title .job-area-wrapper .job-area').text()
    salary : $('.job-primary .info-primary .primary-box .job-limit .red').text() 
  }) */