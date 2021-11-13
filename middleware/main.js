const fs = require('fs')
module.exports = {

    getBossZpData() {
        return new  Promise((resolve,reject)=>{
          fs.readFile('./data.json',(err,data)=>{
            if(err){
              console.log('读取失败');
              reject(err)
            }else{
              resolve(data)
            }
          })
        })  
      },


      getLiePinData() {
        return new  Promise((resolve,reject)=>{
          fs.readFile('./liepin.json',(err,data)=>{
            if(err){
              console.log('读取失败');
              reject(err)
            }else{
              resolve(data)
            }
          })
        })  
      } ,

      getRandomArr(arr, count) {//随机抽取
        let newArr = []
        for(let j = 0,v=arr.length;j<v;j++){
          if(arr[j].length>5){
            newArr.push(arr[j])
          }
        }
        var shuffled = newArr.slice(0), i = newArr.length, min = i - count, temp, index;	
        while (i-- > min) {//打乱数组
          index = Math.floor((i + 1) * Math.random());			
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }		
        return shuffled.slice(min);
      },

      getS(arr){
          let sum = 0
          for(let i = 0,v=arr.length;i<v;i++){
            var avar =(parseInt(arr[i].substring(1,2))+ parseInt(arr[i].substring(4,5)))/2
            sum = sum + avar
          }
          let avarage = sum/arr.length
          return avarage
        
        
      }
}