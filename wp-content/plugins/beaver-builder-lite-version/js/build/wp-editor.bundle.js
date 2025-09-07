/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/wp-editor/layout-block/edit-pre-5-3.js":
/*!****************************************************!*\
  !*** ./src/wp-editor/layout-block/edit-pre-5-3.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutBlockEditConnectedPre_5_3: () => (/* binding */ LayoutBlockEditConnectedPre_5_3)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var _FLBuilderConfig = FLBuilderConfig,
  builder = _FLBuilderConfig.builder,
  strings = _FLBuilderConfig.strings,
  urls = _FLBuilderConfig.urls;
var _wp$blocks = wp.blocks,
  rawHandler = _wp$blocks.rawHandler,
  serialize = _wp$blocks.serialize;
var _wp$components = wp.components,
  Button = _wp$components.Button,
  Placeholder = _wp$components.Placeholder,
  Spinner = _wp$components.Spinner;
var compose = wp.compose.compose;
var _wp$data = wp.data,
  subscribe = _wp$data.subscribe,
  withDispatch = _wp$data.withDispatch,
  withSelect = _wp$data.withSelect;
var Component = wp.element.Component;

/**
 * Edit component for WordPress versions before 5.3.
 */
var LayoutBlockEditPre_5_3 = /*#__PURE__*/function (_Component) {
  function LayoutBlockEditPre_5_3() {
    var _this;
    _classCallCheck(this, LayoutBlockEditPre_5_3);
    _this = _callSuper(this, LayoutBlockEditPre_5_3, arguments);
    _this.unsubscribe = subscribe(_this.storeDidUpdate.bind(_this));
    return _this;
  }
  _inherits(LayoutBlockEditPre_5_3, _Component);
  return _createClass(LayoutBlockEditPre_5_3, [{
    key: "storeDidUpdate",
    value: function storeDidUpdate() {
      var _this$props = this.props,
        isLaunching = _this$props.isLaunching,
        isSavingPost = _this$props.isSavingPost;
      if (isLaunching && !isSavingPost) {
        this.unsubscribe();
        this.redirectToBuilder();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var blockCount = this.props.blockCount;
      if (1 === blockCount) {
        this.toggleEditor('disable');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unsubscribe();
      this.toggleEditor('enable');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        blockCount = _this$props2.blockCount,
        onReplace = _this$props2.onReplace,
        isLaunching = _this$props2.isLaunching;
      var label, callback, description;
      if (1 === blockCount) {
        label = builder.access ? strings.launch : strings.view;
        callback = this.launchBuilder.bind(this);
      } else {
        label = strings.convert;
        callback = this.convertToBuilder.bind(this);
      }
      if (builder.enabled) {
        description = strings.active;
      } else {
        description = strings.description;
      }
      if (false === builder.showui) {
        return '';
      }
      return /*#__PURE__*/React.createElement(Placeholder, {
        key: "placeholder",
        instructions: description,
        icon: "welcome-widgets-menus",
        label: strings.title,
        className: "fl-builder-layout-launch-view"
      }, isLaunching && /*#__PURE__*/React.createElement(Spinner, null), !isLaunching && /*#__PURE__*/React.createElement(Button, {
        isLarge: true,
        isPrimary: true,
        type: "submit",
        onClick: callback
      }, label), !isLaunching && /*#__PURE__*/React.createElement(Button, {
        isLarge: true,
        type: "submit",
        onClick: this.convertToBlocks.bind(this)
      }, strings.editor));
    }
  }, {
    key: "toggleEditor",
    value: function toggleEditor() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'enable';
      var classList = document.body.classList;
      var enabledClass = 'fl-builder-layout-enabled';
      if ('enable' === method) {
        if (classList.contains(enabledClass)) {
          classList.remove(enabledClass);
        }
      } else {
        if (!classList.contains(enabledClass)) {
          classList.add(enabledClass);
        }
      }
    }
  }, {
    key: "redirectToBuilder",
    value: function redirectToBuilder() {
      window.location.href = builder.access ? urls.edit : urls.view;
    }
  }, {
    key: "launchBuilder",
    value: function launchBuilder() {
      var _this$props3 = this.props,
        savePost = _this$props3.savePost,
        setLaunching = _this$props3.setLaunching;
      setLaunching(true);
      savePost();
    }
  }, {
    key: "convertToBuilder",
    value: function convertToBuilder() {
      var _this$props4 = this.props,
        clientId = _this$props4.clientId,
        blocks = _this$props4.blocks,
        setAttributes = _this$props4.setAttributes,
        removeBlocks = _this$props4.removeBlocks;
      var content = serialize(blocks);
      var clientIds = blocks.map(function (block) {
        return block.clientId;
      }).filter(function (id) {
        return id !== clientId;
      });
      setAttributes({
        content: content.replace(/<!--(.*?)-->/g, '')
      });
      removeBlocks(clientIds);
      this.launchBuilder();
    }
  }, {
    key: "convertToBlocks",
    value: function convertToBlocks() {
      var _this$props5 = this.props,
        attributes = _this$props5.attributes,
        clientId = _this$props5.clientId,
        replaceBlocks = _this$props5.replaceBlocks,
        onReplace = _this$props5.onReplace;
      if (attributes.content && !confirm(strings.warning)) {
        return;
      } else if (attributes.content) {
        replaceBlocks([clientId], rawHandler({
          HTML: attributes.content,
          mode: 'BLOCKS'
        }));
      } else {
        onReplace([]);
      }
    }
  }]);
}(Component);
/**
 * Connect the edit component to editor data.
 */
var LayoutBlockEditConnectedPre_5_3 = compose(withDispatch(function (dispatch, ownProps) {
  var editor = dispatch('core/editor');
  var builder = dispatch('fl-builder');
  return {
    savePost: editor.savePost,
    removeBlocks: editor.removeBlocks,
    replaceBlocks: editor.replaceBlocks,
    setLaunching: builder.setLaunching
  };
}), withSelect(function (select) {
  var editor = select('core/editor');
  var builder = select('fl-builder');
  return {
    blockCount: editor.getBlockCount(),
    blocks: editor.getBlocks(),
    isSavingPost: editor.isSavingPost(),
    isLaunching: builder.isLaunching()
  };
}))(LayoutBlockEditPre_5_3);

/***/ }),

