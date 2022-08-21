'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../constants/index.js');
require('../../../hooks/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var event = require('../../../constants/event.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElSteps",
  props: {
    space: {
      type: [Number, String],
      default: ""
    },
    active: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (val) => ["horizontal", "vertical"].includes(val)
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    finishStatus: {
      type: String,
      default: "finish",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    },
    processStatus: {
      type: String,
      default: "process",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  emits: [event.CHANGE_EVENT],
  setup(props, { emit }) {
    const ns = index.useNamespace("steps");
    const steps = vue.ref([]);
    vue.watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    vue.provide("ElSteps", { props, steps });
    vue.watch(() => props.active, (newVal, oldVal) => {
      emit(event.CHANGE_EVENT, newVal, oldVal);
    });
    return {
      steps,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([_ctx.ns.b(), _ctx.ns.m(_ctx.simple ? "simple" : _ctx.direction)])
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Steps = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Steps;
//# sourceMappingURL=index.js.map
