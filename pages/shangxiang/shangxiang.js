// pages/shangxiang/shangxiang.js
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist: [],
  },
  zong: {},
  // 商品对象
  goodsinfo: {},
  // 图片地址
  picurl: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const { goods_id } = options
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail', data: { goods_id },
      method: 'GET',
      success: res => {
        console.log(res)
        this.picurl = res.data.message.pics
        console.log(this.picurl)
        this.setData({
          goodslist: res.data.message,
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
  // 预览图片
  yulan(e) {
    // 预览图片的数组
    const url = this.picurl.map(v => v.pics_mid)
    // 接收传过来的图片url
    const cueer = e.currentTarget.dataset.url
    wx.previewImage({
      current: cueer, // 当前显示图片的http链接
      urls: url // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  haderadd() {
    // 获取本地缓存的数据
    let cart = wx.getStorageSync("cart") || [];
    console.log(cart)

    // 判断对象是否在购物车数据中
    let index = cart.findIndex(v => v.goods_id === this.data.goodslist.goods_id)
    console.log(index)
    if (index === -1) { 
      // 不存在第一次添加
      this.data.goodslist.num = 1
      this.data.goodslist.checked = true
      console.log(this.data.goodslist)

      cart.push(this.data.goodslist)
    } else {
      // 已经存在执行++
      cart[index].num++
    }

    // console.log(cart[index].num)
    // 把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart)

    // 弹框提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮
      mask: true,
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