import { request } from "../../request/index"
Page({
    data: {
        // 轮播图
        swerplist: [],
        // 导航
        tablist: [],
        // 楼层标题
        floot: [],
        // 楼层九宫
        flootile: [],
        yan: "yellow"
    },
    toogle(e) {
        // console.log(e)
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },
    // 页面开始加载时触发
    onLoad: function () {

        this.spwer()
        this.table()
        this.flooat()

        wx.showLoading({
            title: '加载中',
          })
      
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
    },
    // 轮播图
    spwer() {
        request({ url: '/swiperdata' }).then(res => {
            // console.log(res)
            this.setData({
                swerplist: res.data.message

            })
        })
    },
    // 导航
    table() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
            method: "GET",
            success: res => {
                console.log(res)
                this.setData({
                    tablist: res.data.message
                })
            }
        })
    },
    // 楼层
    flooat() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
            method: "GET",
            success: res => {
                //   console.log(res)
                this.setData({
                    floot: res.data.message,
                })
                //   console.log(floot)
            }
        })
    }
})