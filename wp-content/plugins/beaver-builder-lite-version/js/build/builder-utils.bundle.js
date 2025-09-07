/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/builder-utils/arrays/index.js":
/*!*******************************************!*\
  !*** ./src/builder-utils/arrays/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isLast: () => (/* binding */ isLast),
/* harmony export */   updateItemWhere: () => (/* binding */ updateItemWhere),
/* harmony export */   updateLastItem: () => (/* binding */ updateLastItem),
/* harmony export */   withoutLastItem: () => (/* binding */ withoutLastItem)
/* harmony export */ });
/**
 * Check if a given index is the last item in the array
 *
 * @param Array
 * @param Int
 * @return bool
 */
var isLast = function isLast(arr, i) {
  return i === arr.length - 1;
};

/**
 * Get an array without the last item
 * AKA pop(), but useful and functional.
 *
 * @param Array
 * @return Array
 */
var withoutLastItem = function withoutLastItem(arr) {
  return arr.filter(function (_, i) {
    return !isLast(arr, i);
  });
};
var updateItemWhere = function updateItemWhere(arr) {
  var isItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return false;
  };
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (v) {
    return v;
  };
  return arr.map(function (item, i) {
    if (isItem(item, i)) {
      return callback(item, i);
    }
    return item;
  });
};

/**
 * Modify the last item in an array and return a new array
 *
 * @param Array arr
 * @param Function callback - function to be run on the last item only
 * @return Array
 */
var updateLastItem = function updateLastItem(arr) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var isItem = function isItem(item, i) {
    return isLast(arr, i);
  };
  return updateItemWhere(arr, isItem, callback);
};

/***/ }),

/***/ "./src/builder-utils/color-scheme/index.js":
/*!*************************************************!*\
  !*** ./src/builder-utils/color-scheme/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedColorScheme: () => (/* binding */ getComputedColorScheme),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   isSystemDark: () => (/* binding */ isSystemDark),
/* harmony export */   setBodyClasses: () => (/* binding */ setBodyClasses),
/* harmony export */   systemColorSchemeChanged: () => (/* binding */ systemColorSchemeChanged)
/* harmony export */ });
var darkMediaQuery = '( prefers-color-scheme: dark )';

/**
 * Check if the operating system is set to dark mode.
 *
 * @since 2.6
 * @return bool
 */
var isSystemDark = function isSystemDark() {
  return window.matchMedia && window.matchMedia(darkMediaQuery).matches;
};

/**
 * Get the static color scheme value even if matching the operating system.
 *
 * @since 2.6
 * @return string (light|dark)
 */
var getComputedColorScheme = function getComputedColorScheme() {
  var _FL$Builder$data;
  var colorScheme = (_FL$Builder$data = FL.Builder.data) === null || _FL$Builder$data === void 0 ? void 0 : _FL$Builder$data.getSystemState().colorScheme;
  if ('auto' === colorScheme) {
    return isSystemDark() ? 'dark' : 'light';
  }
  return colorScheme;
};

/**
 * Setup color scheme handling
 *
 * @since 2.6
 * @param {string} key
 * @param {any} data
 * @return void
 */
var init = function init() {
  setBodyClasses(getComputedColorScheme());

  // Listen for system color scheme changes
  window.matchMedia(darkMediaQuery).addEventListener('change', systemColorSchemeChanged);
};

/**
 * Listen for changes to the operating system color scheme value.
 *
 * @since 2.6
 * @param MediaQueryListEvent e
 * @param {any} data
 * @return void
 */
var systemColorSchemeChanged = function systemColorSchemeChanged(e) {
  var _FL$Builder$data2;
  var colorScheme = (_FL$Builder$data2 = FL.Builder.data) === null || _FL$Builder$data2 === void 0 ? void 0 : _FL$Builder$data2.getSystemState().colorScheme;
  if ('auto' !== colorScheme) {
    return;
  }
  setBodyClasses(e.matches ? 'dark' : 'light');
};

/**
 * Add/Remove appropriate color scheme body classes.
 *
 * @since 2.6
 * @param String name (light|dark|auto)
 * @return void
 */
var setBodyClasses = function setBodyClasses(name) {
  var parentClasses = window.parent.document.body.classList;
  var childClasses = document.body.classList;
  var add = name;

  // Handle 'auto' value
  if ('auto' === name) {
    add = getComputedColorScheme();
  }
  var remove = 'dark' === add ? 'light' : 'dark';
  parentClasses.remove("fl-builder-ui-skin--".concat(remove), "fluid-color-scheme-".concat(remove));
  childClasses.remove("fl-builder-ui-skin--".concat(remove), "fluid-color-scheme-".concat(remove));
  parentClasses.add("fl-builder-ui-skin--".concat(add), "fluid-color-scheme-".concat(add));
  childClasses.add("fl-builder-ui-skin--".concat(add), "fluid-color-scheme-".concat(add));
};

/***/ }),

/***/ "./src/builder-utils/color/index.js":
/*!******************************************!*\
  !*** ./src/builder-utils/color/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rgbToHSL: () => (/* binding */ rgbToHSL)
/* harmony export */ });
var rgbToHSL = function rgbToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  var cmin = Math.min(r, g, b);
  var cmax = Math.max(r, g, b);
  var delta = cmax - cmin;
  var h = 0;
  var s = 0;
  var l = 0;

  // Calculate hue
  if (0 == delta) {
    // No difference
    h = 0;
  } else if (cmax == r) {
    // Red is max
    h = (g - b) / delta % 6;
  } else if (cmax == g) {
    // Green is max
    h = (b - r) / delta + 2;
  } else {
    // Blue is max
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (0 > h) {
    h += 360;
  }

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = 0 == delta ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
};

