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
  // 加减
  handershuj(e) {
    // 获取传递过来的值
    const { operation, id } = e.currentTarget.dataset
    // 获取购物车数组
    let { cartlist } = this.data
    let then = this
    // 找到需要修改的商品的索引
    const index = cartlist.findIndex(v => v.goods_id === id)
    // 判断是否小于1要删除
    if (cartlist[index].num === 1 && operation === -1) {
      // 弹框提示
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success(res) {
          if (res.confirm) {
            cartlist.splice(index, 1)
            then.setCart(cartlist)
          } else if (res.cancel) {
            console.log("用户点击取消")
          }
        }
      })
    } else {

    }
    // 进行修改数量
    cartlist[index].num += operation
    // 设置回缓存和data中
    this.setCart(cartlist)

  },
  // 点击 收货地址
  async hearder() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();  //获取用户的当前设置。
      const scopeAddress = res1.authSetting["scope.address"];
      console.log(scopeAddress)
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
  // 全选反选
  headitemall() {
    let { cartlist, allcheck } = this.data

    allcheck = !allcheck

    cartlist.forEach(v => v.checked = allcheck)

    this.setCart(cartlist)
  },
  // 商品选中
  headitemalldaata(e) {
    // 获取商品修改id
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let { cartlist } = this.data
    // 找到被修改的商品对象
    let index = cartlist.findIndex(v => v.goods_id === goods_id);
    // 选中状态取反
    cartlist[index].checked = !cartlist[index].checked

    this.setCart(cartlist)
  },
  // 结算
  handjiasuan() {
    const { address, totalNum } = this.data
    // 收货
    if (!address.userName) {
      wx.showToast({
        title: '您还没有收货地址',
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (res) => {
          console.log(res)
        },
      })
      return
    }
    // 商品
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有添加商品',
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (res) => {
          console.log(res)
        },
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
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
    // this.fyh()
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