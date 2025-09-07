/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/builder-forms/classes/class-setting-field.js":
/*!**********************************************************!*\
  !*** ./src/builder-forms/classes/class-setting-field.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Controller class for working with fields in the current form.
 */
var FLBuilderSettingField = /*#__PURE__*/function () {
  function FLBuilderSettingField(rootName) {
    var _this$form;
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, FLBuilderSettingField);
    _defineProperty(this, "rootName", '');
    _defineProperty(this, "form", null);
    _defineProperty(this, "field", null);
    _defineProperty(this, "inputs", {});
    this.rootName = rootName;
    var selector = "form[data-form-id=\"".concat(config.id, "\"]");
    this.form = jQuery(selector).get(0);
    this.field = (_this$form = this.form) === null || _this$form === void 0 ? void 0 : _this$form.querySelector(".fl-field#fl-field-".concat(rootName));
    if (!this.field) {
      return;
    }
    this.inputs = this.getInputs(this.rootName);
  }
  return _createClass(FLBuilderSettingField, [{
    key: "getInputs",
    value: function getInputs() {
      var _this = this;
      var name = this.rootName;
      var modes = ['default', 'large', 'medium', 'responsive'];
      var inputs = {};
      if (this.field) {
        modes.map(function (mode) {
          var _this$field;
          var key = 'default' !== mode ? "".concat(name, "_").concat(mode) : name;
          inputs[mode] = (_this$field = _this.field) === null || _this$field === void 0 ? void 0 : _this$field.querySelector("[name=\"".concat(key, "\"]"));
        });
      }
      return inputs;
    }
  }, {
    key: "getValues",
    value: function getValues() {
      var values = {};
      for (var key in this.inputs) {
        values[key] = this.inputs[key] ? this.inputs[key].value : null;
      }
      return values;
    }
  }, {
    key: "isResponsive",
    value: function isResponsive() {
      var _this$field2;
      return !!((_this$field2 = this.field) !== null && _this$field2 !== void 0 && _this$field2.querySelector('.fl-field-responsive-setting'));
    }
  }, {
    key: "getInheritedValue",
    value: function getInheritedValue() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var isDefaultMode = 'default' === mode || '' === mode;
      var values = this.getValues();
      if (!this.isResponsive() || isDefaultMode) {
        return values["default"];
      } else {
        // Check for upstream values from the current breakpoint
        // responsive -> medium -> large -> default

        if ('large' === mode) {
          if ('' !== values["default"]) {
            return values["default"];
          }
        } else if ('medium' === mode) {
          if ('' !== values.large) {
            return values.large;
          } else if ('' !== values["default"]) {
            return values["default"];
          }
        } else {
          if ('' !== values.medium) {
            return values.medium;
          } else if ('' !== values.large) {
            return values.large;
          } else if ('' !== values["default"]) {
            return values["default"];
          }
        }
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var input = this.inputs[mode];
      if (input) {
        this.setInputAndTrigger(input, value);
      }
    }
  }, {
    key: "setSubValue",
    value: function setSubValue(subKey, value) {
      var _this$field3,
        _this2 = this;
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var key = 'default' !== mode && '' !== mode ? "".concat(this.rootName, "_").concat(mode) : this.rootName;
      var inputs = (_this$field3 = this.field) === null || _this$field3 === void 0 ? void 0 : _this$field3.querySelectorAll("[name=\"".concat(key, "[").concat(subKey, "]\"]"));
      if (0 < inputs.length) {
        inputs.forEach(function (input) {
          _this2.setInputAndTrigger(input, value);
        });
      }
    }
  }, {
    key: "setInputAndTrigger",
    value: function setInputAndTrigger(input, value) {
      if ('radio' === input.getAttribute('type')) {
        if (value === input.value) {
          input.setAttribute('checked', '');
          jQuery(input).trigger('change');
          input.dispatchEvent(new Event('change'));
        } else {
          input.removeAttribute('checked');
        }
      } else {
        input.value = value;
        jQuery(input).trigger('change');
        input.dispatchEvent(new Event('change'));
      }
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FLBuilderSettingField);

/***/ }),

/***/ "./src/builder-forms/classes/index.js":
/*!********************************************!*\
  !*** ./src/builder-forms/classes/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldController: () => (/* reexport safe */ _class_setting_field_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _class_setting_field_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-setting-field.js */ "./src/builder-forms/classes/class-setting-field.js");



/***/ }),

/***/ "./src/builder-forms/index.js":
/*!************************************!*\
  !*** ./src/builder-forms/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fl-controls */ "fl-controls");
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fl_controls__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes */ "./src/builder-forms/classes/index.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ "./src/builder-forms/ui/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _window$FL, _FL$Builder;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




// Form State API Object
var state = new fl_controls__WEBPACK_IMPORTED_MODULE_0__.createFormStore();
window.FL = (_window$FL = window.FL) !== null && _window$FL !== void 0 ? _window$FL : {};
FL.Builder = (_FL$Builder = FL.Builder) !== null && _FL$Builder !== void 0 ? _FL$Builder : {};

/**
 * Public Settings Form API
 */
FL.Builder.settingsForms = Object.freeze(_objectSpread({
  FieldController: _classes__WEBPACK_IMPORTED_MODULE_1__.FieldController,
  state: state
}, _ui__WEBPACK_IMPORTED_MODULE_2__));

/***/ }),

/***/ "./src/builder-forms/ui/events/button-groups/index.js":
/*!************************************************************!*\
  !*** ./src/builder-forms/ui/events/button-groups/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../forms */ "./src/builder-forms/ui/forms/index.js");


/**
 * Initializes all button group fields within a settings form.
 * Replaces FLBuilder._initButtonGroupFields
 *
 * @since 2.2
 * @access private
 * @method init
 */
var init = function init(scope) {
  (0,_forms__WEBPACK_IMPORTED_MODULE_0__.ensureForm)(scope).find('.fl-button-group-field').each(initField);
};

/**
 * Initializes a button group field within a settings form.
 * Replaces FLBuilder._initButtonGroupField
 *
 * @since 2.2
 * @access private
 * @method _initButtonGroupField
 */
