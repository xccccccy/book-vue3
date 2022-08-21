'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var thumb = require('./thumb2.js');
var bar = require('./bar.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = vue.defineComponent({
  components: {
    Thumb: thumb["default"]
  },
  props: bar.barProps,
  setup(props) {
    const moveX = vue.ref(0);
    const moveY = vue.ref(0);
    const GAP = 4;
    const handleScroll = (wrap) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP;
        const offsetWidth = wrap.offsetWidth - GAP;
        moveY.value = wrap.scrollTop * 100 / offsetHeight * props.ratioY;
        moveX.value = wrap.scrollLeft * 100 / offsetWidth * props.ratioX;
      }
    };
    return {
      handleScroll,
      moveX,
      moveY
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_thumb = vue.resolveComponent("thumb");
  return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createVNode(_component_thumb, {
      move: _ctx.moveX,
      ratio: _ctx.ratioX,
      size: _ctx.width,
      always: _ctx.always
    }, null, 8, ["move", "ratio", "size", "always"]),
    vue.createVNode(_component_thumb, {
      move: _ctx.moveY,
      ratio: _ctx.ratioY,
      size: _ctx.height,
      vertical: "",
      always: _ctx.always
    }, null, 8, ["move", "ratio", "size", "always"])
  ], 64);
}
var Bar = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Bar;
//# sourceMappingURL=bar2.js.map
