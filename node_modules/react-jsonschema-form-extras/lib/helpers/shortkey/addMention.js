"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMention;

var _draftJs = require("draft-js");

var _draftjsUtils = require("draftjs-utils");

var _htmlToDraftjs = require("html-to-draftjs");

var _htmlToDraftjs2 = _interopRequireDefault(_htmlToDraftjs);

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addMention(editorState, onChange, separator, trigger, suggestion) {
  var text = suggestion.text;
  // const entityKey = editorState
  //   .getCurrentContent()
  //   .createEntity("SHORTKEYS", "MUTABLE", { text: text })
  //   .getLastCreatedEntityKey();

  var selectedBlock = (0, _draftjsUtils.getSelectedBlock)(editorState);
  var selectedBlockText = selectedBlock.getText();
  var focusOffset = editorState.getSelection().focusOffset;
  var mentionIndex = selectedBlockText.lastIndexOf(separator + trigger, focusOffset) || 0;
  var spaceAlreadyPresent = false;
  if (selectedBlockText.length === mentionIndex + 1) {
    focusOffset = selectedBlockText.length;
  }
  if (selectedBlockText[focusOffset] === " ") {
    spaceAlreadyPresent = true;
  }
  var updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex + separator.length,
    focusOffset: focusOffset + separator.length
  });

  var newEditorState = _draftJs.EditorState.acceptSelection(editorState, updatedSelection);
  var contentState = {};
  var contentBlock = (0, _htmlToDraftjs2.default)(text);
  if (suggestion.advanced) {
    contentState = editorState.getCurrentContent();
    contentBlock.entityMap.forEach(function (value, key) {
      contentState = contentState.mergeEntityData(key, value);
    });
    contentState = _draftJs.Modifier.replaceWithFragment(contentState, updatedSelection, new _immutable.List(contentBlock.contentBlocks));
  } else {

    contentState = _draftJs.Modifier.replaceText(newEditorState.getCurrentContent(), updatedSelection, "" + text, newEditorState.getCurrentInlineStyle(), undefined);
  }

  newEditorState = _draftJs.EditorState.push(newEditorState, contentState, "insert-characters");

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    if (suggestion.advanced) {
      updatedSelection = newEditorState.getSelection().merge({
        anchorOffset: mentionIndex + contentBlock.contentBlocks[0].text.length + separator.length,
        focusOffset: mentionIndex + contentBlock.contentBlocks[0].text.length + separator.length
      });
    } else {
      updatedSelection = newEditorState.getSelection().merge({
        anchorOffset: mentionIndex + text.length + separator.length,
        focusOffset: mentionIndex + text.length + separator.length
      });
    }
    newEditorState = _draftJs.EditorState.acceptSelection(newEditorState, updatedSelection);
    contentState = _draftJs.Modifier.insertText(newEditorState.getCurrentContent(), updatedSelection, " ", newEditorState.getCurrentInlineStyle(), undefined);
  }
  onChange(_draftJs.EditorState.push(newEditorState, contentState, "insert-characters"));
}