/***/ "./src/wp-editor/layout-block/edit.js":
/*!********************************************!*\
  !*** ./src/wp-editor/layout-block/edit.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutBlockEditConnected: () => (/* binding */ LayoutBlockEditConnected)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var _FLBuilderConfig = FLBuilderConfig,
  builder = _FLBuilderConfig.builder,
  strings = _FLBuilderConfig.strings,
  urls = _FLBuilderConfig.urls;
var _wp$blocks = wp.blocks,
  rawHandler = _wp$blocks.rawHandler,
  serialize = _wp$blocks.serialize;
var _wp$components = wp.components,
  Button = _wp$components.Button,
  Placeholder = _wp$components.Placeholder,
  Spinner = _wp$components.Spinner;
var compose = wp.compose.compose;
var _wp$data = wp.data,
  withDispatch = _wp$data.withDispatch,
  withSelect = _wp$data.withSelect;
var Component = wp.element.Component;

/**
 * Edit Component
 */
var LayoutBlockEdit = /*#__PURE__*/function (_Component) {
  function LayoutBlockEdit() {
    _classCallCheck(this, LayoutBlockEdit);
    return _callSuper(this, LayoutBlockEdit, arguments);
  }
  _inherits(LayoutBlockEdit, _Component);
  return _createClass(LayoutBlockEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var blockCount = this.props.blockCount;
      if (1 === blockCount) {
        this.toggleEditor('disable');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleEditor('enable');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        blockCount = _this$props.blockCount,
        onReplace = _this$props.onReplace,
        isLaunching = _this$props.isLaunching;
      var label, callback, description;
      if (1 === blockCount) {
        label = builder.access ? strings.launch : strings.view;
        callback = this.launchBuilder.bind(this);
      } else {
        label = strings.convert;
        callback = this.convertToBuilder.bind(this);
      }
      if (builder.enabled) {
        description = strings.active;
      } else {
        description = strings.description;
      }
      if (false === builder.showui) {
        return '';
      }
      return /*#__PURE__*/React.createElement(Placeholder, {
        key: "placeholder",
        instructions: description,
        label: strings.title,
        className: "fl-builder-layout-launch-view"
      }, isLaunching && /*#__PURE__*/React.createElement(Spinner, null), !isLaunching && /*#__PURE__*/React.createElement(Button, {
        isLarge: true,
        isPrimary: true,
        type: "submit",
        onClick: callback
      }, label), !isLaunching && /*#__PURE__*/React.createElement(Button, {
        isLarge: true,
        type: "submit",
        onClick: this.convertToBlocks.bind(this)
      }, strings.editor));
    }
  }, {
    key: "toggleEditor",
    value: function toggleEditor() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'enable';
      var classList = document.body.classList;
      var enabledClass = 'fl-builder-layout-enabled';
      if ('enable' === method) {
        if (classList.contains(enabledClass)) {
          classList.remove(enabledClass);
        }
      } else {
        if (!classList.contains(enabledClass)) {
          classList.add(enabledClass);
        }
      }
    }
  }, {
    key: "launchBuilder",
    value: function launchBuilder() {
      var _this$props2 = this.props,
        savePost = _this$props2.savePost,
        setLaunching = _this$props2.setLaunching;
      setLaunching(true);
      /**
       * WP 6.4 will NOT save a post with no title.
       */
      var title = wp.data.select("core/editor").getEditedPostAttribute('title');
      if (!title) {
        wp.data.dispatch('core/editor').editPost({
          title: wp.i18n.__('(no title)')
        });
      }
      savePost().then(function () {
        setTimeout(function () {
          window.top.location.href = builder.access ? urls.edit : urls.view;
        }, 2000);
      });
    }
  }, {
    key: "convertToBuilder",
    value: function convertToBuilder() {
      var _this$props3 = this.props,
        clientId = _this$props3.clientId,
        blocks = _this$props3.blocks,
        setAttributes = _this$props3.setAttributes,
        removeBlocks = _this$props3.removeBlocks;
      var content = serialize(blocks);
      var clientIds = blocks.map(function (block) {
        return block.clientId;
      }).filter(function (id) {
        return id !== clientId;
      });
      setAttributes({
        content: content.replace(/<!--(.*?)-->/g, '')
      });
      removeBlocks(clientIds);
      this.launchBuilder();
    }
  }, {
    key: "convertToBlocks",
    value: function convertToBlocks() {
      var _this$props4 = this.props,
        attributes = _this$props4.attributes,
        clientId = _this$props4.clientId,
        replaceBlocks = _this$props4.replaceBlocks,
        onReplace = _this$props4.onReplace;
      if (attributes.content && !confirm(strings.warning)) {
        return;
      } else if (attributes.content) {
        replaceBlocks([clientId], rawHandler({
          HTML: attributes.content,
          mode: 'BLOCKS'
        }));
      } else {
        onReplace([]);
      }
    }
  }]);
}(Component);
/**
 * Connect the edit component to editor data.
 */