var initField = function initField() {
  var wrap = jQuery(this),
    options = wrap.find('.fl-button-group-field-option'),
    multiple = wrap.data('multiple'),
    min = wrap.data('min'),
    max = wrap.data('max'),
    input = wrap.find('input:not(.fl-preview-ignore)'),
    allowEmpty = !!wrap.data('allowEmpty'),
    value = function value(format) {
      var val = [];
      options.each(function (i, option) {
        if ('1' === jQuery(option).attr('data-selected')) {
          val.push(jQuery(option).attr('data-value'));
        }
      });
      if ('array' == format) {
        return val;
      }
      return val.join(',');
    };
  options.on('click', function () {
    var option = jQuery(this),
      length = value('array').length,
      isSelected = '1' === option.attr('data-selected');
    if (!allowEmpty && isSelected) {
      return;
    }
    if (isSelected) {
      if (false == min) {
        option.attr('data-selected', '0');
      } else {
        if (length - 1 >= min) {
          option.attr('data-selected', '0');
        }
      }
    } else {
      // Unset other options
      if (true !== multiple) {
        options.attr('data-selected', '0');
      }
      if (false == max) {
        option.attr('data-selected', '1');
      } else {
        if (length + 1 <= max) {
          option.attr('data-selected', '1');
        }
      }
    }
    input.val(value('')).trigger('change');
  });

  // Handle value being changed externally
  input.on('change', function () {
    var value = input.val().split(',');

    // Unset other options
    if (true !== multiple) {
      options.attr('data-selected', '0');
    }
    jQuery.each(value, function (i, val) {
      var option = options.filter('[data-value="' + val + '"]');

      // Set the matching one.
      option.attr('data-selected', '1');
    });
  });
};

/***/ }),

/***/ "./src/builder-forms/ui/events/compound-fields/index.js":
/*!**************************************************************!*\
  !*** ./src/builder-forms/ui/events/compound-fields/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../forms */ "./src/builder-forms/ui/forms/index.js");


/**
 * Initializes all compound fields within a settings form.
 *
 * @since 2.2
 * @access private
 * @method _initCompoundFields
 */
var init = function init(scope) {
  (0,_forms__WEBPACK_IMPORTED_MODULE_0__.ensureForm)(scope).find('.fl-compound-field').each(initField);
};

/**
 * Initializes a compound field within a settings form.
 *
 * @since 2.2
 * @access private
 * @method _initCompoundField
 */
var initField = function initField() {
  var wrap = jQuery(this),
    sections = wrap.find('.fl-compound-field-section'),
    toggles = wrap.find('.fl-compound-field-section-toggle'),
    dimensions = wrap.find('.fl-compound-field-setting').has('.fl-dimension-field-units');
  sections.each(function () {
    var section = jQuery(this);
    if (!section.find('.fl-compound-field-section-toggle').length) {
      section.addClass('fl-compound-field-section-visible');
    }
  });
  toggles.on('click', function () {
    var toggle = jQuery(this),
      field = toggle.closest('.fl-field'),
      section = toggle.closest('.fl-compound-field-section'),
      className = '.' + section.attr('class').split(' ').join('.');
    field.find(className).toggleClass('fl-compound-field-section-visible');
  });

  // Init linking for compound dimension fields.
  dimensions.each(function () {
    var field = jQuery(this),
      label = field.find('.fl-compound-field-label'),
      icon = '<i class="fl-dimension-field-link fl-tip dashicons dashicons-admin-links" title="Link Values"></i>';
    if (!label.length || field.find('.fl-shadow-field').length) {
      return;
    }
    label.append(icon);
  });
};

/***/ }),

/***/ "./src/builder-forms/ui/events/index.js":
/*!**********************************************!*\
  !*** ./src/builder-forms/ui/events/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initEvents: () => (/* binding */ initEvents)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../forms */ "./src/builder-forms/ui/forms/index.js");
/* harmony import */ var _sections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sections */ "./src/builder-forms/ui/events/sections/index.js");
/* harmony import */ var _button_groups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button-groups */ "./src/builder-forms/ui/events/button-groups/index.js");
/* harmony import */ var _compound_fields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./compound-fields */ "./src/builder-forms/ui/events/compound-fields/index.js");




var initEvents = function initEvents(_form) {
  var form = (0,_forms__WEBPACK_IMPORTED_MODULE_0__.ensureForm)(_form);
  (0,_sections__WEBPACK_IMPORTED_MODULE_1__.init)(form);
  (0,_button_groups__WEBPACK_IMPORTED_MODULE_2__.init)(form);
  (0,_compound_fields__WEBPACK_IMPORTED_MODULE_3__.init)(form);
};

/***/ }),

/***/ "./src/builder-forms/ui/events/sections/index.js":
/*!*******************************************************!*\
  !*** ./src/builder-forms/ui/events/sections/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../forms */ "./src/builder-forms/ui/forms/index.js");


/**
 * Setup section toggling for all sections
 * Replaces FLBuilder._initSettingsSections
 *
 * @since 2.2
 * @access private
 * @method _initSettingsSections
 * @return void
 */
var init = function init(scope) {
  (0,_forms__WEBPACK_IMPORTED_MODULE_0__.ensureForm)(scope).find('.fl-builder-settings-section').each(initSection);
};

/**
 * Setup section toggling
 * not specified as arrow function on purpose (because of $(this) )
 * Replaces FLBuilder._initSection
 *
 * @since 2.2
 * @access private
 * @method _initSection
 * @return void
 */
var initSection = function initSection() {
  var wrap = jQuery(this);
  var form = wrap.closest('form.fl-builder-settings');
  var tab = wrap.closest('.fl-builder-settings-tab');
  var button = wrap.find('.fl-builder-settings-section-header');
  var key = wrap.attr('id').replace('fl-builder-settings-section-', '');
  var formGroup = form.attr('data-form-group');
  var formId = form.attr('data-form-id');
  if ('fl-builder-settings-tab-advanced' === tab.attr('id')) {
    formGroup = 'general';
    formId = 'advanced';
  }
  var collapsed = getSectionToggleCache(formGroup, formId, key);
  if (null !== collapsed) {
    if (collapsed) {
      wrap.addClass('fl-builder-settings-section-collapsed');
    } else {
      wrap.removeClass('fl-builder-settings-section-collapsed');
    }
  }
  button.on('click', function () {
    if (wrap.hasClass('fl-builder-settings-section-collapsed')) {
      wrap.removeClass('fl-builder-settings-section-collapsed');
      setSectionToggleCache(formGroup, formId, key, false);
    } else {
      wrap.addClass('fl-builder-settings-section-collapsed');
      setSectionToggleCache(formGroup, formId, key, true);
    }
  });
};
var getSectionToggleCache = function getSectionToggleCache(formGroup, formId, key) {
  var cache = localStorage.getItem('fl-builder-settings-sections');
  if (!cache) {
    return null;
  } else {
    cache = JSON.parse(cache);
  }
  if (cache[formGroup] && cache[formGroup][formId] && cache[formGroup][formId][key] !== undefined) {
    return cache[formGroup][formId][key];
  }
  return null;
};
var setSectionToggleCache = function setSectionToggleCache(formGroup, formId, key, value) {
  var cache = localStorage.getItem('fl-builder-settings-sections');
  if (!cache) {
    cache = {};
  } else {
    cache = JSON.parse(cache);
  }
  cache[formGroup] = cache[formGroup] || {};
  cache[formGroup][formId] = cache[formGroup][formId] || {};
  cache[formGroup][formId][key] = value;
  localStorage.setItem('fl-builder-settings-sections', JSON.stringify(cache));
};

