'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElMarker",
  props: {
    mark: {
      type: [String, Object],
      default: () => void 0
    }
  },
  setup(props) {
    const ns = index.useNamespace("slider");
    const label = vue.computed(() => {
      return typeof props.mark === "string" ? props.mark : props.mark.label;
    });
    return {
      ns,
      label
    };
  },
  render() {
    var _a;
    return vue.h("div", {
      class: this.ns.e("marks-text"),
      style: (_a = this.mark) == null ? void 0 : _a.style
    }, this.label);
  }
});

exports["default"] = _sfc_main;
//# sourceMappingURL=marker.js.map