var LayoutBlockEditConnected = compose(withDispatch(function (dispatch, ownProps) {
  var blockEditor = dispatch('core/block-editor');
  var editor = dispatch('core/editor');
  var builder = dispatch('fl-builder');
  return {
    removeBlocks: blockEditor.removeBlocks,
    replaceBlocks: blockEditor.replaceBlocks,
    savePost: editor.savePost,
    setLaunching: builder.setLaunching
  };
}), withSelect(function (select) {
  var blockEditor = select('core/block-editor');
  var editor = select('core/editor');
  var builder = select('fl-builder');
  return {
    blockCount: blockEditor.getBlockCount(),
    blocks: blockEditor.getBlocks(),
    isLaunching: builder.isLaunching()
  };
}))(LayoutBlockEdit);

/***/ }),

/***/ "./src/wp-editor/layout-block/index.js":
/*!*********************************************!*\
  !*** ./src/wp-editor/layout-block/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit */ "./src/wp-editor/layout-block/edit.js");
/* harmony import */ var _edit_pre_5_3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-pre-5-3 */ "./src/wp-editor/layout-block/edit-pre-5-3.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ "./src/wp-editor/layout-block/index.scss");



var _FLBuilderConfig = FLBuilderConfig,
  builder = _FLBuilderConfig.builder,
  strings = _FLBuilderConfig.strings;
