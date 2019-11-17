Component({
  /**
   * 组件的属性列表
   * 组件中除了data中的数据可以被wxml使用，properties中的属性也可以，比如like, count
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      if (this.properties.readOnly)
        return
      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1;
      this.setData({
        like: !like,
        count: count
      });

      let behavior = this.properties.like ? 'like' : 'cancel';
      /**
       * 激活自定义事件
       * 第一个参数：自定义事件的名称
       * 第二个参数：传递自定义属性
       * 第二个参数：一般不需要使用
       *  bubbles：事件是否冒泡，默认false
       *  composed：事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部，默认false
       *  capturePhase：事件是否拥有捕获阶段，默认false
       */
      this.triggerEvent('like', {
        behavior: behavior
      }, {});
    }
  }
})
