'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@vue/shared');
require('../../../utils/index.js');
var upload = require('./upload.js');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');

const uploadListProps = props.buildProps({
  files: {
    type: props.definePropType(Array),
    default: () => typescript.mutable([])
  },
  disabled: {
    type: Boolean,
    default: false
  },
  handlePreview: {
    type: props.definePropType(Function),
    default: shared.NOOP
  },
  listType: {
    type: String,
    values: upload.uploadListTypes,
    default: "text"
  }
});
const uploadListEmits = {
  remove: (file) => !!file
};

exports.uploadListEmits = uploadListEmits;
exports.uploadListProps = uploadListProps;
//# sourceMappingURL=upload-list.js.map