var version = FLBuilderConfig.wp.version;
var registerBlockType = wp.blocks.registerBlockType;
var RawHTML = wp.element.RawHTML;
var getBlockEdit = function getBlockEdit() {
  if (parseFloat(version) < 5.3) {
    return _edit_pre_5_3__WEBPACK_IMPORTED_MODULE_1__.LayoutBlockEditConnectedPre_5_3;
  }
  return _edit__WEBPACK_IMPORTED_MODULE_0__.LayoutBlockEditConnected;
};

/**
 * Register the block.
 */
if (builder.access && builder.unrestricted || builder.enabled) {
  registerBlockType('fl-builder/layout', {
    title: strings.title,
    description: strings.description,
    icon: 'welcome-widgets-menus',
    category: 'layout',
    useOnce: true,
    supports: {
      customClassName: false,
      className: false,
      html: false
    },
    attributes: {
      content: {
        type: 'string',
        source: 'html'
      }
    },
    edit: getBlockEdit(),
    save: function save(_ref) {
      var attributes = _ref.attributes;
      return /*#__PURE__*/React.createElement(RawHTML, null, attributes.content);
    }
  });
}

/***/ }),

/***/ "./src/wp-editor/layout-block/index.scss":
/*!***********************************************!*\
  !*** ./src/wp-editor/layout-block/index.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/wp-editor/more-menu/index.js":
/*!******************************************!*\
  !*** ./src/wp-editor/more-menu/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-item */ "./src/wp-editor/more-menu/menu-item.js");
/* harmony import */ var _menu_item_pre_5_3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu-item-pre-5-3 */ "./src/wp-editor/more-menu/menu-item-pre-5-3.js");


var version = FLBuilderConfig.wp.version;
var registerPlugin = wp.plugins.registerPlugin;
var getMenuItemComponent = function getMenuItemComponent() {
  if (parseFloat(version) < 5.3) {
    return _menu_item_pre_5_3__WEBPACK_IMPORTED_MODULE_1__.BuilderMoreMenuItemConnectedPre_5_3;
  }
  return _menu_item__WEBPACK_IMPORTED_MODULE_0__.BuilderMoreMenuItemConnected;
};

/**
 * Register the builder more menu plugin.
 */
registerPlugin('fl-builder-plugin-sidebar', {
  icon: 'welcome-widgets-menus',
  render: getMenuItemComponent()
});

/***/ }),

/***/ "./src/wp-editor/more-menu/menu-item-pre-5-3.js":
/*!******************************************************!*\
  !*** ./src/wp-editor/more-menu/menu-item-pre-5-3.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BuilderMoreMenuItemConnectedPre_5_3: () => (/* binding */ BuilderMoreMenuItemConnectedPre_5_3)
/* harmony export */ });
/* harmony import */ var _menu_item_pre_5_3_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-item-pre-5-3.scss */ "./src/wp-editor/more-menu/menu-item-pre-5-3.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var _FLBuilderConfig = FLBuilderConfig,
  strings = _FLBuilderConfig.strings;
var _wp$blocks = wp.blocks,
  createBlock = _wp$blocks.createBlock,
  serialize = _wp$blocks.serialize;
var Button = wp.components.Button;
var compose = wp.compose.compose;
var _wp$data = wp.data,
  withDispatch = _wp$data.withDispatch,
  withSelect = _wp$data.withSelect;
var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
var Component = wp.element.Component;

/**
 * Builder menu item for the more menu pre WordPress 5.3.
 *
 * More menu items currently only support opening a sidebar.
 * However, we need a click event. For now, that is done in a
 * hacky manner with an absolute div that contains the event.
 * This should be reworked in the future when API supports it.
 */