/***/ }),

/***/ "./src/builder-forms/ui/field-types/children/index.js":
/*!************************************************************!*\
  !*** ./src/builder-forms/ui/field-types/children/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../forms */ "./src/builder-forms/ui/forms/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Series = FL.Controls.Series;
var forEach = FL.Builder.utils.objects.forEach;

/**
 * Children Field
 *
 * This field type represents a container node's immediate child nodes for easy manipulation.
 * This field doesn't store any state on the node.
 *
 * Goals
 * - [x] Display nodes in proper order
 * - [x] Reorder nodes in the store and layout accurately
 * - [ ] Display a node title and icon similar to the outline panel (see <Series.TitleCard title={ ... } /> )
 * - [x] Delete a node from the store and layout
 * - [x] Duplicate a node in the store and layout
 * - [x] Doubleclick an item to open its settings
 * - [ ] Create new nodes via the + button. This will need to map to accepted types for the module.
 *       (I may need to rework the series menu for this).
 * Issues
 * - [ ] Seems like it doesn't always track with node updates on the canvas. Try reordering directly.
 */

var defs = {
  node: {
    label: 'Child Element',
    content: /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref, ref) {
      var state = _ref.state,
        style = _ref.style;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Series.TitleCard, {
        ref: ref,
        style: _objectSpread({
          paddingLeft: 20
        }, style),
        title: state.settings.type,
        thumbProps: {
          style: {}
        },
        onDoubleClick: function onDoubleClick() {
          var _FL$Builder$data$getL = FL.Builder.data.getLayoutActions(),
            displaySettings = _FL$Builder$data$getL.displaySettings;
          displaySettings(state.node);
        }
      });
    })
  }
};
var ChildrenField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function () {
  var _useSettingsForm = (0,_forms__WEBPACK_IMPORTED_MODULE_1__.useSettingsForm)(),
    config = _useSettingsForm.config;
  var id = config.id,
    type = config.type,
    isNode = config.isNode,
    nodeId = config.nodeId;
  var _FL$Builder$data = FL.Builder.data,
    getLayoutActions = _FL$Builder$data.getLayoutActions,
    getLayoutHooks = _FL$Builder$data.getLayoutHooks,
    getSystemConfig = _FL$Builder$data.getSystemConfig;
  var _FL$Builder$getAction = FL.Builder.getActions(),
    deleteNode = _FL$Builder$getAction.deleteNode,
    copyNode = _FL$Builder$getAction.copyNode;
  var _getLayoutActions = getLayoutActions(),
    reorderChildren = _getLayoutActions.reorderChildren;
  var _getLayoutHooks = getLayoutHooks(),
    useNodeChildren = _getLayoutHooks.useNodeChildren;

  // Map node data from layout store to Series item format
  var items = useNodeChildren(config.nodeId).map(function (child) {
    return {
      id: child.node,
      type: 'node',
      state: child
    };
  });
  if (!isNode) {
    return null;
  }

  // When series items get sorted, pass array of ids to layout store
  var setItems = function setItems(items) {
    return reorderChildren(config.nodeId, items.map(function (item) {
      return item.id;
    }));
  };
  var CustomMenu = function CustomMenu(_ref2) {
    var closeMenu = _ref2.closeMenu;
    //We need to struct a (short) list of suggested child nodes to add
    var items = {
      button: {
        label: 'Button',
        nodeType: 'button'
      },
      photo: {
        label: 'Photo',
        nodeType: 'photo'
      }
    };
    if ('module' === type) {
      var buidlerConfig = getSystemConfig();
      var moduleType = buidlerConfig.contentItems.module.find(function (module) {
        return module.slug === id;
      });
      if ('all' === moduleType.accepts) {

        // We need a suggestedChildren prop something here
      } else {

        // Use the types it lists
        //buidlerConfig.contentItems.module.find( module => module.slug === id )
      }
    }

    // We may want to come back and add support for Row and Column nodes here at some point

    return forEach(items, function (key, _ref3) {
      var label = _ref3.label,
        nodeType = _ref3.nodeType;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
        key: key
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        onClick: function onClick() {
          console.log("create ".concat(nodeType, " child of ").concat(nodeId));
          closeMenu();
        }
      }, label));
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Series, {
    definitions: defs,
    items: items,
    setItems: setItems,
    deleteItem: deleteNode,
    cloneItem: copyNode,
    canReset: false,
    customAddMenu: CustomMenu
  }));
}, function () {
  return true;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'children',
  label: 'Children',
  content: ChildrenField
});

/***/ }),

/***/ "./src/builder-forms/ui/field-types/field-editor.scss":
/*!************************************************************!*\
  !*** ./src/builder-forms/ui/field-types/field-editor.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builder-forms/ui/field-types/field-shadow.scss":
/*!************************************************************!*\
  !*** ./src/builder-forms/ui/field-types/field-shadow.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builder-forms/ui/field-types/field-time.scss":
/*!**********************************************************!*\
  !*** ./src/builder-forms/ui/field-types/field-time.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builder-forms/ui/field-types/field-typography.scss":
/*!****************************************************************!*\
  !*** ./src/builder-forms/ui/field-types/field-typography.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builder-forms/ui/field-types/index.js":
/*!***************************************************!*\
  !*** ./src/builder-forms/ui/field-types/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canDeferField: () => (/* binding */ canDeferField)
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fl-controls */ "fl-controls");
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fl_controls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _field_editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field-editor.scss */ "./src/builder-forms/ui/field-types/field-editor.scss");
/* harmony import */ var _field_shadow_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./field-shadow.scss */ "./src/builder-forms/ui/field-types/field-shadow.scss");
/* harmony import */ var _field_time_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./field-time.scss */ "./src/builder-forms/ui/field-types/field-time.scss");
/* harmony import */ var _field_typography_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./field-typography.scss */ "./src/builder-forms/ui/field-types/field-typography.scss");
/* harmony import */ var _children__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./children */ "./src/builder-forms/ui/field-types/children/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



