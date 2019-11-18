import {
  ClassicModel
} from "../../models/classic.js";
import {
  BookModel
} from "../../models/book.js";

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data.userInfo.nickName)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          });
        } else {
          this.setData({
            authorized: false,
            userInfo: null
          })
        }
      }
    })
  },

  userAuthorized1() {
    promisic(wx.getSetting)().then(data => {
      if (data.authSetting['scope.userInfo']) {
        return promisic(wx.getUserInfo)()
      }
      return false
    }).then(data => {
      if (!data)  return
      this.setData({
        authorized: true,
        userInfo: data.userInfo
      })
    })
  },

  async userAuthorized2() {
    const data = await promisic(wx.getSetting)()
    if (data.authSetting['scope.userInfo']) {
      const res = await promisic(wx.getUserInfo)()
      if (!res) return
      const userInfo = res.userInfo
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
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
    this.userAuthorized2()
    this.getMyBookCount()
    this.getMyFavor()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      classics: null
    })
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