var BuilderMoreMenuItemPre_5_3 = /*#__PURE__*/function (_Component) {
  function BuilderMoreMenuItemPre_5_3() {
    _classCallCheck(this, BuilderMoreMenuItemPre_5_3);
    return _callSuper(this, BuilderMoreMenuItemPre_5_3, arguments);
  }
  _inherits(BuilderMoreMenuItemPre_5_3, _Component);
  return _createClass(BuilderMoreMenuItemPre_5_3, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(PluginSidebarMoreMenuItem, null, /*#__PURE__*/React.createElement("div", {
        className: "fl-builder-plugin-sidebar-button",
        onClick: this.menuItemClicked.bind(this)
      }), this.hasBuilderBlock() ? strings.launch : strings.convert);
    }
  }, {
    key: "hasBuilderBlock",
    value: function hasBuilderBlock() {
      var blocks = this.props.blocks;
      var builder = blocks.filter(function (block) {
        return 'fl-builder/layout' === block.name;
      });
      return !!builder.length;
    }
  }, {
    key: "menuItemClicked",
    value: function menuItemClicked() {
      var closeGeneralSidebar = this.props.closeGeneralSidebar;
      if (this.hasBuilderBlock()) {
        this.launchBuilder();
      } else {
        this.convertToBuilder();
      }

      // Another hack because we can't have click events yet :(
      setTimeout(closeGeneralSidebar, 100);
    }
  }, {
    key: "convertToBuilder",
    value: function convertToBuilder() {
      var _this$props = this.props,
        blocks = _this$props.blocks,
        insertBlock = _this$props.insertBlock,
        removeBlocks = _this$props.removeBlocks;
      var clientIds = blocks.map(function (block) {
        return block.clientId;
      });
      var content = serialize(blocks).replace(/<!--(.*?)-->/g, '');
      var block = createBlock('fl-builder/layout', {
        content: content
      });
      insertBlock(block, 0);
      removeBlocks(clientIds);
    }
  }, {
    key: "launchBuilder",
    value: function launchBuilder() {
      var _this$props2 = this.props,
        savePost = _this$props2.savePost,
        setLaunching = _this$props2.setLaunching;
      setLaunching(true);
      savePost();
    }
  }]);
}(Component);
/**
 * Connect the menu item to editor data.
 */
var BuilderMoreMenuItemConnectedPre_5_3 = compose(withDispatch(function (dispatch, ownProps) {
  var editor = dispatch('core/editor');
  var editPost = dispatch('core/edit-post');
  var builder = dispatch('fl-builder');
  return {
    savePost: editor.savePost,
    insertBlock: editor.insertBlock,
    removeBlocks: editor.removeBlocks,
    closeGeneralSidebar: editPost.closeGeneralSidebar,
    setLaunching: builder.setLaunching
  };
}), withSelect(function (select) {
  var editor = select('core/editor');
  return {
    blocks: editor.getBlocks()
  };
}))(BuilderMoreMenuItemPre_5_3);

/***/ }),

/***/ "./src/wp-editor/more-menu/menu-item-pre-5-3.scss":
/*!********************************************************!*\
  !*** ./src/wp-editor/more-menu/menu-item-pre-5-3.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/wp-editor/more-menu/menu-item.js":
/*!**********************************************!*\
  !*** ./src/wp-editor/more-menu/menu-item.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BuilderMoreMenuItemConnected: () => (/* binding */ BuilderMoreMenuItemConnected)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var _FLBuilderConfig = FLBuilderConfig,
  builder = _FLBuilderConfig.builder,
  strings = _FLBuilderConfig.strings,
  urls = _FLBuilderConfig.urls;
var _wp$blocks = wp.blocks,
  createBlock = _wp$blocks.createBlock,
  serialize = _wp$blocks.serialize;
var Button = wp.components.Button;
var compose = wp.compose.compose;
var _wp$data = wp.data,
  withDispatch = _wp$data.withDispatch,
  withSelect = _wp$data.withSelect;
var PluginMoreMenuItem = wp.editPost.PluginMoreMenuItem;
var Component = wp.element.Component;

/**
 * Builder menu item for the more menu.
 */