// Include CSS for wp.template field types





// Combine field types from fl-controls with any local components

var _fieldTypes = _objectSpread(_objectSpread({}, fl_controls__WEBPACK_IMPORTED_MODULE_1__.fieldTypes), {}, {
  children: _children__WEBPACK_IMPORTED_MODULE_6__["default"]
});

/**
 * Return a component for field types that we have controls for.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('fl_builder_settings_field_type', 'fl-builder', function (Component, type) {
  // Publicly Available Field Types
  if (Object.keys(_fieldTypes).includes(type)) {
    return _fieldTypes[type].content;
  }
  return Component;
});

/**
 * Can a field be rendered via react?
 */
var canDeferField = function canDeferField(field) {
  return Object.keys(_fieldTypes).includes(field.type);
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/context/index.js":
/*!*****************************************************!*\
  !*** ./src/builder-forms/ui/forms/context/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsFormContext: () => (/* binding */ SettingsFormContext),
/* harmony export */   defaultSettingsFormContext: () => (/* binding */ defaultSettingsFormContext),
/* harmony export */   useSettingsForm: () => (/* binding */ useSettingsForm)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var defaultSettingsFormContext = {};
var SettingsFormContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultSettingsFormContext);
var useSettingsForm = function useSettingsForm() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SettingsFormContext);
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/form-content/compound-field-controls/index.js":
/*!**********************************************************************************!*\
  !*** ./src/builder-forms/ui/forms/form-content/compound-field-controls/index.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompoundFieldColorPicker: () => (/* binding */ CompoundFieldColorPicker)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fl-controls */ "fl-controls");
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fl_controls__WEBPACK_IMPORTED_MODULE_1__);


var CompoundFieldColorPicker = function CompoundFieldColorPicker(_ref) {
  var name = _ref.name,
    value = _ref.value,
    setValue = _ref.setValue,
    showAlpha = _ref.showAlpha,
    showReset = _ref.showReset,
    inputElement = _ref.inputElement,
    _ref$supportsConnecti = _ref.supportsConnections,
    supportsConnections = _ref$supportsConnecti === void 0 ? false : _ref$supportsConnecti;
  var picker = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var processValue = function processValue(value) {
    // if its a hex without the # add it
    if (!CSS.supports('color', value) && CSS.supports('color', '#' + value)) {
      return '#' + value;
    }
    return value;
  };
  var _value = processValue(value);
  var onConnect = function onConnect(_ref2) {
    var uid = _ref2.uid,
      isGlobalColor = _ref2.isGlobalColor;
    if (undefined !== FLThemeBuilderFieldConnections) {
      var property = isGlobalColor ? 'global_color_' + uid : 'theme_color_' + uid;
      var label = FLBuilderConfig.globalColorLabels[property];
      console.log('connect', property, label, name);
      FLThemeBuilderFieldConnections._connectField(jQuery(inputElement), label, {
        property: property,
        object: 'site',
        field: name,
        settings: null
      });
      picker.current.close();
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_1__.Color.Picker, {
    ref: picker,
    value: _value,
    onChange: setValue,
    showAlpha: showAlpha,
    showReset: showReset,
    buttonProps: {
      style: {
        flexGrow: 1
      }
    },
    onConnect: supportsConnections ? onConnect : null
  });
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/form-content/field.js":
/*!**********************************************************!*\
  !*** ./src/builder-forms/ui/forms/form-content/field.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fields: () => (/* binding */ Fields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fl-controls */ "fl-controls");
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fl_controls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _compound_field_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compound-field-controls */ "./src/builder-forms/ui/forms/form-content/compound-field-controls/index.js");
/* harmony import */ var _field_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../field-types */ "./src/builder-forms/ui/field-types/index.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../context */ "./src/builder-forms/ui/forms/context/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var forEach = FL.Builder.utils.objects.forEach;

/**
 * Render fields for a section.
 * Matches logic in FLBuilderSettingsForms.renderFields()
 */
var Fields = function Fields(_ref) {
  var renderMode = _ref.renderMode,
    fields = _ref.fields,
    tabId = _ref.tabId,
    sectionId = _ref.sectionId,
    _ref$filterFieldData = _ref.filterFieldData,
    filterFieldData = _ref$filterFieldData === void 0 ? function (data) {
      return data;
    } : _ref$filterFieldData;
  var _useSettingsForm = (0,_context__WEBPACK_IMPORTED_MODULE_6__.useSettingsForm)(),
    uuid = _useSettingsForm.uuid,
    getFieldElement = _useSettingsForm.getFieldElement,
    getFormElement = _useSettingsForm.getFormElement,
    settings = _useSettingsForm.settings,
    setSetting = _useSettingsForm.setSetting,
    config = _useSettingsForm.config;
  var _FLBuilderConfig = FLBuilderConfig,
    responsiveFields = _FLBuilderConfig.responsiveFields,
    globalSettings = _FLBuilderConfig.global;
  return forEach(fields, function (name, field) {
    if (!field || !field.type) {
      return null;
    }

    // Is this a repeater field
    var isMultiple = !!field.multiple;

    // Responsive Setting Support
    var supportsResponsive = responsiveFields.includes(field.type);
    var responsive = null;
    if (field.responsive && globalSettings.responsive_enabled && !isMultiple && supportsResponsive) {
      responsive = field.responsive;
    }

    // Data matches fl-builder-settings-row template
    var data = filterFieldData({
      tabId: tabId,
      sectionId: sectionId,
      field: field,
      name: name,
      rootName: name,
      value: undefined !== settings[name] ? settings[name] : field["default"],
      preview: field.preview ? field.preview : {
        type: 'refresh'
      },
      responsive: responsive,
      rowClass: field.row_class ? ' ' + field.row_class : '',
      isMultiple: isMultiple,
      supportsMultiple: 'editor' !== field.type && 'service' !== field.type,
      settings: settings,
      globalSettings: globalSettings,
      node: {
        type: config.id
      },
      setSetting: setSetting,
      setValue: function setValue(newValue) {
        return setSetting(name, newValue);
      }
    });

    // Things that really shouldn't be filtered
    data = _objectSpread(_objectSpread({}, data), {}, {
      getFieldElement: getFieldElement,
      getFormElement: getFormElement,
      devices: ['default', 'large', 'medium', 'responsive']
    });
    var key = uuid + tabId + sectionId + name;
    if (!(0,_field_types__WEBPACK_IMPORTED_MODULE_5__.canDeferField)(data.field, data)) {
      var compoundFields = ['typography', 'border', 'gradient', 'fl-price-feature', 'global-color'];
      if (compoundFields.includes(field.type)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(WPTemplateField, _extends({
          key: key
        }, data));
      }
      return null;
    }
    if ('portals' === renderMode) {
      var dom = getFieldElement(name);
      if (!dom) {
        console.warn('Could not find dom element for Field', name);
        return null;
      }
      return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FieldRow, data), dom, key);
    } else {
      /**
       * Allow for custom tabs and sections to render fields via react without portals
       */
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FieldRow, data);
    }
  });
};

