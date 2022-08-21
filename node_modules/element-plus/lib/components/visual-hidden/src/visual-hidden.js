'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = vue.defineComponent({
  name: "ElVisuallyHidden",
  props: {
    style: {
      type: [String, Object, Array]
    }
  },
  setup(props) {
    return {
      computedStyle: vue.computed(() => {
        return [
          props.style,
          {
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal"
          }
        ];
      })
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", vue.mergeProps(_ctx.$attrs, { style: _ctx.computedStyle }), null, 16);
}
var ElVisuallyHidden = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = ElVisuallyHidden;
//# sourceMappingURL=visual-hidden.js.map