var BuilderMoreMenuItem = /*#__PURE__*/function (_Component) {
  function BuilderMoreMenuItem() {
    _classCallCheck(this, BuilderMoreMenuItem);
    return _callSuper(this, BuilderMoreMenuItem, arguments);
  }
  _inherits(BuilderMoreMenuItem, _Component);
  return _createClass(BuilderMoreMenuItem, [{
    key: "render",
    value: function render() {
      if (this.hasBuilderBlock()) {
        jQuery('body').addClass('fl-builder-blocks');
        jQuery(document).trigger('fl-builder-fix-blocks');
      }
      return /*#__PURE__*/React.createElement(PluginMoreMenuItem, {
        onClick: this.menuItemClicked.bind(this)
      }, this.hasBuilderBlock() ? strings.launch : strings.convert);
    }
  }, {
    key: "hasBuilderBlock",
    value: function hasBuilderBlock() {
      var blocks = this.props.blocks;
      var builder = blocks.filter(function (block) {
        return 'fl-builder/layout' === block.name;
      });
      return !!builder.length;
    }
  }, {
    key: "menuItemClicked",
    value: function menuItemClicked() {
      if (this.hasBuilderBlock()) {
        this.launchBuilder();
      } else {
        this.convertToBuilder();
      }
    }
  }, {
    key: "convertToBuilder",
    value: function convertToBuilder() {
      var _this$props = this.props,
        blocks = _this$props.blocks,
        insertBlock = _this$props.insertBlock,
        removeBlocks = _this$props.removeBlocks;
      var clientIds = blocks.map(function (block) {
        return block.clientId;
      });
      var content = serialize(blocks).replace(/<!--(.*?)-->/g, '');
      var block = createBlock('fl-builder/layout', {
        content: content
      });
      insertBlock(block, 0);
      removeBlocks(clientIds);
    }
  }, {
    key: "launchBuilder",
    value: function launchBuilder() {
      var _this$props2 = this.props,
        savePost = _this$props2.savePost,
        setLaunching = _this$props2.setLaunching;
      setLaunching(true);
      /**
       * WP 6.4 will NOT save a post with no title.
       */
      var title = wp.data.select("core/editor").getEditedPostAttribute('title');
      if (!title) {
        wp.data.dispatch('core/editor').editPost({
          title: wp.i18n.__('(no title)')
        });
      }
      savePost().then(function () {
        setTimeout(function () {
          window.location.href = builder.access ? urls.edit : urls.view;
        }, 2000);
      });
    }
  }]);
}(Component);
/**
 * Connect the menu item to editor data.
 */
var BuilderMoreMenuItemConnected = compose(withDispatch(function (dispatch, ownProps) {
  var blockEditor = dispatch('core/block-editor');
  var editor = dispatch('core/editor');
  var builder = dispatch('fl-builder');
  return {
    insertBlock: blockEditor.insertBlock,
    removeBlocks: blockEditor.removeBlocks,
    savePost: editor.savePost,
    setLaunching: builder.setLaunching
  };
}), withSelect(function (select) {
  var blockEditor = select('core/block-editor');
  return {
    blocks: blockEditor.getBlocks()
  };
}))(BuilderMoreMenuItem);

/***/ }),

/***/ "./src/wp-editor/store/index.js":
/*!**************************************!*\
  !*** ./src/wp-editor/store/index.js ***!
  \**************************************/
/***/ (() => {

var registerStore = wp.data.registerStore;
var DEFAULT_STATE = {
  launching: false
};
var actions = {
  setLaunching: function setLaunching(launching) {
    return {
      type: 'SET_LAUNCHING',
      launching: launching
    };
  }
};
var selectors = {
  isLaunching: function isLaunching(state) {
    return state.launching;
  }
};
registerStore('fl-builder', {
  reducer: function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    switch (action.type) {
      case 'SET_LAUNCHING':
        state.launching = action.launching;
    }
    return state;
  },
  actions: actions,
  selectors: selectors
});

/***/ }),