/**
 * Render a single row in the fields table
 * Matches fl-builder-settings-row template except that we're mounting a portal
 * onto either the <tbody> or <tr> element that's already been rendered.
 */
var FieldRow = function FieldRow(data) {
  var _FLBuilderStrings = FLBuilderStrings,
    addField = _FLBuilderStrings.addField;
  if (data.isMultiple && data.supportsMultiple) {
    var origValues = data.value;
    var values = origValues;
    if (undefined === origValues.length) {
      var tempValues = [];
      for (var index in origValues) {
        tempValues.push(origValues[index]);
      }
      values = tempValues;
    }
    data.name += '[]';
    return values.map(function (value, i) {
      data.index = i;
      data.value = value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_3__.Error.Boundary, {
        key: i
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
        className: "fl-builder-field-multiple",
        "data-field": data.rootName
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Field, data), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
        className: "fl-builder-field-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {
        className: "fl-builder-field-move fas fa-arrows-alt"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {
        className: "fl-builder-field-copy far fa-copy"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {
        className: "fl-builder-field-delete fas fa-times"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, !data.field.label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
        colSpan: "2"
      }), data.field.label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
        onClick: function onClick(e) {
          return e.preventDefault();
        },
        className: "fl-builder-field-add fl-builder-button",
        "data-field": data.rootName
      }, addField.replace('%s', data.field.label))))));
    });
  } else {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_3__.Error.Boundary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Field, data));
  }
};

/**
 * Matches logic for fl-builder-field template
 */
