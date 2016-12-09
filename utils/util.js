import Promise from './es6-promise.min.js';

let url = 'http://route.showapi.com/213-4';



function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}




module.exports = {
  getHot(topid){
    return new Promise((resolve,reject) => {
      wx.request({
        url: url,
        data: {
          showapi_appid: 28591,
          showapi_sign: '75a0f34454064097bb728f431c2e5195',
          topid: topid
        },
        method: 'GET', 
        success: function(res){
          // success
          console.log(res);
          resolve(res)
        },
        fail: function(res) {
          // fail
          reject(res);
          console.log(res)
        },
        complete: function() {
          // complete
          console.log('完成')
        }
      })
    })
  }
}
