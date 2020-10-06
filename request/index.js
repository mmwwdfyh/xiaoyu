export const request = (params) => {
  // 定义公共路径
  const basurl = "https://api-hmugo-web.itheima.net/api/public/v1/home"
  return new Promise((resolve, rejects) => {
    wx.request({
      ...params,
      url:basurl+params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}