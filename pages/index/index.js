//index.js
import util from '../../utils/util.js';

//推荐请求地址
const tuiUrl = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
//排行榜请求地址
const paiUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
//热门搜索
const hotKey = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
//搜索接口
const search = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";




Page({
  data: {
    nowNav: 2,
    tuiData: {},   //推荐的数据
    orderData: [],  //排行榜的数据
    ifLoading: true,   //默认是显示loading图
    ifClear: false,
    inputVal: '',
    ifCancel: false,
    hotKey: {},   //存储热门搜索的数据
    randNum: 3,
    ifSearch: true,
    list: []
  },
  onLoad: function () {
    var that = this;
    //推荐的请求
    wx.request({
      url: tuiUrl,
      method: 'GET', 
      success: function(res){
        // success
        console.log(res);
        var resData = res.data.data;
        //因为当前的this不是指向的的Page,所以要使用that.
        that.setData({
          tuiData: resData
        });
      }
    });


    //排行榜的请求
    wx.request({
      url: paiUrl,
      data: {
        format: 'json'
      },
      method: 'GET', 
      success: function(res){
        // success
        console.log(res.data.data.topList);  //拿到排行榜的数据
        var data  =res.data.data.topList;
        for(var i=0;i<data.length;i++){
          data[i].listenCount = util.formatSong(data[i].listenCount)
        };

        that.setData({
          orderData: data,
          ifLoading: false   //这里已经拿到数据了了，所以需要把把ifLoading 设置为为false
        })

      }
    });

    //热门搜索的数据
    wx.request({
      url: hotKey,
      data: {},
      method: 'GET', 
      success: function(res){
        // success
        console.log(res.data.data);
        that.setData({
          hotKey: res.data.data
        })
      }
    })

  },


  //定义菜单切换的函数
  changeNav(e){
    //获取当前元素的的data-index的值  ＝＝＝＝ e.target.dataset.index
    //e.target ===表示当前元素
   let index = e.target.dataset.index;

   this.setData({
     nowNav: index
   });

   //判断排行榜的数据有没有，如果有就把ifLoading设置为为false
   if(this.data.orderData.length){
     this.setData({
       ifLoading: false
     })
   };

   if(index == 2){
     this.setData({
       randNum: Math.floor(Math.random()*11) + 1 
     })
     console.log(Math.floor(Math.random()*11));
   }
   
  },


  //搜索输入框输入文字的时候触发的函数
  inputChange(e){
    console.log(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
    if(e.detail.value.length){
      this.setData({
        ifClear: true
      })
    }else{
      this.setData({
        ifClear: false
      })
    }
  },


  //输入框清空文字
  clear(e){
    console.log(11);
    this.setData({
      inputVal: '',
      ifClear: false
    });
  },


  //输入框获取焦点触发的函数
  inputfoucs(){
    this.setData({
      ifCancel: true,
      ifSearch: false
    })
  },

  //取消按钮点击事件
  cancel(){
    this.setData({
      ifCancel: false,
      inputVal: '',
      ifClear: false,
      ifSearch: true
    })
  },

  keySearch(e){
    //console.log(e.target.dataset.text);
    this.setData({
      inputVal: e.target.dataset.text,
      ifCancel: true,
      ifClear: true,
      ifSearch: false
    });

    this.search();
  },

  //搜索
  search(){
    var that = this;
    //搜索狂的文字  this.data.inputVal
    wx.request({
      url: search,
      data: {
        format: 'json',
        w: this.data.inputVal
      },
      method: 'GET',
      success: function(res){
        // success
        console.log(res.data.data.song.list);
        that.setData({
          list: res.data.data.song.list
        })
      }
    })
  },

  //输入框按回车的时候触发
  enter(){
    this.search();
  },

  //弹框
  showToast(){
    wx.showModal({
      title: '提示',
      content: '暂时播放不了这首歌曲了',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })

  }


})








