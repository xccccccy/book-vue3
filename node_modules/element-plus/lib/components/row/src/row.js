'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
require('../../../tokens/index.js');
var props = require('../../../utils/vue/props.js');
var index = require('../../../hooks/use-namespace/index.js');
var row = require('../../../tokens/row.js');

const rowProps = props.buildProps({
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    values: ["start", "center", "end", "space-around", "space-between", "space-evenly"],
    default: "start"
  },
  align: {
    type: String,
    values: ["top", "middle", "bottom"],
    default: "top"
  }
});
const Row = vue.defineComponent({
  name: "ElRow",
  props: rowProps,
  setup(props, {
    slots
  }) {
    const ns = index.useNamespace("row");
    const gutter = vue.computed(() => props.gutter);
    vue.provide(row.rowContextKey, {
      gutter
    });
    const style = vue.computed(() => {
      const styles = {
        marginLeft: "",
        marginRight: ""
      };
      if (props.gutter) {
        styles.marginLeft = `-${props.gutter / 2}px`;
        styles.marginRight = styles.marginLeft;
      }
      return styles;
    });
    return () => vue.createVNode(props.tag, {
      "class": [ns.b(), ns.is(`justify-${props.justify}`, props.justify !== "start"), ns.is(`align-${props.align}`, props.align !== "top")],
      "style": style.value
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
});

exports["default"] = Row;
exports.rowProps = rowProps;
//# sourceMappingURL=row.js.map
