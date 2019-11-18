import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from "../../models/book.js"
import {
  paginationBeh
} from "../behaviors/pagination.js";

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({

  behaviors: [paginationBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    hotWords: Array,
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingAnimation: false
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      const word = event.detail.value || event.detail.text
      if (!word || !word.trim())
        return
      this._showLoadingAnimation()
      this._showResult()
      this.setData({
        q: word
      })

      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
        this._hideLoadingAnimation()
      })
    },

    onDelete(event) {
      this._hideLoadingAnimation()
      this.initialize()
      this._closeResult()
    },

    loadMore() {

      if (!this.data.q) return
      if (this._isLocked()) return

      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      }
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },

    _showLoadingAnimation() {
      this.setData({
        loadingAnimation: true
      })
    },

    _hideLoadingAnimation() {
      this.setData({
        loadingAnimation: false
      })
    }
  }
})