/***/ "./src/wp-editor/wordpress/index.js":
/*!******************************************!*\
  !*** ./src/wp-editor/wordpress/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// FUNCTION: Recover block
var _recoverBlock = function recoverBlock() {
  var block = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var autoSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // DECONSTRUCT: WP object
  var _ref = window || {},
    _ref$wp = _ref.wp,
    wp = _ref$wp === void 0 ? {} : _ref$wp;
  var _wp$data = wp.data,
    data = _wp$data === void 0 ? {} : _wp$data,
    _wp$blocks = wp.blocks,
    blocks = _wp$blocks === void 0 ? {} : _wp$blocks;
  var dispatch = data.dispatch,
    select = data.select;
  var createBlock = blocks.createBlock;
  var _dispatch = dispatch('core/block-editor'),
    replaceBlock = _dispatch.replaceBlock;
  var wpRecoverBlock = function wpRecoverBlock(_ref2) {
    var _ref2$name = _ref2.name,
      name = _ref2$name === void 0 ? '' : _ref2$name,
      _ref2$attributes = _ref2.attributes,
      attributes = _ref2$attributes === void 0 ? {} : _ref2$attributes,
      _ref2$innerBlocks = _ref2.innerBlocks,
      innerBlocks = _ref2$innerBlocks === void 0 ? [] : _ref2$innerBlocks;
    return createBlock(name, attributes, innerBlocks);
  };

  // DEFINE: Validation variables
  var blockIsValid = block !== null && _typeof(block) === 'object' && block.clientId !== null && typeof block.clientId === 'string';

  // IF: Block is not valid
  if (blockIsValid !== true) {
    return false;
  }

  // GET: Block based on ID, to make sure it exists
  var currentBlock = select('core/block-editor').getBlock(block.clientId);

  // IF: Block was found
  if (!currentBlock !== true) {
    // DECONSTRUCT: Block
    var _currentBlock$clientI = currentBlock.clientId,
      blockId = _currentBlock$clientI === void 0 ? '' : _currentBlock$clientI,
      _currentBlock$isValid = currentBlock.isValid,
      _blockIsValid = _currentBlock$isValid === void 0 ? true : _currentBlock$isValid,
      _currentBlock$innerBl = currentBlock.innerBlocks,
      blockInnerBlocks = _currentBlock$innerBl === void 0 ? [] : _currentBlock$innerBl;

    // DEFINE: Validation variables
    var blockInnerBlocksHasLength = blockInnerBlocks !== null && Array.isArray(blockInnerBlocks) && blockInnerBlocks.length >= 1;

    // IF: Block is not valid
    if (_blockIsValid !== true) {
      // DEFINE: New recovered block
      var recoveredBlock = wpRecoverBlock(currentBlock);

      // REPLACE: Broke block
      replaceBlock(blockId, recoveredBlock);

      // IF: Auto save post
      if (autoSave === true) {
        wp.data.dispatch("core/editor").savePost();
      }
    }

    // IF: Inner blocks has length
    if (blockInnerBlocksHasLength) {
      blockInnerBlocks.forEach(function () {
        var innerBlock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _recoverBlock(innerBlock, autoSave);
      });
    }
  }

  // RETURN
  return false;
};

// FUNCTION: Attempt to recover broken blocks
var autoRecoverBlocks = function autoRecoverBlocks() {
  var autoSave = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  // DECONSTRUCT: WP object
  var _ref3 = window || {},
    _ref3$wp = _ref3.wp,
    wp = _ref3$wp === void 0 ? {} : _ref3$wp;
  var domReady = wp.domReady,
    _wp$data2 = wp.data,
    data = _wp$data2 === void 0 ? {} : _wp$data2;
  var select = data.select;

  // AWAIT: For dom to get ready
  domReady(function () {
    setTimeout(function () {
      // DEFINE: Basic variables
      var blocksArray = select('core/block-editor').getBlocks();
      var blocksArrayHasLength = Array.isArray(blocksArray) && blocksArray.length >= 1;

      // IF: Blocks array has length
      if (blocksArrayHasLength === true) {
        blocksArray.forEach(function () {
          var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          _recoverBlock(element, autoSave);
        });
      }
    }, 1);
  });
};

// EXPORT
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (autoRecoverBlocks);

// DECONSTRUCT: WP
var _ref4 = window || {},
  _ref4$wp = _ref4.wp,
  wp = _ref4$wp === void 0 ? {} : _ref4$wp;
var domReady = wp.domReady,
  data = wp.data;

// AWAIT: jQuery to get ready
jQuery(document).on('fl-builder-fix-blocks', function () {
  // DEFINE: Validation variables
  var hasGutenbergClasses = jQuery('body').hasClass('post-php') === true && jQuery('.block-editor').length >= 1 && jQuery('body').hasClass('fl-builder-blocks');
  var gutenbergHasObject = domReady !== undefined && data !== undefined;
  var gutenbergIsPresent = hasGutenbergClasses === true && gutenbergHasObject === true;

  // IF: Gutenberg editor is present
  if (gutenbergIsPresent === true) {
    autoRecoverBlocks(false);
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/wp-editor/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wordpress */ "./src/wp-editor/wordpress/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/wp-editor/store/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_store__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout-block */ "./src/wp-editor/layout-block/index.js");
/* harmony import */ var _more_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./more-menu */ "./src/wp-editor/more-menu/index.js");




})();

/******/ })()
;
