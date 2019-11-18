import {
  LikeModel
} from "../../models/like.js";

const likeModel = new LikeModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer: function (newVal) {
        if (newVal) {
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          } [newVal.type]
        }
        this.setData({
          typeText,
          bookId: newVal.id,
          category: newVal.type
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: '',
    bookId: 0,
    category: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      const like_or_cancel = event.detail.behavior
      likeModel.like(like_or_cancel, this.data.bookId, this.data.category)
    },
  }
})
