// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车数据
    cartlist: [],
    // 地址数据
    address: {},
    allcheck: false,
    // 商品价格
    totalPrice: 0,
    // 商品数量
    totalNum: 0
  },
  // 点击 收货地址
  async hearder() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();  //获取用户的当前设置。
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();   //调起客户端小程序设置界面，返回用户设置的操作结果
      }
      // 4 调用获取收货地址的 api   获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;

      // 5 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },

  // 支付
  handjiasuan() {

  },
  // 封装
  setCart(cartlist) {
    let allcheck = true

    // 商品价格数量
    let totalPrice = 0
    let totalNum = 0

    cartlist.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allcheck = false
      }
    })
    allcheck = cartlist.length != 0 ? allcheck : false

    // 把购物车数据重新设置回data中和缓存中
    this.setData({
      cartlist,
      totalPrice,
      totalNum,
      allcheck
    })
    wx.setStorageSync('cart', cartlist)

  },
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {

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
    const address = wx.getStorageSync("address")
    // 购物车数据
    let cartlist = wx.getStorageSync("cart") || []

    let allcheck = true

    // 商品价格数量
    let totalPrice = 0
    let totalNum = 0

    cartlist.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allcheck = false
      }
    })
    allcheck = cartlist.length != 0 ? allcheck : false

    // 给data赋值
    this.setData({
      address,
      cartlist,
      totalPrice,
      totalNum,
      allcheck
    })
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