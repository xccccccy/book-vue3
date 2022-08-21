'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../icon/index.js');
require('../../../hooks/index.js');
var timelineItem = require('./timeline-item.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElTimelineItem",
  components: {
    ElIcon: index.ElIcon
  },
  props: timelineItem.timelineItemProps,
  setup() {
    const ns = index$1.useNamespace("timeline-item");
    return {
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  return vue.openBlock(), vue.createElementBlock("li", {
    class: vue.normalizeClass([_ctx.ns.b(), { [_ctx.ns.e("center")]: _ctx.center }])
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("tail"))
    }, null, 2),
    !_ctx.$slots.dot ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass([
        _ctx.ns.e("node"),
        _ctx.ns.em("node", _ctx.size || ""),
        _ctx.ns.em("node", _ctx.type || ""),
        _ctx.ns.is("hollow", _ctx.hollow)
      ]),
      style: vue.normalizeStyle({
        backgroundColor: _ctx.color
      })
    }, [
      _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
        key: 0,
        class: vue.normalizeClass(_ctx.ns.e("icon"))
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon)))
        ]),
        _: 1
      }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
    ], 6)) : vue.createCommentVNode("v-if", true),
    _ctx.$slots.dot ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 1,
      class: vue.normalizeClass(_ctx.ns.e("dot"))
    }, [
      vue.renderSlot(_ctx.$slots, "dot")
    ], 2)) : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("wrapper"))
    }, [
      !_ctx.hideTimestamp && _ctx.placement === "top" ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass([_ctx.ns.e("timestamp"), _ctx.ns.is("top")])
      }, vue.toDisplayString(_ctx.timestamp), 3)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.ns.e("content"))
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 2),
      !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: vue.normalizeClass([_ctx.ns.e("timestamp"), _ctx.ns.is("bottom")])
      }, vue.toDisplayString(_ctx.timestamp), 3)) : vue.createCommentVNode("v-if", true)
    ], 2)
  ], 2);
}
var TimelineItem = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = TimelineItem;
//# sourceMappingURL=timeline-item2.js.map
