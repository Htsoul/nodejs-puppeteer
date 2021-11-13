
const puppeteer = require('puppeteer');
const fs = require('fs')
const express = require('express')

let app = express()
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('express-art-template'))

app.use(express.static('public'))
const url = 'https://www.liepin.com/zhaopin/';


//方法一
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo:500,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  let job = ['nodejs', 'java', 'python', 'c++', 'php','golang']
  let city = ['010','020','070020','050090','050020']
  let data = []
  for(let c = 0; c < city.length; c++){
    for(let j =0; j < job.length; j++){
      for(let i = 0; i <= 1; i++){
        await page.goto(url +`?key=${job[j]}&dq=${city[c]}&currentPage=${i}`);
        await page.waitForSelector('body > div.common-page-container > div > section.content-left-section > div > ul>li')
        let salary = await page.$$eval(
          ".job-list-item .job-card-left-box .job-detail-header-box .job-salary",
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
})();