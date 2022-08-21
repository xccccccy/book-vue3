'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
require('../../../hooks/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElStep",
  components: {
    ElIcon: index.ElIcon,
    Close: iconsVue.Close,
    Check: iconsVue.Check
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "",
      validator: (val) => ["", "wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  setup(props) {
    const ns = index$1.useNamespace("step");
    const index = vue.ref(-1);
    const lineStyle = vue.ref({});
    const internalStatus = vue.ref("");
    const parent = vue.inject("ElSteps");
    const currentInstance = vue.getCurrentInstance();
    vue.onMounted(() => {
      vue.watch([
        () => parent.props.active,
        () => parent.props.processStatus,
        () => parent.props.finishStatus
      ], ([active]) => {
        updateStatus(active);
      }, { immediate: true });
    });
    vue.onBeforeUnmount(() => {
      parent.steps.value = parent.steps.value.filter((instance) => instance.uid !== currentInstance.uid);
    });
    const currentStatus = vue.computed(() => {
      return props.status || internalStatus.value;
    });
    const prevStatus = vue.computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    });
    const isCenter = vue.computed(() => {
      return parent.props.alignCenter;
    });
    const isVertical = vue.computed(() => {
      return parent.props.direction === "vertical";
    });
    const isSimple = vue.computed(() => {
      return parent.props.simple;
    });
    const stepsCount = vue.computed(() => {
      return parent.steps.value.length;
    });
    const isLast = vue.computed(() => {
      var _a;
      return ((_a = parent.steps.value[stepsCount.value - 1]) == null ? void 0 : _a.uid) === currentInstance.uid;
    });
    const space = vue.computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });
    const style = vue.computed(() => {
      const style2 = {
        flexBasis: typeof space.value === "number" ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value)
        return style2;
      if (isLast.value) {
        style2.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style2;
    });
    const setIndex = (val) => {
      index.value = val;
    };
    const calcProgress = (status) => {
      let step = 100;
      const style2 = {};
      style2.transitionDelay = `${150 * index.value}ms`;
      if (status === parent.props.processStatus) {
        step = 0;
      } else if (status === "wait") {
        step = 0;
        style2.transitionDelay = `${-150 * index.value}ms`;
      }
      style2.borderWidth = step && !isSimple.value ? "1px" : 0;
      style2[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
      lineStyle.value = style2;
    };
    const updateStatus = (activeIndex) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevStatus.value !== "error") {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
      const prevChild = parent.steps.value[stepsCount.value - 1];
      if (prevChild)
        prevChild.calcProgress(internalStatus.value);
    };
    const stepItemState = vue.reactive({
      uid: vue.computed(() => currentInstance.uid),
      currentStatus,
      setIndex,
      calcProgress
    });
    parent.steps.value = [...parent.steps.value, stepItemState];
    return {
      ns,
      index,
      lineStyle,
      currentStatus,
      isCenter,
      isVertical,
      isSimple,
      isLast,
      space,
      style,
      parent,
      setIndex,
      calcProgress,
      updateStatus
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_check = vue.resolveComponent("check");
  const _component_close = vue.resolveComponent("close");
  return vue.openBlock(), vue.createElementBlock("div", {
    style: vue.normalizeStyle(_ctx.style),
    class: vue.normalizeClass([
      _ctx.ns.b(),
      _ctx.ns.is(_ctx.isSimple ? "simple" : _ctx.parent.props.direction),
      _ctx.ns.is("flex", _ctx.isLast && !_ctx.space && !_ctx.isCenter),
      _ctx.ns.is("center", _ctx.isCenter && !_ctx.isVertical && !_ctx.isSimple)
    ])
  }, [
    vue.createCommentVNode(" icon & line "),
    vue.createElementVNode("div", {
      class: vue.normalizeClass([_ctx.ns.e("head"), _ctx.ns.is(_ctx.currentStatus)])
    }, [
      !_ctx.isSimple ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass(_ctx.ns.e("line"))
      }, [
        vue.createElementVNode("i", {
          class: vue.normalizeClass(_ctx.ns.e("line-inner")),
          style: vue.normalizeStyle(_ctx.lineStyle)
        }, null, 6)
      ], 2)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", {
        class: vue.normalizeClass([_ctx.ns.e("icon"), _ctx.ns.is(_ctx.icon ? "icon" : "text")])
      }, [
        _ctx.currentStatus !== "success" && _ctx.currentStatus !== "error" ? vue.renderSlot(_ctx.$slots, "icon", { key: 0 }, () => [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
            key: 0,
            class: vue.normalizeClass(_ctx.ns.e("icon-inner"))
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon)))
            ]),
            _: 1
          }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
          !_ctx.icon && !_ctx.isSimple ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: vue.normalizeClass(_ctx.ns.e("icon-inner"))
          }, vue.toDisplayString(_ctx.index + 1), 3)) : vue.createCommentVNode("v-if", true)
        ]) : (vue.openBlock(), vue.createBlock(_component_el_icon, {
          key: 1,
          class: vue.normalizeClass([_ctx.ns.e("icon-inner"), _ctx.ns.is("status")])
        }, {
          default: vue.withCtx(() => [
            _ctx.currentStatus === "success" ? (vue.openBlock(), vue.createBlock(_component_check, { key: 0 })) : (vue.openBlock(), vue.createBlock(_component_close, { key: 1 }))
          ]),
          _: 1
        }, 8, ["class"]))
      ], 2)
    ], 2),
    vue.createCommentVNode(" title & description "),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("main"))
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass([_ctx.ns.e("title"), _ctx.ns.is(_ctx.currentStatus)])
      }, [
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
        ])
      ], 2),
      _ctx.isSimple ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass(_ctx.ns.e("arrow"))
      }, null, 2)) : (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: vue.normalizeClass([_ctx.ns.e("description"), _ctx.ns.is(_ctx.currentStatus)])
      }, [
        vue.renderSlot(_ctx.$slots, "description", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.description), 1)
        ])
      ], 2))
    ], 2)
  ], 6);
}
var Step = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Step;
//# sourceMappingURL=item.js.map