var Field = function Field(data) {
  var FieldType = wp.hooks.applyFilters('fl_builder_settings_field_type', function () {}, data.field.type, data);
  var responsiveToggle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {
    className: "fl-field-responsive-toggle dashicons dashicons-desktop",
    "data-mode": "default"
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, data.field.label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "fl-field-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: data.name
  }, 'button' === data.field.type ? '&nbsp;' : data.field.label, undefined !== data.index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fl-builder-field-index"
  }, parseInt(data.index) + 1), data.responsive && responsiveToggle, data.field.help && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fl-help-tooltip"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fl-help-tooltip-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "12",
    height: "12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    href: "#fl-question-mark"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fl-help-tooltip-text"
  }, data.field.help)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "fl-field-control",
    colSpan: !data.field.label ? 2 : null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-field-control-wrapper"
  }, data.responsive && responsiveToggle, data.devices.map(function (device) {
    // For non-responsive fields we only want to render the default state
    if ('default' !== device && !data.responsive) {
      return null;
    }
    if (data.responsive) {
      // Ensure new object
      var _data = _objectSpread({}, data);
      _data.name = 'default' === device ? _data.rootName : _data.rootName + '_' + device;
      _data.value = _data.settings[_data.name] ? _data.settings[_data.name] : '';
      _data.setValue = function (value) {
        return _data.setSetting(_data.name, value);
      };
      if ('object' === _typeof(_data.responsive)) {
        for (var key in _data.responsive) {
          if ('object' === _typeof(_data.responsive[key]) && undefined !== _data.responsive[key][device]) {
            _data.field[key] = _data.responsive[key][device];
          }
        }
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: device,
        className: "fl-field-responsive-setting fl-field-responsive-setting-".concat(device),
        "data-device": device
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_3__.Error.Boundary, {
        alternate: FieldError
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FieldType, _data)));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_3__.Error.Boundary, {
        key: device,
        alternate: FieldError
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FieldType, data));
    }
  }), data.field.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fl-field-description"
  }, data.field.description))));
};
var FieldError = function FieldError(_ref2) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_3__.Error.DefaultError, _extends({
    title: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Field Type Error', 'fl-builder'),
    style: {
      boxShadow: '0 0 0 1px #ffc5c5',
      background: 'rgb(255 243 243)',
      color: '#cd0000',
      padding: 16,
      borderRadius: 'var(--fl-builder-radius)'
    }
  }, rest));
};
var WPTemplateField = function WPTemplateField(props) {
  var field = props.field,
    rootName = props.name,
    getFieldElement = props.getFieldElement,
    devices = props.devices,
    responsive = props.responsive,
    settings = props.settings,
    setSetting = props.setSetting;
  var fieldRoot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  fieldRoot.current = getFieldElement(rootName);

  /**
   * Special handling for color pickers within compound fields
   */
  var compoundColorTypes = {
    'typography': _defineProperty({}, '[][text_shadow][][color]', {
      showAlpha: true,
      showReset: true,
      getValue: function getValue(setting) {
        var _setting$text_shadow;
        return (_setting$text_shadow = setting.text_shadow) === null || _setting$text_shadow === void 0 ? void 0 : _setting$text_shadow.color;
      },
      mapValue: function mapValue(value, setting) {
        return _objectSpread(_objectSpread({}, setting), {}, _defineProperty({}, 'text_shadow', _objectSpread(_objectSpread({}, setting.text_shadow), {}, {
          color: value
        })));
      }
    }),
    'border': _defineProperty(_defineProperty({}, '[][color]', {
      showAlpha: true,
      showReset: true,
      getValue: function getValue(setting) {
        return setting.color;
      },
      mapValue: function mapValue(value, setting) {
        return _objectSpread(_objectSpread({}, setting), {}, {
          color: value
        });
      }
    }), '[][shadow][][color]', {
      showAlpha: true,
      showReset: true,
      getValue: function getValue(setting) {
        var _setting$shadow;
        return (_setting$shadow = setting.shadow) === null || _setting$shadow === void 0 ? void 0 : _setting$shadow.color;
      },
      mapValue: function mapValue(value, setting) {
        return _objectSpread(_objectSpread({}, setting), {}, {
          shadow: _objectSpread(_objectSpread({}, setting.shadow), {}, {
            color: value
          })
        });
      }
    }),
    'gradient': _defineProperty(_defineProperty({}, '[][colors][0]', {
      showAlpha: true,
      showReset: true,
      getValue: function getValue(setting) {
        var _setting$colors, _setting$colors2;
        return (_setting$colors = setting.colors) !== null && _setting$colors !== void 0 && _setting$colors[0] ? (_setting$colors2 = setting.colors) === null || _setting$colors2 === void 0 ? void 0 : _setting$colors2[0] : '';
      },
      mapValue: function mapValue(value, setting) {
        var _setting$colors3;
        return _objectSpread(_objectSpread({}, setting), {}, {
          colors: [value, (_setting$colors3 = setting.colors) === null || _setting$colors3 === void 0 ? void 0 : _setting$colors3[1]]
        });
      }
    }), '[][colors][1]', {
      showAlpha: true,
      showReset: true,
      getValue: function getValue(setting) {
        var _setting$colors4, _setting$colors5;
        return (_setting$colors4 = setting.colors) !== null && _setting$colors4 !== void 0 && _setting$colors4[1] ? (_setting$colors5 = setting.colors) === null || _setting$colors5 === void 0 ? void 0 : _setting$colors5[1] : '';
      },
      mapValue: function mapValue(value, setting) {
        var _setting$colors6;
        return _objectSpread(_objectSpread({}, setting), {}, {
          colors: [(_setting$colors6 = setting.colors) === null || _setting$colors6 === void 0 ? void 0 : _setting$colors6[0], value]
        });
      }
    }),
    'fl-price-feature': {},
    'global-color': {}
  };
  if (Object.keys(compoundColorTypes).includes(field.type)) {
    return devices.map(function (device) {
      if ('default' !== device && !responsive) {
        return null;
      }
      var name = 'default' === device ? rootName : "".concat(rootName, "_").concat(device);
      var fieldValue = settings[name] ? settings[name] : '';
      var subPickerConfigs = compoundColorTypes[field.type];

      // Special handling for repeater fields
      var repeaters = ['fl-price-feature', 'global-color'];
      if (repeaters.includes(field.type)) {
        var _fieldRoot$current$ch, _fieldRoot$current;
        var items = Array.from((_fieldRoot$current$ch = (_fieldRoot$current = fieldRoot.current) === null || _fieldRoot$current === void 0 ? void 0 : _fieldRoot$current.children) !== null && _fieldRoot$current$ch !== void 0 ? _fieldRoot$current$ch : []);

        // Loop over Rows
        items.map(function (item, i) {
          if (item.matches('.fl-builder-field-multiple')) {
            // Find the input for the existing color picker
            var input = item.querySelector('input.fl-color-picker-value');
            if (input) {
              var inputName = input.getAttribute('name');
              var extension = inputName.replace(name, '');
              var key = 'fl-price-feature' === field.type ? 'icon_color' : 'color';

              // Create a config object
              subPickerConfigs[extension] = {
                showAlpha: true,
                showReset: true,
                getValue: function getValue(setting) {
                  return setting[i][key];
                },
                mapValue: function mapValue(value, _setting) {
                  var setting = _setting;

                  // Check if its an object rather than an array
                  if (!Array.isArray(setting)) {
                    setting = Object.keys(_setting).map(function (i) {
                      return _setting[i];
                    });
                  }
                  return setting.toSpliced(i, 1, _objectSpread(_objectSpread({}, setting[i]), {}, _defineProperty({}, key, value)));
                }
              };
            }
          }
        });
      }
      return Object.entries(subPickerConfigs).map(function (_ref3) {
        var _fieldRoot$current2;
        var _ref4 = _slicedToArray(_ref3, 2),
          nameExtension = _ref4[0],
          config = _ref4[1];
        var showAlpha = config.showAlpha,
          showReset = config.showReset,
          getValue = config.getValue,
          mapValue = config.mapValue;
        var input = (_fieldRoot$current2 = fieldRoot.current) === null || _fieldRoot$current2 === void 0 ? void 0 : _fieldRoot$current2.querySelector("input[name=\"".concat(name + nameExtension, "\"]"));
        if (!input) {
          return;
        }
        var wrap = input.parentElement;
        var mount = wrap.querySelector('.picker-mount');
        if (mount) {
          return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_compound_field_controls__WEBPACK_IMPORTED_MODULE_4__.CompoundFieldColorPicker, {
            key: name + nameExtension,
            value: getValue(fieldValue),
            setValue: function setValue(pickerValue) {
              setSetting(name, mapValue(pickerValue, fieldValue));
              input.value = pickerValue;
              jQuery(input).trigger('change');
            },
            showAlpha: showAlpha,
            showReset: showReset,
            name: name,
            inputElement: input,
            supportsConnections: 'global-color' !== field.type
          }), mount, name + nameExtension);
        }
      });
    });
  }

  // All other field types do nothing
  return null;
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/form-content/index.js":
/*!**********************************************************!*\
  !*** ./src/builder-forms/ui/forms/form-content/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fields: () => (/* reexport safe */ _field__WEBPACK_IMPORTED_MODULE_6__.Fields),
/* harmony export */   FormContents: () => (/* binding */ FormContents),
/* harmony export */   canDeferTab: () => (/* binding */ canDeferTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fl-controls */ "fl-controls");
/* harmony import */ var fl_controls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fl_controls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context */ "./src/builder-forms/ui/forms/context/index.js");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab */ "./src/builder-forms/ui/forms/form-content/tab.js");
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./field */ "./src/builder-forms/ui/forms/form-content/field.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }








