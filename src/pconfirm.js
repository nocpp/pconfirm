/**
 * 对话框插件
 * 依赖文件: vue, pconfirm.css
 * 使用方法: Vue.use(Pconfirm), Pconfirm.show({参数})
 * 参数:
 * @param {String} icon 要显示的图标路径(必填)
 * @param {String} desc 要显示的提示文字(必填)
 * @param {Boolean} cancelShow 是否显示取消按钮
 * @param {Boolean} autoDisappear 是否自动消失
 * @param {Function} sure 点击确定回调函数
 * @param {Function} cancel 点击取消回调函数
 */
var pconfirm = Vue.extend({
  template: '\
    <transition name="fade">\
        <div v-show="isShowFlag">\
          <div class="com-comfirm">\
              <div class="com-comfirm-content">\
                <div class="com-comfirm-icon-wrap">\
                  <img :src="icon" alt="">\
                </div>\
                <div class="com-comfirm-desc">\
                  {{desc}}\
                </div>\
              </div>\
              <div class="com-comfirm-foot" v-show="!autoDisappear">\
                <div class="com-comfirm-cancel" v-show="cancelShow" @click="handleCancel">取消</div>\
                <div @click="handleSure">确定</div>\
              </div>\
            </div>\
            <div class="my-mask"></div>\
        </div>\
    </transition>',

  data: function () {
    return {
      isShowFlag: false,   //是否显示对话框
      icon: '',            //图标
      desc: '',            //说明文字
      cancelShow: false,   //是否显示取消按钮
      autoDisappear: true //是否自动消失
    }
  },

  methods: {
    initData: function (_data, _methods) {
        var that = this;

        this.isShowFlag = false;
        this.icon = '';
        this.desc = '';
        this.cancelShow = false;
        this.autoDisappear = true;

        Object.assign(this.$data, _data);
        Object.assign(this, _methods);

        if (this.autoDisappear) {
          setTimeout(function () {
            that.hide();
          }, 2000);
        }
    },

    handleSure: function () {
      this.sure && this.sure();
      this.hide();
    },

    handleCancel: function () {
      this.cancel && this.cancel();
      this.hide();
    },

    show: function () {
      this.isShowFlag = true;
    },

    hide: function () {
      this.isShowFlag = false;
    }
  }
});

var Pconfirm = {};
Pconfirm.install = function (Vue, options) {
  var confirmObj;

  var initInstance = function () {
      confirmObj = new pconfirm();
      var component = confirmObj.$mount();
      document.getElementById('app').appendChild(component.$el);
  };

  this.show = function (_option) {
    if (!confirmObj) {
      initInstance();
    }

    var data = {}, methods = {};
    for (var key in _option) {
      if (typeof _option[key] === 'function') {
        methods[key] = _option[key];
      } else {
        data[key] = _option[key];
      }
    }

    confirmObj.initData(data, methods);

    confirmObj.show();
  };
};
