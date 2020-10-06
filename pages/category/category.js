// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catelist: [],
    // 左数据
    cateleftlist: [],
    // 右数据
    caterightlist: [],
    // 对应数据开头
    scrollTop: 0
  },
  // toogle(e) {
  //   console.log(e)
  //   wx.navigateTo({

  //   })
  // },
  // tiao(e) {
  //   var id = e.currentTarget.dataset.id
  //   console.log(id)
  //   wx.navigateTo({
  //     url: '/pages/shanglie/shanglie?cid='+id,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.catleftlist()

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  catleftlist() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      method: 'GET',
      success: res => {
        // console.log(res)
        this.catelist = res.data.message
        // 把接口数据保存到本地
        wx.setStorageSync('carts', { time: Date.now(), data: this.catelist })
        // let
        console.log(this.catelist)
        let cateleftlist = this.catelist.map(v => v.cat_name)
        let caterightlist = this.catelist[0].children
        // console.log(caterightlist)
        // console.log(cateleftlist)
        this.setData({
          cateleftlist,
          caterightlist
        })
      }
    })
  },
  // 点击左边切换数据
  hander(e) {
    let index = e.currentTarget.dataset.index
    // console.log(index)
    let caterightlist = this.catelist[index].children
    this.setData({
      caterightlist,
      scrollTop: 0
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})