var forEach = FL.Builder.utils.objects.forEach;
var reactBasedTabs = ['auto_style'];
var canDeferTab = function canDeferTab(tabId) {
  var canDefer = reactBasedTabs.includes(tabId);
  return (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.applyFilters)('fl_builder_settings_can_defer_tab_render', canDefer, tabId);
};
var FormContents = function FormContents() {
  var _useSettingsForm = (0,_context__WEBPACK_IMPORTED_MODULE_4__.useSettingsForm)(),
    config = _useSettingsForm.config,
    getTabElement = _useSettingsForm.getTabElement;

  // Tabs
  return forEach(config.tabs, function (tabId, tab) {
    if (canDeferTab(tabId)) {
      // Render react-based dom for this tab
      var Tab = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.applyFilters)('fl_builder_settings_tab_component', _tab__WEBPACK_IMPORTED_MODULE_5__.TabContent, tabId, tab, config);
      var dom = getTabElement(tabId);
      if (!dom) {
        console.warn('Could not find dom element for Tab', tabId);
        return null;
      }

      /**
       * Portal onto the root tab div and render contents
       */
      return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_controls__WEBPACK_IMPORTED_MODULE_3__.Error.Boundary, {
        key: tabId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Tab, _extends({
        tabId: tabId
      }, tab))), dom);
    } else {
      // Render Virtual Tab
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(VirtualTab, _extends({
        key: tabId,
        tabId: tabId
      }, tab));
    }
  });
};
var VirtualTab = function VirtualTab(_ref) {
  var tabId = _ref.tabId,
    _ref$sections = _ref.sections,
    sections = _ref$sections === void 0 ? {} : _ref$sections;
  return forEach(sections, function (sectionId, section) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(VirtualSection, _extends({
      key: tabId + sectionId,
      tabId: tabId,
      sectionId: sectionId
    }, section));
  });
};
var VirtualSection = function VirtualSection(_ref2) {
  var tabId = _ref2.tabId,
    sectionId = _ref2.sectionId,
    fields = _ref2.fields;
  var _useSettingsForm2 = (0,_context__WEBPACK_IMPORTED_MODULE_4__.useSettingsForm)(),
    uuid = _useSettingsForm2.uuid;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_field__WEBPACK_IMPORTED_MODULE_6__.Fields, {
    key: uuid + tabId + sectionId,
    renderMode: "portals",
    fields: fields,
    tabId: tabId,
    sectionId: sectionId
  });
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/form-content/sections.js":
/*!*************************************************************!*\
  !*** ./src/builder-forms/ui/forms/form-content/sections.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Section: () => (/* binding */ Section),
/* harmony export */   Sections: () => (/* binding */ Sections)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./field */ "./src/builder-forms/ui/forms/form-content/field.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




var forEach = FL.Builder.utils.objects.forEach;
var Sections = function Sections(_ref) {
  var tabId = _ref.tabId,
    sections = _ref.sections,
    _ref$filterSection = _ref.filterSection,
    filterSection = _ref$filterSection === void 0 ? function (section) {
      return section;
    } : _ref$filterSection,
    _ref$sectionComponent = _ref.sectionComponent,
    Component = _ref$sectionComponent === void 0 ? Section : _ref$sectionComponent,
    _ref$filterFieldData = _ref.filterFieldData,
    filterFieldData = _ref$filterFieldData === void 0 ? function (field) {
      return field;
    } : _ref$filterFieldData;
  return forEach(sections, function (sectionId, section) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({
      tabId: tabId,
      sectionId: sectionId,
      filterFieldData: filterFieldData
    }, filterSection(section, sectionId, tabId)));
  });
};
var Section = function Section(_ref2) {
  var tabId = _ref2.tabId,
    sectionId = _ref2.sectionId,
    title = _ref2.title,
    description = _ref2.description,
    collapsed = _ref2.collapsed,
    fields = _ref2.fields,
    className = _ref2.className,
    _ref2$filterFieldData = _ref2.filterFieldData,
    filterFieldData = _ref2$filterFieldData === void 0 ? function (field) {
      return field;
    } : _ref2$filterFieldData;
  var hasTitle = undefined !== title && '' !== title;
  var isCollapsed = undefined !== collapsed ? collapsed : false;
  if (hasTitle && true === FLBuilderConfig.collapseSectionsDefault) {
    isCollapsed = true;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "fl-builder-settings-section-".concat(sectionId),
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'fl-builder-settings-section': true,
      'fl-builder-settings-section-collapsed': isCollapsed
    }, className)
  }, hasTitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-builder-settings-section-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "fl-builder-settings-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_2__.Caret, null), title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-builder-settings-section-content"
  }, description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "fl-builder-settings-description"
  }, description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "fl-form-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_field__WEBPACK_IMPORTED_MODULE_3__.Fields, {
    tabId: tabId,
    sectionId: sectionId,
    fields: fields,
    filterFieldData: filterFieldData
  }))));
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/form-content/tab.js":
/*!********************************************************!*\
  !*** ./src/builder-forms/ui/forms/form-content/tab.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TabContent: () => (/* binding */ TabContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sections */ "./src/builder-forms/ui/forms/form-content/sections.js");



/**
 * Meant to render within a portal.
 * Outer wrapper element is not included because that's our mount point.
 */
var TabContent = function TabContent(_ref) {
  var tabId = _ref.tabId,
    description = _ref.description,
    sections = _ref.sections;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "fl-builder-settings-tab-description"
  }, description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_sections__WEBPACK_IMPORTED_MODULE_1__.Sections, {
    tabId: tabId,
    sections: sections
  }));
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/index.js":
/*!*********************************************!*\
  !*** ./src/builder-forms/ui/forms/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormsManager: () => (/* binding */ FormsManager),
/* harmony export */   canDeferTab: () => (/* reexport safe */ _form_content__WEBPACK_IMPORTED_MODULE_4__.canDeferTab),
/* harmony export */   ensureForm: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_5__.ensureForm),
/* harmony export */   focusFirstSettingsControl: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_5__.focusFirstSettingsControl),
/* harmony export */   getFormElement: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_5__.getFormElement),
/* harmony export */   useSettingsForm: () => (/* reexport safe */ _context__WEBPACK_IMPORTED_MODULE_3__.useSettingsForm)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ */ "./src/builder-forms/index.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/builder-forms/ui/forms/context/index.js");
/* harmony import */ var _form_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form-content */ "./src/builder-forms/ui/forms/form-content/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./src/builder-forms/ui/forms/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








/**
 * Root component for handling react-based rendering of forms and partial tabs/sections/fields
 */
