import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';

const carouselItemProps = buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});

export { carouselItemProps };
//# sourceMappingURL=carousel-item.mjs.map
