import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';

const effects = ["light", "dark"];
const triggers = ["click", "contextmenu", "hover", "focus"];
const Effect = {
  LIGHT: "light",
  DARK: "dark"
};
const usePopperProps = buildProps({
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

export { Effect, usePopperProps };
//# sourceMappingURL=popper.mjs.map
