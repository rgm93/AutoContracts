"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (props) {
  var customDecorators = [];
  customDecorators.push.apply(customDecorators, _toConsumableArray((0, _shortkey2.default)({
    separator: '',
    getTriggers: props.customSuggestionTriggers,
    onChange: props.onEditorStateChange,
    getEditorState: props.getEditorState,
    getSuggestions: props.customSuggestions,
    getWrapperRef: function getWrapperRef() {
      return props.wrapperRef;
    },
    modalHandler: new _modals2.default()
  })));

  return _react2.default.createElement(_reactDraftWysiwyg.Editor, _extends({}, props, { customDecorators: customDecorators }));
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

var _shortkey = require("./helpers/shortkey");

var _shortkey2 = _interopRequireDefault(_shortkey);

var _modals = require("./helpers/event-handler/modals");

var _modals2 = _interopRequireDefault(_modals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
function getSuggestions() {
  return [
    { hotkey: "{", phrase: "one", text: "1andone" },
    { hotkey: "{", phrase: "two", text: "2and two" },
    { hotkey: "{", phrase: "three", text: "3" },
    { hotkey: "{", phrase: "four", text: "4" },
    { hotkey: "@", phrase: "one", text: "5and six" },
    { hotkey: "@", phrase: "two", text: "6" },
    { hotkey: "@", phrase: "three", text: "7andtw" },
    { hotkey: "@", phrase: "four", text: "8" },
  ];
} */
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// import { EditorState, convertToRaw, ContentState } from "draft-js";