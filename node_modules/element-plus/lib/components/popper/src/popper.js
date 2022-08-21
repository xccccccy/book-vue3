'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const effects = ["light", "dark"];
const triggers = ["click", "contextmenu", "hover", "focus"];
const Effect = {
  LIGHT: "light",
  DARK: "dark"
};
const usePopperProps = props.buildProps({
  autoClose: {
    type: Number,
    default: 0
  },
  cutoff: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

exports.Effect = Effect;
exports.usePopperProps = usePopperProps;
//# sourceMappingURL=popper.js.map
