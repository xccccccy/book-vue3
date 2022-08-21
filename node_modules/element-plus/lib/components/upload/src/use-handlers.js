'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
var upload = require('./upload.js');
var error = require('../../../utils/error.js');
var index = require('../../../hooks/use-deprecated/index.js');

const SCOPE = "ElUpload";
const revokeObjectURL = (file) => {
  var _a;
  if ((_a = file.url) == null ? void 0 : _a.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};
const useHandlers = (props, uploadRef) => {
  const uploadFiles = vue.ref([]);
  const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
  function abort(file) {
    var _a;
    (_a = uploadRef.value) == null ? void 0 : _a.abort(file);
  }
  function clearFiles(states = ["ready", "uploading", "success", "fail"]) {
    uploadFiles.value = uploadFiles.value.filter((row) => !states.includes(row.status));
  }
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    file.status = "fail";
    uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1);
    props.onError(err, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  };
  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    props.onProgress(evt, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = Math.round(evt.percent);
  };
  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    file.status = "success";
    file.response = response;
    props.onSuccess(response, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  };
  const handleStart = (file) => {
    const uploadFile = {
      name: file.name,
      percentage: 0,
      status: "ready",
      size: file.size,
      raw: file,
      uid: file.uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") {
      try {
        uploadFile.url = URL.createObjectURL(file);
      } catch (err) {
        error.debugWarn(SCOPE, err.message);
        props.onError(err, uploadFile, uploadFiles.value);
      }
    }
    uploadFiles.value.push(uploadFile);
    props.onChange(uploadFile, uploadFiles.value);
  };
  const handleRemove = async (file, rawFile) => {
    if (rawFile) {
      index.useDeprecated({
        scope: SCOPE,
        from: "handleRemove second argument",
        version: "2.2",
        replacement: "first argument `file`",
        ref: "https://element-plus.org/en-US/component/upload.html#methods"
      }, true);
    }
    const _file = rawFile || file;
    const uploadFile = _file instanceof File ? getFile(_file) : _file;
    if (!uploadFile)
      error.throwError(SCOPE, "file to be removed not found");
    const doRemove = (file2) => {
      abort(file2);
      const fileList = uploadFiles.value;
      fileList.splice(fileList.indexOf(file2), 1);
      props.onRemove(file2, fileList);
      revokeObjectURL(file2);
    };
    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value);
      if (before !== false)
        doRemove(uploadFile);
    } else {
      doRemove(uploadFile);
    }
  };
  function submit() {
    uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => {
      var _a;
      return raw && ((_a = uploadRef.value) == null ? void 0 : _a.upload(raw));
    });
  }
  vue.watch(() => props.listType, (val) => {
    if (val !== "picture-card" && val !== "picture") {
      return;
    }
    uploadFiles.value = uploadFiles.value.map((file) => {
      const { raw, url } = file;
      if (!url && raw) {
        try {
          file.url = URL.createObjectURL(raw);
        } catch (err) {
          props.onError(err, file, uploadFiles.value);
        }
      }
      return file;
    });
  });
  vue.watch(() => props.fileList, (fileList) => {
    for (const file of fileList) {
      file.uid || (file.uid = upload.genFileId());
      file.status || (file.status = "success");
    }
    uploadFiles.value = fileList;
  }, { immediate: true, deep: true });
  return {
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    uploadFiles
  };
};

exports.useHandlers = useHandlers;
//# sourceMappingURL=use-handlers.js.map
