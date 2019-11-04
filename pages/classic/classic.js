import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   * setData的变量如果不存在则先创建再更新数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log(res);
      // 数据更新
      this.setData({
        classicData: res
      });
    });
  },

  /**
   * 自定义监听事件
   */
  onLike: function (event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
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