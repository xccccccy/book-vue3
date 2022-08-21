'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var props = require('../../../utils/vue/props.js');
var index = require('../../../hooks/use-namespace/index.js');

const spaceItem = props.buildProps({
  prefixCls: {
    type: String,
    default: ""
  }
});
const _sfc_main = vue.defineComponent({
  props: spaceItem,
  setup(props) {
    const ns = index.useNamespace("space");
    const classes = vue.computed(() => `${props.prefixCls || ns.b()}__item`);
    return {
      classes
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.classes)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Item = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Item;
//# sourceMappingURL=item.js.map