var FormsManager = function FormsManager(_ref) {
  var _ref$onSetSetting = _ref.onSetSetting,
    onSetSetting = _ref$onSetSetting === void 0 ? function () {} : _ref$onSetSetting;
  var _state$useFormState = ___WEBPACK_IMPORTED_MODULE_2__.state.useFormState(),
    _state$useFormState2 = _slicedToArray(_state$useFormState, 2),
    configs = _state$useFormState2[0],
    setConfigs = _state$useFormState2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, configs.map(function (config, i) {
    var uuid = config.nodeId ? config.nodeId + config.lightboxId : config.type + config.lightboxId;
    var setConfig = function setConfig(newConfig) {
      return setConfigs(configs.toSpliced(i, 1, newConfig));
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Form, {
      key: uuid,
      uuid: uuid,
      config: config,
      settings: config.settings,
      onSetSettings: function onSetSettings(settings) {
        return setConfig(_objectSpread(_objectSpread({}, config), {}, {
          settings: settings
        }));
      },
      onSetSetting: onSetSetting
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_1__.SymbolLibrary, null));
};
var Form = function Form(_ref2) {
  var uuid = _ref2.uuid,
    config = _ref2.config,
    settings = _ref2.settings,
    _ref2$onSetSettings = _ref2.onSetSettings,
    setSettings = _ref2$onSetSettings === void 0 ? function () {} : _ref2$onSetSettings,
    _ref2$onSetSetting = _ref2.onSetSetting,
    onSetSetting = _ref2$onSetSetting === void 0 ? function () {} : _ref2$onSetSetting;
  var initialSettings = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(settings);
  var _getFormElement = function _getFormElement() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getFormElement)(config.lightboxId).get(0);
  };
  var api = {
    uuid: uuid,
    config: config,
    settings: settings,
    initialSettings: initialSettings,
    setSettings: setSettings,
    setSetting: function setSetting(key, value) {
      setSettings(_objectSpread(_objectSpread({}, settings), {}, _defineProperty({}, key, value)));
      onSetSetting(key, value);
    },
    resetSettings: function resetSettings() {
      return setSettings(_objectSpread({}, initialSettings));
    },
    getFormElement: _getFormElement,
    getTabElement: function getTabElement(name) {
      var _getFormElement2;
      return (_getFormElement2 = _getFormElement()) === null || _getFormElement2 === void 0 ? void 0 : _getFormElement2.querySelector("#fl-builder-settings-tab-".concat(name));
    },
    getFieldElement: function getFieldElement(name) {
      var _getFormElement3;
      return (_getFormElement3 = _getFormElement()) === null || _getFormElement3 === void 0 ? void 0 : _getFormElement3.querySelector("#fl-field-".concat(name));
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context__WEBPACK_IMPORTED_MODULE_3__.SettingsFormContext.Provider, {
    key: api.uuid,
    value: api
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_form_content__WEBPACK_IMPORTED_MODULE_4__.FormContents, null));
};

/***/ }),

/***/ "./src/builder-forms/ui/forms/utils.js":
/*!*********************************************!*\
  !*** ./src/builder-forms/ui/forms/utils.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureForm: () => (/* binding */ ensureForm),
/* harmony export */   focusFirstSettingsControl: () => (/* binding */ focusFirstSettingsControl),
/* harmony export */   getFormElement: () => (/* binding */ getFormElement)
/* harmony export */ });
/**
 * Get a jQuery reference to a form element
 *
 * @param String optional id of form
 * @return {jQuery}
 */
var getFormElement = function getFormElement(id) {
  var selector = '.fl-builder-settings:visible';
  if (id) {
    selector = ".fl-builder-settings[data-instance-id=\"".concat(id, "\"]");
  }
  return jQuery(selector, window.parent.document);
};
var ensureForm = function ensureForm(el) {
  return undefined !== el ? el : getFormElement();
};

/**
 * Focus the first visible control in a settings panel
 *
 * @since 2.0
 */
var focusFirstSettingsControl = function focusFirstSettingsControl() {
  var form = jQuery('.fl-builder-settings:visible', window.parent.document),
    tab = form.find('.fl-builder-settings-tab.fl-active'),
    nodeId = form.data('node'),
    field = tab.find('.fl-field').first(),
    input = field.find('input:not([type="hidden"]), textarea, select, button, a, .fl-editor-field').first(),
    id = input.find('textarea.wp-editor-area').attr('id');

  // Don't focus in the block editor.
  if (FL.Builder.utils.isBlockEditor()) {
    return;
  }

  // Don't focus fields that have an inline editor.
  if (nodeId && jQuery('.fl-node-' + nodeId + ' .fl-inline-editor').length) {
    return;
  }
  if ('undefined' !== typeof window.parent.tinyMCE && input.hasClass('fl-editor-field')) {
    // TinyMCE fields
    window.parent.tinyMCE.get(id).focus();
  } else {
    // Everybody else
    setTimeout(function () {
      input.trigger('focus').css('animation-name', 'fl-grab-attention');
    }, 300);
  }

  // Grab attention
  field.css('animation-name', 'fl-grab-attention');
  field.on('animationend', function () {
    field.css('animation-name', '');
  });
};

/***/ }),

/***/ "./src/builder-forms/ui/index.js":
/*!***************************************!*\
  !*** ./src/builder-forms/ui/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormsManager: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_0__.FormsManager),
/* harmony export */   canDeferField: () => (/* reexport safe */ _field_types__WEBPACK_IMPORTED_MODULE_2__.canDeferField),
/* harmony export */   canDeferTab: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_0__.canDeferTab),
/* harmony export */   focusFirstSettingsControl: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_0__.focusFirstSettingsControl),
/* harmony export */   getFormElement: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_0__.getFormElement),
/* harmony export */   initEvents: () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_1__.initEvents)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/builder-forms/ui/forms/index.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./src/builder-forms/ui/events/index.js");
/* harmony import */ var _field_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field-types */ "./src/builder-forms/ui/field-types/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/builder-forms/ui/style.scss");





// Public API


/***/ }),

/***/ "./src/builder-forms/ui/style.scss":
/*!*****************************************!*\
  !*** ./src/builder-forms/ui/style.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builder/ui/i18n/index.js":
/*!**************************************!*\
  !*** ./src/builder/ui/i18n/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __: () => (/* binding */ __)
/* harmony export */ });
/**
 * @since 2.8
 * @param {String} string
 * @return {String}
 */
function __(string) {
  if (typeof window.parent.FLBuilderStrings === 'undefined') {
    return string;
  }
  var strings = window.parent.FLBuilderStrings.i18n;
  if (typeof strings[string] !== 'undefined') {
    return strings[string];
  } else {
    console.warn('No translation found for "' + string + '" Please add string to FLBuilderStrings.i18n object in includes/ui-js-config.php');
    return string;
  }
}

/***/ }),

/***/ "@wordpress/hooks":
/*!***************************!*\
  !*** external "wp.hooks" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = wp.hooks;

/***/ }),

/***/ "fl-controls":
/*!******************************!*\
  !*** external "FL.Controls" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = FL.Controls;

/***/ }),

/***/ "fl-symbols":
/*!*****************************!*\
  !*** external "FL.Symbols" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = FL.Symbols;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = ReactDOM;

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/builder-forms/index.js");
/******/ 	
/******/ })()
;
