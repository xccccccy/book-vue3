'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
require('../../../utils/index.js');
require('../../../tokens/index.js');
require('../../../hooks/index.js');
var bar = require('./bar2.js');
var scrollbar = require('./scrollbar.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/vue/style.js');
var error = require('../../../utils/error.js');
var scrollbar$1 = require('../../../tokens/scrollbar.js');

const _sfc_main = vue.defineComponent({
  name: "ElScrollbar",
  components: {
    Bar: bar["default"]
  },
  props: scrollbar.scrollbarProps,
  emits: scrollbar.scrollbarEmits,
  setup(props, { emit }) {
    const ns = index.useNamespace("scrollbar");
    let stopResizeObserver = void 0;
    let stopResizeListener = void 0;
    const scrollbar$ = vue.ref();
    const wrap$ = vue.ref();
    const resize$ = vue.ref();
    const sizeWidth = vue.ref("0");
    const sizeHeight = vue.ref("0");
    const barRef = vue.ref();
    const moveX = vue.ref(0);
    const moveY = vue.ref(0);
    const ratioY = vue.ref(1);
    const ratioX = vue.ref(1);
    const SCOPE = "ElScrollbar";
    const GAP = 4;
    const style$1 = vue.computed(() => {
      const style2 = {};
      if (props.height)
        style2.height = style.addUnit(props.height);
      if (props.maxHeight)
        style2.maxHeight = style.addUnit(props.maxHeight);
      return [props.wrapStyle, style2];
    });
    const handleScroll = () => {
      var _a;
      if (wrap$.value) {
        (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrap$.value);
        emit("scroll", {
          scrollTop: wrap$.value.scrollTop,
          scrollLeft: wrap$.value.scrollLeft
        });
      }
    };
    const setScrollTop = (value) => {
      if (!core.isNumber(value)) {
        error.debugWarn(SCOPE, "value must be a number");
        return;
      }
      wrap$.value.scrollTop = value;
    };
    const setScrollLeft = (value) => {
      if (!core.isNumber(value)) {
        error.debugWarn(SCOPE, "value must be a number");
        return;
      }
      wrap$.value.scrollLeft = value;
    };
    const update = () => {
      if (!wrap$.value)
        return;
      const offsetHeight = wrap$.value.offsetHeight - GAP;
      const offsetWidth = wrap$.value.offsetWidth - GAP;
      const originalHeight = offsetHeight ** 2 / wrap$.value.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap$.value.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);
      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
    };
    vue.watch(() => props.noresize, (noresize) => {
      if (noresize) {
        stopResizeObserver == null ? void 0 : stopResizeObserver();
        stopResizeListener == null ? void 0 : stopResizeListener();
      } else {
        ;
        ({ stop: stopResizeObserver } = core.useResizeObserver(resize$, update));
        stopResizeListener = core.useEventListener("resize", update);
      }
    }, { immediate: true });
    vue.watch(() => [props.maxHeight, props.height], () => {
      if (!props.native)
        vue.nextTick(() => {
          var _a;
          update();
          if (wrap$.value) {
            (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrap$.value);
          }
        });
    });
    vue.provide(scrollbar$1.scrollbarContextKey, vue.reactive({
      scrollbarElement: scrollbar$,
      wrapElement: wrap$
    }));
    vue.onMounted(() => {
      if (!props.native)
        vue.nextTick(() => update());
    });
    return {
      ns,
      scrollbar$,
      wrap$,
      resize$,
      barRef,
      moveX,
      moveY,
      ratioX,
      ratioY,
      sizeWidth,
      sizeHeight,
      style: style$1,
      update,
      handleScroll,
      setScrollTop,
      setScrollLeft
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bar = vue.resolveComponent("bar");
  return vue.openBlock(), vue.createElementBlock("div", {
    ref: "scrollbar$",
    class: vue.normalizeClass(_ctx.ns.b())
  }, [
    vue.createElementVNode("div", {
      ref: "wrap$",
      class: vue.normalizeClass([
        _ctx.wrapClass,
        _ctx.ns.e("wrap"),
        { [_ctx.ns.em("wrap", "hidden-default")]: !_ctx.native }
      ]),
      style: vue.normalizeStyle(_ctx.style),
      onScroll: _cache[0] || (_cache[0] = (...args) => _ctx.handleScroll && _ctx.handleScroll(...args))
    }, [
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
        ref: "resize$",
        class: vue.normalizeClass([_ctx.ns.e("view"), _ctx.viewClass]),
        style: vue.normalizeStyle(_ctx.viewStyle)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]))
    ], 38),
    !_ctx.native ? (vue.openBlock(), vue.createBlock(_component_bar, {
      key: 0,
      ref: "barRef",
      height: _ctx.sizeHeight,
      width: _ctx.sizeWidth,
      always: _ctx.always,
      "ratio-x": _ctx.ratioX,
      "ratio-y": _ctx.ratioY
    }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"])) : vue.createCommentVNode("v-if", true)
  ], 2);
}
var Scrollbar = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Scrollbar;
//# sourceMappingURL=scrollbar2.js.map
