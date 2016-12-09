//index.js
//获取应用实例
var app = getApp();

import util from '../../utils/util.js';


Page({
  data: {
    pageIndex: 0,
    ea: [],
    tabList: [
      {
        "text": "推荐",
        "active": true
      },
      {
        "text": "排行榜",
        "active": false
      },{
        "text": "搜索",
        "active": false
      }
    ],
    imgUrls: [
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000000VAaxp2IgYHX.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000001yfRAk36HJlK.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000000YW3xw39MOCT.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000004Ngsa143WR3B.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000003VLeCX4aXoWV.jpg?max_age=2592000"
    ],
    topListIcons: [
      "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_3_300_108654017.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_5_300_109391904.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_6_300_109274122.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_16_300_109007971.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_17_300_107762026.jpg?max_age=2592000",
      "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_26_300_109391904.jpg?max_age=2592000"
    ]
  },
  onLoad: function () {

  },
  tabChange: function(e){
    var list = this.data.tabList;
    var index = e.target.dataset.index;
    var that = this;

    list.forEach(function(value,key){
      value.active = false;
      if(key == e.target.dataset.index){
        value.active = true;
      }
    });
    this.setData({ tabList: list});
    this.setData({pageIndex: e.target.dataset.index});


    if(index == 1){
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 100000
      })

//       榜行榜id
// 3=欧美
// 5=内地
// 6=港台
// 16=韩国
// 17=日本
// 26=热歌
      util.getHot(3).then(function(res){
        that.setData({ ea: res.data.showapi_res_body.pagebean.songlist});
        wx.setStorage({
          key:"ea",
          data:res.data.showapi_res_body.pagebean.songlist
        })
      });

      util.getHot(5).then(function(res){
        console.log(res.data.showapi_res_body.pagebean.songlist);
        that.setData({ inland: res.data.showapi_res_body.pagebean.songlist});
        wx.setStorage({
          key:"inland",
          data:res.data.showapi_res_body.pagebean.songlist
        })
      });

      util.getHot(6).then(function(res){
        that.setData({ hongkong: res.data.showapi_res_body.pagebean.songlist});
        wx.setStorage({
          key:"hongkong",
          data:res.data.showapi_res_body.pagebean.songlist
        })
      });

      util.getHot(16).then(function(res){
        that.setData({ korea: res.data.showapi_res_body.pagebean.songlist});
        wx.setStorage({
          key:"korea",
          data:res.data.showapi_res_body.pagebean.songlist
        })
      });

      util.getHot(17).then(function(res){
        that.setData({ japan: res.data.showapi_res_body.pagebean.songlist});
        wx.setStorage({
          key:"japan",
          data:res.data.showapi_res_body.pagebean.songlist
        });
        util.getHot(26).then(function(res){
          that.setData({ hot: res.data.showapi_res_body.pagebean.songlist});
           wx.hideToast();
           wx.setStorage({
            key:"hot",
            data:res.data.showapi_res_body.pagebean.songlist
          })
        });
      });

      

    }



  }
})
