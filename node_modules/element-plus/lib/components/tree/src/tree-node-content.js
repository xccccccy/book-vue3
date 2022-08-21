'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElTreeNodeContent",
  props: {
    node: {
      type: Object,
      required: true
    },
    renderContent: Function
  },
  setup(props) {
    const ns = index.useNamespace("tree");
    const nodeInstance = vue.inject("NodeInstance");
    const tree = vue.inject("RootTree");
    return () => {
      const node = props.node;
      const { data, store } = node;
      return props.renderContent ? props.renderContent(vue.h, { _self: nodeInstance, node, data, store }) : tree.ctx.slots.default ? tree.ctx.slots.default({ node, data }) : vue.h("span", { class: ns.be("node", "label") }, [node.label]);
    };
  }
});

exports["default"] = _sfc_main;
//# sourceMappingURL=tree-node-content.js.map
