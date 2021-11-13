
const puppeteer = require('puppeteer');
const fs = require('fs')
const router = require('./router/router')
const express = require('express')

let app = express()
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('express-art-template'))

app.use(express.static('public'))
app.use(router)
const url = 'https://www.zhipin.com/';


//方法一
/* (async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo:500,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  let job = ['nodejs', 'java', 'python', 'c++', 'php','golang']
  let city = ['c101020100', 'c101010100', 'c101280600', 'c101210100', 'c101280100']
  let data = []
  for(let c = 0; c < city.length; c++){
    for(let j =0; j < job.length; j++){
      for(let i = 1; i <= 2; i++){
        await page.goto(url +`${city[c]}/?query=${job[j]}&page=${i}`);
        await page.waitForSelector('#main > div > div.job-list > ul>li')
        let salary = await page.$$eval(
          ".job-primary .info-primary .primary-box .job-limit .red",
          (el) => el.map((h) => h.innerText)
        );
    
        data.push({
          salary:salary
        })
      }
      data.push({
        job:job[j]
      })
    }
    data.push({
      city:city[c]
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
(async () => {
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

app.listen(3000,()=>{
  console.log('Running..............');
})


module.exports = app;