/***/ }),

/***/ "./src/builder-utils/conditionals/index.js":
/*!*************************************************!*\
  !*** ./src/builder-utils/conditionals/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBlockEditor: () => (/* binding */ isBlockEditor),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });
/**
 * Are we in the block editor?
 * Replaces FLBuilder.isBlockEditor
 *
 * @since 2.9
 * @return {bool}
 */
var isBlockEditor = function isBlockEditor() {
  return 'undefined' !== typeof FLBuilderModuleBlocksConfig;
};

/**
 * Helper taken from lodash
 * Replaces FLBuilder.isUndefined
 * @since 2.2.2
 */
var isUndefined = function isUndefined(obj) {
  return obj === void 0;
};

/**
 * Helper taken from lodash
 * Replaces FLBuilder.isBoolean
 * @since 2.2.2
 */
var isBoolean = function isBoolean(value) {
  return true === value || false === value;
};

/***/ }),

/***/ "./src/builder-utils/css/index.js":
/*!****************************************!*\
  !*** ./src/builder-utils/css/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFormattedSelector: () => (/* binding */ getFormattedSelector)
/* harmony export */ });
var getFormattedSelector = function getFormattedSelector(prefix) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var nodeId = arguments.length > 2 ? arguments[2] : undefined;
  var formatted = '';
  var pattern = /,(?![^()]*\))/;
  var parts = selector.split(pattern);
  var i = 0;
  for (; i < parts.length; i++) {
    if (-1 < parts[i].indexOf('{node}')) {
      formatted += parts[i].replace('{node}', prefix);
    } else if (-1 < parts[i].indexOf('{node_id}')) {
      formatted += parts[i].replace(/{node_id}/g, nodeId);
    } else {
      formatted += prefix + ' ' + parts[i];
    }
    if (i != parts.length - 1) {
      formatted += ', ';
    }
  }
  return formatted;
};

/***/ }),

/***/ "./src/builder-utils/hooks/index.js":
/*!******************************************!*\
  !*** ./src/builder-utils/hooks/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   trigger: () => (/* binding */ trigger)
/* harmony export */ });
/**
 * Trigger a hook.
 *
 * @since 1.8
 * @method triggerHook
 * @param {String} hook The hook to trigger.
 * @param {Array} args An array of args to pass to the hook.
 * @return void
 */
var trigger = function trigger(hook, args) {
  jQuery('body').trigger('fl-builder.' + hook, args);
};

/**
 * Add a hook.
 *
 * @since 1.8
 * @method addHook
 * @param {String} hook The hook to add.
 * @param {Function} callback A function to call when the hook is triggered.
 * @return {Function} a removeHook callback
 */
var add = function add(hook, callback) {
  jQuery('body').on('fl-builder.' + hook, callback);
  return function () {
    return remove(hook, callback);
  };
};

/**
 * Remove a hook.
 *
 * @since 1.8
 * @method removeHook
 * @param {String} hook The hook to remove.
 * @param {Function} callback The callback function to remove.
 */
var remove = function remove(hook, callback) {
  jQuery('body').off('fl-builder.' + hook, callback);
};

/***/ }),

/***/ "./src/builder-utils/objects/index.js":
/*!********************************************!*\
  !*** ./src/builder-utils/objects/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forEach: () => (/* binding */ forEach),
/* harmony export */   objectMap: () => (/* binding */ objectMap)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Loop over an object's keys
 *
 * @param Object
 * @param Function - callback to run on each key/value pair
 * @return Array - array of all results from the callback function
 */
var forEach = function forEach() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return Object.entries(obj).map(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return callback(key, value, i);
  });
};

/**
 * Loop over an object's keys and perform a callback on each value
 */
var objectMap = function objectMap() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var newObj = {};
  for (var key in obj) {
    newObj[key] = callback(key, obj[key]);
  }
  return newObj;
};

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/builder-utils/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays */ "./src/builder-utils/arrays/index.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./src/builder-utils/color/index.js");
/* harmony import */ var _color_scheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-scheme */ "./src/builder-utils/color-scheme/index.js");
/* harmony import */ var _conditionals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./conditionals */ "./src/builder-utils/conditionals/index.js");
/* harmony import */ var _css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css */ "./src/builder-utils/css/index.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks */ "./src/builder-utils/hooks/index.js");
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./objects */ "./src/builder-utils/objects/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _window$FL, _FL$Builder;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







window.FL = (_window$FL = window.FL) !== null && _window$FL !== void 0 ? _window$FL : {};
FL.Builder = (_FL$Builder = FL.Builder) !== null && _FL$Builder !== void 0 ? _FL$Builder : {};
FL.Builder.utils = Object.freeze(_objectSpread({
  arrays: _arrays__WEBPACK_IMPORTED_MODULE_0__,
  color: _color__WEBPACK_IMPORTED_MODULE_1__,
  colorScheme: _color_scheme__WEBPACK_IMPORTED_MODULE_2__,
  css: _css__WEBPACK_IMPORTED_MODULE_4__,
  hooks: _hooks__WEBPACK_IMPORTED_MODULE_5__,
  objects: _objects__WEBPACK_IMPORTED_MODULE_6__
}, _conditionals__WEBPACK_IMPORTED_MODULE_3__));
})();

/******/ })()
;
