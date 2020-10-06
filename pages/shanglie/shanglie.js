// pages/shanglie/shanglie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 0,
        value: "销量",
        isActive: false
      },
      {
        id: 0,
        value: "价格",
        isActive: false
      }
    ],
    shanglist: []
  },
  toogle(e) {
    // console.log(e)
  },
  querpams: {
    query: '',
    cid: '',
    // 页数
    pagenum: 1,
    // 条数
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.querpams.cid = options.cid
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search', data: this.querpams,
      method: 'GET',
      success: res => {
        console.log(res)
        const total = res.total
        // 计算总页数
        this.totalPages = Math.ceil(total / this.querpams.pagesize)
        this.setData({
          shanglist: [...this.data.shanglist, ...res.data.message.goods]
        })
      }
    })


    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  // 页面上滑加载数据
  onReachBottom() {
    // if(this.querpams.pagenum>=this.totalPages){
    //   // 没有下一页了
    //   console.log('myl')
    // }else{
    //   this.querpams.pagenum++
    // }
    console.log(1)
  },
  // 下拉
  onPullDownRefresh(){
    console.log(11)
  }, 
   handleTabsItemChange(e) {
    // console.log(e)
    // 点击时的标题索引
    const index = e.detail.index
    // console.log(index)
    // 修改原数组
    let {tabs} = this.data
    // console.log(tabs)
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // 赋值
    this.setData({
      tabs
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