Page({
    data: {

    },
    onLoad: function(){
        var that = this;

        wx.getStorage({
            key: 'ea',
            success: function(res) {
                console.log(res.data);
                that.setData({ 'data': res.data})
            } 
        })
    }
})