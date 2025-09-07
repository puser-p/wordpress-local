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

/***/ "./node_modules/colorjs.io/dist/color.js":
/*!***********************************************!*\
  !*** ./node_modules/colorjs.io/dist/color.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Color)
/* harmony export */ });
// A is m x n. B is n x p. product is m x p.
function multiplyMatrices (A, B) {
	let m = A.length;

	if (!Array.isArray(A[0])) {
		// A is vector, convert to [[a, b, c, ...]]
		A = [A];
	}

	if (!Array.isArray(B[0])) {
		// B is vector, convert to [[a], [b], [c], ...]]
		B = B.map(x => [x]);
	}

	let p = B[0].length;
	let B_cols = B[0].map((_, i) => B.map(x => x[i])); // transpose B
	let product = A.map(row => B_cols.map(col => {
		let ret = 0;

		if (!Array.isArray(row)) {
			for (let c of col) {
				ret += row * c;
			}

			return ret;
		}

		for (let i = 0; i < row.length; i++) {
			ret += row[i] * (col[i] || 0);
		}

		return ret;
	}));

	if (m === 1) {
		product = product[0]; // Avoid [[a, b, c, ...]]
	}

	if (p === 1) {
		return product.map(x => x[0]); // Avoid [[a], [b], [c], ...]]
	}

	return product;
}

/**
 * Various utility functions
 */


/**
 * Check if a value is a string (including a String object)
 * @param {*} str - Value to check
 * @returns {boolean}
 */
function isString (str) {
	return type(str) === "string";
}

/**
 * Determine the internal JavaScript [[Class]] of an object.
 * @param {*} o - Value to check
 * @returns {string}
 */
function type (o) {
	let str = Object.prototype.toString.call(o);

	return (str.match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
}

function serializeNumber (n, {precision, unit }) {
	if (isNone(n)) {
		return "none";
	}

	return toPrecision(n, precision) + (unit ?? "");
}

/**
 * Check if a value corresponds to a none argument
 * @param {*} n - Value to check
 * @returns {boolean}
 */
function isNone (n) {
	return Number.isNaN(n) || (n instanceof Number && n?.none);
}

/**
 * Replace none values with 0
 */
function skipNone (n) {
	return isNone(n) ? 0 : n;
}

/**
 * Round a number to a certain number of significant digits
 * @param {number} n - The number to round
 * @param {number} precision - Number of significant digits
 */
function toPrecision (n, precision) {
	if (n === 0) {
		return 0;
	}
	let integer = ~~n;
	let digits = 0;
	if (integer && precision) {
		digits = ~~Math.log10(Math.abs(integer)) + 1;
	}
	const multiplier = 10.0 ** (precision - digits);
	return Math.floor(n * multiplier + 0.5) / multiplier;
}

const angleFactor = {
	deg: 1,
	grad: 0.9,
	rad: 180 / Math.PI,
	turn: 360,
};

/**
* Parse a CSS function, regardless of its name and arguments
* @param String str String to parse
* @return {{name, args, rawArgs}}
*/
function parseFunction (str) {
	if (!str) {
		return;
	}

	str = str.trim();

	const isFunctionRegex = /^([a-z]+)\((.+?)\)$/i;
	const isNumberRegex = /^-?[\d.]+$/;
	const unitValueRegex = /%|deg|g?rad|turn$/;
	const singleArgument = /\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;
	let parts = str.match(isFunctionRegex);

	if (parts) {
		// It is a function, parse args
		let args = [];
		parts[2].replace(singleArgument, ($0, rawArg) => {
			let match = rawArg.match(unitValueRegex);
			let arg = rawArg;

			if (match) {
				let unit = match[0];
				// Drop unit from value
				let unitlessArg = arg.slice(0, -unit.length);

				if (unit === "%") {
					// Convert percentages to 0-1 numbers
					arg = new Number(unitlessArg / 100);
					arg.type = "<percentage>";
				}
				else {
					// Multiply angle by appropriate factor for its unit
					arg = new Number(unitlessArg * angleFactor[unit]);
					arg.type = "<angle>";
					arg.unit = unit;
				}
			}
			else if (isNumberRegex.test(arg)) {
				// Convert numerical args to numbers
				arg = new Number(arg);
				arg.type = "<number>";
			}
			else if (arg === "none") {
				arg = new Number(NaN);
				arg.none = true;
			}

			if ($0.startsWith("/")) {
				// It's alpha
				arg = arg instanceof Number ? arg : new Number(arg);
				arg.alpha = true;
			}

			if (typeof arg === "object" && arg instanceof Number) {
				arg.raw = rawArg;
			}

			args.push(arg);
		});

		return {
			name: parts[1].toLowerCase(),
			rawName: parts[1],
			rawArgs: parts[2],
			// An argument could be (as of css-color-4):
			// a number, percentage, degrees (hue), ident (in color())
			args,
		};
	}
}

function last (arr) {
	return arr[arr.length - 1];
}

function interpolate (start, end, p) {
	if (isNaN(start)) {
		return end;
	}

	if (isNaN(end)) {
		return start;
	}

	return start + (end - start) * p;
}

function interpolateInv (start, end, value) {
	return (value - start) / (end - start);
}

function mapRange (from, to, value) {
	return interpolate(to[0], to[1], interpolateInv(from[0], from[1], value));
}

function parseCoordGrammar (coordGrammars) {
	return coordGrammars.map(coordGrammar => {
		return coordGrammar.split("|").map(type => {
			type = type.trim();
			let range = type.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);

			if (range) {
				let ret = new String(range[1]);
				ret.range = [+range[2], +range[3]];
				return ret;
			}

			return type;
		});
	});
}

/**
 * Clamp value between the minimum and maximum
 * @param {number} min minimum value to return
 * @param {number} val the value to return if it is between min and max
 * @param {number} max maximum value to return
 * @returns number
 */
function clamp (min, val, max) {
	return Math.max(Math.min(max, val), min);
}

/**
 * Copy sign of one value to another.
 * @param {number} - to number to copy sign to
 * @param {number} - from number to copy sign from
 * @returns number
 */
function copySign (to, from) {
	return Math.sign(to) === Math.sign(from) ? to : -to;
}

/**
 * Perform pow on a signed number and copy sign to result
 * @param {number} - base the base number
 * @param {number} - exp the exponent
 * @returns number
 */
function spow (base, exp) {
	return copySign(Math.abs(base) ** exp, base);
}

/**
 * Perform a divide, but return zero if the numerator is zero
 * @param {number} n - the numerator
 * @param {number} d - the denominator
 * @returns number
 */
function zdiv (n, d) {
	return (d === 0) ? 0 : n / d;
}

/**
 * Perform a bisect on a sorted list and locate the insertion point for
 * a value in arr to maintain sorted order.
 * @param {number[]} arr - array of sorted numbers
 * @param {number} value - value to find insertion point for
 * @param {number} lo - used to specify a the low end of a subset of the list
 * @param {number} hi - used to specify a the high end of a subset of the list
 * @returns number
 */
function bisectLeft (arr, value, lo = 0, hi = arr.length) {
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if (arr[mid] < value) {
			lo = mid + 1;
		}
		else {
			hi = mid;
		}
	}
	return lo;
}

var util = /*#__PURE__*/Object.freeze({
	__proto__: null,
	bisectLeft: bisectLeft,
	clamp: clamp,
	copySign: copySign,
	interpolate: interpolate,
	interpolateInv: interpolateInv,
	isNone: isNone,
	isString: isString,
	last: last,
	mapRange: mapRange,
	multiplyMatrices: multiplyMatrices,
	parseCoordGrammar: parseCoordGrammar,
	parseFunction: parseFunction,
	serializeNumber: serializeNumber,
	skipNone: skipNone,
	spow: spow,
	toPrecision: toPrecision,
	type: type,
	zdiv: zdiv
});

/**
 * A class for adding deep extensibility to any piece of JS code
 */
class Hooks {
	add (name, callback, first) {
		if (typeof arguments[0] != "string") {
			// Multiple hooks
			for (var name in arguments[0]) {
				this.add(name, arguments[0][name], arguments[1]);
			}

			return;
		}

		(Array.isArray(name) ? name : [name]).forEach(function (name) {
			this[name] = this[name] || [];

			if (callback) {
				this[name][first ? "unshift" : "push"](callback);
			}
		}, this);
	}

	run (name, env) {
		this[name] = this[name] || [];
		this[name].forEach(function (callback) {
			callback.call(env && env.context ? env.context : env, env);
		});
	}
}

/**
 * The instance of {@link Hooks} used throughout Color.js
 */
const hooks = new Hooks();

// Global defaults one may want to configure
var defaults = {
	gamut_mapping: "css",
	precision: 5,
	deltaE: "76", // Default deltaE method
	verbose: globalThis?.process?.env?.NODE_ENV?.toLowerCase() !== "test",
	warn: function warn (msg) {
		if (this.verbose) {
			globalThis?.console?.warn?.(msg);
		}
	},
};

const WHITES = {
	// for compatibility, the four-digit chromaticity-derived ones everyone else uses
	D50: [0.3457 / 0.3585, 1.00000, (1.0 - 0.3457 - 0.3585) / 0.3585],
	D65: [0.3127 / 0.3290, 1.00000, (1.0 - 0.3127 - 0.3290) / 0.3290],
};

function getWhite (name) {
	if (Array.isArray(name)) {
		return name;
	}

	return WHITES[name];
}

// Adapt XYZ from white point W1 to W2
function adapt$2 (W1, W2, XYZ, options = {}) {
	W1 = getWhite(W1);
	W2 = getWhite(W2);

	if (!W1 || !W2) {
		throw new TypeError(`Missing white point to convert ${!W1 ? "from" : ""}${!W1 && !W2 ? "/" : ""}${!W2 ? "to" : ""}`);
	}

	if (W1 === W2) {
		// Same whitepoints, no conversion needed
		return XYZ;
	}

	let env = {W1, W2, XYZ, options};

	hooks.run("chromatic-adaptation-start", env);

	if (!env.M) {
		if (env.W1 === WHITES.D65 && env.W2 === WHITES.D50) {
			env.M = [
				[ 1.0479297925449969, 0.022946870601609652, -0.05019226628920524 ],
				[ 0.02962780877005599, 0.9904344267538799, -0.017073799063418826 ],
				[ -0.009243040646204504, 0.015055191490298152, 0.7518742814281371 ],
			];
		}
		else if (env.W1 === WHITES.D50 && env.W2 === WHITES.D65) {

			env.M = [
				[ 0.955473421488075, -0.02309845494876471, 0.06325924320057072 ],
				[ -0.0283697093338637, 1.0099953980813041, 0.021041441191917323 ],
				[ 0.012314014864481998, -0.020507649298898964, 1.330365926242124 ],
			];
		}
	}

	hooks.run("chromatic-adaptation-end", env);

	if (env.M) {
		return multiplyMatrices(env.M, env.XYZ);
	}
	else {
		throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
	}
}

const noneTypes = new Set(["<number>", "<percentage>", "<angle>"]);

/**
 * Validates the coordinates of a color against a format's coord grammar and
 * maps the coordinates to the range or refRange of the coordinates.
 * @param {ColorSpace} space - Colorspace the coords are in
 * @param {object} format - the format object to validate against
 * @param {string} name - the name of the color function. e.g. "oklab" or "color"
 * @returns {object[]} - an array of type metadata for each coordinate
 */
function coerceCoords (space, format, name, coords) {
	let types = Object.entries(space.coords).map(([id, coordMeta], i) => {
		let coordGrammar = format.coordGrammar[i];
		let arg = coords[i];
		let providedType = arg?.type;

		// Find grammar alternative that matches the provided type
		// Non-strict equals is intentional because we are comparing w/ string objects
		let type;
		if (arg.none) {
			type = coordGrammar.find(c => noneTypes.has(c));
		}
		else {
			type = coordGrammar.find(c => c == providedType);
		}

		// Check that each coord conforms to its grammar
		if (!type) {
			// Type does not exist in the grammar, throw
			let coordName = coordMeta.name || id;
			throw new TypeError(`${providedType ?? arg.raw} not allowed for ${coordName} in ${name}()`);
		}

		let fromRange = type.range;

		if (providedType === "<percentage>") {
			fromRange ||= [0, 1];
		}

		let toRange = coordMeta.range || coordMeta.refRange;

		if (fromRange && toRange) {
			coords[i] = mapRange(fromRange, toRange, coords[i]);
		}

		return type;
	});

	return types;
}


/**
 * Convert a CSS Color string to a color object
 * @param {string} str
 * @param {object} [options]
 * @param {object} [options.meta] - Object for additional information about the parsing
 * @returns {Color}
 */
function parse (str, {meta} = {}) {
	let env = {"str": String(str)?.trim()};
	hooks.run("parse-start", env);

	if (env.color) {
		return env.color;
	}

	env.parsed = parseFunction(env.str);

	if (env.parsed) {
		// Is a functional syntax
		let name = env.parsed.name;

		if (name === "color") {
			// color() function
			let id = env.parsed.args.shift();
			// Check against both <dashed-ident> and <ident> versions
			let alternateId = id.startsWith("--") ? id.substring(2) : `--${id}`;
			let ids = [id, alternateId];
			let alpha = env.parsed.rawArgs.indexOf("/") > 0 ? env.parsed.args.pop() : 1;

			for (let space of ColorSpace.all) {
				let colorSpec = space.getFormat("color");

				if (colorSpec) {
					if (ids.includes(colorSpec.id) || colorSpec.ids?.filter((specId) => ids.includes(specId)).length) {
						// From https://drafts.csswg.org/css-color-4/#color-function
						// If more <number>s or <percentage>s are provided than parameters that the colorspace takes, the excess <number>s at the end are ignored.
						// If less <number>s or <percentage>s are provided than parameters that the colorspace takes, the missing parameters default to 0. (This is particularly convenient for multichannel printers where the additional inks are spot colors or varnishes that most colors on the page won’t use.)
						const coords = Object.keys(space.coords).map((_, i) => env.parsed.args[i] || 0);

						let types;

						if (colorSpec.coordGrammar) {
							types = coerceCoords(space, colorSpec, "color", coords);
						}

						if (meta) {
							Object.assign(meta, {formatId: "color", types});
						}

						if (colorSpec.id.startsWith("--") && !id.startsWith("--")) {
							defaults.warn(`${space.name} is a non-standard space and not currently supported in the CSS spec. ` +
							              `Use prefixed color(${colorSpec.id}) instead of color(${id}).`);
						}
						if (id.startsWith("--") && !colorSpec.id.startsWith("--")) {
							defaults.warn(`${space.name} is a standard space and supported in the CSS spec. ` +
							              `Use color(${colorSpec.id}) instead of prefixed color(${id}).`);
						}

						return {spaceId: space.id, coords, alpha};
					}
				}
			}

			// Not found
			let didYouMean = "";
			let registryId = id in ColorSpace.registry ? id : alternateId;
			if (registryId in ColorSpace.registry) {
				// Used color space id instead of color() id, these are often different
				let cssId = ColorSpace.registry[registryId].formats?.color?.id;

				if (cssId) {
					didYouMean = `Did you mean color(${cssId})?`;
				}
			}

			throw new TypeError(`Cannot parse color(${id}). ` + (didYouMean || "Missing a plugin?"));
		}
		else {
			for (let space of ColorSpace.all) {
				// color space specific function
				let format = space.getFormat(name);
				if (format && format.type === "function") {
					let alpha = 1;

					if (format.lastAlpha || last(env.parsed.args).alpha) {
						alpha = env.parsed.args.pop();
					}

					let coords = env.parsed.args;

					let types;

					if (format.coordGrammar) {
						types = coerceCoords(space, format, name, coords);
					}

					if (meta) {
						Object.assign(meta, {formatId: format.name, types});
					}

					return {
						spaceId: space.id,
						coords, alpha,
					};
				}
			}
		}
	}
	else {
		// Custom, colorspace-specific format
		for (let space of ColorSpace.all) {
			for (let formatId in space.formats) {
				let format = space.formats[formatId];

				if (format.type !== "custom") {
					continue;
				}

				if (format.test && !format.test(env.str)) {
					continue;
				}

				let color = format.parse(env.str);

				if (color) {
					color.alpha ??= 1;

					if (meta) {
						meta.formatId = formatId;
					}

					return color;
				}
			}
		}
	}


	// If we're here, we couldn't parse
	throw new TypeError(`Could not parse ${str} as a color. Missing a plugin?`);
}

/**
 * Resolves a color reference (object or string) to a plain color object
 * @param {Color | {space, coords, alpha} | string | Array<Color | {space, coords, alpha} | string> } color
 * @returns {{space, coords, alpha} | Array<{space, coords, alpha}}>
 */
function getColor (color) {
	if (Array.isArray(color)) {
		return color.map(getColor);
	}

	if (!color) {
		throw new TypeError("Empty color reference");
	}

	if (isString(color)) {
		color = parse(color);
	}

	// Object fixup
	let space = color.space || color.spaceId;

	if (!(space instanceof ColorSpace)) {
		// Convert string id to color space object
		color.space = ColorSpace.get(space);
	}

	if (color.alpha === undefined) {
		color.alpha = 1;
	}

	return color;
}

const ε$7 = .000075;

/**
 * Class to represent a color space
 */
class ColorSpace {
	constructor (options) {
		this.id = options.id;
		this.name = options.name;
		this.base = options.base ? ColorSpace.get(options.base) : null;
		this.aliases = options.aliases;

		if (this.base) {
			this.fromBase = options.fromBase;
			this.toBase = options.toBase;
		}

		// Coordinate metadata

		let coords = options.coords ?? this.base.coords;

		for (let name in coords) {
			if (!("name" in coords[name])) {
				coords[name].name = name;
			}
		}
		this.coords = coords;

		// White point

		let white = options.white ?? this.base.white ?? "D65";
		this.white = getWhite(white);

		// Sort out formats

		this.formats = options.formats ?? {};

		for (let name in this.formats) {
			let format = this.formats[name];
			format.type ||= "function";
			format.name ||= name;
		}

		if (!this.formats.color?.id) {
			this.formats.color = {
				...this.formats.color ?? {},
				id: options.cssId || this.id,
			};
		}

		// Gamut space

		if (options.gamutSpace) {
			// Gamut space explicitly specified
			this.gamutSpace = options.gamutSpace === "self" ? this : ColorSpace.get(options.gamutSpace);
		}
		else {
			// No gamut space specified, calculate a sensible default
			if (this.isPolar) {
				// Do not check gamut through polar coordinates
				this.gamutSpace = this.base;
			}
			else {
				this.gamutSpace =  this;
			}
		}

		// Optimize inGamut for unbounded spaces
		if (this.gamutSpace.isUnbounded) {
			this.inGamut = (coords, options) => {
				return true;
			};
		}

		// Other stuff
		this.referred = options.referred;

		// Compute ancestors and store them, since they will never change
		Object.defineProperty(this, "path", {
			value: getPath(this).reverse(),
			writable: false,
			enumerable: true,
			configurable: true,
		});

		hooks.run("colorspace-init-end", this);
	}

	inGamut (coords, {epsilon = ε$7} = {}) {
		if (!this.equals(this.gamutSpace)) {
			coords = this.to(this.gamutSpace, coords);
			return this.gamutSpace.inGamut(coords, {epsilon});
		}

		let coordMeta = Object.values(this.coords);

		return coords.every((c, i) => {
			let meta = coordMeta[i];

			if (meta.type !== "angle" && meta.range) {
				if (Number.isNaN(c)) {
					// NaN is always in gamut
					return true;
				}

				let [min, max] = meta.range;
				return (min === undefined || c >= min - epsilon)
				    && (max === undefined || c <= max + epsilon);
			}

			return true;
		});
	}

	get isUnbounded () {
		return Object.values(this.coords).every(coord => !("range" in coord));
	}

	get cssId () {
		return this.formats?.color?.id || this.id;
	}

	get isPolar () {
		for (let id in this.coords) {
			if (this.coords[id].type === "angle") {
				return true;
			}
		}

		return false;
	}

	getFormat (format) {
		if (typeof format === "object") {
			format = processFormat(format, this);
			return format;
		}

		let ret;
		if (format === "default") {
			// Get first format
			ret = Object.values(this.formats)[0];
		}
		else {
			ret = this.formats[format];
		}

		if (ret) {
			ret = processFormat(ret, this);
			return ret;
		}

		return null;
	}

	/**
	 * Check if this color space is the same as another color space reference.
	 * Allows proxying color space objects and comparing color spaces with ids.
	 * @param {string | ColorSpace} space ColorSpace object or id to compare to
	 * @returns {boolean}
	 */
	equals (space) {
		if (!space) {
			return false;
		}

		return this === space || this.id === space || this.id === space.id;
	}

	to (space, coords) {
		if (arguments.length === 1) {
			const color = getColor(space);
			[space, coords] = [color.space, color.coords];
		}

		space = ColorSpace.get(space);

		if (this.equals(space)) {
			// Same space, no change needed
			return coords;
		}

		// Convert NaN to 0, which seems to be valid in every coordinate of every color space
		coords = coords.map(c => Number.isNaN(c) ? 0 : c);

		// Find connection space = lowest common ancestor in the base tree
		let myPath = this.path;
		let otherPath = space.path;

		let connectionSpace, connectionSpaceIndex;

		for (let i = 0; i < myPath.length; i++) {
			if (myPath[i].equals(otherPath[i])) {
				connectionSpace = myPath[i];
				connectionSpaceIndex = i;
			}
			else {
				break;
			}
		}

		if (!connectionSpace) {
			// This should never happen
			throw new Error(`Cannot convert between color spaces ${this} and ${space}: no connection space was found`);
		}

		// Go up from current space to connection space
		for (let i = myPath.length - 1; i > connectionSpaceIndex; i--) {
			coords = myPath[i].toBase(coords);
		}

		// Go down from connection space to target space
		for (let i = connectionSpaceIndex + 1; i < otherPath.length; i++) {
			coords = otherPath[i].fromBase(coords);
		}

		return coords;
	}

	from (space, coords) {
		if (arguments.length === 1) {
			const color = getColor(space);
			[space, coords] = [color.space, color.coords];
		}

		space = ColorSpace.get(space);

		return space.to(this, coords);
	}

	toString () {
		return `${this.name} (${this.id})`;
	}

	getMinCoords () {
		let ret = [];

		for (let id in this.coords) {
			let meta = this.coords[id];
			let range = meta.range || meta.refRange;
			ret.push(range?.min ?? 0);
		}

		return ret;
	}

	static registry = {};

	// Returns array of unique color spaces
	static get all () {
		return [...new Set(Object.values(ColorSpace.registry))];
	}

	static register (id, space) {
		if (arguments.length === 1) {
			space = arguments[0];
			id = space.id;
		}

		space = this.get(space);

		if (this.registry[id] && this.registry[id] !== space) {
			throw new Error(`Duplicate color space registration: '${id}'`);
		}
		this.registry[id] = space;

		// Register aliases when called without an explicit ID.
		if (arguments.length === 1 && space.aliases) {
			for (let alias of space.aliases) {
				this.register(alias, space);
			}
		}

		return space;
	}

	/**
	 * Lookup ColorSpace object by name
	 * @param {ColorSpace | string} name
	 */
	static get (space, ...alternatives) {
		if (!space || space instanceof ColorSpace) {
			return space;
		}

		let argType = type(space);

		if (argType === "string") {
			// It's a color space id
			let ret = ColorSpace.registry[space.toLowerCase()];

			if (!ret) {
				throw new TypeError(`No color space found with id = "${space}"`);
			}

			return ret;
		}

		if (alternatives.length) {
			return ColorSpace.get(...alternatives);
		}

		throw new TypeError(`${space} is not a valid color space`);
	}

	/**
	 * Get metadata about a coordinate of a color space
	 *
	 * @static
	 * @param {Array | string} ref
	 * @param {ColorSpace | string} [workingSpace]
	 * @return {Object}
	 */
	static resolveCoord (ref, workingSpace) {
		let coordType = type(ref);
		let space, coord;

		if (coordType === "string") {
			if (ref.includes(".")) {
				// Absolute coordinate
				[space, coord] = ref.split(".");
			}
			else {
				// Relative coordinate
				[space, coord] = [, ref];
			}
		}
		else if (Array.isArray(ref)) {
			[space, coord] = ref;
		}
		else {
			// Object
			space = ref.space;
			coord = ref.coordId;
		}

		space = ColorSpace.get(space);

		if (!space) {
			space = workingSpace;
		}

		if (!space) {
			throw new TypeError(`Cannot resolve coordinate reference ${ref}: No color space specified and relative references are not allowed here`);
		}

		coordType = type(coord);

		if (coordType === "number" || coordType === "string" && coord >= 0) {
			// Resolve numerical coord
			let meta = Object.entries(space.coords)[coord];

			if (meta) {
				return {space, id: meta[0], index: coord, ...meta[1]};
			}
		}

		space = ColorSpace.get(space);

		let normalizedCoord = coord.toLowerCase();

		let i = 0;
		for (let id in space.coords) {
			let meta = space.coords[id];

			if (id.toLowerCase() === normalizedCoord || meta.name?.toLowerCase() === normalizedCoord) {
				return {space, id, index: i, ...meta};
			}

			i++;
		}

		throw new TypeError(`No "${coord}" coordinate found in ${space.name}. Its coordinates are: ${Object.keys(space.coords).join(", ")}`);
	}

	static DEFAULT_FORMAT = {
		type: "functions",
		name: "color",
	};
}

function getPath (space) {
	let ret = [space];

	for (let s = space; s = s.base;) {
		ret.push(s);
	}

	return ret;
}

function processFormat (format, {coords} = {}) {
	if (format.coords && !format.coordGrammar) {
		format.type ||= "function";
		format.name ||= "color";

		// Format has not been processed
		format.coordGrammar = parseCoordGrammar(format.coords);

		let coordFormats = Object.entries(coords).map(([id, coordMeta], i) => {
			// Preferred format for each coord is the first one
			let outputType = format.coordGrammar[i][0];

			let fromRange = coordMeta.range || coordMeta.refRange;
			let toRange = outputType.range, suffix = "";

			// Non-strict equals intentional since outputType could be a string object
			if (outputType == "<percentage>") {
				toRange = [0, 100];
				suffix = "%";
			}
			else if (outputType == "<angle>") {
				suffix = "deg";
			}

			return  {fromRange, toRange, suffix};
		});

		format.serializeCoords = (coords, precision) => {
			return coords.map((c, i) => {
				let {fromRange, toRange, suffix} = coordFormats[i];

				if (fromRange && toRange) {
					c = mapRange(fromRange, toRange, c);
				}

				c = serializeNumber(c, {precision, unit: suffix});

				return c;
			});
		};
	}

	return format;
}

var xyz_d65 = new ColorSpace({
	id: "xyz-d65",
	name: "XYZ D65",
	coords: {
		x: {name: "X"},
		y: {name: "Y"},
		z: {name: "Z"},
	},
	white: "D65",
	formats: {
		color: {
			ids: ["xyz-d65", "xyz"],
		},
	},
	aliases: ["xyz"],
});

/**
 * Convenience class for RGB color spaces
 * @extends {ColorSpace}
 */
class RGBColorSpace extends ColorSpace {
	/**
	 * Creates a new RGB ColorSpace.
	 * If coords are not specified, they will use the default RGB coords.
	 * Instead of `fromBase()` and `toBase()` functions,
	 * you can specify to/from XYZ matrices and have `toBase()` and `fromBase()` automatically generated.
	 * @param {*} options - Same options as {@link ColorSpace} plus:
	 * @param {number[][]} options.toXYZ_M - Matrix to convert to XYZ
	 * @param {number[][]} options.fromXYZ_M - Matrix to convert from XYZ
	 */
	constructor (options) {
		if (!options.coords) {
			options.coords = {
				r: {
					range: [0, 1],
					name: "Red",
				},
				g: {
					range: [0, 1],
					name: "Green",
				},
				b: {
					range: [0, 1],
					name: "Blue",
				},
			};
		}

		if (!options.base) {
			options.base = xyz_d65;
		}

		if (options.toXYZ_M && options.fromXYZ_M) {
			options.toBase ??= rgb => {
				let xyz = multiplyMatrices(options.toXYZ_M, rgb);

				if (this.white !== this.base.white) {
					// Perform chromatic adaptation
					xyz = adapt$2(this.white, this.base.white, xyz);
				}

				return xyz;
			};

			options.fromBase ??= xyz => {
				xyz = adapt$2(this.base.white, this.white, xyz);
				return multiplyMatrices(options.fromXYZ_M, xyz);
			};
		}

		options.referred ??= "display";

		super(options);
	}
}

/**
 * Get the coordinates of a color in any color space
 * @param {Color} color
 * @param {string | ColorSpace} [space = color.space] The color space to convert to. Defaults to the color's current space
 * @returns {number[]} The color coordinates in the given color space
 */
function getAll (color, space) {
	color = getColor(color);

	if (!space || color.space.equals(space)) {
		// No conversion needed
		return color.coords.slice();
	}

	space = ColorSpace.get(space);
	return space.from(color);
}

function get (color, prop) {
	color = getColor(color);

	let {space, index} = ColorSpace.resolveCoord(prop, color.space);
	let coords = getAll(color, space);
	return coords[index];
}

function setAll (color, space, coords) {
	color = getColor(color);

	space = ColorSpace.get(space);
	color.coords = space.to(color.space, coords);
	return color;
}

setAll.returns = "color";

// Set properties and return current instance
function set (color, prop, value) {
	color = getColor(color);

	if (arguments.length === 2 && type(arguments[1]) === "object") {
		// Argument is an object literal
		let object = arguments[1];
		for (let p in object) {
			set(color, p, object[p]);
		}
	}
	else {
		if (typeof value === "function") {
			value = value(get(color, prop));
		}

		let {space, index} = ColorSpace.resolveCoord(prop, color.space);
		let coords = getAll(color, space);
		coords[index] = value;
		setAll(color, space, coords);
	}

	return color;
}

set.returns = "color";

var XYZ_D50 = new ColorSpace({
	id: "xyz-d50",
	name: "XYZ D50",
	white: "D50",
	base: xyz_d65,
	fromBase: coords => adapt$2(xyz_d65.white, "D50", coords),
	toBase: coords => adapt$2("D50", xyz_d65.white, coords),
});

// κ * ε  = 2^3 = 8
const ε$6 = 216 / 24389;  // 6^3/29^3 == (24/116)^3
const ε3$1 = 24 / 116;
const κ$4 = 24389 / 27;   // 29^3/3^3

let white$4 = WHITES.D50;

var lab = new ColorSpace({
	id: "lab",
	name: "Lab",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness",
		},
		a: {
			refRange: [-125, 125],
		},
		b: {
			refRange: [-125, 125],
		},
	},

	// Assuming XYZ is relative to D50, convert to CIE Lab
	// from CIE standard, which now defines these as a rational fraction
	white: white$4,

	base: XYZ_D50,
	// Convert D50-adapted XYX to Lab
	//  CIE 15.3:2004 section 8.2.1.1
	fromBase (XYZ) {
		// compute xyz, which is XYZ scaled relative to reference white
		let xyz = XYZ.map((value, i) => value / white$4[i]);

		// now compute f
		let f = xyz.map(value => value > ε$6 ? Math.cbrt(value) : (κ$4 * value + 16) / 116);

		return [
			(116 * f[1]) - 16,   // L
			500 * (f[0] - f[1]), // a
			200 * (f[1] - f[2]),  // b
		];
	},
	// Convert Lab to D50-adapted XYZ
	// Same result as CIE 15.3:2004 Appendix D although the derivation is different
	// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	toBase (Lab) {
		// compute f, starting with the luminance-related term
		let f = [];
		f[1] = (Lab[0] + 16) / 116;
		f[0] = Lab[1] / 500 + f[1];
		f[2] = f[1] - Lab[2] / 200;

		// compute xyz
		let xyz = [
			f[0]   > ε3$1 ? Math.pow(f[0], 3)                : (116 * f[0] - 16) / κ$4,
			Lab[0] > 8  ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / κ$4,
			f[2]   > ε3$1 ? Math.pow(f[2], 3)                : (116 * f[2] - 16) / κ$4,
		];

		// Compute XYZ by scaling xyz by reference white
		return xyz.map((value, i) => value * white$4[i]);
	},

	formats: {
		"lab": {
			coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"],
		},
	},
});

function constrain (angle) {
	return ((angle % 360) + 360) % 360;
}

function adjust (arc, angles) {
	if (arc === "raw") {
		return angles;
	}

	let [a1, a2] = angles.map(constrain);

	let angleDiff = a2 - a1;

	if (arc === "increasing") {
		if (angleDiff < 0) {
			a2 += 360;
		}
	}
	else if (arc === "decreasing") {
		if (angleDiff > 0) {
			a1 += 360;
		}
	}
	else if (arc === "longer") {
		if (-180 < angleDiff && angleDiff < 180) {
			if (angleDiff > 0) {
				a1 += 360;
			}
			else {
				a2 += 360;
			}
		}
	}
	else if (arc === "shorter") {
		if (angleDiff > 180) {
			a1 += 360;
		}
		else if (angleDiff < -180) {
			a2 += 360;
		}
	}

	return [a1, a2];
}

var lch = new ColorSpace({
	id: "lch",
	name: "LCH",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness",
		},
		c: {
			refRange: [0, 150],
			name: "Chroma",
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
	},

	base: lab,
	fromBase (Lab) {
		// Convert to polar form
		let [L, a, b] = Lab;
		let hue;
		const ε = 0.02;

		if (Math.abs(a) < ε && Math.abs(b) < ε) {
			hue = NaN;
		}
		else {
			hue = Math.atan2(b, a) * 180 / Math.PI;
		}

		return [
			L, // L is still L
			Math.sqrt(a ** 2 + b ** 2), // Chroma
			constrain(hue), // Hue, in degrees [0 to 360)
		];
	},
	toBase (LCH) {
		// Convert from polar form
		let [Lightness, Chroma, Hue] = LCH;
		// Clamp any negative Chroma
		if (Chroma < 0) {
			Chroma = 0;
		}
		// Deal with NaN Hue
		if (isNaN(Hue)) {
			Hue = 0;
		}
		return [
			Lightness, // L is still L
			Chroma * Math.cos(Hue * Math.PI / 180), // a
			Chroma * Math.sin(Hue * Math.PI / 180),  // b
		];
	},

	formats: {
		"lch": {
			coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"],
		},
	},
});

// deltaE2000 is a statistically significant improvement
// and is recommended by the CIE and Idealliance
// especially for color differences less than 10 deltaE76
// but is wicked complicated
// and many implementations have small errors!
// DeltaE2000 is also discontinuous; in case this
// matters to you, use deltaECMC instead.

const Gfactor = 25 ** 7;
const π$1 = Math.PI;
const r2d = 180 / π$1;
const d2r$1 = π$1 / 180;

function pow7 (x) {
	// Faster than x ** 7 or Math.pow(x, 7)

	const x2 = x * x;
	const x7 = x2 * x2 * x2 * x;

	return x7;
}

function deltaE2000 (color, sample, {kL = 1, kC = 1, kH = 1} = {}) {
	[color, sample] = getColor([color, sample]);

	// Given this color as the reference
	// and the function parameter as the sample,
	// calculate deltaE 2000.

	// This implementation assumes the parametric
	// weighting factors kL, kC and kH
	// for the influence of viewing conditions
	// are all 1, as sadly seems typical.
	// kL should be increased for lightness texture or noise
	// and kC increased for chroma noise

	let [L1, a1, b1] = lab.from(color);
	let C1 = lch.from(lab, [L1, a1, b1])[1];
	let [L2, a2, b2] = lab.from(sample);
	let C2 = lch.from(lab, [L2, a2, b2])[1];

	// Check for negative Chroma,
	// which might happen through
	// direct user input of LCH values

	if (C1 < 0) {
		C1 = 0;
	}
	if (C2 < 0) {
		C2 = 0;
	}

	let Cbar = (C1 + C2) / 2; // mean Chroma

	// calculate a-axis asymmetry factor from mean Chroma
	// this turns JND ellipses for near-neutral colors back into circles
	let C7 = pow7(Cbar);

	let G = 0.5 * (1 - Math.sqrt(C7 / (C7 + Gfactor)));

	// scale a axes by asymmetry factor
	// this by the way is why there is no Lab2000 colorspace
	let adash1 = (1 + G) * a1;
	let adash2 = (1 + G) * a2;

	// calculate new Chroma from scaled a and original b axes
	let Cdash1 = Math.sqrt(adash1 ** 2 + b1 ** 2);
	let Cdash2 = Math.sqrt(adash2 ** 2 + b2 ** 2);

	// calculate new hues, with zero hue for true neutrals
	// and in degrees, not radians

	let h1 = (adash1 === 0 && b1 === 0) ? 0 : Math.atan2(b1, adash1);
	let h2 = (adash2 === 0 && b2 === 0) ? 0 : Math.atan2(b2, adash2);

	if (h1 < 0) {
		h1 += 2 * π$1;
	}
	if (h2 < 0) {
		h2 += 2 * π$1;
	}

	h1 *= r2d;
	h2 *= r2d;

	// Lightness and Chroma differences; sign matters
	let ΔL = L2 - L1;
	let ΔC = Cdash2 - Cdash1;

	// Hue difference, getting the sign correct
	let hdiff = h2 - h1;
	let hsum = h1 + h2;
	let habs = Math.abs(hdiff);
	let Δh;

	if (Cdash1 * Cdash2 === 0) {
		Δh = 0;
	}
	else if (habs <= 180) {
		Δh = hdiff;
	}
	else if (hdiff > 180) {
		Δh = hdiff - 360;
	}
	else if (hdiff < -180) {
		Δh = hdiff + 360;
	}
	else {
		defaults.warn("the unthinkable has happened");
	}

	// weighted Hue difference, more for larger Chroma
	let ΔH = 2 * Math.sqrt(Cdash2 * Cdash1) * Math.sin(Δh * d2r$1 / 2);

	// calculate mean Lightness and Chroma
	let Ldash = (L1 + L2) / 2;
	let Cdash = (Cdash1 + Cdash2) / 2;
	let Cdash7 = pow7(Cdash);

	// Compensate for non-linearity in the blue region of Lab.
	// Four possibilities for hue weighting factor,
	// depending on the angles, to get the correct sign
	let hdash;
	if (Cdash1 * Cdash2 === 0) {
		hdash = hsum;   // which should be zero
	}
	else if (habs <= 180) {
		hdash = hsum / 2;
	}
	else if (hsum < 360) {
		hdash = (hsum + 360) / 2;
	}
	else {
		hdash = (hsum - 360) / 2;
	}

	// positional corrections to the lack of uniformity of CIELAB
	// These are all trying to make JND ellipsoids more like spheres

	// SL Lightness crispening factor
	// a background with L=50 is assumed
	let lsq = (Ldash - 50) ** 2;
	let SL = 1 + ((0.015 * lsq) / Math.sqrt(20 + lsq));

	// SC Chroma factor, similar to those in CMC and deltaE 94 formulae
	let SC = 1 + 0.045 * Cdash;

	// Cross term T for blue non-linearity
	let T = 1;
	T -= (0.17 * Math.cos((     hdash - 30)  * d2r$1));
	T += (0.24 * Math.cos(  2 * hdash        * d2r$1));
	T += (0.32 * Math.cos(((3 * hdash) + 6)  * d2r$1));
	T -= (0.20 * Math.cos(((4 * hdash) - 63) * d2r$1));

	// SH Hue factor depends on Chroma,
	// as well as adjusted hue angle like deltaE94.
	let SH = 1 + 0.015 * Cdash * T;

	// RT Hue rotation term compensates for rotation of JND ellipses
	// and Munsell constant hue lines
	// in the medium-high Chroma blue region
	// (Hue 225 to 315)
	let Δθ = 30 * Math.exp(-1 * (((hdash - 275) / 25) ** 2));
	let RC = 2 * Math.sqrt(Cdash7 / (Cdash7 + Gfactor));
	let RT = -1 * Math.sin(2 * Δθ * d2r$1) * RC;

	// Finally calculate the deltaE, term by term as root sume of squares
	let dE = (ΔL / (kL * SL)) ** 2;
	dE += (ΔC / (kC * SC)) ** 2;
	dE += (ΔH / (kH * SH)) ** 2;
	dE += RT * (ΔC / (kC * SC)) * (ΔH / (kH * SH));
	return Math.sqrt(dE);
	// Yay!!!
}

// Recalculated for consistent reference white
// see https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-943521484
const XYZtoLMS_M$1 = [
	[ 0.8190224379967030, 0.3619062600528904, -0.1288737815209879 ],
	[ 0.0329836539323885, 0.9292868615863434,  0.0361446663506424 ],
	[ 0.0481771893596242, 0.2642395317527308,  0.6335478284694309 ],
];
// inverse of XYZtoLMS_M
const LMStoXYZ_M$1 = [
	[  1.2268798758459243, -0.5578149944602171,  0.2813910456659647 ],
	[ -0.0405757452148008,  1.1122868032803170, -0.0717110580655164 ],
	[ -0.0763729366746601, -0.4214933324022432,  1.5869240198367816 ],
];
const LMStoLab_M = [
	[ 0.2104542683093140,  0.7936177747023054, -0.0040720430116193 ],
	[ 1.9779985324311684, -2.4285922420485799,  0.4505937096174110 ],
	[ 0.0259040424655478,  0.7827717124575296, -0.8086757549230774 ],
];
// LMStoIab_M inverted
const LabtoLMS_M = [
	[ 1.0000000000000000,  0.3963377773761749,  0.2158037573099136 ],
	[ 1.0000000000000000, -0.1055613458156586, -0.0638541728258133 ],
	[ 1.0000000000000000, -0.0894841775298119, -1.2914855480194092 ],
];

var OKLab = new ColorSpace({
	id: "oklab",
	name: "Oklab",
	coords: {
		l: {
			refRange: [0, 1],
			name: "Lightness",
		},
		a: {
			refRange: [-0.4, 0.4],
		},
		b: {
			refRange: [-0.4, 0.4],
		},
	},

	// Note that XYZ is relative to D65
	white: "D65",
	base: xyz_d65,
	fromBase (XYZ) {
		// move to LMS cone domain
		let LMS = multiplyMatrices(XYZtoLMS_M$1, XYZ);

		// non-linearity
		let LMSg = LMS.map(val => Math.cbrt(val));

		return multiplyMatrices(LMStoLab_M, LMSg);

	},
	toBase (OKLab) {
		// move to LMS cone domain
		let LMSg = multiplyMatrices(LabtoLMS_M, OKLab);

		// restore linearity
		let LMS = LMSg.map(val => val ** 3);

		return multiplyMatrices(LMStoXYZ_M$1, LMS);
	},

	formats: {
		"oklab": {
			coords: ["<percentage> | <number>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"],
		},
	},
});

// More accurate color-difference formulae
// than the simple 1976 Euclidean distance in CIE Lab


function deltaEOK (color, sample) {
	[color, sample] = getColor([color, sample]);

	// Given this color as the reference
	// and a sample,
	// calculate deltaEOK, term by term as root sum of squares
	let [L1, a1, b1] = OKLab.from(color);
	let [L2, a2, b2] = OKLab.from(sample);
	let ΔL = L1 - L2;
	let Δa = a1 - a2;
	let Δb = b1 - b2;
	return Math.sqrt(ΔL ** 2 + Δa ** 2 + Δb ** 2);
}

const ε$5 = .000075;

/**
 * Check if a color is in gamut of either its own or another color space
 * @return {Boolean} Is the color in gamut?
 */
function inGamut (color, space, {epsilon = ε$5} = {}) {
	color = getColor(color);

	if (!space) {
		space = color.space;
	}

	space = ColorSpace.get(space);
	let coords = color.coords;

	if (space !== color.space) {
		coords = space.from(color);
	}

	return space.inGamut(coords, {epsilon});
}

function clone (color) {
	return {
		space: color.space,
		coords: color.coords.slice(),
		alpha: color.alpha,
	};
}

/**
 * Euclidean distance of colors in an arbitrary color space
 */
function distance (color1, color2, space = "lab") {
	space = ColorSpace.get(space);

	// Assume getColor() is called on color in space.from()
	let coords1 = space.from(color1);
	let coords2 = space.from(color2);

	return Math.sqrt(coords1.reduce((acc, c1, i) => {
		let c2 = coords2[i];
		if (isNaN(c1) || isNaN(c2)) {
			return acc;
		}

		return acc + (c2 - c1) ** 2;
	}, 0));
}

function deltaE76 (color, sample) {
	// Assume getColor() is called in the distance function
	return distance(color, sample, "lab");
}

// More accurate color-difference formulae
// than the simple 1976 Euclidean distance in Lab

// CMC by the Color Measurement Committee of the
// Bradford Society of Dyeists and Colorsts, 1994.
// Uses LCH rather than Lab,
// with different weights for L, C and H differences
// A nice increase in accuracy for modest increase in complexity
const π = Math.PI;
const d2r = π / 180;

function deltaECMC (color, sample, {l = 2, c = 1} = {}) {
	[color, sample] = getColor([color, sample]);

	// Given this color as the reference
	// and a sample,
	// calculate deltaE CMC.

	// This implementation assumes the parametric
	// weighting factors l:c are 2:1
	// which is typical for non-textile uses.

	let [L1, a1, b1] = lab.from(color);
	let [, C1, H1] = lch.from(lab, [L1, a1, b1]);
	let [L2, a2, b2] = lab.from(sample);
	let C2 = lch.from(lab, [L2, a2, b2])[1];

	// let [L1, a1, b1] = color.getAll(lab);
	// let C1 = color.get("lch.c");
	// let H1 = color.get("lch.h");
	// let [L2, a2, b2] = sample.getAll(lab);
	// let C2 = sample.get("lch.c");

	// Check for negative Chroma,
	// which might happen through
	// direct user input of LCH values

	if (C1 < 0) {
		C1 = 0;
	}
	if (C2 < 0) {
		C2 = 0;
	}

	// we don't need H2 as ΔH is calculated from Δa, Δb and ΔC

	// Lightness and Chroma differences
	// These are (color - sample), unlike deltaE2000
	let ΔL = L1 - L2;
	let ΔC = C1 - C2;

	let Δa = a1 - a2;
	let Δb = b1 - b2;

	// weighted Hue difference, less for larger Chroma difference

	let H2 = (Δa ** 2) + (Δb ** 2) - (ΔC ** 2);
	// due to roundoff error it is possible that, for zero a and b,
	// ΔC > Δa + Δb is 0, resulting in attempting
	// to take the square root of a negative number

	// trying instead the equation from Industrial Color Physics
	// By Georg A. Klein

	// let ΔH = ((a1 * b2) - (a2 * b1)) / Math.sqrt(0.5 * ((C2 * C1) + (a2 * a1) + (b2 * b1)));
	// console.log({ΔH});
	// This gives the same result to 12 decimal places
	// except it sometimes NaNs when trying to root a negative number

	// let ΔH = Math.sqrt(H2); we never actually use the root, it gets squared again!!

	// positional corrections to the lack of uniformity of CIELAB
	// These are all trying to make JND ellipsoids more like spheres

	// SL Lightness crispening factor, depends entirely on L1 not L2
	let SL = 0.511;	// linear portion of the Y to L transfer function
	if (L1 >= 16) {	// cubic portion
		SL = (0.040975 * L1) / (1 + 0.01765 * L1);
	}

	// SC Chroma factor
	let SC = ((0.0638 * C1) / (1 + 0.0131 * C1)) + 0.638;

	// Cross term T for blue non-linearity
	let T;
	if (Number.isNaN(H1)) {
		H1 = 0;
	}

	if (H1 >= 164 && H1 <= 345) {
		T = 0.56 + Math.abs(0.2 * Math.cos((H1 + 168) * d2r));
	}
	else {
		T = 0.36 + Math.abs(0.4 * Math.cos((H1 + 35) * d2r));
	}
	// console.log({T});

	// SH Hue factor also depends on C1,
	let C4 = Math.pow(C1, 4);
	let F = Math.sqrt(C4 / (C4 + 1900));
	let SH = SC * ((F * T) + 1 - F);

	// Finally calculate the deltaE, term by term as root sume of squares
	let dE = (ΔL / (l * SL)) ** 2;
	dE += (ΔC / (c * SC)) ** 2;
	dE += (H2 / (SH ** 2));
	// dE += (ΔH / SH)  ** 2;
	return Math.sqrt(dE);
	// Yay!!!
}

const Yw$1 = 203;	// absolute luminance of media white

var XYZ_Abs_D65 = new ColorSpace({
// Absolute CIE XYZ, with a D65 whitepoint,
// as used in most HDR colorspaces as a starting point.
// SDR spaces are converted per BT.2048
// so that diffuse, media white is 203 cd/m²
	id: "xyz-abs-d65",
	cssId: "--xyz-abs-d65",
	name: "Absolute XYZ D65",
	coords: {
		x: {
			refRange: [0, 9504.7],
			name: "Xa",
		},
		y: {
			refRange: [0, 10000],
			name: "Ya",
		},
		z: {
			refRange: [0, 10888.3],
			name: "Za",
		},
	},

	base: xyz_d65,
	fromBase (XYZ) {
		// Make XYZ absolute, not relative to media white
		// Maximum luminance in PQ is 10,000 cd/m²
		// Relative XYZ has Y=1 for media white
		return XYZ.map (v => Math.max(v * Yw$1, 0));
	},
	toBase (AbsXYZ) {
		// Convert to media-white relative XYZ
		return AbsXYZ.map(v => Math.max(v / Yw$1, 0));
	},
});

const b$1 = 1.15;
const g = 0.66;
const n$1 = 2610 / (2 ** 14);
const ninv$1 = (2 ** 14) / 2610;
const c1$2 = 3424 / (2 ** 12);
const c2$2 = 2413 / (2 ** 7);
const c3$2 = 2392 / (2 ** 7);
const p = 1.7 * 2523 / (2 ** 5);
const pinv = (2 ** 5) / (1.7 * 2523);
const d = -0.56;
const d0 = 1.6295499532821566E-11;

const XYZtoCone_M = [
	[  0.41478972, 0.579999,  0.0146480 ],
	[ -0.2015100,  1.120649,  0.0531008 ],
	[ -0.0166008,  0.264800,  0.6684799 ],
];
// XYZtoCone_M inverted
const ConetoXYZ_M = [
	[  1.9242264357876067,  -1.0047923125953657,  0.037651404030618   ],
	[  0.35031676209499907,  0.7264811939316552, -0.06538442294808501 ],
	[ -0.09098281098284752, -0.3127282905230739,  1.5227665613052603  ],
];
const ConetoIab_M = [
	[  0.5,       0.5,       0        ],
	[  3.524000, -4.066708,  0.542708 ],
	[  0.199076,  1.096799, -1.295875 ],
];
// ConetoIab_M inverted
const IabtoCone_M = [
	[ 1,                   0.1386050432715393,   0.05804731615611886 ],
	[ 0.9999999999999999, -0.1386050432715393,  -0.05804731615611886 ],
	[ 0.9999999999999998, -0.09601924202631895, -0.8118918960560388  ],
];

var Jzazbz = new ColorSpace({
	id: "jzazbz",
	name: "Jzazbz",
	coords: {
		jz: {
			refRange: [0, 1],
			name: "Jz",
		},
		az: {
			refRange: [-0.5, 0.5],
		},
		bz: {
			refRange: [-0.5, 0.5],
		},
	},

	base: XYZ_Abs_D65,
	fromBase (XYZ) {
		// First make XYZ absolute, not relative to media white
		// Maximum luminance in PQ is 10,000 cd/m²
		// Relative XYZ has Y=1 for media white
		// BT.2048 says media white Y=203 at PQ 58

		let [ Xa, Ya, Za ] = XYZ;

		// modify X and Y
		let Xm = (b$1 * Xa) - ((b$1 - 1) * Za);
		let Ym = (g * Ya) - ((g - 1) * Xa);

		// move to LMS cone domain
		let LMS = multiplyMatrices(XYZtoCone_M, [ Xm, Ym, Za ]);

		// PQ-encode LMS
		let PQLMS = LMS.map (function (val) {
			let num = c1$2 + (c2$2 * ((val / 10000) ** n$1));
			let denom = 1 + (c3$2 * ((val / 10000) ** n$1));

			return (num / denom)  ** p;
		});

		// almost there, calculate Iz az bz
		let [ Iz, az, bz] = multiplyMatrices(ConetoIab_M, PQLMS);
		// console.log({Iz, az, bz});

		let Jz = ((1 + d) * Iz) / (1 + (d * Iz)) - d0;
		return [Jz, az, bz];
	},
	toBase (Jzazbz) {
		let [Jz, az, bz] = Jzazbz;
		let Iz = (Jz + d0) / (1 + d - d * (Jz + d0));

		// bring into LMS cone domain
		let PQLMS = multiplyMatrices(IabtoCone_M, [ Iz, az, bz ]);

		// convert from PQ-coded to linear-light
		let LMS = PQLMS.map(function (val) {
			let num = (c1$2 - (val ** pinv));
			let denom = (c3$2 * (val ** pinv)) - c2$2;
			let x = 10000 * ((num / denom) ** ninv$1);

			return (x); 	// luminance relative to diffuse white, [0, 70 or so].
		});

		// modified abs XYZ
		let [ Xm, Ym, Za ] = multiplyMatrices(ConetoXYZ_M, LMS);

		// restore standard D50 relative XYZ, relative to media white
		let Xa = (Xm + ((b$1 - 1) * Za)) / b$1;
		let Ya = (Ym + ((g - 1) * Xa)) / g;
		return [ Xa, Ya, Za ];
	},

	formats: {
		// https://drafts.csswg.org/css-color-hdr/#Jzazbz
		"color": {
			coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"],
		},
	},
});

var jzczhz = new ColorSpace({
	id: "jzczhz",
	name: "JzCzHz",
	coords: {
		jz: {
			refRange: [0, 1],
			name: "Jz",
		},
		cz: {
			refRange: [0, 1],
			name: "Chroma",
		},
		hz: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
	},

	base: Jzazbz,
	fromBase (jzazbz) {
		// Convert to polar form
		let [Jz, az, bz] = jzazbz;
		let hue;
		const ε = 0.0002; // chromatic components much smaller than a,b

		if (Math.abs(az) < ε && Math.abs(bz) < ε) {
			hue = NaN;
		}
		else {
			hue = Math.atan2(bz, az) * 180 / Math.PI;
		}

		return [
			Jz, // Jz is still Jz
			Math.sqrt(az ** 2 + bz ** 2), // Chroma
			constrain(hue), // Hue, in degrees [0 to 360)
		];
	},
	toBase (jzczhz) {
		// Convert from polar form
		// debugger;
		return [
			jzczhz[0], // Jz is still Jz
			jzczhz[1] * Math.cos(jzczhz[2] * Math.PI / 180), // az
			jzczhz[1] * Math.sin(jzczhz[2] * Math.PI / 180),  // bz
		];
	},
});

// More accurate color-difference formulae
// than the simple 1976 Euclidean distance in Lab

// Uses JzCzHz, which has improved perceptual uniformity
// and thus a simple Euclidean root-sum of ΔL² ΔC² ΔH²
// gives good results.

function deltaEJz (color, sample) {
	[color, sample] = getColor([color, sample]);

	// Given this color as the reference
	// and a sample,
	// calculate deltaE in JzCzHz.
	let [Jz1, Cz1, Hz1] = jzczhz.from(color);
	let [Jz2, Cz2, Hz2] = jzczhz.from(sample);

	// Lightness and Chroma differences
	// sign does not matter as they are squared.
	let ΔJ = Jz1 - Jz2;
	let ΔC = Cz1 - Cz2;

	// length of chord for ΔH
	if ((Number.isNaN(Hz1)) && (Number.isNaN(Hz2))) {
		// both undefined hues
		Hz1 = 0;
		Hz2 = 0;
	}
	else if (Number.isNaN(Hz1)) {
		// one undefined, set to the defined hue
		Hz1 = Hz2;
	}
	else if (Number.isNaN(Hz2)) {
		Hz2 = Hz1;
	}

	let Δh = Hz1 - Hz2;
	let ΔH = 2 * Math.sqrt(Cz1 * Cz2) * Math.sin((Δh / 2) * (Math.PI / 180));

	return Math.sqrt(ΔJ ** 2 + ΔC ** 2 + ΔH ** 2);
}

const c1$1 = 3424 / 4096;
const c2$1 = 2413 / 128;
const c3$1 = 2392 / 128;
const m1$1 = 2610 / 16384;
const m2 = 2523 / 32;
const im1 = 16384 / 2610;
const im2 = 32 / 2523;

// The matrix below includes the 4% crosstalk components
// and is from the Dolby "What is ICtCp" paper"
const XYZtoLMS_M = [
	[  0.3592832590121217,  0.6976051147779502, -0.0358915932320290 ],
	[ -0.1920808463704993,  1.1004767970374321,  0.0753748658519118 ],
	[  0.0070797844607479,  0.0748396662186362,  0.8433265453898765 ],
];
// linear-light Rec.2020 to LMS, again with crosstalk
// rational terms from Jan Fröhlich,
// Encoding High Dynamic Range andWide Color Gamut Imagery, p.97
// and ITU-R BT.2124-0 p.2
/*
const Rec2020toLMS_M = [
	[ 1688 / 4096,  2146 / 4096,   262 / 4096 ],
	[  683 / 4096,  2951 / 4096,   462 / 4096 ],
	[   99 / 4096,   309 / 4096,  3688 / 4096 ]
];
*/
// this includes the Ebner LMS coefficients,
// the rotation, and the scaling to [-0.5,0.5] range
// rational terms from Fröhlich p.97
// and ITU-R BT.2124-0 pp.2-3
const LMStoIPT_M = [
	[  2048 / 4096,   2048 / 4096,       0      ],
	[  6610 / 4096, -13613 / 4096,  7003 / 4096 ],
	[ 17933 / 4096, -17390 / 4096,  -543 / 4096 ],
];

// inverted matrices, calculated from the above
const IPTtoLMS_M = [
	[ 0.9999999999999998,  0.0086090370379328,  0.1110296250030260 ],
	[ 0.9999999999999998, -0.0086090370379328, -0.1110296250030259 ],
	[ 0.9999999999999998,  0.5600313357106791, -0.3206271749873188 ],
];
/*
const LMStoRec2020_M = [
	[ 3.4375568932814012112,   -2.5072112125095058195,   0.069654319228104608382],
	[-0.79142868665644156125,   1.9838372198740089874,  -0.19240853321756742626 ],
	[-0.025646662911506476363, -0.099240248643945566751, 1.1248869115554520431  ]
];
*/
const LMStoXYZ_M = [
	[  2.0701522183894223, -1.3263473389671563,  0.2066510476294053 ],
	[  0.3647385209748072,  0.6805660249472273, -0.0453045459220347 ],
	[ -0.0497472075358123, -0.0492609666966131,  1.1880659249923042 ],
];

// Only the PQ form of ICtCp is implemented here. There is also an HLG form.
// from Dolby, "WHAT IS ICTCP?"
// https://professional.dolby.com/siteassets/pdfs/ictcp_dolbywhitepaper_v071.pdf
// and
// Dolby, "Perceptual Color Volume
// Measuring the Distinguishable Colors of HDR and WCG Displays"
// https://professional.dolby.com/siteassets/pdfs/dolby-vision-measuring-perceptual-color-volume-v7.1.pdf
var ictcp = new ColorSpace({
	id: "ictcp",
	name: "ICTCP",
	// From BT.2100-2 page 7:
	// During production, signal values are expected to exceed the
	// range E′ = [0.0 : 1.0]. This provides processing headroom and avoids
	// signal degradation during cascaded processing. Such values of E′,
	// below 0.0 or exceeding 1.0, should not be clipped during production
	// and exchange.
	// Values below 0.0 should not be clipped in reference displays (even
	// though they represent “negative” light) to allow the black level of
	// the signal (LB) to be properly set using test signals known as “PLUGE”
	coords: {
		i: {
			refRange: [0, 1],	// Constant luminance,
			name: "I",
		},
		ct: {
			refRange: [-0.5, 0.5],	// Full BT.2020 gamut in range [-0.5, 0.5]
			name: "CT",
		},
		cp: {
			refRange: [-0.5, 0.5],
			name: "CP",
		},
	},

	base: XYZ_Abs_D65,
	fromBase (XYZ) {
		// move to LMS cone domain
		let LMS = multiplyMatrices(XYZtoLMS_M, XYZ);

		return LMStoICtCp(LMS);
	},
	toBase (ICtCp) {
		let LMS = ICtCptoLMS(ICtCp);

		return multiplyMatrices(LMStoXYZ_M, LMS);
	},
});

function LMStoICtCp (LMS) {
	// apply the PQ EOTF
	// we can't ever be dividing by zero because of the "1 +" in the denominator
	let PQLMS = LMS.map (function (val) {
		let num = c1$1 + (c2$1 * ((val / 10000) ** m1$1));
		let denom = 1 + (c3$1 * ((val / 10000) ** m1$1));

		return (num / denom)  ** m2;
	});

	// LMS to IPT, with rotation for Y'C'bC'r compatibility
	return multiplyMatrices(LMStoIPT_M, PQLMS);
}

function ICtCptoLMS (ICtCp) {
	let PQLMS = multiplyMatrices(IPTtoLMS_M, ICtCp);

	// From BT.2124-0 Annex 2 Conversion 3
	let LMS = PQLMS.map (function (val) {
		let num  = Math.max((val ** im2) - c1$1, 0);
		let denom = (c2$1 - (c3$1 * (val ** im2)));
		return 10000 * ((num / denom) ** im1);
	});

	return LMS;
}

// Delta E in ICtCp space,
// which the ITU calls Delta E ITP, which is shorter
// formulae from ITU Rec. ITU-R BT.2124-0

function deltaEITP (color, sample) {
	[color, sample] = getColor([color, sample]);

	// Given this color as the reference
	// and a sample,
	// calculate deltaE in ICtCp
	// which is simply the Euclidean distance

	let [ I1, T1, P1 ] = ictcp.from(color);
	let [ I2, T2, P2 ] = ictcp.from(sample);

	// the 0.25 factor is to undo the encoding scaling in Ct
	// the 720 is so that 1 deltaE = 1 JND
	// per  ITU-R BT.2124-0 p.3

	return 720 * Math.sqrt((I1 - I2) ** 2 + (0.25 * (T1 - T2) ** 2) + (P1 - P2) ** 2);
}

const white$3 = WHITES.D65;
const adaptedCoef = 0.42;
const adaptedCoefInv = 1 / adaptedCoef;
const tau = 2 * Math.PI;

const cat16 = [
	[  0.401288,  0.650173, -0.051461 ],
	[ -0.250268,  1.204414,  0.045854 ],
	[ -0.002079,  0.048952,  0.953127 ],
];

const cat16Inv = [
	[1.8620678550872327, -1.0112546305316843, 0.14918677544445175],
	[0.38752654323613717, 0.6214474419314753, -0.008973985167612518],
	[-0.015841498849333856, -0.03412293802851557, 1.0499644368778496],
];

const m1 = [
	[460.0, 451.0, 288.0],
	[460.0, -891.0, -261.0],
	[460.0, -220.0, -6300.0],
];

const surroundMap = {
	dark: [0.8, 0.525, 0.8],
	dim: [0.9, 0.59, 0.9],
	average: [1, 0.69, 1],
};

const hueQuadMap = {
	// Red, Yellow, Green, Blue, Red
	h: [20.14, 90.00, 164.25, 237.53, 380.14],
	e: [0.8, 0.7, 1.0, 1.2, 0.8],
	H: [0.0, 100.0, 200.0, 300.0, 400.0],
};

const rad2deg = 180 / Math.PI;
const deg2rad$1 = Math.PI / 180;

function adapt$1 (coords, fl) {
	const temp = coords.map(c => {
		const x = spow(fl * Math.abs(c) * 0.01, adaptedCoef);
		return 400 * copySign(x, c) / (x + 27.13);
	});
	return temp;
}

function unadapt (adapted, fl) {
	const constant = 100 / fl * (27.13 ** adaptedCoefInv);
	return adapted.map(c => {
		const cabs = Math.abs(c);
		return copySign(constant * spow(cabs / (400 - cabs), adaptedCoefInv), c);
	});
}

function hueQuadrature (h) {
	let hp = constrain(h);
	if (hp <= hueQuadMap.h[0]) {
		hp += 360;
	}

	const i = bisectLeft(hueQuadMap.h, hp) - 1;
	const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
	const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
	const Hi = hueQuadMap.H[i];

	const t = (hp - hi) / ei;
	return Hi + (100 * t) / (t + (hii - hp) / eii);
}

function invHueQuadrature (H) {
	let Hp = ((H % 400 + 400) % 400);
	const i = Math.floor(0.01 * Hp);
	Hp = Hp % 100;
	const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
	const [ei, eii] = hueQuadMap.e.slice(i, i + 2);

	return constrain(
		(Hp * (eii * hi - ei * hii) - 100 * hi * eii) /
		(Hp * (eii - ei) - 100 * eii),
	);
}

function environment (
	refWhite,
	adaptingLuminance,
	backgroundLuminance,
	surround,
	discounting,
) {

	const env = {};

	env.discounting = discounting;
	env.refWhite = refWhite;
	env.surround = surround;
	const xyzW = refWhite.map(c => {
		return c * 100;
	});

	// The average luminance of the environment in `cd/m^2cd/m` (a.k.a. nits)
	env.la = adaptingLuminance;
	// The relative luminance of the nearby background
	env.yb = backgroundLuminance;
	// Absolute luminance of the reference white.
	const yw = xyzW[1];

	// Cone response for reference white
	const rgbW = multiplyMatrices(cat16, xyzW);

	// Surround: dark, dim, and average
	surround = surroundMap[env.surround];
	const f = surround[0];
	env.c = surround[1];
	env.nc = surround[2];

	const k = 1 / (5 * env.la + 1);
	const k4 = k ** 4;

	// Factor of luminance level adaptation
	env.fl = (k4 * env.la + 0.1 * (1 - k4) * (1 - k4) * Math.cbrt(5 * env.la));
	env.flRoot = env.fl ** 0.25;

	env.n = env.yb / yw;
	env.z = 1.48 + Math.sqrt(env.n);
	env.nbb = 0.725 * (env.n ** -0.2);
	env.ncb = env.nbb;

	// Degree of adaptation calculating if not discounting
	// illuminant (assumed eye is fully adapted)
	const d = (discounting) ?
		1 :
		Math.max(
			Math.min(f * (1 - 1 / 3.6 * Math.exp((-env.la - 42) / 92)), 1),
			0,
		);
	env.dRgb = rgbW.map(c => {
		return interpolate(1, yw / c, d);
	});
	env.dRgbInv = env.dRgb.map(c => {
		return 1 / c;
	});

	// Achromatic response
	const rgbCW = rgbW.map((c, i) => {
		return c * env.dRgb[i];
	});
	const rgbAW = adapt$1(rgbCW, env.fl);
	env.aW = env.nbb * (2 * rgbAW[0] + rgbAW[1] + 0.05 * rgbAW[2]);

	// console.log(env);

	return env;
}

// Pre-calculate everything we can with the viewing conditions
const viewingConditions$1 = environment(
	white$3,
	64 / Math.PI * 0.2, 20,
	"average",
	false,
);

function fromCam16 (cam16, env) {

	// These check ensure one, and only one attribute for a
	// given category is provided.
	if (!((cam16.J !== undefined) ^ (cam16.Q !== undefined))) {
		throw new Error("Conversion requires one and only one: 'J' or 'Q'");
	}

	if (!((cam16.C !== undefined) ^ (cam16.M !== undefined) ^ (cam16.s !== undefined))) {
		throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");
	}

	// Hue is absolutely required
	if (!((cam16.h !== undefined) ^ (cam16.H !== undefined))) {
		throw new Error("Conversion requires one and only one: 'h' or 'H'");
	}

	// Black
	if (cam16.J === 0.0 || cam16.Q === 0.0) {
		return [0.0, 0.0, 0.0];
	}

	// Break hue into Cartesian components
	let hRad = 0.0;
	if (cam16.h !== undefined) {
		hRad = constrain(cam16.h) * deg2rad$1;
	}
	else {
		hRad = invHueQuadrature(cam16.H) * deg2rad$1;
	}

	const cosh = Math.cos(hRad);
	const sinh = Math.sin(hRad);

	// Calculate `Jroot` from one of the lightness derived coordinates.
	let Jroot = 0.0;
	if (cam16.J !== undefined) {
		Jroot = spow(cam16.J, 1 / 2) * 0.1;
	}
	else if (cam16.Q !== undefined) {
		Jroot = 0.25 * env.c * cam16.Q / ((env.aW + 4) * env.flRoot);
	}

	// Calculate the `t` value from one of the chroma derived coordinates
	let alpha = 0.0;
	if (cam16.C !== undefined) {
		alpha = cam16.C / Jroot;
	}
	else if (cam16.M !== undefined) {
		alpha = (cam16.M / env.flRoot) / Jroot;
	}
	else if (cam16.s !== undefined) {
		alpha = 0.0004 * (cam16.s ** 2) * (env.aW + 4) / env.c;
	}
	const t = spow(
		alpha * Math.pow(1.64 - Math.pow(0.29, env.n), -0.73),
		10 / 9,
	);

	// Eccentricity
	const et = 0.25 * (Math.cos(hRad + 2) + 3.8);

	// Achromatic response
	const A = env.aW * spow(Jroot, 2 / env.c / env.z);

	// Calculate red-green and yellow-blue components
	const p1 = 5e4 / 13 * env.nc * env.ncb * et;
	const p2 = A / env.nbb;
	const r = (
		23 * (p2 + 0.305) *
		zdiv(t, 23 * p1 + t * (11 * cosh + 108 * sinh))
	);
	const a = r * cosh;
	const b = r * sinh;

	// Calculate back from cone response to XYZ
	const rgb_c = unadapt(
		multiplyMatrices(m1, [p2, a, b]).map(c => {
			return c * 1 / 1403;
		}),
		env.fl,
	);
	return multiplyMatrices(
		cat16Inv,
		rgb_c.map((c, i) => {
			return c * env.dRgbInv[i];
		}),
	).map(c => {
		return c / 100;
	});
}


function toCam16 (xyzd65, env) {
	// Cone response
	const xyz100 = xyzd65.map(c => {
		return c * 100;
	});
	const rgbA = adapt$1(
		multiplyMatrices(cat16, xyz100).map((c, i) => {
			return c * env.dRgb[i];
		}),
		env.fl,
	);

	// Calculate hue from red-green and yellow-blue components
	const a = rgbA[0] + (-12 * rgbA[1] + rgbA[2]) / 11;
	const b = (rgbA[0] + rgbA[1] - 2 * rgbA[2]) / 9;
	const hRad = ((Math.atan2(b, a) % tau) + tau) % tau;

	// Eccentricity
	const et = 0.25 * (Math.cos(hRad + 2) + 3.8);

	const t = (
		5e4 / 13 * env.nc * env.ncb *
		zdiv(
			et * Math.sqrt(a ** 2 + b ** 2),
			rgbA[0] + rgbA[1] + 1.05 * rgbA[2] + 0.305,
		)
	);
	const alpha = spow(t, 0.9) * Math.pow(1.64 - Math.pow(0.29, env.n), 0.73);

	// Achromatic response
	const A = env.nbb * (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]);

	const Jroot = spow(A / env.aW, 0.5 * env.c * env.z);

	// Lightness
	const J = 100 * spow(Jroot, 2);

	// Brightness
	const Q = (4 / env.c * Jroot * (env.aW + 4) * env.flRoot);

	// Chroma
	const C = alpha * Jroot;

	// Colorfulness
	const M = C * env.flRoot;

	// Hue
	const h = constrain(hRad * rad2deg);

	// Hue quadrature
	const H = hueQuadrature(h);

	// Saturation
	const s = 50 * spow(env.c * alpha / (env.aW + 4), 1 / 2);

	// console.log({J: J, C: C, h: h, s: s, Q: Q, M: M, H: H});

	return {J: J, C: C, h: h, s: s, Q: Q, M: M, H: H};
}


// Provided as a way to directly evaluate the CAM16 model
// https://observablehq.com/@jrus/cam16: reference implementation
// https://arxiv.org/pdf/1802.06067.pdf: Nico Schlömer
// https://onlinelibrary.wiley.com/doi/pdf/10.1002/col.22324: hue quadrature
// https://www.researchgate.net/publication/318152296_Comprehensive_color_solutions_CAM16_CAT16_and_CAM16-UCS
// Results compared against: https://github.com/colour-science/colour
var cam16 = new ColorSpace({
	id: "cam16-jmh",
	cssId: "--cam16-jmh",
	name: "CAM16-JMh",
	coords: {
		j: {
			refRange: [0, 100],
			name: "J",
		},
		m: {
			refRange: [0, 105.0],
			name: "Colorfulness",
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
	},

	base: xyz_d65,

	fromBase (xyz) {
		const cam16 = toCam16(xyz, viewingConditions$1);
		return [cam16.J, cam16.M, cam16.h];
	},
	toBase (cam16) {
		return fromCam16(
			{J: cam16[0], M: cam16[1], h: cam16[2]},
			viewingConditions$1,
		);
	},
});

const white$2 = WHITES.D65;
const ε$4 = 216 / 24389;  // 6^3/29^3 == (24/116)^3
const κ$3 = 24389 / 27;   // 29^3/3^3

function toLstar (y) {
	// Convert XYZ Y to L*

	const fy = (y > ε$4) ? Math.cbrt(y) : (κ$3 * y + 16) / 116;
	return (116.0 * fy) - 16.0;
}

function fromLstar (lstar) {
	// Convert L* back to XYZ Y

	return (lstar > 8) ?  Math.pow((lstar + 16) / 116, 3) : lstar / κ$3;
}

function fromHct (coords, env) {
	// Use Newton's method to try and converge as quick as possible or
	// converge as close as we can. While the requested precision is achieved
	// most of the time, it may not always be achievable. Especially past the
	// visible spectrum, the algorithm will likely struggle to get the same
	// precision. If, for whatever reason, we cannot achieve the accuracy we
	// seek in the allotted iterations, just return the closest we were able to
	// get.

	let [h, c, t] = coords;
	let xyz = [];
	let j = 0;

	// Shortcut out for black
	if (t === 0) {
		return [0.0, 0.0, 0.0];
	}

	// Calculate the Y we need to target
	let y = fromLstar(t);

	// A better initial guess yields better results. Polynomials come from
	// curve fitting the T vs J response.
	if (t > 0) {
		j = 0.00379058511492914 * t ** 2 + 0.608983189401032 * t + 0.9155088574762233;
	}
	else {
		j = 9.514440756550361e-06 * t ** 2 + 0.08693057439788597 * t - 21.928975842194614;
	}

	// Threshold of how close is close enough, and max number of attempts.
	// More precision and more attempts means more time spent iterating. Higher
	// required precision gives more accuracy but also increases the chance of
	// not hitting the goal. 2e-12 allows us to convert round trip with
	// reasonable accuracy of six decimal places or more.
	const threshold = 2e-12;
	const max_attempts = 15;

	let attempt = 0;
	let last = Infinity;

	// Try to find a J such that the returned y matches the returned y of the L*
	while (attempt <= max_attempts) {
		xyz = fromCam16({J: j, C: c, h: h}, env);

		// If we are within range, return XYZ
		// If we are closer than last time, save the values
		const delta = Math.abs(xyz[1] - y);
		if (delta < last) {
			if (delta <= threshold) {
				return xyz;
			}
			last = delta;
		}

		// f(j_root) = (j ** (1 / 2)) * 0.1
		// f(j) = ((f(j_root) * 100) ** 2) / j - 1 = 0
		// f(j_root) = Y = y / 100
		// f(j) = (y ** 2) / j - 1
		// f'(j) = (2 * y) / j
		j = j - (xyz[1] - y) * j / (2 * xyz[1]);

		attempt += 1;
	}

	// We could not acquire the precision we desired,
	// return our closest attempt.
	return fromCam16({J: j, C: c, h: h}, env);
}

function toHct (xyz, env) {
	// Calculate HCT by taking the L* of CIE LCh D65 and CAM16 chroma and hue.

	const t = toLstar(xyz[1]);
	if (t === 0.0) {
		return [0.0, 0.0, 0.0];
	}
	const cam16 = toCam16(xyz, viewingConditions);
	return [constrain(cam16.h), cam16.C, t];
}

// Pre-calculate everything we can with the viewing conditions
const viewingConditions = environment(
	white$2, 200 / Math.PI * fromLstar(50.0),
	fromLstar(50.0) * 100,
	"average",
	false,
);

// https://material.io/blog/science-of-color-design
// This is not a port of the material-color-utilities,
// but instead implements the full color space as described,
// combining CAM16 JCh and Lab D65. This does not clamp conversion
// to HCT to specific chroma bands and provides support for wider
// gamuts than Google currently supports and does so at a greater
// precision (> 8 bits back to sRGB).
// This implementation comes from https://github.com/facelessuser/coloraide
// which is licensed under MIT.
var hct = new ColorSpace({
	id: "hct",
	name: "HCT",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
		c: {
			refRange: [0, 145],
			name: "Colorfulness",
		},
		t: {
			refRange: [0, 100],
			name: "Tone",
		},
	},

	base: xyz_d65,

	fromBase (xyz) {
		return toHct(xyz);
	},
	toBase (hct) {
		return fromHct(hct, viewingConditions);
	},
	formats: {
		color: {
			id: "--hct",
			coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"],
		},
	},
});

const deg2rad = Math.PI / 180;
const ucsCoeff = [1.00, 0.007, 0.0228];

/**
* Convert HCT chroma and hue (CAM16 JMh colorfulness and hue) using UCS logic for a and b.
* @param {number[]} coords - HCT coordinates.
* @return {number[]}
*/
function convertUcsAb (coords) {
	// We want the distance between the actual color.
	// If chroma is negative, it will throw off our calculations.
	// Normally, converting back to the base and forward will correct it.
	// If we have a negative chroma after this, then we have a color that
	// cannot resolve to positive chroma.
	if (coords[1] < 0) {
		coords = hct.fromBase(hct.toBase(coords));
	}

	// Only in extreme cases (usually outside the visible spectrum)
	// can the input value for log become negative.
	// Avoid domain error by forcing a zero result via "max" if necessary.
	const M = Math.log(Math.max(1 + ucsCoeff[2] * coords[1] * viewingConditions.flRoot, 1.0)) / ucsCoeff[2];
	const hrad = coords[0] * deg2rad;
	const a = M * Math.cos(hrad);
	const b = M * Math.sin(hrad);

	return [coords[2], a, b];
}


/**
* Color distance using HCT.
* @param {Color} color - Color to compare.
* @param {Color} sample - Color to compare.
* @return {number[]}
*/
function deltaEHCT (color, sample) {
	[color, sample] = getColor([color, sample]);

	let [ t1, a1, b1 ] = convertUcsAb(hct.from(color));
	let [ t2, a2, b2 ] = convertUcsAb(hct.from(sample));

	// Use simple euclidean distance with a and b using UCS conversion
	// and LCh lightness (HCT tone).
	return Math.sqrt((t1 - t2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}

var deltaEMethods = {
	deltaE76,
	deltaECMC,
	deltaE2000,
	deltaEJz,
	deltaEITP,
	deltaEOK,
	deltaEHCT,
};

/**
 * Calculate the epsilon to 2 degrees smaller than the specified JND.
 * @param {Number} jnd - The target "just noticeable difference".
 * @returns {Number}
 */
function calcEpsilon (jnd) {
	// Calculate the epsilon to 2 degrees smaller than the specified JND.

	const order = (!jnd) ? 0 : Math.floor(Math.log10(Math.abs(jnd)));
	// Limit to an arbitrary value to ensure value is never too small and causes infinite loops.
	return Math.max(parseFloat(`1e${order - 2}`), 1e-6);
}

const GMAPPRESET = {
	"hct": {
		method: "hct.c",
		jnd: 2,
		deltaEMethod: "hct",
		blackWhiteClamp: {},
	},
	"hct-tonal": {
		method: "hct.c",
		jnd: 0,
		deltaEMethod: "hct",
		blackWhiteClamp: { channel: "hct.t", min: 0, max: 100 },
	},
};

/**
 * Force coordinates to be in gamut of a certain color space.
 * Mutates the color it is passed.
 * @param {Object|string} options object or spaceId string
 * @param {string} options.method - How to force into gamut.
 *        If "clip", coordinates are just clipped to their reference range.
 *        If "css", coordinates are reduced according to the CSS 4 Gamut Mapping Algorithm.
 *        If in the form [colorSpaceId].[coordName], that coordinate is reduced
 *        until the color is in gamut. Please note that this may produce nonsensical
 *        results for certain coordinates (e.g. hue) or infinite loops if reducing the coordinate never brings the color in gamut.
 * @param {ColorSpace|string} options.space - The space whose gamut we want to map to
 * @param {string} options.deltaEMethod - The delta E method to use while performing gamut mapping.
 *        If no method is specified, delta E 2000 is used.
 * @param {Number} options.jnd - The "just noticeable difference" to target.
 * @param {Object} options.blackWhiteClamp - Used to configure SDR black and clamping.
 *        "channel" indicates the "space.channel" to use for determining when to clamp.
 *        "min" indicates the lower limit for black clamping and "max" indicates the upper
 *        limit for white clamping.
 */

function toGamut (
	color,
	{
		method = defaults.gamut_mapping,
		space = undefined,
		deltaEMethod = "",
		jnd = 2,
		blackWhiteClamp = {},
	} = {},
) {
	color = getColor(color);

	if (isString(arguments[1])) {
		space = arguments[1];
	}
	else if (!space) {
		space = color.space;
	}

	space = ColorSpace.get(space);

	// 3 spaces:
	// color.space: current color space
	// space: space whose gamut we are mapping to
	// mapSpace: space with the coord we're reducing

	if (inGamut(color, space, { epsilon: 0 })) {
		return color;
	}

	let spaceColor;
	if (method === "css") {
		spaceColor = toGamutCSS(color, { space });
	}
	else {
		if (method !== "clip" && !inGamut(color, space)) {

			if (Object.prototype.hasOwnProperty.call(GMAPPRESET, method)) {
				({method, jnd, deltaEMethod, blackWhiteClamp} = GMAPPRESET[method]);
			}

			// Get the correct delta E method
			let de = deltaE2000;
			if (deltaEMethod !== "") {
				for (let m in deltaEMethods) {
					if ("deltae" + deltaEMethod.toLowerCase() === m.toLowerCase()) {
						de = deltaEMethods[m];
						break;
					}
				}
			}

			let clipped = toGamut(to(color, space), { method: "clip", space });
			if (de(color, clipped) > jnd) {

				// Clamp to SDR white and black if required
				if (Object.keys(blackWhiteClamp).length === 3) {
					let channelMeta = ColorSpace.resolveCoord(blackWhiteClamp.channel);
					let channel = get(to(color, channelMeta.space), channelMeta.id);
					if (isNone(channel)) {
						channel = 0;
					}
					if (channel >= blackWhiteClamp.max) {
						return to({ space: "xyz-d65", coords: WHITES["D65"] }, color.space);
					}
					else if (channel <= blackWhiteClamp.min) {
						return to({ space: "xyz-d65", coords: [0, 0, 0] }, color.space);
					}
				}

				// Reduce a coordinate of a certain color space until the color is in gamut
				let coordMeta = ColorSpace.resolveCoord(method);
				let mapSpace = coordMeta.space;
				let coordId = coordMeta.id;

				let mappedColor = to(color, mapSpace);
				// If we were already in the mapped color space, we need to resolve undefined channels
				mappedColor.coords.forEach((c, i) => {
					if (isNone(c)) {
						mappedColor.coords[i] = 0;
					}
				});
				let bounds = coordMeta.range || coordMeta.refRange;
				let min = bounds[0];
				let ε = calcEpsilon(jnd);
				let low = min;
				let high = get(mappedColor, coordId);

				while (high - low > ε) {
					let clipped = clone(mappedColor);
					clipped = toGamut(clipped, { space, method: "clip" });
					let deltaE = de(mappedColor, clipped);

					if (deltaE - jnd < ε) {
						low = get(mappedColor, coordId);
					}
					else {
						high = get(mappedColor, coordId);
					}

					set(mappedColor, coordId, (low + high) / 2);
				}

				spaceColor = to(mappedColor, space);
			}
			else {
				spaceColor = clipped;
			}
		}
		else {
			spaceColor = to(color, space);
		}

		if (method === "clip" // Dumb coord clipping
			// finish off smarter gamut mapping with clip to get rid of ε, see #17
			|| !inGamut(spaceColor, space, { epsilon: 0 })
		) {
			let bounds = Object.values(space.coords).map(c => c.range || []);

			spaceColor.coords = spaceColor.coords.map((c, i) => {
				let [min, max] = bounds[i];

				if (min !== undefined) {
					c = Math.max(min, c);
				}

				if (max !== undefined) {
					c = Math.min(c, max);
				}

				return c;
			});
		}
	}

	if (space !== color.space) {
		spaceColor = to(spaceColor, color.space);
	}

	color.coords = spaceColor.coords;
	return color;
}

toGamut.returns = "color";

// The reference colors to be used if lightness is out of the range 0-1 in the
// `Oklch` space. These are created in the `Oklab` space, as it is used by the
// DeltaEOK calculation, so it is guaranteed to be imported.
const COLORS = {
	WHITE: { space: OKLab, coords: [1, 0, 0] },
	BLACK: { space: OKLab, coords: [0, 0, 0] },
};

/**
 * Given a color `origin`, returns a new color that is in gamut using
 * the CSS Gamut Mapping Algorithm. If `space` is specified, it will be in gamut
 * in `space`, and returned in `space`. Otherwise, it will be in gamut and
 * returned in the color space of `origin`.
 * @param {Object} origin
 * @param {Object} options
 * @param {ColorSpace|string} options.space
 * @returns {Color}
 */
function toGamutCSS (origin, {space} = {}) {
	const JND = 0.02;
	const ε = 0.0001;

	origin = getColor(origin);

	if (!space) {
		space = origin.space;
	}

	space = ColorSpace.get(space);
	const oklchSpace = ColorSpace.get("oklch");

	if (space.isUnbounded) {
		return to(origin, space);
	}

	const origin_OKLCH = to(origin, oklchSpace);
	let L = origin_OKLCH.coords[0];

	// return media white or black, if lightness is out of range
	if (L >= 1) {
		const white = to(COLORS.WHITE, space);
		white.alpha = origin.alpha;
		return to(white, space);
	}
	if (L <= 0) {
		const black = to(COLORS.BLACK, space);
		black.alpha = origin.alpha;
		return to(black, space);
	}

	if (inGamut(origin_OKLCH, space, {epsilon: 0})) {
		return to(origin_OKLCH, space);
	}

	function clip (_color) {
		const destColor = to(_color, space);
		const spaceCoords = Object.values(space.coords);
		destColor.coords = destColor.coords.map((coord, index) => {
			if ("range" in spaceCoords[index]) {
				const [min, max] =  spaceCoords[index].range;
				return clamp(min, coord, max);
			}
			return coord;
		});
		return destColor;
	}
	let min = 0;
	let max = origin_OKLCH.coords[1];
	let min_inGamut = true;
	let current = clone(origin_OKLCH);
	let clipped = clip(current);

	let E = deltaEOK(clipped, current);
	if (E < JND) {
		return clipped;
	}

	while ((max - min) > ε) {
		const chroma = (min + max) / 2;
		current.coords[1] = chroma;
		if (min_inGamut && inGamut(current, space, {epsilon: 0})) {
			min = chroma;
		}
		else {
			clipped = clip(current);
			E = deltaEOK(clipped, current);
			if (E < JND) {
				if ((JND - E < ε)) {
					break;
				}
				else {
					min_inGamut = false;
					min = chroma;
				}
			}
			else {
				max = chroma;
			}
		}
	}
	return clipped;
}

/**
 * Convert to color space and return a new color
 * @param {Object|string} space - Color space object or id
 * @param {Object} options
 * @param {boolean} options.inGamut - Whether to force resulting color in gamut
 * @returns {Color}
 */
function to (color, space, {inGamut} = {}) {
	color = getColor(color);
	space = ColorSpace.get(space);

	let coords = space.from(color);
	let ret = {space, coords, alpha: color.alpha};

	if (inGamut) {
		ret = toGamut(ret, inGamut === true ? undefined : inGamut);
	}

	return ret;
}

to.returns = "color";

/**
 * Generic toString() method, outputs a color(spaceId ...coords) function, a functional syntax, or custom formats defined by the color space
 * @param {Object} options
 * @param {number} options.precision - Significant digits
 * @param {boolean} options.inGamut - Adjust coordinates to fit in gamut first? [default: false]
 */
function serialize (color, {
	precision = defaults.precision,
	format = "default",
	inGamut: inGamut$1 = true,
	...customOptions
} = {}) {
	let ret;

	color = getColor(color);

	let formatId = format;
	format = color.space.getFormat(format)
	       ?? color.space.getFormat("default")
	       ?? ColorSpace.DEFAULT_FORMAT;

	// The assignment to coords and inGamut needs to stay in the order they are now
	// The order of the assignment was changed as a workaround for a bug in Next.js
	// See this issue for details: https://github.com/color-js/color.js/issues/260

	let coords = color.coords.slice(); // clone so we can manipulate it

	inGamut$1 ||= format.toGamut;

	if (inGamut$1 && !inGamut(color)) {
		// FIXME what happens if the color contains NaNs?
		coords = toGamut(clone(color), inGamut$1 === true ? undefined : inGamut$1).coords;
	}

	if (format.type === "custom") {
		customOptions.precision = precision;

		if (format.serialize) {
			ret = format.serialize(coords, color.alpha, customOptions);
		}
		else {
			throw new TypeError(`format ${formatId} can only be used to parse colors, not for serialization`);
		}
	}
	else {
		// Functional syntax
		let name = format.name || "color";

		if (format.serializeCoords) {
			coords = format.serializeCoords(coords, precision);
		}
		else {
			if (precision !== null) {
				coords = coords.map(c => {
					return serializeNumber(c, {precision});
				});
			}
		}

		let args = [...coords];

		if (name === "color") {
			// If output is a color() function, add colorspace id as first argument
			let cssId = format.id || format.ids?.[0] || color.space.id;
			args.unshift(cssId);
		}

		let alpha = color.alpha;
		if (precision !== null) {
			alpha = serializeNumber(alpha, {precision});
		}

		let strAlpha = color.alpha >= 1 || format.noAlpha ? "" : `${format.commas ? "," : " /"} ${alpha}`;
		ret = `${name}(${args.join(format.commas ? ", " : " ")}${strAlpha})`;
	}

	return ret;
}

// convert an array of linear-light rec2020 values to CIE XYZ
// using  D65 (no chromatic adaptation)
// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// 0 is actually calculated as  4.994106574466076e-17
const toXYZ_M$5 = [
	[ 0.6369580483012914, 0.14461690358620832,  0.1688809751641721  ],
	[ 0.2627002120112671, 0.6779980715188708,   0.05930171646986196 ],
	[ 0.000000000000000,  0.028072693049087428, 1.060985057710791   ],
];

// from ITU-R BT.2124-0 Annex 2 p.3
const fromXYZ_M$5 = [
	[  1.716651187971268,  -0.355670783776392, -0.253366281373660  ],
	[ -0.666684351832489,   1.616481236634939,  0.0157685458139111 ],
	[  0.017639857445311,  -0.042770613257809,  0.942103121235474  ],
];

var REC2020Linear = new RGBColorSpace({
	id: "rec2020-linear",
	cssId: "--rec2020-linear",
	name: "Linear REC.2020",
	white: "D65",
	toXYZ_M: toXYZ_M$5,
	fromXYZ_M: fromXYZ_M$5,
});

// import sRGB from "./srgb.js";

const α = 1.09929682680944;
const β = 0.018053968510807;

var REC2020 = new RGBColorSpace({
	id: "rec2020",
	name: "REC.2020",
	base: REC2020Linear,
	// Non-linear transfer function from Rec. ITU-R BT.2020-2 table 4
	toBase (RGB) {
		return RGB.map(function (val) {
			if (val < β * 4.5) {
				return val / 4.5;
			}

			return Math.pow((val + α - 1) / α, 1 / 0.45);
		});
	},
	fromBase (RGB) {
		return RGB.map(function (val) {
			if (val >= β) {
				return α * Math.pow(val, 0.45) - (α - 1);
			}

			return 4.5 * val;
		});
	},
});

const toXYZ_M$4 = [
	[0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
	[0.2289745640697488, 0.6917385218365064,  0.079286914093745],
	[0.0000000000000000, 0.04511338185890264, 1.043944368900976],
];

const fromXYZ_M$4 = [
	[ 2.493496911941425,   -0.9313836179191239, -0.40271078445071684],
	[-0.8294889695615747,   1.7626640603183463,  0.023624685841943577],
	[ 0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
];

var P3Linear = new RGBColorSpace({
	id: "p3-linear",
	cssId: "--display-p3-linear",
	name: "Linear P3",
	white: "D65",
	toXYZ_M: toXYZ_M$4,
	fromXYZ_M: fromXYZ_M$4,
});

// This is the linear-light version of sRGB
// as used for example in SVG filters
// or in Canvas

// This matrix was calculated directly from the RGB and white chromaticities
// when rounded to 8 decimal places, it agrees completely with the official matrix
// see https://github.com/w3c/csswg-drafts/issues/5922
const toXYZ_M$3 = [
	[ 0.41239079926595934, 0.357584339383878,   0.1804807884018343  ],
	[ 0.21263900587151027, 0.715168678767756,   0.07219231536073371 ],
	[ 0.01933081871559182, 0.11919477979462598, 0.9505321522496607  ],
];

// This matrix is the inverse of the above;
// again it agrees with the official definition when rounded to 8 decimal places
const fromXYZ_M$3 = [
	[  3.2409699419045226,  -1.537383177570094,   -0.4986107602930034  ],
	[ -0.9692436362808796,   1.8759675015077202,   0.04155505740717559 ],
	[  0.05563007969699366, -0.20397695888897652,  1.0569715142428786  ],
];

var sRGBLinear = new RGBColorSpace({
	id: "srgb-linear",
	name: "Linear sRGB",
	white: "D65",
	toXYZ_M: toXYZ_M$3,
	fromXYZ_M: fromXYZ_M$3,
});

/* List of CSS color keywords
 * Note that this does not include currentColor, transparent,
 * or system colors
 */

// To produce: Visit https://www.w3.org/TR/css-color-4/#named-colors
// and run in the console:
// copy($$("tr", $(".named-color-table tbody")).map(tr => `"${tr.cells[2].textContent.trim()}": [${tr.cells[4].textContent.trim().split(/\s+/).map(c => c === "0"? "0" : c === "255"? "1" : c + " / 255").join(", ")}]`).join(",\n"))
var KEYWORDS = {
	"aliceblue": [240 / 255, 248 / 255, 1],
	"antiquewhite": [250 / 255, 235 / 255, 215 / 255],
	"aqua": [0, 1, 1],
	"aquamarine": [127 / 255, 1, 212 / 255],
	"azure": [240 / 255, 1, 1],
	"beige": [245 / 255, 245 / 255, 220 / 255],
	"bisque": [1, 228 / 255, 196 / 255],
	"black": [0, 0, 0],
	"blanchedalmond": [1, 235 / 255, 205 / 255],
	"blue": [0, 0, 1],
	"blueviolet": [138 / 255, 43 / 255, 226 / 255],
	"brown": [165 / 255, 42 / 255, 42 / 255],
	"burlywood": [222 / 255, 184 / 255, 135 / 255],
	"cadetblue": [95 / 255, 158 / 255, 160 / 255],
	"chartreuse": [127 / 255, 1, 0],
	"chocolate": [210 / 255, 105 / 255, 30 / 255],
	"coral": [1, 127 / 255, 80 / 255],
	"cornflowerblue": [100 / 255, 149 / 255, 237 / 255],
	"cornsilk": [1, 248 / 255, 220 / 255],
	"crimson": [220 / 255, 20 / 255, 60 / 255],
	"cyan": [0, 1, 1],
	"darkblue": [0, 0, 139 / 255],
	"darkcyan": [0, 139 / 255, 139 / 255],
	"darkgoldenrod": [184 / 255, 134 / 255, 11 / 255],
	"darkgray": [169 / 255, 169 / 255, 169 / 255],
	"darkgreen": [0, 100 / 255, 0],
	"darkgrey": [169 / 255, 169 / 255, 169 / 255],
	"darkkhaki": [189 / 255, 183 / 255, 107 / 255],
	"darkmagenta": [139 / 255, 0, 139 / 255],
	"darkolivegreen": [85 / 255, 107 / 255, 47 / 255],
	"darkorange": [1, 140 / 255, 0],
	"darkorchid": [153 / 255, 50 / 255, 204 / 255],
	"darkred": [139 / 255, 0, 0],
	"darksalmon": [233 / 255, 150 / 255, 122 / 255],
	"darkseagreen": [143 / 255, 188 / 255, 143 / 255],
	"darkslateblue": [72 / 255, 61 / 255, 139 / 255],
	"darkslategray": [47 / 255, 79 / 255, 79 / 255],
	"darkslategrey": [47 / 255, 79 / 255, 79 / 255],
	"darkturquoise": [0, 206 / 255, 209 / 255],
	"darkviolet": [148 / 255, 0, 211 / 255],
	"deeppink": [1, 20 / 255, 147 / 255],
	"deepskyblue": [0, 191 / 255, 1],
	"dimgray": [105 / 255, 105 / 255, 105 / 255],
	"dimgrey": [105 / 255, 105 / 255, 105 / 255],
	"dodgerblue": [30 / 255, 144 / 255, 1],
	"firebrick": [178 / 255, 34 / 255, 34 / 255],
	"floralwhite": [1, 250 / 255, 240 / 255],
	"forestgreen": [34 / 255, 139 / 255, 34 / 255],
	"fuchsia": [1, 0, 1],
	"gainsboro": [220 / 255, 220 / 255, 220 / 255],
	"ghostwhite": [248 / 255, 248 / 255, 1],
	"gold": [1, 215 / 255, 0],
	"goldenrod": [218 / 255, 165 / 255, 32 / 255],
	"gray": [128 / 255, 128 / 255, 128 / 255],
	"green": [0, 128 / 255, 0],
	"greenyellow": [173 / 255, 1, 47 / 255],
	"grey": [128 / 255, 128 / 255, 128 / 255],
	"honeydew": [240 / 255, 1, 240 / 255],
	"hotpink": [1, 105 / 255, 180 / 255],
	"indianred": [205 / 255, 92 / 255, 92 / 255],
	"indigo": [75 / 255, 0, 130 / 255],
	"ivory": [1, 1, 240 / 255],
	"khaki": [240 / 255, 230 / 255, 140 / 255],
	"lavender": [230 / 255, 230 / 255, 250 / 255],
	"lavenderblush": [1, 240 / 255, 245 / 255],
	"lawngreen": [124 / 255, 252 / 255, 0],
	"lemonchiffon": [1, 250 / 255, 205 / 255],
	"lightblue": [173 / 255, 216 / 255, 230 / 255],
	"lightcoral": [240 / 255, 128 / 255, 128 / 255],
	"lightcyan": [224 / 255, 1, 1],
	"lightgoldenrodyellow": [250 / 255, 250 / 255, 210 / 255],
	"lightgray": [211 / 255, 211 / 255, 211 / 255],
	"lightgreen": [144 / 255, 238 / 255, 144 / 255],
	"lightgrey": [211 / 255, 211 / 255, 211 / 255],
	"lightpink": [1, 182 / 255, 193 / 255],
	"lightsalmon": [1, 160 / 255, 122 / 255],
	"lightseagreen": [32 / 255, 178 / 255, 170 / 255],
	"lightskyblue": [135 / 255, 206 / 255, 250 / 255],
	"lightslategray": [119 / 255, 136 / 255, 153 / 255],
	"lightslategrey": [119 / 255, 136 / 255, 153 / 255],
	"lightsteelblue": [176 / 255, 196 / 255, 222 / 255],
	"lightyellow": [1, 1, 224 / 255],
	"lime": [0, 1, 0],
	"limegreen": [50 / 255, 205 / 255, 50 / 255],
	"linen": [250 / 255, 240 / 255, 230 / 255],
	"magenta": [1, 0, 1],
	"maroon": [128 / 255, 0, 0],
	"mediumaquamarine": [102 / 255, 205 / 255, 170 / 255],
	"mediumblue": [0, 0, 205 / 255],
	"mediumorchid": [186 / 255, 85 / 255, 211 / 255],
	"mediumpurple": [147 / 255, 112 / 255, 219 / 255],
	"mediumseagreen": [60 / 255, 179 / 255, 113 / 255],
	"mediumslateblue": [123 / 255, 104 / 255, 238 / 255],
	"mediumspringgreen": [0, 250 / 255, 154 / 255],
	"mediumturquoise": [72 / 255, 209 / 255, 204 / 255],
	"mediumvioletred": [199 / 255, 21 / 255, 133 / 255],
	"midnightblue": [25 / 255, 25 / 255, 112 / 255],
	"mintcream": [245 / 255, 1, 250 / 255],
	"mistyrose": [1, 228 / 255, 225 / 255],
	"moccasin": [1, 228 / 255, 181 / 255],
	"navajowhite": [1, 222 / 255, 173 / 255],
	"navy": [0, 0, 128 / 255],
	"oldlace": [253 / 255, 245 / 255, 230 / 255],
	"olive": [128 / 255, 128 / 255, 0],
	"olivedrab": [107 / 255, 142 / 255, 35 / 255],
	"orange": [1, 165 / 255, 0],
	"orangered": [1, 69 / 255, 0],
	"orchid": [218 / 255, 112 / 255, 214 / 255],
	"palegoldenrod": [238 / 255, 232 / 255, 170 / 255],
	"palegreen": [152 / 255, 251 / 255, 152 / 255],
	"paleturquoise": [175 / 255, 238 / 255, 238 / 255],
	"palevioletred": [219 / 255, 112 / 255, 147 / 255],
	"papayawhip": [1, 239 / 255, 213 / 255],
	"peachpuff": [1, 218 / 255, 185 / 255],
	"peru": [205 / 255, 133 / 255, 63 / 255],
	"pink": [1, 192 / 255, 203 / 255],
	"plum": [221 / 255, 160 / 255, 221 / 255],
	"powderblue": [176 / 255, 224 / 255, 230 / 255],
	"purple": [128 / 255, 0, 128 / 255],
	"rebeccapurple": [102 / 255, 51 / 255, 153 / 255],
	"red": [1, 0, 0],
	"rosybrown": [188 / 255, 143 / 255, 143 / 255],
	"royalblue": [65 / 255, 105 / 255, 225 / 255],
	"saddlebrown": [139 / 255, 69 / 255, 19 / 255],
	"salmon": [250 / 255, 128 / 255, 114 / 255],
	"sandybrown": [244 / 255, 164 / 255, 96 / 255],
	"seagreen": [46 / 255, 139 / 255, 87 / 255],
	"seashell": [1, 245 / 255, 238 / 255],
	"sienna": [160 / 255, 82 / 255, 45 / 255],
	"silver": [192 / 255, 192 / 255, 192 / 255],
	"skyblue": [135 / 255, 206 / 255, 235 / 255],
	"slateblue": [106 / 255, 90 / 255, 205 / 255],
	"slategray": [112 / 255, 128 / 255, 144 / 255],
	"slategrey": [112 / 255, 128 / 255, 144 / 255],
	"snow": [1, 250 / 255, 250 / 255],
	"springgreen": [0, 1, 127 / 255],
	"steelblue": [70 / 255, 130 / 255, 180 / 255],
	"tan": [210 / 255, 180 / 255, 140 / 255],
	"teal": [0, 128 / 255, 128 / 255],
	"thistle": [216 / 255, 191 / 255, 216 / 255],
	"tomato": [1, 99 / 255, 71 / 255],
	"turquoise": [64 / 255, 224 / 255, 208 / 255],
	"violet": [238 / 255, 130 / 255, 238 / 255],
	"wheat": [245 / 255, 222 / 255, 179 / 255],
	"white": [1, 1, 1],
	"whitesmoke": [245 / 255, 245 / 255, 245 / 255],
	"yellow": [1, 1, 0],
	"yellowgreen": [154 / 255, 205 / 255, 50 / 255],
};

let coordGrammar = Array(3).fill("<percentage> | <number>[0, 255]");
let coordGrammarNumber = Array(3).fill("<number>[0, 255]");

var sRGB = new RGBColorSpace({
	id: "srgb",
	name: "sRGB",
	base: sRGBLinear,
	fromBase: rgb => {
		// convert an array of linear-light sRGB values in the range 0.0-1.0
		// to gamma corrected form
		// https://en.wikipedia.org/wiki/SRGB
		return rgb.map(val => {
			let sign = val < 0 ? -1 : 1;
			let abs = val * sign;

			if (abs > 0.0031308) {
				return sign * (1.055 * (abs ** (1 / 2.4)) - 0.055);
			}

			return 12.92 * val;
		});
	},
	toBase: rgb => {
		// convert an array of sRGB values in the range 0.0 - 1.0
		// to linear light (un-companded) form.
		// https://en.wikipedia.org/wiki/SRGB
		return rgb.map(val => {
			let sign = val < 0 ? -1 : 1;
			let abs = val * sign;

			if (abs <= 0.04045) {
				return val / 12.92;
			}

			return sign * (((abs + 0.055) / 1.055) ** 2.4);
		});
	},
	formats: {
		"rgb": {
			coords: coordGrammar,
		},
		"rgb_number": {
			name: "rgb",
			commas: true,
			coords: coordGrammarNumber,
			noAlpha: true,
		},
		"color": { /* use defaults */ },
		"rgba": {
			coords: coordGrammar,
			commas: true,
			lastAlpha: true,
		},
		"rgba_number": {
			name: "rgba",
			commas: true,
			coords: coordGrammarNumber,
		},
		"hex": {
			type: "custom",
			toGamut: true,
			test: str => /^#([a-f0-9]{3,4}){1,2}$/i.test(str),
			parse (str) {
				if (str.length <= 5) {
					// #rgb or #rgba, duplicate digits
					str = str.replace(/[a-f0-9]/gi, "$&$&");
				}

				let rgba = [];
				str.replace(/[a-f0-9]{2}/gi, component => {
					rgba.push(parseInt(component, 16) / 255);
				});

				return {
					spaceId: "srgb",
					coords: rgba.slice(0, 3),
					alpha: rgba.slice(3)[0],
				};
			},
			serialize: (coords, alpha, {
				collapse = true, // collapse to 3-4 digit hex when possible?
			} = {}) => {
				if (alpha < 1) {
					coords.push(alpha);
				}

				coords = coords.map(c => Math.round(c * 255));

				let collapsible = collapse && coords.every(c => c % 17 === 0);

				let hex = coords.map(c => {
					if (collapsible) {
						return (c / 17).toString(16);
					}

					return c.toString(16).padStart(2, "0");
				}).join("");

				return "#" + hex;
			},
		},
		"keyword": {
			type: "custom",
			test: str => /^[a-z]+$/i.test(str),
			parse (str) {
				str = str.toLowerCase();
				let ret = {spaceId: "srgb", coords: null, alpha: 1};

				if (str === "transparent") {
					ret.coords = KEYWORDS.black;
					ret.alpha = 0;
				}
				else {
					ret.coords = KEYWORDS[str];
				}

				if (ret.coords) {
					return ret;
				}
			},
		},
	},
});

var P3 = new RGBColorSpace({
	id: "p3",
	cssId: "display-p3",
	name: "P3",
	base: P3Linear,
	// Gamma encoding/decoding is the same as sRGB
	fromBase: sRGB.fromBase,
	toBase: sRGB.toBase,
});

// Default space for CSS output. Code in Color.js makes this wider if there's a DOM available
defaults.display_space = sRGB;

let supportsNone;

if (typeof CSS !== "undefined" && CSS.supports) {
	// Find widest supported color space for CSS
	for (let space of [lab, REC2020, P3]) {
		let coords = space.getMinCoords();
		let color = {space, coords, alpha: 1};
		let str = serialize(color);

		if (CSS.supports("color", str)) {
			defaults.display_space = space;
			break;
		}
	}
}

/**
 * Returns a serialization of the color that can actually be displayed in the browser.
 * If the default serialization can be displayed, it is returned.
 * Otherwise, the color is converted to Lab, REC2020, or P3, whichever is the widest supported.
 * In Node.js, this is basically equivalent to `serialize()` but returns a `String` object instead.
 *
 * @export
 * @param {{space, coords} | Color | string} color
 * @param {*} [options={}] Options to be passed to serialize()
 * @param {ColorSpace | string} [options.space = defaults.display_space] Color space to use for serialization if default is not supported
 * @returns {String} String object containing the serialized color with a color property containing the converted color (or the original, if no conversion was necessary)
 */
function display (color, {space = defaults.display_space, ...options} = {}) {
	let ret = serialize(color, options);

	if (typeof CSS === "undefined" || CSS.supports("color", ret) || !defaults.display_space) {
		ret = new String(ret);
		ret.color = color;
	}
	else {
		// If we're here, what we were about to output is not supported
		let fallbackColor = color;

		// First, check if the culprit is none values
		let hasNone = color.coords.some(isNone) || isNone(color.alpha);

		if (hasNone) {
			// Does the browser support none values?
			if (!(supportsNone ??= CSS.supports("color", "hsl(none 50% 50%)"))) {
				// Nope, try again without none
				fallbackColor = clone(color);
				fallbackColor.coords = fallbackColor.coords.map(skipNone);
				fallbackColor.alpha = skipNone(fallbackColor.alpha);

				ret = serialize(fallbackColor, options);

				if (CSS.supports("color", ret)) {
					// We're done, now it's supported
					ret = new String(ret);
					ret.color = fallbackColor;
					return ret;
				}
			}
		}

		// If we're here, the color function is not supported
		// Fall back to fallback space
		fallbackColor = to(fallbackColor, space);
		ret = new String(serialize(fallbackColor, options));
		ret.color = fallbackColor;
	}

	return ret;
}

function equals (color1, color2) {
	color1 = getColor(color1);
	color2 = getColor(color2);

	return color1.space === color2.space
	       && color1.alpha === color2.alpha
	       && color1.coords.every((c, i) => c === color2.coords[i]);
}

/**
 * Relative luminance
 */

function getLuminance (color) {
	// Assume getColor() is called on color in get()
	return get(color, [xyz_d65, "y"]);
}

function setLuminance (color, value) {
	// Assume getColor() is called on color in set()
	set(color, [xyz_d65, "y"], value);
}

function register$2 (Color) {
	Object.defineProperty(Color.prototype, "luminance", {
		get () {
			return getLuminance(this);
		},
		set (value) {
			setLuminance(this, value);
		},
	});
}

var luminance = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getLuminance: getLuminance,
	register: register$2,
	setLuminance: setLuminance
});

// WCAG 2.0 contrast https://www.w3.org/TR/WCAG20-TECHS/G18.html
// Simple contrast, with fixed 5% viewing flare contribution
// Symmetric, does not matter which is foreground and which is background


function contrastWCAG21 (color1, color2) {
	color1 = getColor(color1);
	color2 = getColor(color2);

	let Y1 = Math.max(getLuminance(color1), 0);
	let Y2 = Math.max(getLuminance(color2), 0);

	if (Y2 > Y1) {
		[Y1, Y2] = [Y2, Y1];
	}

	return (Y1 + .05) / (Y2 + .05);
}

// APCA 0.0.98G
// https://github.com/Myndex/apca-w3
// see also https://github.com/w3c/silver/issues/643


// exponents
const normBG = 0.56;
const normTXT = 0.57;
const revTXT = 0.62;
const revBG = 0.65;

// clamps
const blkThrs = 0.022;
const blkClmp = 1.414;
const loClip = 0.1;
const deltaYmin = 0.0005;

// scalers
// see https://github.com/w3c/silver/issues/645
const scaleBoW = 1.14;
const loBoWoffset = 0.027;
const scaleWoB = 1.14;

function fclamp (Y) {
	if (Y >= blkThrs) {
		return Y;
	}
	return Y + (blkThrs - Y) ** blkClmp;
}

function linearize (val) {
	let sign = val < 0 ? -1 : 1;
	let abs = Math.abs(val);
	return sign * Math.pow(abs, 2.4);
}

// Not symmetric, requires a foreground (text) color, and a background color
function contrastAPCA (background, foreground) {
	foreground = getColor(foreground);
	background = getColor(background);

	let S;
	let C;
	let Sapc;

	// Myndex as-published, assumes sRGB inputs
	let R, G, B;

	foreground = to(foreground, "srgb");
	// Should these be clamped to in-gamut values?

	// Calculates "screen luminance" with non-standard simple gamma EOTF
	// weights should be from CSS Color 4, not the ones here which are via Myndex and copied from Lindbloom
	[R, G, B] = foreground.coords;
	let lumTxt = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.0721750;

	background = to(background, "srgb");
	[R, G, B] = background.coords;
	let lumBg = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.0721750;

	// toe clamping of very dark values to account for flare
	let Ytxt = fclamp(lumTxt);
	let Ybg = fclamp(lumBg);

	// are we "Black on White" (dark on light), or light on dark?
	let BoW = Ybg > Ytxt;

	// why is this a delta, when Y is not perceptually uniform?
	// Answer: it is a noise gate, see
	// https://github.com/LeaVerou/color.js/issues/208
	if (Math.abs(Ybg - Ytxt) < deltaYmin) {
		C = 0;
	}
	else {
		if (BoW) {
			// dark text on light background
			S = Ybg ** normBG - Ytxt ** normTXT;
			C = S * scaleBoW;
		}
		else {
			// light text on dark background
			S = Ybg ** revBG - Ytxt ** revTXT;
			C = S * scaleWoB;
		}
	}
	if (Math.abs(C) < loClip) {
		Sapc = 0;
	}
	else if (C > 0) {
		// not clear whether Woffset is loBoWoffset or loWoBoffset
		// but they have the same value
		Sapc = C - loBoWoffset;
	}
	else {
		Sapc = C + loBoWoffset;
	}

	return Sapc * 100;
}

// Michelson  luminance contrast
// the relation between the spread and the sum of the two luminances
// Symmetric, does not matter which is foreground and which is background
// No black level compensation for flare.


function contrastMichelson (color1, color2) {
	color1 = getColor(color1);
	color2 = getColor(color2);

	let Y1 = Math.max(getLuminance(color1), 0);
	let Y2 = Math.max(getLuminance(color2), 0);

	if (Y2 > Y1) {
		[Y1, Y2] = [Y2, Y1];
	}

	let denom = (Y1 + Y2);
	return denom === 0 ? 0 : (Y1 - Y2) / denom;
}

// Weber luminance contrast
// The difference between the two luminances divided by the lower luminance
// Symmetric, does not matter which is foreground and which is background
// No black level compensation for flare.


// the darkest sRGB color above black is #000001 and this produces
// a plain Weber contrast of ~45647.
// So, setting the divide-by-zero result at 50000 is a reasonable
// max clamp for the plain Weber
const max = 50000;

function contrastWeber (color1, color2) {
	color1 = getColor(color1);
	color2 = getColor(color2);

	let Y1 = Math.max(getLuminance(color1), 0);
	let Y2 = Math.max(getLuminance(color2), 0);

	if (Y2 > Y1) {
		[Y1, Y2] = [Y2, Y1];
	}

	return Y2 === 0 ? max : (Y1 - Y2) / Y2;
}

// CIE Lightness difference, as used by Google Material Design
// Google HCT Tone is the same as CIE Lightness
// https://material.io/blog/science-of-color-design


function contrastLstar (color1, color2) {
	color1 = getColor(color1);
	color2 = getColor(color2);

	let L1 = get(color1, [lab, "l"]);
	let L2 = get(color2, [lab, "l"]);

	return Math.abs(L1 - L2);
}

// κ * ε  = 2^3 = 8
const ε$3 = 216 / 24389;  // 6^3/29^3 == (24/116)^3
const ε3 = 24 / 116;
const κ$2 = 24389 / 27;   // 29^3/3^3

let white$1 = WHITES.D65;

var lab_d65 = new ColorSpace({
	id: "lab-d65",
	name: "Lab D65",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness",
		},
		a: {
			refRange: [-125, 125],
		},
		b: {
			refRange: [-125, 125],
		},
	},

	// Assuming XYZ is relative to D65, convert to CIE Lab
	// from CIE standard, which now defines these as a rational fraction
	white: white$1,

	base: xyz_d65,
	// Convert D65-adapted XYZ to Lab
	//  CIE 15.3:2004 section 8.2.1.1
	fromBase (XYZ) {
		// compute xyz, which is XYZ scaled relative to reference white
		let xyz = XYZ.map((value, i) => value / white$1[i]);

		// now compute f
		let f = xyz.map(value => value > ε$3 ? Math.cbrt(value) : (κ$2 * value + 16) / 116);

		return [
			(116 * f[1]) - 16,   // L
			500 * (f[0] - f[1]), // a
			200 * (f[1] - f[2]),  // b
		];
	},
	// Convert Lab to D65-adapted XYZ
	// Same result as CIE 15.3:2004 Appendix D although the derivation is different
	// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	toBase (Lab) {
		// compute f, starting with the luminance-related term
		let f = [];
		f[1] = (Lab[0] + 16) / 116;
		f[0] = Lab[1] / 500 + f[1];
		f[2] = f[1] - Lab[2] / 200;

		// compute xyz
		let xyz = [
			f[0]   > ε3 ? Math.pow(f[0], 3)                : (116 * f[0] - 16) / κ$2,
			Lab[0] > 8  ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / κ$2,
			f[2]   > ε3 ? Math.pow(f[2], 3)                : (116 * f[2] - 16) / κ$2,
		];

		// Compute XYZ by scaling xyz by reference white
		return xyz.map((value, i) => value * white$1[i]);
	},

	formats: {
		"lab-d65": {
			coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"],
		},
	},
});

// Delta Phi Star perceptual lightness contrast
// See https://github.com/Myndex/deltaphistar
// The (difference between two Lstars each raised to phi) raised to (1/phi)
// Symmetric, does not matter which is foreground and which is background


const phi = Math.pow(5, 0.5) * 0.5 + 0.5; // Math.phi can be used if Math.js

function contrastDeltaPhi (color1, color2) {
	color1 = getColor(color1);
	color2 = getColor(color2);

	let Lstr1 = get(color1, [lab_d65, "l"]);
	let Lstr2 = get(color2, [lab_d65, "l"]);

	let deltaPhiStar = Math.abs(Math.pow(Lstr1, phi) - Math.pow(Lstr2, phi));

	let contrast = Math.pow(deltaPhiStar, (1 / phi)) * Math.SQRT2 - 40;

	return (contrast < 7.5) ? 0.0 : contrast ;
}

var contrastMethods = /*#__PURE__*/Object.freeze({
	__proto__: null,
	contrastAPCA: contrastAPCA,
	contrastDeltaPhi: contrastDeltaPhi,
	contrastLstar: contrastLstar,
	contrastMichelson: contrastMichelson,
	contrastWCAG21: contrastWCAG21,
	contrastWeber: contrastWeber
});

function contrast (background, foreground, o = {}) {
	if (isString(o)) {
		o = {algorithm: o};
	}

	let {algorithm, ...rest} = o;

	if (!algorithm) {
		let algorithms = Object.keys(contrastMethods).map(a => a.replace(/^contrast/, "")).join(", ");
		throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${algorithms}`);
	}

	background = getColor(background);
	foreground = getColor(foreground);

	for (let a in contrastMethods) {
		if ("contrast" + algorithm.toLowerCase() === a.toLowerCase()) {
			return contrastMethods[a](background, foreground, rest);
		}
	}

	throw new TypeError(`Unknown contrast algorithm: ${algorithm}`);
}

// Chromaticity coordinates
function uv (color) {
	// Assumes getAll() calls getColor() on color
	let [X, Y, Z] = getAll(color, xyz_d65);
	let denom = X + 15 * Y + 3 * Z;
	return [4 * X / denom, 9 * Y / denom];
}

function xy (color) {
	// Assumes getAll() calls getColor() on color
	let [X, Y, Z] = getAll(color, xyz_d65);
	let  sum = X + Y + Z;
	return [X / sum, Y / sum];
}

function register$1 (Color) {
	// no setters, as lightness information is lost
	// when converting color to chromaticity
	Object.defineProperty(Color.prototype, "uv", {
		get () {
			return uv(this);
		},
	});

	Object.defineProperty(Color.prototype, "xy", {
		get () {
			return xy(this);
		},
	});
}

var chromaticity = /*#__PURE__*/Object.freeze({
	__proto__: null,
	register: register$1,
	uv: uv,
	xy: xy
});

function deltaE (c1, c2, o = {}) {
	if (isString(o)) {
		o = {method: o};
	}

	let {method = defaults.deltaE, ...rest} = o;

	for (let m in deltaEMethods) {
		if ("deltae" + method.toLowerCase() === m.toLowerCase()) {
			return deltaEMethods[m](c1, c2, rest);
		}
	}

	throw new TypeError(`Unknown deltaE method: ${method}`);
}

function lighten (color, amount = .25) {
	let space = ColorSpace.get("oklch", "lch");
	let lightness = [space, "l"];
	return set(color, lightness, l => l * (1 + amount));
}

function darken (color, amount = .25) {
	let space = ColorSpace.get("oklch", "lch");
	let lightness = [space, "l"];
	return set(color, lightness, l => l * (1 - amount));
}

var variations = /*#__PURE__*/Object.freeze({
	__proto__: null,
	darken: darken,
	lighten: lighten
});

/**
 * Functions related to color interpolation
 */

/**
 * Return an intermediate color between two colors
 * Signatures: mix(c1, c2, p, options)
 *             mix(c1, c2, options)
 *             mix(color)
 * @param {Color | string} c1 The first color
 * @param {Color | string} [c2] The second color
 * @param {number} [p=.5] A 0-1 percentage where 0 is c1 and 1 is c2
 * @param {Object} [o={}]
 * @return {Color}
 */
function mix (c1, c2, p = .5, o = {}) {
	[c1, c2] = [getColor(c1), getColor(c2)];

	if (type(p) === "object") {
		[p, o] = [.5, p];
	}

	let r = range(c1, c2, o);
	return r(p);
}

/**
 *
 * @param {Color | string | Function} c1 The first color or a range
 * @param {Color | string} [c2] The second color if c1 is not a range
 * @param {Object} [options={}]
 * @return {Color[]}
 */
function steps (c1, c2, options = {}) {
	let colorRange;

	if (isRange(c1)) {
		// Tweaking existing range
		[colorRange, options] = [c1, c2];
		[c1, c2] = colorRange.rangeArgs.colors;
	}

	let {
		maxDeltaE, deltaEMethod,
		steps = 2, maxSteps = 1000,
		...rangeOptions
	} = options;

	if (!colorRange) {
		[c1, c2] = [getColor(c1), getColor(c2)];
		colorRange = range(c1, c2, rangeOptions);
	}

	let totalDelta = deltaE(c1, c2);
	let actualSteps = maxDeltaE > 0 ? Math.max(steps, Math.ceil(totalDelta / maxDeltaE) + 1) : steps;
	let ret = [];

	if (maxSteps !== undefined) {
		actualSteps = Math.min(actualSteps, maxSteps);
	}

	if (actualSteps === 1) {
		ret = [{p: .5, color: colorRange(.5)}];
	}
	else {
		let step = 1 / (actualSteps - 1);
		ret = Array.from({length: actualSteps}, (_, i) => {
			let p = i * step;
			return {p, color: colorRange(p)};
		});
	}

	if (maxDeltaE > 0) {
		// Iterate over all stops and find max deltaE
		let maxDelta = ret.reduce((acc, cur, i) => {
			if (i === 0) {
				return 0;
			}

			let ΔΕ = deltaE(cur.color, ret[i - 1].color, deltaEMethod);
			return Math.max(acc, ΔΕ);
		}, 0);

		while (maxDelta > maxDeltaE) {
			// Insert intermediate stops and measure maxDelta again
			// We need to do this for all pairs, otherwise the midpoint shifts
			maxDelta = 0;

			for (let i = 1; (i < ret.length) && (ret.length < maxSteps); i++) {
				let prev = ret[i - 1];
				let cur = ret[i];

				let p = (cur.p + prev.p) / 2;
				let color = colorRange(p);
				maxDelta = Math.max(maxDelta, deltaE(color, prev.color), deltaE(color, cur.color));
				ret.splice(i, 0, {p, color: colorRange(p)});
				i++;
			}
		}
	}

	ret = ret.map(a => a.color);

	return ret;
}

/**
 * Interpolate to color2 and return a function that takes a 0-1 percentage
 * @param {Color | string | Function} color1 The first color or an existing range
 * @param {Color | string} [color2] If color1 is a color, this is the second color
 * @param {Object} [options={}]
 * @returns {Function} A function that takes a 0-1 percentage and returns a color
 */
function range (color1, color2, options = {}) {
	if (isRange(color1)) {
		// Tweaking existing range
		let [r, options] = [color1, color2];

		return range(...r.rangeArgs.colors, {...r.rangeArgs.options, ...options});
	}

	let {space, outputSpace, progression, premultiplied} = options;

	color1 = getColor(color1);
	color2 = getColor(color2);

	// Make sure we're working on copies of these colors
	color1 = clone(color1);
	color2 = clone(color2);

	let rangeArgs = {colors: [color1, color2], options};

	if (space) {
		space = ColorSpace.get(space);
	}
	else {
		space = ColorSpace.registry[defaults.interpolationSpace] || color1.space;
	}

	outputSpace = outputSpace ? ColorSpace.get(outputSpace) : space;

	color1 = to(color1, space);
	color2 = to(color2, space);

	// Gamut map to avoid areas of flat color
	color1 = toGamut(color1);
	color2 = toGamut(color2);

	// Handle hue interpolation
	// See https://github.com/w3c/csswg-drafts/issues/4735#issuecomment-635741840
	if (space.coords.h && space.coords.h.type === "angle") {
		let arc = options.hue = options.hue || "shorter";

		let hue = [space, "h"];
		let [θ1, θ2] = [get(color1, hue), get(color2, hue)];
		// Undefined hues must be evaluated before hue fix-up to properly
		// calculate hue arcs between undefined and defined hues.
		// See https://github.com/w3c/csswg-drafts/issues/9436#issuecomment-1746957545
		if (isNaN(θ1) && !isNaN(θ2)) {
			θ1 = θ2;
		}
		else if (isNaN(θ2) && !isNaN(θ1)) {
			θ2 = θ1;
		}
		[θ1, θ2] = adjust(arc, [θ1, θ2]);
		set(color1, hue, θ1);
		set(color2, hue, θ2);
	}

	if (premultiplied) {
		// not coping with polar spaces yet
		color1.coords = color1.coords.map(c => c * color1.alpha);
		color2.coords = color2.coords.map(c => c * color2.alpha);
	}

	return Object.assign(p => {
		p = progression ? progression(p) : p;
		let coords = color1.coords.map((start, i) => {
			let end = color2.coords[i];
			return interpolate(start, end, p);
		});

		let alpha = interpolate(color1.alpha, color2.alpha, p);
		let ret = {space, coords, alpha};

		if (premultiplied) {
			// undo premultiplication
			ret.coords = ret.coords.map(c => c / alpha);
		}

		if (outputSpace !== space) {
			ret = to(ret, outputSpace);
		}

		return ret;
	}, {
		rangeArgs,
	});
}

function isRange (val) {
	return type(val) === "function" && !!val.rangeArgs;
}

defaults.interpolationSpace = "lab";

function register (Color) {
	Color.defineFunction("mix", mix, {returns: "color"});
	Color.defineFunction("range", range, {returns: "function<color>"});
	Color.defineFunction("steps", steps, {returns: "array<color>"});
}

var interpolation = /*#__PURE__*/Object.freeze({
	__proto__: null,
	isRange: isRange,
	mix: mix,
	range: range,
	register: register,
	steps: steps
});

var HSL = new ColorSpace({
	id: "hsl",
	name: "HSL",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
		s: {
			range: [0, 100],
			name: "Saturation",
		},
		l: {
			range: [0, 100],
			name: "Lightness",
		},
	},

	base: sRGB,

	// Adapted from https://drafts.csswg.org/css-color-4/better-rgbToHsl.js
	fromBase: rgb => {
		let max = Math.max(...rgb);
		let min = Math.min(...rgb);
		let [r, g, b] = rgb;
		let [h, s, l] = [NaN, 0, (min + max) / 2];
		let d = max - min;

		if (d !== 0) {
			s = (l === 0 || l === 1) ? 0 : (max - l) / Math.min(l, 1 - l);

			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4;
			}

			h = h * 60;
		}

		// Very out of gamut colors can produce negative saturation
		// If so, just rotate the hue by 180 and use a positive saturation
		// see https://github.com/w3c/csswg-drafts/issues/9222
		if (s < 0) {
			h += 180;
			s = Math.abs(s);
		}

		if (h >= 360) {
			h -= 360;
		}

		return [h, s * 100, l * 100];
	},

	// Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
	toBase: hsl => {
		let [h, s, l] = hsl;
		h = h % 360;

		if (h < 0) {
			h += 360;
		}

		s /= 100;
		l /= 100;

		function f (n) {
			let k = (n + h / 30) % 12;
			let a = s * Math.min(l, 1 - l);
			return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
		}

		return [f(0), f(8), f(4)];
	},

	formats: {
		"hsl": {
			coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
		},
		"hsla": {
			coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
			commas: true,
			lastAlpha: true,
		},
	},
});

// The Hue, Whiteness Blackness (HWB) colorspace
// See https://drafts.csswg.org/css-color-4/#the-hwb-notation
// Note that, like HSL, calculations are done directly on
// gamma-corrected sRGB values rather than linearising them first.

var HSV = new ColorSpace({
	id: "hsv",
	name: "HSV",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
		s: {
			range: [0, 100],
			name: "Saturation",
		},
		v: {
			range: [0, 100],
			name: "Value",
		},
	},

	base: HSL,
	// https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
	fromBase (hsl) {
		let [h, s, l] = hsl;
		s /= 100;
		l /= 100;

		let v = l + s * Math.min(l, 1 - l);

		return [
			h, // h is the same
			v === 0 ? 0 : 200 * (1 - l / v), // s
			100 * v,
		];
	},
	// https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
	toBase (hsv) {
		let [h, s, v] = hsv;

		s /= 100;
		v /= 100;

		let l = v * (1 - s / 2);

		return [
			h, // h is the same
			(l === 0 || l === 1) ? 0 : ((v - l) / Math.min(l, 1 - l)) * 100,
			l * 100,
		];
	},

	formats: {
		color: {
			id: "--hsv",
			coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"],
		},
	},
});

// The Hue, Whiteness Blackness (HWB) colorspace
// See https://drafts.csswg.org/css-color-4/#the-hwb-notation
// Note that, like HSL, calculations are done directly on
// gamma-corrected sRGB values rather than linearising them first.

var hwb = new ColorSpace({
	id: "hwb",
	name: "HWB",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
		w: {
			range: [0, 100],
			name: "Whiteness",
		},
		b: {
			range: [0, 100],
			name: "Blackness",
		},
	},

	base: HSV,
	fromBase (hsv) {
		let [h, s, v] = hsv;

		return [h, v * (100 - s) / 100, 100 - v];
	},
	toBase (hwb) {
		let [h, w, b] = hwb;

		// Now convert percentages to [0..1]
		w /= 100;
		b /= 100;

		// Achromatic check (white plus black >= 1)
		let sum = w + b;
		if (sum >= 1) {
			let gray = w / sum;
			return [h, 0, gray * 100];
		}

		let v = (1 - b);
		let s = (v === 0) ? 0 : 1 - w / v;
		return [h, s * 100, v * 100];
	},

	formats: {
		"hwb": {
			coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"],
		},
	},
});

// convert an array of linear-light a98-rgb values to CIE XYZ
// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// has greater numerical precision than section 4.3.5.3 of
// https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
// but the values below were calculated from first principles
// from the chromaticity coordinates of R G B W
const toXYZ_M$2 = [
	[ 0.5766690429101305,   0.1855582379065463,   0.1882286462349947  ],
	[ 0.29734497525053605,  0.6273635662554661,   0.07529145849399788 ],
	[ 0.02703136138641234,  0.07068885253582723,  0.9913375368376388  ],
];

const fromXYZ_M$2 = [
	[  2.0415879038107465,    -0.5650069742788596,   -0.34473135077832956 ],
	[ -0.9692436362808795,     1.8759675015077202,    0.04155505740717557 ],
	[  0.013444280632031142,  -0.11836239223101838,   1.0151749943912054  ],
];

var A98Linear = new RGBColorSpace({
	id: "a98rgb-linear",
	cssId: "--a98-rgb-linear",
	name: "Linear Adobe® 98 RGB compatible",
	white: "D65",
	toXYZ_M: toXYZ_M$2,
	fromXYZ_M: fromXYZ_M$2,
});

var a98rgb = new RGBColorSpace({
	id: "a98rgb",
	cssId: "a98-rgb",
	name: "Adobe® 98 RGB compatible",
	base: A98Linear,
	toBase: RGB => RGB.map(val => Math.pow(Math.abs(val), 563 / 256) * Math.sign(val)),
	fromBase: RGB => RGB.map(val => Math.pow(Math.abs(val), 256 / 563) * Math.sign(val)),
});

// convert an array of  prophoto-rgb values to CIE XYZ
// using  D50 (so no chromatic adaptation needed afterwards)
// matrix cannot be expressed in rational form, but is calculated to 64 bit accuracy
// see https://github.com/w3c/csswg-drafts/issues/7675
const toXYZ_M$1 = [
	[ 0.79776664490064230,  0.13518129740053308,  0.03134773412839220 ],
	[ 0.28807482881940130,  0.71183523424187300,  0.00008993693872564 ],
	[ 0.00000000000000000,  0.00000000000000000,  0.82510460251046020 ],
];

const fromXYZ_M$1 = [
	[  1.34578688164715830, -0.25557208737979464, -0.05110186497554526 ],
	[ -0.54463070512490190,  1.50824774284514680,  0.02052744743642139 ],
	[  0.00000000000000000,  0.00000000000000000,  1.21196754563894520 ],
];

var ProPhotoLinear = new RGBColorSpace({
	id: "prophoto-linear",
	cssId: "--prophoto-rgb-linear",
	name: "Linear ProPhoto",
	white: "D50",
	base: XYZ_D50,
	toXYZ_M: toXYZ_M$1,
	fromXYZ_M: fromXYZ_M$1,
});

const Et = 1 / 512;
const Et2 = 16 / 512;

var prophoto = new RGBColorSpace({
	id: "prophoto",
	cssId: "prophoto-rgb",
	name: "ProPhoto",
	base: ProPhotoLinear,
	toBase (RGB) {
		// Transfer curve is gamma 1.8 with a small linear portion
		return RGB.map(v => v < Et2 ? v / 16 : v ** 1.8);
	},
	fromBase (RGB) {
		return RGB.map(v => v >= Et ? v ** (1 / 1.8) : 16 * v);
	},
});

var oklch = new ColorSpace({
	id: "oklch",
	name: "Oklch",
	coords: {
		l: {
			refRange: [0, 1],
			name: "Lightness",
		},
		c: {
			refRange: [0, 0.4],
			name: "Chroma",
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
	},
	white: "D65",

	base: OKLab,
	fromBase (oklab) {
		// Convert to polar form
		let [L, a, b] = oklab;
		let h;
		const ε = 0.0002; // chromatic components much smaller than a,b

		if (Math.abs(a) < ε && Math.abs(b) < ε) {
			h = NaN;
		}
		else {
			h = Math.atan2(b, a) * 180 / Math.PI;
		}

		return [
			L, // OKLab L is still L
			Math.sqrt(a ** 2 + b ** 2), // Chroma
			constrain(h), // Hue, in degrees [0 to 360)
		];
	},
	// Convert from polar form
	toBase (oklch) {
		let [L, C, h] = oklch;
		let a, b;

		// check for NaN hue
		if (isNaN(h)) {
			a = 0;
			b = 0;
		}
		else {
			a = C * Math.cos(h * Math.PI / 180);
			b = C * Math.sin(h * Math.PI / 180);
		}

		return [ L, a, b ];
	},

	formats: {
		"oklch": {
			coords: ["<percentage> | <number>", "<number> | <percentage>[0,1]", "<number> | <angle>"],
		},
	},
});

let white = WHITES.D65;

const ε$2 = 216 / 24389;  // 6^3/29^3 == (24/116)^3
const κ$1 = 24389 / 27;   // 29^3/3^3
const [U_PRIME_WHITE, V_PRIME_WHITE] = uv({space: xyz_d65, coords: white});

var Luv = new ColorSpace({
	id: "luv",
	name: "Luv",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness",
		},
		// Reference ranges from https://facelessuser.github.io/coloraide/colors/luv/
		u: {
			refRange: [-215, 215],
		},
		v: {
			refRange: [-215, 215],
		},
	},

	white: white,
	base: xyz_d65,

	// Convert D65-adapted XYZ to Luv
	// https://en.wikipedia.org/wiki/CIELUV#The_forward_transformation
	fromBase (XYZ) {
		let xyz = [skipNone(XYZ[0]), skipNone(XYZ[1]), skipNone(XYZ[2])];
		let y = xyz[1];

		let [up, vp] = uv({space: xyz_d65, coords: xyz});

		// Protect against XYZ of [0, 0, 0]
		if (!Number.isFinite(up) || !Number.isFinite(vp)) {
			return [0, 0, 0];
		}

		let L = y <= ε$2 ? κ$1 * y : 116 * Math.cbrt(y) - 16;
		return [
			L,
			13 * L * (up - U_PRIME_WHITE),
			13 * L * (vp - V_PRIME_WHITE),
		 ];
	},

	// Convert Luv to D65-adapted XYZ
	// https://en.wikipedia.org/wiki/CIELUV#The_reverse_transformation
	toBase (Luv) {
		let [L, u, v] = Luv;

		// Protect against division by zero and NaN Lightness
		if (L === 0 || isNone(L)) {
			return [0, 0, 0];
		}

		u = skipNone(u);
		v = skipNone(v);

		let up = (u / (13 * L)) + U_PRIME_WHITE;
		let vp = (v / (13 * L)) + V_PRIME_WHITE;

		let y = L <= 8 ? L / κ$1 : Math.pow((L + 16) / 116, 3);

		return [
			y * ((9 * up) / (4 * vp)),
			y,
			y * ((12 - 3 * up - 20 * vp) / (4 * vp)),
		];
	},

	formats: {
		color: {
			id: "--luv",
			coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"],
		},
	},
});

var LCHuv = new ColorSpace({
	id: "lchuv",
	name: "LChuv",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness",
		},
		c: {
			refRange: [0, 220],
			name: "Chroma",
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
	},

	base: Luv,
	fromBase (Luv) {
		// Convert to polar form
		let [L, u, v] = Luv;
		let hue;
		const ε = 0.02;

		if (Math.abs(u) < ε && Math.abs(v) < ε) {
			hue = NaN;
		}
		else {
			hue = Math.atan2(v, u) * 180 / Math.PI;
		}

		return [
			L, // L is still L
			Math.sqrt(u ** 2 + v ** 2), // Chroma
			constrain(hue), // Hue, in degrees [0 to 360)
		];
	},
	toBase (LCH) {
		// Convert from polar form
		let [Lightness, Chroma, Hue] = LCH;
		// Clamp any negative Chroma
		if (Chroma < 0) {
			Chroma = 0;
		}
		// Deal with NaN Hue
		if (isNaN(Hue)) {
			Hue = 0;
		}
		return [
			Lightness, // L is still L
			Chroma * Math.cos(Hue * Math.PI / 180), // u
			Chroma * Math.sin(Hue * Math.PI / 180),  // v
		];
	},

	formats: {
		color: {
			id: "--lchuv",
			coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"],
		},
	},
});

/*
Adapted from: https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts

Copyright (c) 2012-2022 Alexei Boronine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


const ε$1 = 216 / 24389;  // 6^3/29^3 == (24/116)^3
const κ = 24389 / 27;   // 29^3/3^3

const m_r0 = fromXYZ_M$3[0][0];
const m_r1 = fromXYZ_M$3[0][1];
const m_r2 = fromXYZ_M$3[0][2];
const m_g0 = fromXYZ_M$3[1][0];
const m_g1 = fromXYZ_M$3[1][1];
const m_g2 = fromXYZ_M$3[1][2];
const m_b0 = fromXYZ_M$3[2][0];
const m_b1 = fromXYZ_M$3[2][1];
const m_b2 = fromXYZ_M$3[2][2];

function distanceFromOriginAngle (slope, intercept, angle) {
	const d = intercept / (Math.sin(angle) - slope * Math.cos(angle));
	return d < 0 ? Infinity : d;
}

function calculateBoundingLines (l) {
	const sub1 = Math.pow(l + 16, 3) / 1560896;
	const sub2 = sub1 > ε$1 ? sub1 : l / κ;
	const s1r = sub2 * (284517 * m_r0 - 94839 * m_r2);
	const s2r = sub2 * (838422 * m_r2 + 769860 * m_r1 + 731718 * m_r0);
	const s3r = sub2 * (632260 * m_r2 - 126452 * m_r1);
	const s1g = sub2 * (284517 * m_g0 - 94839 * m_g2);
	const s2g = sub2 * (838422 * m_g2 + 769860 * m_g1 + 731718 * m_g0);
	const s3g = sub2 * (632260 * m_g2 - 126452 * m_g1);
	const s1b = sub2 * (284517 * m_b0 - 94839 * m_b2);
	const s2b = sub2 * (838422 * m_b2 + 769860 * m_b1 + 731718 * m_b0);
	const s3b = sub2 * (632260 * m_b2 - 126452 * m_b1);

	return {
		r0s: s1r / s3r,
		r0i: s2r * l / s3r,
		r1s: s1r / (s3r + 126452),
		r1i: (s2r - 769860) * l / (s3r + 126452),
		g0s: s1g / s3g,
		g0i: s2g * l / s3g,
		g1s: s1g / (s3g + 126452),
		g1i: (s2g - 769860) * l / (s3g + 126452),
		b0s: s1b / s3b,
		b0i: s2b * l / s3b,
		b1s: s1b / (s3b + 126452),
		b1i: (s2b - 769860) * l / (s3b + 126452),
	};
}

function calcMaxChromaHsluv (lines, h) {
	const hueRad = h / 360 * Math.PI * 2;
	const r0 = distanceFromOriginAngle(lines.r0s, lines.r0i, hueRad);
	const r1 = distanceFromOriginAngle(lines.r1s, lines.r1i, hueRad);
	const g0 = distanceFromOriginAngle(lines.g0s, lines.g0i, hueRad);
	const g1 = distanceFromOriginAngle(lines.g1s, lines.g1i, hueRad);
	const b0 = distanceFromOriginAngle(lines.b0s, lines.b0i, hueRad);
	const b1 = distanceFromOriginAngle(lines.b1s, lines.b1i, hueRad);

	return Math.min(r0, r1, g0, g1, b0, b1);
}

var hsluv = new ColorSpace({
	id: "hsluv",
	name: "HSLuv",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
		s: {
			range: [0, 100],
			name: "Saturation",
		},
		l: {
			range: [0, 100],
			name: "Lightness",
		},
	},

	base: LCHuv,
	gamutSpace: sRGB,

	// Convert LCHuv to HSLuv
	fromBase (lch) {
		let [l, c, h] = [skipNone(lch[0]), skipNone(lch[1]), skipNone(lch[2])];
		let s;

		if (l > 99.9999999) {
			s = 0;
			l = 100;
		}
		else if (l < 0.00000001) {
			s = 0;
			l = 0;
		}
		else {
			let lines = calculateBoundingLines(l);
			let max = calcMaxChromaHsluv(lines, h);
			s = c / max * 100;
		}

		return [h, s, l];
	},

	// Convert HSLuv to LCHuv
	toBase (hsl) {
		let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
		let c;

		if (l > 99.9999999) {
			l = 100;
			c = 0;
		}
		else if (l < 0.00000001) {
			l = 0;
			c = 0;
		}
		else {
			let lines = calculateBoundingLines(l);
			let max = calcMaxChromaHsluv(lines, h);
			c = max / 100 * s;
		}

		return [l, c, h];
	},

	formats: {
		color: {
			id: "--hsluv",
			coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"],
		},
	},
});

/*
Adapted from: https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts

Copyright (c) 2012-2022 Alexei Boronine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


fromXYZ_M$3[0][0];
fromXYZ_M$3[0][1];
fromXYZ_M$3[0][2];
fromXYZ_M$3[1][0];
fromXYZ_M$3[1][1];
fromXYZ_M$3[1][2];
fromXYZ_M$3[2][0];
fromXYZ_M$3[2][1];
fromXYZ_M$3[2][2];

function distanceFromOrigin (slope, intercept) {
	return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
}

function calcMaxChromaHpluv (lines) {
	let r0 = distanceFromOrigin(lines.r0s, lines.r0i);
	let r1 = distanceFromOrigin(lines.r1s, lines.r1i);
	let g0 = distanceFromOrigin(lines.g0s, lines.g0i);
	let g1 = distanceFromOrigin(lines.g1s, lines.g1i);
	let b0 = distanceFromOrigin(lines.b0s, lines.b0i);
	let b1 = distanceFromOrigin(lines.b1s, lines.b1i);

	return Math.min(r0, r1, g0, g1, b0, b1);
}

var hpluv = new ColorSpace({
	id: "hpluv",
	name: "HPLuv",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue",
		},
		s: {
			range: [0, 100],
			name: "Saturation",
		},
		l: {
			range: [0, 100],
			name: "Lightness",
		},
	},

	base: LCHuv,
	gamutSpace: "self",

	// Convert LCHuv to HPLuv
	fromBase (lch) {
		let [l, c, h] = [skipNone(lch[0]), skipNone(lch[1]), skipNone(lch[2])];
		let s;

		if (l > 99.9999999) {
			s = 0;
			l = 100;
		}
		else if (l < 0.00000001) {
			s = 0;
			l = 0;
		}
		else {
			let lines = calculateBoundingLines(l);
			let max = calcMaxChromaHpluv(lines);
			s = c / max * 100;
		}
		return [h, s, l];
	},

	// Convert HPLuv to LCHuv
	toBase (hsl) {
		let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
		let c;

		if (l > 99.9999999) {
			l = 100;
			c = 0;
		}
		else if (l < 0.00000001) {
			l = 0;
			c = 0;
		}
		else {
			let lines = calculateBoundingLines(l);
			let max = calcMaxChromaHpluv(lines);
			c = max / 100 * s;
		}

		return [l, c, h];
	},

	formats: {
		color: {
			id: "--hpluv",
			coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"],
		},
	},
});

const Yw = 203;	// absolute luminance of media white, cd/m²
const n = 2610 / (2 ** 14);
const ninv = (2 ** 14) / 2610;
const m = 2523 / (2 ** 5);
const minv = (2 ** 5) / 2523;
const c1 = 3424 / (2 ** 12);
const c2 = 2413 / (2 ** 7);
const c3 = 2392 / (2 ** 7);

var rec2100Pq = new RGBColorSpace({
	id: "rec2100pq",
	cssId: "rec2100-pq",
	name: "REC.2100-PQ",
	base: REC2020Linear,
	toBase (RGB) {
		// given PQ encoded component in range [0, 1]
		// return media-white relative linear-light
		return RGB.map(function (val) {
			let x = ((Math.max(((val ** minv) - c1), 0) / (c2 - (c3 * (val ** minv)))) ** ninv);
			return (x * 10000 / Yw); 	// luminance relative to diffuse white, [0, 70 or so].
		});
	},
	fromBase (RGB) {
		// given media-white relative linear-light
		// returnPQ encoded component in range [0, 1]
		return RGB.map(function (val) {
			let x = Math.max(val * Yw / 10000, 0); 	// absolute luminance of peak white is 10,000 cd/m².
			let num = (c1 + (c2 * (x ** n)));
			let denom = (1 + (c3 * (x ** n)));

			return ((num / denom)  ** m);
		});
	},
});

// FIXME see https://github.com/LeaVerou/color.js/issues/190

const a = 0.17883277;
const b = 0.28466892; // 1 - (4 * a)
const c = 0.55991073; // 0.5 - a * Math.log(4 *a)

const scale = 3.7743;	// Place 18% grey at HLG 0.38, so media white at 0.75

var rec2100Hlg = new RGBColorSpace({
	id: "rec2100hlg",
	cssId: "rec2100-hlg",
	name: "REC.2100-HLG",
	referred: "scene",

	base: REC2020Linear,
	toBase (RGB) {
		// given HLG encoded component in range [0, 1]
		// return media-white relative linear-light
		return RGB.map(function (val) {
			// first the HLG EOTF
			// ITU-R BT.2390-10 p.30 section
			// 6.3 The hybrid log-gamma electro-optical transfer function (EOTF)
			// Then scale by 3 so media white is 1.0
			if (val <= 0.5) {
				return (val ** 2) / 3 * scale;
			}
			return ((Math.exp((val - c) / a) + b) / 12) * scale;
		});
	},
	fromBase (RGB) {
		// given media-white relative linear-light
		// where diffuse white is 1.0,
		// return HLG encoded component in range [0, 1]
		return RGB.map(function (val) {
			// first scale to put linear-light media white at 1/3
			val /= scale;
			// now the HLG OETF
			// ITU-R BT.2390-10 p.23
			// 6.1 The hybrid log-gamma opto-electronic transfer function (OETF)
			if (val <= 1 / 12) {
				return Math.sqrt(3 * val);
			}
			return a * Math.log(12 * val - b) + c;
		});
	},
});

const CATs = {};

hooks.add("chromatic-adaptation-start", env => {
	if (env.options.method) {
		env.M = adapt(env.W1, env.W2, env.options.method);
	}
});

hooks.add("chromatic-adaptation-end", env => {
	if (!env.M) {
		env.M = adapt(env.W1, env.W2, env.options.method);
	}
});

function defineCAT ({id, toCone_M, fromCone_M}) {
	// Use id, toCone_M, fromCone_M like variables
	CATs[id] = arguments[0];
}

function adapt (W1, W2, id = "Bradford") {
	// adapt from a source whitepoint or illuminant W1
	// to a destination whitepoint or illuminant W2,
	// using the given chromatic adaptation transform (CAT)
	// debugger;
	let method = CATs[id];

	let [ρs, γs, βs] = multiplyMatrices(method.toCone_M, W1);
	let [ρd, γd, βd] = multiplyMatrices(method.toCone_M, W2);

	// all practical illuminants have non-zero XYZ so no division by zero can occur below
	let scale = [
		[ρd / ρs,  0,        0      ],
		[0,        γd / γs,  0      ],
		[0,        0,        βd / βs],
	];
	// console.log({scale});

	let scaled_cone_M = multiplyMatrices(scale, method.toCone_M);
	let adapt_M	= multiplyMatrices(method.fromCone_M, scaled_cone_M);
	// console.log({scaled_cone_M, adapt_M});
	return adapt_M;
}

defineCAT({
	id: "von Kries",
	toCone_M: [
		[  0.4002400,  0.7076000, -0.0808100 ],
		[ -0.2263000,  1.1653200,  0.0457000 ],
		[  0.0000000,  0.0000000,  0.9182200 ],
	],
	fromCone_M: [
		[ 1.8599363874558397, -1.1293816185800916,   0.21989740959619328     ],
		[ 0.3611914362417676,  0.6388124632850422,  -0.000006370596838649899 ],
		[ 0,                   0,                    1.0890636230968613      ],
	],
});

defineCAT({
	id: "Bradford",
	// Convert an array of XYZ values in the range 0.0 - 1.0
	// to cone fundamentals
	toCone_M: [
		[  0.8951000,  0.2664000, -0.1614000 ],
		[ -0.7502000,  1.7135000,  0.0367000 ],
		[  0.0389000, -0.0685000,  1.0296000 ],
	],
	// and back
	fromCone_M: [
		[  0.9869929054667121, -0.14705425642099013, 0.15996265166373122  ],
		[  0.4323052697233945,  0.5183602715367774,  0.049291228212855594 ],
		[ -0.00852866457517732, 0.04004282165408486, 0.96848669578755     ],
	],
});

defineCAT({
	id: "CAT02",
	// with complete chromatic adaptation to W2, so D = 1.0
	toCone_M: [
		[  0.7328000,  0.4296000, -0.1624000 ],
		[ -0.7036000,  1.6975000,  0.0061000 ],
		[  0.0030000,  0.0136000,  0.9834000 ],
	],
	fromCone_M: [
		[  1.0961238208355142,   -0.27886900021828726, 0.18274517938277307 ],
		[  0.4543690419753592,    0.4735331543074117,  0.07209780371722911 ],
		[ -0.009627608738429355, -0.00569803121611342, 1.0153256399545427  ],
	],
});

defineCAT({
	id: "CAT16",
	toCone_M: [
		[  0.401288,  0.650173, -0.051461 ],
		[ -0.250268,  1.204414,  0.045854 ],
		[ -0.002079,  0.048952,  0.953127 ],
	],
	// the extra precision is needed to avoid roundtripping errors
	fromCone_M: [
		[  1.862067855087233,   -1.0112546305316845,  0.14918677544445172  ],
		[  0.3875265432361372,   0.6214474419314753, -0.008973985167612521 ],
		[ -0.01584149884933386, -0.03412293802851557, 1.0499644368778496   ],
	],
});

Object.assign(WHITES, {
	// whitepoint values from ASTM E308-01 with 10nm spacing, 1931 2 degree observer
	// all normalized to Y (luminance) = 1.00000
	// Illuminant A is a tungsten electric light, giving a very warm, orange light.
	A:   [1.09850, 1.00000, 0.35585],

	// Illuminant C was an early approximation to daylight: illuminant A with a blue filter.
	C:   [0.98074, 1.000000, 1.18232],

	// The daylight series of illuminants simulate natural daylight.
	// The color temperature (in degrees Kelvin/100) ranges from
	// cool, overcast daylight (D50) to bright, direct sunlight (D65).
	D55: [0.95682, 1.00000, 0.92149],
	D75: [0.94972, 1.00000, 1.22638],

	// Equal-energy illuminant, used in two-stage CAT16
	E:   [1.00000, 1.00000, 1.00000],

	// The F series of illuminants represent fluorescent lights
	F2:  [0.99186, 1.00000, 0.67393],
	F7:  [0.95041, 1.00000, 1.08747],
	F11: [1.00962, 1.00000, 0.64350],
});

// The ACES whitepoint
// see TB-2018-001 Derivation of the ACES White Point CIE Chromaticity Coordinates
// also https://github.com/ampas/aces-dev/blob/master/documents/python/TB-2018-001/aces_wp.py
// Similar to D60
WHITES.ACES = [0.32168 / 0.33767, 1.00000, (1.00000 - 0.32168 - 0.33767) / 0.33767];

// convert an array of linear-light ACEScc values to CIE XYZ
const toXYZ_M = [
	[  0.6624541811085053,   0.13400420645643313,  0.1561876870049078  ],
	[  0.27222871678091454,  0.6740817658111484,   0.05368951740793705 ],
	[ -0.005574649490394108, 0.004060733528982826, 1.0103391003129971  ],
];
const fromXYZ_M = [
	[  1.6410233796943257,   -0.32480329418479,    -0.23642469523761225  ],
	[ -0.6636628587229829,    1.6153315916573379,   0.016756347685530137 ],
	[  0.011721894328375376, -0.008284441996237409, 0.9883948585390215   ],
];

var ACEScg = new RGBColorSpace({
	id: "acescg",
	cssId: "--acescg",
	name: "ACEScg",

	// ACEScg – A scene-referred, linear-light encoding of ACES Data
	// https://docs.acescentral.com/specifications/acescg/
	// uses the AP1 primaries, see section 4.3.1 Color primaries
	coords: {
		r: {
			range: [0, 65504],
			name: "Red",
		},
		g: {
			range: [0, 65504],
			name: "Green",
		},
		b: {
			range: [0, 65504],
			name: "Blue",
		},
	},

	referred: "scene",

	white: WHITES.ACES,

	toXYZ_M,
	fromXYZ_M,
});

// export default Color;

const ε = 2 ** -16;

// the smallest value which, in the 32bit IEEE 754 float encoding,
// decodes as a non-negative value
const ACES_min_nonzero = -0.35828683;

// brightest encoded value, decodes to 65504
const ACES_cc_max = (Math.log2(65504) + 9.72) / 17.52; // 1.468

var acescc = new RGBColorSpace({
	id: "acescc",
	cssId: "--acescc",
	name: "ACEScc",
	// see S-2014-003 ACEScc – A Logarithmic Encoding of ACES Data
	// https://docs.acescentral.com/specifications/acescc/
	// uses the AP1 primaries, see section 4.3.1 Color primaries

	// Appendix A: "Very small ACES scene referred values below 7 1/4 stops
	// below 18% middle gray are encoded as negative ACEScc values.
	// These values should be preserved per the encoding in Section 4.4
	// so that all positive ACES values are maintained."
	coords: {
		r: {
			range: [ACES_min_nonzero, ACES_cc_max],
			name: "Red",
		},
		g: {
			range: [ACES_min_nonzero, ACES_cc_max],
			name: "Green",
		},
		b: {
			range: [ACES_min_nonzero, ACES_cc_max],
			name: "Blue",
		},
	},
	referred: "scene",

	base: ACEScg,
	// from section 4.4.2 Decoding Function
	toBase (RGB) {
		const low = (9.72 - 15) / 17.52; // -0.3014

		return RGB.map(function (val) {
			if (val <= low) {
				return (2 ** ((val * 17.52) - 9.72) - ε) * 2; // very low values, below -0.3014
			}
			else if (val < ACES_cc_max) {
				return 2 ** ((val * 17.52) - 9.72);
			}
			else { // val >= ACES_cc_max
				return 65504;
			}
		});
	},

	// Non-linear encoding function from S-2014-003, section 4.4.1 Encoding Function
	fromBase (RGB) {
		return RGB.map(function (val) {
			if (val <= 0) {
				return (Math.log2(ε) + 9.72) / 17.52; // -0.3584
			}
			else if (val < ε) {
				return  (Math.log2(ε + val * 0.5) + 9.72) / 17.52;
			}
			else { // val >= ε
				return  (Math.log2(val) + 9.72) / 17.52;
			}
		});
	},
	// encoded media white (rgb 1,1,1) => linear  [ 222.861, 222.861, 222.861 ]
	// encoded media black (rgb 0,0,0) => linear [ 0.0011857, 0.0011857, 0.0011857]
});

var spaces = /*#__PURE__*/Object.freeze({
	__proto__: null,
	A98RGB: a98rgb,
	A98RGB_Linear: A98Linear,
	ACEScc: acescc,
	ACEScg: ACEScg,
	CAM16_JMh: cam16,
	HCT: hct,
	HPLuv: hpluv,
	HSL: HSL,
	HSLuv: hsluv,
	HSV: HSV,
	HWB: hwb,
	ICTCP: ictcp,
	JzCzHz: jzczhz,
	Jzazbz: Jzazbz,
	LCH: lch,
	LCHuv: LCHuv,
	Lab: lab,
	Lab_D65: lab_d65,
	Luv: Luv,
	OKLCH: oklch,
	OKLab: OKLab,
	P3: P3,
	P3_Linear: P3Linear,
	ProPhoto: prophoto,
	ProPhoto_Linear: ProPhotoLinear,
	REC_2020: REC2020,
	REC_2020_Linear: REC2020Linear,
	REC_2100_HLG: rec2100Hlg,
	REC_2100_PQ: rec2100Pq,
	XYZ_ABS_D65: XYZ_Abs_D65,
	XYZ_D50: XYZ_D50,
	XYZ_D65: xyz_d65,
	sRGB: sRGB,
	sRGB_Linear: sRGBLinear
});

/**
 * Class that represents a color
 */
class Color {
	/**
	 * Creates an instance of Color.
	 * Signatures:
	 * - `new Color(stringToParse)`
	 * - `new Color(otherColor)`
	 * - `new Color({space, coords, alpha})`
	 * - `new Color(space, coords, alpha)`
	 * - `new Color(spaceId, coords, alpha)`
	 */
	constructor (...args) {
		let color;

		if (args.length === 1) {
			color = getColor(args[0]);
		}

		let space, coords, alpha;

		if (color) {
			space = color.space || color.spaceId;
			coords = color.coords;
			alpha = color.alpha;
		}
		else {
			// default signature new Color(ColorSpace, array [, alpha])
			[space, coords, alpha] = args;
		}

		Object.defineProperty(this, "space", {
			value: ColorSpace.get(space),
			writable: false,
			enumerable: true,
			configurable: true, // see note in https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
		});

		this.coords = coords ? coords.slice() : [0, 0, 0];

		// Clamp alpha to [0, 1]
		this.alpha = alpha > 1 || alpha === undefined ? 1 : (alpha < 0 ? 0 : alpha);

		// Convert "NaN" to NaN
		for (let i = 0; i < this.coords.length; i++) {
			if (this.coords[i] === "NaN") {
				this.coords[i] = NaN;
			}
		}

		// Define getters and setters for each coordinate
		for (let id in this.space.coords) {
			Object.defineProperty(this, id, {
				get: () => this.get(id),
				set: value => this.set(id, value),
			});
		}
	}

	get spaceId () {
		return this.space.id;
	}

	clone () {
		return new Color(this.space, this.coords, this.alpha);
	}

	toJSON () {
		return {
			spaceId: this.spaceId,
			coords: this.coords,
			alpha: this.alpha,
		};
	}

	display (...args) {
		let ret = display(this, ...args);

		// Convert color object to Color instance
		ret.color = new Color(ret.color);

		return ret;
	}

	/**
	 * Get a color from the argument passed
	 * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
	 */
	static get (color, ...args) {
		if (color instanceof Color) {
			return color;
		}

		return new Color(color, ...args);
	}

	static defineFunction (name, code, o = code) {
		let {instance = true, returns} = o;

		let func = function (...args) {
			let ret = code(...args);

			if (returns === "color") {
				ret = Color.get(ret);
			}
			else if (returns === "function<color>") {
				let f = ret;
				ret = function (...args) {
					let ret = f(...args);
					return Color.get(ret);
				};
				// Copy any function metadata
				Object.assign(ret, f);
			}
			else if (returns === "array<color>") {
				ret = ret.map(c => Color.get(c));
			}

			return ret;
		};

		if (!(name in Color)) {
			Color[name] = func;
		}

		if (instance) {
			Color.prototype[name] = function (...args) {
				return func(this, ...args);
			};
		}
	}

	static defineFunctions (o) {
		for (let name in o) {
			Color.defineFunction(name, o[name], o[name]);
		}
	}

	static extend (exports) {
		if (exports.register) {
			exports.register(Color);
		}
		else {
			// No register method, just add the module's functions
			for (let name in exports) {
				Color.defineFunction(name, exports[name]);
			}
		}
	}
}

Color.defineFunctions({
	get,
	getAll,
	set,
	setAll,
	to,
	equals,
	inGamut,
	toGamut,
	distance,
	toString: serialize,
});

Object.assign(Color, {
	util,
	hooks,
	WHITES,
	Space: ColorSpace,
	spaces: ColorSpace.registry,
	parse,

	// Global defaults one may want to configure
	defaults,
});

for (let key of Object.keys(spaces)) {
	ColorSpace.register(spaces[key]);
}

/**
 * This plugin defines getters and setters for color[spaceId]
 * e.g. color.lch on *any* color gives us the lch coords
 */

// Add space accessors to existing color spaces
for (let id in ColorSpace.registry) {
	addSpaceAccessors(id, ColorSpace.registry[id]);
}

// Add space accessors to color spaces not yet created
hooks.add("colorspace-init-end", space => {
	addSpaceAccessors(space.id, space);
	space.aliases?.forEach(alias => {
		addSpaceAccessors(alias, space);
	});
});

function addSpaceAccessors (id, space) {
	let propId = id.replace(/-/g, "_");

	Object.defineProperty(Color.prototype, propId, {
		// Convert coords to coords in another colorspace and return them
		// Source colorspace: this.spaceId
		// Target colorspace: id
		get () {
			let ret = this.getAll(id);

			if (typeof Proxy === "undefined") {
				// If proxies are not supported, just return a static array
				return ret;
			}

			// Enable color.spaceId.coordName syntax
			return new Proxy(ret, {
				has: (obj, property) => {
					try {
						ColorSpace.resolveCoord([space, property]);
						return true;
					}
					catch (e) {}

					return Reflect.has(obj, property);
				},
				get: (obj, property, receiver) => {
					if (property && typeof property !== "symbol" && !(property in obj)) {
						let {index} = ColorSpace.resolveCoord([space, property]);

						if (index >= 0) {
							return obj[index];
						}
					}

					return Reflect.get(obj, property, receiver);
				},
				set: (obj, property, value, receiver) => {
					if (property && typeof property !== "symbol" && !(property in obj) || property >= 0) {
						let {index} = ColorSpace.resolveCoord([space, property]);

						if (index >= 0) {
							obj[index] = value;

							// Update color.coords
							this.setAll(id, obj);

							return true;
						}
					}

					return Reflect.set(obj, property, value, receiver);
				},
			});
		},
		// Convert coords in another colorspace to internal coords and set them
		// Target colorspace: this.spaceId
		// Source colorspace: id
		set (coords) {
			this.setAll(id, coords);
		},
		configurable: true,
		enumerable: true,
	});
}

// Import all modules of Color.js

Color.extend(deltaEMethods);
Color.extend({deltaE});
Object.assign(Color, {deltaEMethods});
Color.extend(variations);
Color.extend({contrast});
Color.extend(chromaticity);
Color.extend(luminance);
Color.extend(interpolation);
Color.extend(contrastMethods);





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

/***/ "./src/libraries/fl-controls/components/background/gallery/builtin.js":
/*!****************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/gallery/builtin.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var builtin = [{
  value: [{
    id: 1,
    type: 'color',
    state: {
      color: 'hwb(169 0% 0% / 0.44)'
    }
  }, {
    id: 2,
    type: 'image',
    state: {
      repeat: 'no-repeat',
      size: 'cover',
      url: 'https://images.unsplash.com/photo-1720180320326-7697b073241b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTJ8fHxlbnwwfHx8fHw%3D'
    }
  }]
}, {
  value: [{
    id: 1,
    type: 'gradient',
    state: {
      angle: 45,
      colorSpace: 'oklch',
      type: 'linear',
      stops: [{
        from: 0,
        color: "purple"
      }, {
        from: 50,
        color: "transparent"
      }, {
        from: 100,
        color: "skyblue"
      }]
    }
  }]
}, {
  value: [{
    id: 1,
    type: 'gradient',
    state: {
      angle: 0,
      colorSpace: 'oklch',
      type: 'radial',
      stops: [{
        from: 0,
        color: "hwb(76 0% 0% )"
      }, {
        from: 100,
        color: "hwb(187 0% 0% )"
      }]
    }
  }]
}, {
  value: [{
    id: 1,
    type: 'color',
    state: {
      color: 'hwb(79 0% 0% / 0.77)'
    }
  }]
}, {
  value: [{
    id: 1,
    type: 'color',
    state: {
      color: 'hwb(320 0% 0% / 0.51)'
    }
  }]
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (builtin);

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/gallery/index.js":
/*!**************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/gallery/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../state */ "./src/libraries/fl-controls/state/index.js");
/* harmony import */ var _series_definitions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../series-definitions */ "./src/libraries/fl-controls/components/background/series-definitions/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/libraries/fl-controls/components/background/utils.js");
/* harmony import */ var _builtin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./builtin */ "./src/libraries/fl-controls/components/background/gallery/builtin.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/background/gallery/style.scss");







var forEach = FL.Builder.utils.objects.forEach;
var getCSS = function getCSS(value) {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getCSSForLayers)(value, _series_definitions__WEBPACK_IMPORTED_MODULE_3__["default"]);
};
var BackgroundGallery = function BackgroundGallery(_ref) {
  var setBackground = _ref.setBackground,
    _ref$current = _ref.current,
    current = _ref$current === void 0 ? [] : _ref$current;
  var _useControlsStore = (0,_state__WEBPACK_IMPORTED_MODULE_2__.useControlsStore)(),
    _useControlsStore$bac = _useControlsStore.backgroundPresets,
    backgroundPresets = _useControlsStore$bac === void 0 ? [] : _useControlsStore$bac,
    addBackgroundPreset = _useControlsStore.addBackgroundPreset;
  var showBuiltins = true;
  return /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_1__.Dialog.Button, {
    label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gallery', 'fl-builder'),
    dialogProps: {
      className: "fl-control fl-controls-background-gallery-dialog"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gallery-grid",
    style: {
      width: 400,
      height: 600
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      flexGrow: 1
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Gallery', 'fl-builder')), /*#__PURE__*/React.createElement("button", {
    className: "fl-control fl-controls-button",
    onClick: function onClick() {
      return addBackgroundPreset(current);
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Save Current', 'fl-builder'))), 0 < backgroundPresets.length && /*#__PURE__*/React.createElement("div", {
    className: "bg-gallery-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gallery-section-title"
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Saved Backgrounds', 'fl-builder')), backgroundPresets.map(function (value, i) {
    var background = getCSS(value, _series_definitions__WEBPACK_IMPORTED_MODULE_3__["default"]);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "bg-gallery-item"
    }, /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_1__.Color.Swatch, {
      style: {
        '--size': 'auto',
        aspectRatio: '3/2',
        display: 'flex'
      },
      onClick: function onClick(e) {
        setBackground(value);
        e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: background
      }
    })));
  })), showBuiltins && /*#__PURE__*/React.createElement("div", {
    className: "bg-gallery-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gallery-section-title"
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preset Backgrounds', 'fl-builder')), _builtin__WEBPACK_IMPORTED_MODULE_5__["default"].map(function (_ref2, i) {
    var value = _ref2.value;
    var background = getCSS(value, _series_definitions__WEBPACK_IMPORTED_MODULE_3__["default"]);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "bg-gallery-item"
    }, /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_1__.Color.Swatch, {
      style: {
        '--size': 'auto',
        aspectRatio: '3/2',
        display: 'flex'
      },
      onClick: function onClick(e) {
        setBackground(value);
        e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: background
      }
    })));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackgroundGallery);

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/gallery/style.scss":
/*!****************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/gallery/style.scss ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/background/index.js":
/*!******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input),
/* harmony export */   getCSS: () => (/* binding */ getCSS)
/* harmony export */ });
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _series__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../series */ "./src/libraries/fl-controls/components/series/index.js");
/* harmony import */ var _series_definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./series-definitions */ "./src/libraries/fl-controls/components/background/series-definitions/index.js");
/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gallery */ "./src/libraries/fl-controls/components/background/gallery/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/libraries/fl-controls/components/background/utils.js");





var getCSS = function getCSS(value) {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getCSSForLayers)(value, _series_definitions__WEBPACK_IMPORTED_MODULE_2__["default"]);
};
var Empty = function Empty() {
  return /*#__PURE__*/React.createElement("div", {
    className: "fl-series-empty"
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Click + to add layers', 'fl-builder'));
};

/**
 * Main Background Component
 */
var Input = function Input(_ref) {
  var _ref$value = _ref.value,
    _value = _ref$value === void 0 ? [] : _ref$value,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  var value = Array.isArray(_value) ? _value : [];

  // pass to toolbarItems
  var toolbar = /*#__PURE__*/React.createElement(_gallery__WEBPACK_IMPORTED_MODULE_3__["default"], {
    current: value,
    setBackground: onChange
  });
  return /*#__PURE__*/React.createElement(_series__WEBPACK_IMPORTED_MODULE_1__["default"], {
    items: value,
    setItems: onChange,
    definitions: _series_definitions__WEBPACK_IMPORTED_MODULE_2__["default"],
    appendNewItems: "before",
    empty: Empty,
    toolbarItems: null && 0
  });
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/color.js":
/*!*************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/color.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _series__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../series */ "./src/libraries/fl-controls/components/series/index.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../input */ "./src/libraries/fl-controls/components/input/index.js");
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./default */ "./src/libraries/fl-controls/components/background/series-definitions/default.js");
var _excluded = ["showReset"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_objectSpread(_objectSpread({}, _default__WEBPACK_IMPORTED_MODULE_4__["default"]), {}, {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'fl-builder'),
  createItem: function createItem(item) {
    return _objectSpread(_objectSpread({}, item), {}, {
      state: {
        color: 'deepskyblue'
      }
    });
  },
  getCSS: function getCSS(_ref) {
    var state = _ref.state;
    return "linear-gradient(".concat(state.color, ", ").concat(state.color, ")");
  },
  content: function content(_ref2) {
    var state = _ref2.state,
      setState = _ref2.setState;
    var CustomPickerButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref3, ref) {
      var showReset = _ref3.showReset,
        rest = _objectWithoutProperties(_ref3, _excluded);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_series__WEBPACK_IMPORTED_MODULE_2__.TitleCard, _extends({
        ref: ref,
        as: "button",
        style: {
          paddingLeft: 20
        },
        title: state.color ? state.color : 'Choose Color...',
        thumbProps: {
          style: {
            backgroundColor: state.color
          }
        }
      }, rest));
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_3__["default"], {
      type: "color",
      value: state.color,
      onChange: function onChange(value) {
        return setState({
          color: value
        });
      },
      buttonComponent: CustomPickerButton
    });
  }
}));

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/default.js":
/*!***************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/default.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/libraries/fl-controls/components/background/utils.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getCSS: function getCSS(_ref) {
    var state = _ref.state;
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createLayerString)(state);
  }
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/gradient/index.js":
/*!**********************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/gradient/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _series__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../series */ "./src/libraries/fl-controls/components/series/index.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../input */ "./src/libraries/fl-controls/components/input/index.js");
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../default */ "./src/libraries/fl-controls/components/background/series-definitions/default.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/background/series-definitions/gradient/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }








var GradientPicker = function GradientPicker(_ref) {
  var state = _ref.state,
    setState = _ref.setState;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.Gradient.Input, {
    value: state,
    onChange: setState
  });
};
var Content = function Content(_ref2) {
  var state = _ref2.state,
    setState = _ref2.setState;
  var CustomPickerButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_series__WEBPACK_IMPORTED_MODULE_4__.TitleCard, _extends({
      ref: ref,
      style: {
        paddingLeft: 20
      },
      title: state.type ? "".concat(state.type, " gradient") : 'Select Gradient...',
      thumbProps: {
        style: {
          background: ___WEBPACK_IMPORTED_MODULE_3__.Gradient.getCSS(state)
        }
      }
    }, props));
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.DialogButton, {
    button: CustomPickerButton,
    dialogProps: {
      className: 'fl-controls-gradient-picker-dialog'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GradientPicker, {
    state: state,
    setState: setState
  }));
};
var gradient = _objectSpread(_objectSpread({}, _default__WEBPACK_IMPORTED_MODULE_6__["default"]), {}, {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gradient', 'fl-builder'),
  getCSS: function getCSS(_ref3) {
    var state = _ref3.state;
    return ___WEBPACK_IMPORTED_MODULE_3__.Gradient.getCSS(state);
  },
  content: Content,
  createItem: function createItem(item) {
    return _objectSpread(_objectSpread({}, item), {}, {
      state: {
        type: 'linear',
        angle: 0,
        colorSpace: 'oklch',
        stops: [{
          from: 0,
          color: 'hwb(328 0% 10% )'
        }, {
          from: 100,
          color: 'hwb(187 0% 1% )'
        }]
      }
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gradient);

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/gradient/style.scss":
/*!************************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/gradient/style.scss ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/image/index.js":
/*!*******************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/image/index.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getCSS: () => (/* binding */ getCSS)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../default */ "./src/libraries/fl-controls/components/background/series-definitions/default.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _series__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../series */ "./src/libraries/fl-controls/components/series/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ "./src/libraries/fl-controls/components/background/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var forEach = FL.Builder.utils.objects.forEach;
var defaultState = {
  sourceType: 'media',
  mediaAttachment: {
    id: null,
    url: ''
  },
  svg: '',
  url: '',
  repeat: 'repeat',
  position: '',
  size: '',
  clip: '',
  attachment: ''
};
var getCSS = function getCSS(_ref) {
  var state = _ref.state;
  var _defaultState$state = _objectSpread(_objectSpread({}, defaultState), state),
    sourceType = _defaultState$state.sourceType,
    mediaAttachment = _defaultState$state.mediaAttachment,
    url = _defaultState$state.url,
    svg = _defaultState$state.svg,
    attachment = _defaultState$state.attachment,
    repeat = _defaultState$state.repeat,
    position = _defaultState$state.position,
    size = _defaultState$state.size,
    clip = _defaultState$state.clip;
  var parts = [];
  if (!url && !svg && !mediaAttachment.url) {
    return '';
  }
  if (attachment && '' !== attachment) {
    parts.push(attachment);
  }
  if (clip) {
    parts.push(clip);
  }

  // URL and SVG Handling
  var urlString = '';
  if ('url' === sourceType && '' !== url) {
    urlString = " url(".concat(url, ")");
  } else if ('media' === sourceType && mediaAttachment.url) {
    urlString = " url(".concat(mediaAttachment.url, ")");
  } else if ('svg' === sourceType && '' !== svg) {
    var _svg = svg.replaceAll('\n', '').replaceAll('\t', '').replaceAll('"#', '"%23');
    urlString = " url('data:image/svg+xml;utf8,".concat(_svg, "')");
  }
  if (!urlString) {
    return '';
  }
  parts.push(urlString);
  if (repeat) {
    parts.push(repeat);
  }
  if (position) {
    var positionSize = position;
    if (size) {
      positionSize += ' / ' + size;
    }
    parts.push(positionSize);
  }
  return parts.map(function (part) {
    return part.trim();
  }).join(' ');
};
var Image = function Image(_ref2) {
  var _getCSS;
  var state = _ref2.state,
    setState = _ref2.setState;
  var _defaultState$state2 = _objectSpread(_objectSpread({}, defaultState), state),
    sourceType = _defaultState$state2.sourceType,
    mediaAttachment = _defaultState$state2.mediaAttachment,
    svg = _defaultState$state2.svg,
    url = _defaultState$state2.url,
    repeat = _defaultState$state2.repeat,
    position = _defaultState$state2.position,
    size = _defaultState$state2.size,
    clip = _defaultState$state2.clip,
    attachment = _defaultState$state2.attachment;
  var setSourceType = function setSourceType(value) {
    return setState(_objectSpread(_objectSpread({}, state), {}, {
      sourceType: value
    }));
  };
  var backgroundString = (_getCSS = getCSS({
    state: state
  })) !== null && _getCSS !== void 0 ? _getCSS : '';
  var CustomPickerButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    return /*#__PURE__*/React.createElement(_series__WEBPACK_IMPORTED_MODULE_4__.TitleCard, _extends({
      ref: ref,
      as: "button",
      style: {
        paddingLeft: 20
      },
      title: 'Photo',
      thumbProps: {
        style: {
          background: backgroundString
        }
      }
    }, props));
  });
  var types = {
    media: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Media Library', 'fl-builder'),
    url: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('URL', 'fl-builder'),
    svg: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('SVG', 'fl-builder')
  };
  return /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.DialogButton, {
    button: CustomPickerButton,
    dialogProps: {
      className: 'fl-controls-photo-picker-dialog'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
      gap: 16,
      width: 300,
      height: 600,
      padding: 16,
      placeContent: 'start stretch',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.Color.Swatch, {
    style: {
      '--size': 'auto',
      aspectRatio: '3/2',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: backgroundString
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fl-controls-button-group",
    style: {
      gridColumn: '1/-1'
    }
  }, forEach(types, function (value, label) {
    return /*#__PURE__*/React.createElement("button", {
      key: value,
      className: value === sourceType ? 'is-selected' : '',
      onClick: function onClick() {
        return setSourceType(value);
      }
    }, label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'grid'
    }
  }, 'media' === sourceType && /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.Media.PickerButton, {
    attachmentId: mediaAttachment.id,
    url: mediaAttachment.url,
    onSelect: function onSelect(meta) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        mediaAttachment: {
          id: meta.id,
          url: meta.url
        }
      }));
    },
    onSizeSelect: function onSizeSelect(size) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        mediaAttachment: _objectSpread(_objectSpread({}, state.mediaAttachment), {}, {
          url: size.url
        })
      }));
    },
    onRemove: function onRemove() {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        mediaAttachment: _objectSpread({}, defaultState.mediaAttachment)
      }));
    },
    style: {
      height: 50
    }
  }), 'url' === sourceType && /*#__PURE__*/React.createElement("textarea", {
    value: url,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        url: e.target.value
      }));
    },
    rows: 7,
    style: {
      resize: 'vertical'
    }
  }), 'svg' === sourceType && /*#__PURE__*/React.createElement("textarea", {
    value: svg,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        svg: e.target.value
      }));
    },
    rows: 10,
    style: {
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fl-controls-grid-table",
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat', 'fl-builder')), /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.Select, {
    value: repeat,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        repeat: e.target.value
      }));
    },
    options: {
      'no-repeat': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Repeat', 'fl-builder'),
      'repeat': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat', 'fl-builder'),
      'repeat-x': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat Horizonal', 'fl-builder'),
      'repeat-y': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat Vertical', 'fl-builder'),
      'space': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Space', 'fl-builder'),
      'round': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Round', 'fl-builder')
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position', 'fl-builder')), /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.Select, {
    value: position,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        position: e.target.value
      }));
    },
    options: {
      'left top': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Left', 'fl-builder'),
      'center top': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Center', 'fl-builder'),
      'right top': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Right', 'fl-builder'),
      'left center': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center Left', 'fl-builder'),
      'center': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center', 'fl-builder'),
      'right center': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center Right', 'fl-builder'),
      'left bottom': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Left', 'fl-builder'),
      'center bottom': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Center', 'fl-builder'),
      'right bottom': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Right', 'fl-builder')
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Size', 'fl-builder')), /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.Select, {
    value: size,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        size: e.target.value
      }));
    },
    options: {
      '': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Default Size', 'fl-builder'),
      cover: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cover', 'fl-builder'),
      contain: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Contain', 'fl-builder')
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clip To', 'fl-builder')), /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_3__.Select, {
    value: clip,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        clip: e.target.value
      }));
    },
    options: {
      'border-box': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border', 'fl-builder'),
      'padding-box': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding', 'fl-builder'),
      'content-box': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content', 'fl-builder')
    }
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_objectSpread(_objectSpread({}, _default__WEBPACK_IMPORTED_MODULE_2__["default"]), {}, {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Photo', 'fl-builder'),
  content: Image,
  getCSS: getCSS,
  createItem: function createItem(item) {
    return _objectSpread(_objectSpread({}, item), {}, {
      state: _objectSpread(_objectSpread({}, defaultState), item.state)
    });
  }
}));

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/index.js":
/*!*************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/libraries/fl-controls/components/background/series-definitions/color.js");
/* harmony import */ var _gradient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gradient */ "./src/libraries/fl-controls/components/background/series-definitions/gradient/index.js");
/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image */ "./src/libraries/fl-controls/components/background/series-definitions/image/index.js");
/* harmony import */ var _pattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pattern */ "./src/libraries/fl-controls/components/background/series-definitions/pattern/index.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  color: _color__WEBPACK_IMPORTED_MODULE_0__["default"],
  gradient: _gradient__WEBPACK_IMPORTED_MODULE_1__["default"],
  image: _image__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/pattern/builtin-patterns.js":
/*!********************************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/pattern/builtin-patterns.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dotsOne: () => (/* binding */ dotsOne),
/* harmony export */   rings: () => (/* binding */ rings),
/* harmony export */   stripes: () => (/* binding */ stripes),
/* harmony export */   sunburst: () => (/* binding */ sunburst),
/* harmony export */   triangles: () => (/* binding */ triangles)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../input */ "./src/libraries/fl-controls/components/input/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["label", "children", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }



var LabelWrap = function LabelWrap(_ref) {
  var label = _ref.label,
    children = _ref.children,
    style = _ref.style,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    style: _objectSpread({
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      placeContent: 'center',
      alignItems: 'center'
    }, style)
  }, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    style: {
      margin: 0
    }
  }, label), children);
};
var rings = {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rings', 'fl-builder'),
  defaultState: {
    bgColor: '#000',
    spacing: 5
  },
  controls: function controls(_ref2) {
    var state = _ref2.state,
      setStateProp = _ref2.setStateProp;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "color",
      value: state.bgColor,
      onChange: function onChange(value) {
        return setStateProp('bgColor', value);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Spacing', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.spacing,
      onChange: function onChange(e) {
        return setStateProp('spacing', e.target.value);
      }
    })));
  },
  getCSS: function getCSS(_ref3) {
    var _ref3$bgColor = _ref3.bgColor,
      bgColor = _ref3$bgColor === void 0 ? '#000' : _ref3$bgColor,
      _ref3$spacing = _ref3.spacing,
      spacing = _ref3$spacing === void 0 ? 5 : _ref3$spacing;
    var lines = spacing + 'px';
    return "repeating-radial-gradient(circle at center,\n\t\t\t".concat(bgColor, ",\n\t\t\t").concat(lines, ",\n\t\t\t").concat(bgColor, ",\n\t\t\t0,\n\t\t\t#0000,\n\t\t\tcalc( ").concat(lines, " * 2),\n\t\t\t#0000 0\n\t\t)");
  }
};
var stripes = {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Stripes', 'fl-builder'),
  defaultState: {
    color: 'transparent',
    bgColor: 'black',
    weight: 10,
    angle: 45
  },
  controls: function controls(_ref4) {
    var state = _ref4.state,
      setStateProp = _ref4.setStateProp;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Foreground', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "color",
      value: state.color,
      onChange: function onChange(value) {
        return setStateProp('color', value);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "color",
      value: state.bgColor,
      onChange: function onChange(value) {
        return setStateProp('bgColor', value);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Weight', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.weight,
      onChange: function onChange(e) {
        return setStateProp('weight', e.target.value);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Angle', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.angle,
      onChange: function onChange(e) {
        return setStateProp('angle', e.target.value);
      },
      min: 0,
      max: 360,
      step: 1
    })));
  },
  getCSS: function getCSS(_ref5) {
    var color = _ref5.color,
      bgColor = _ref5.bgColor,
      weight = _ref5.weight,
      angle = _ref5.angle;
    var between = weight * 5 + 'px';
    return "repeating-linear-gradient(".concat(angle, "deg, ").concat(color, ", ").concat(color, " ").concat(weight, "px, ").concat(bgColor, " ").concat(weight, "px, ").concat(bgColor, " ").concat(between, ")");
  }
};
var sunburst = {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sunburst', 'fl-builder'),
  defaultState: {
    color: '#000',
    density: 5
  },
  controls: function controls(_ref6) {
    var state = _ref6.state,
      setStateProp = _ref6.setStateProp;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "color",
      value: state.color,
      onChange: function onChange(value) {
        return setStateProp('color', value);
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Density', 'fl-builder'),
      style: {
        gridTemplateColumns: '1fr 1fr'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.density,
      onChange: function onChange(e) {
        return setStateProp('density', e.target.value);
      },
      min: 0,
      max: 10,
      step: .5
    }))));
  },
  getCSS: function getCSS(_ref7) {
    var density = _ref7.density,
      color = _ref7.color;
    return "repeating-conic-gradient(".concat(color, " 0 ").concat(density, "%,transparent 0 10%)");
  }
};
var dotsOne = {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dots', 'fl-builder'),
  defaultState: {
    color: '#000',
    size: 15,
    spacing: 60
  },
  controls: function controls(_ref8) {
    var state = _ref8.state,
      setStateProp = _ref8.setStateProp;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "color",
      value: state.color,
      onChange: function onChange(value) {
        return setStateProp('color', value);
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Size', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.size,
      onChange: function onChange(e) {
        return setStateProp('size', e.target.value);
      },
      min: 0,
      max: 50,
      step: 1
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Spacing', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.spacing,
      onChange: function onChange(e) {
        return setStateProp('spacing', e.target.value);
      },
      min: 0,
      max: 200,
      step: 1
    }))));
  },
  getCSS: function getCSS(_ref9) {
    var color = _ref9.color,
      size = _ref9.size,
      spacing = _ref9.spacing;
    return "radial-gradient(".concat(color, " ").concat(size, "%, transparent ").concat(size, "%) 0 0 / ").concat(spacing, "px ").concat(spacing, "px,\n\t\t\t\tradial-gradient(").concat(color, " ").concat(size, "%, transparent ").concat(size, "%) ").concat(spacing / 2, "px ").concat(spacing / 2, "px / ").concat(spacing, "px ").concat(spacing, "px");
  }
};
var triangles = {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Triangles', 'fl-builder'),
  defaultState: {
    angle: 115,
    size: 30,
    color: 'black'
  },
  controls: function controls(_ref10) {
    var state = _ref10.state,
      setStateProp = _ref10.setStateProp;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "color",
      value: state.color,
      onChange: function onChange(value) {
        return setStateProp('color', value);
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Size', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.size,
      onChange: function onChange(e) {
        return setStateProp('size', e.target.value);
      },
      min: 0,
      max: 200,
      step: 1
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LabelWrap, {
      label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Angle', 'fl-builder')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "range",
      value: state.angle,
      onChange: function onChange(e) {
        return setStateProp('angle', e.target.value);
      },
      min: 0,
      max: 360,
      step: 1
    }))));
  },
  getCSS: function getCSS(_ref11) {
    var color = _ref11.color,
      size = _ref11.size;
    var bgSize = "".concat(size / 2, "px ").concat(size, "px");
    return "linear-gradient(115deg, transparent 75%, ".concat(color, " 75%) 0 0 / ").concat(bgSize, ",\n\t\t\t\t\t linear-gradient(245deg, transparent 75%, ").concat(color, " 75%) 0 0 / ").concat(bgSize, ",\n\t\t\t\t\t linear-gradient(115deg, transparent 75%, ").concat(color, " 75%) ").concat(size / 4, "px -").concat(size / 2, "px / ").concat(bgSize, ",\n\t\t\t\t\t linear-gradient(245deg, transparent 75%, ").concat(color, " 75%) ").concat(size / 4, "px -").concat(size / 2, "px / ").concat(bgSize);
  }
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/series-definitions/pattern/index.js":
/*!*********************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/series-definitions/pattern/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../default */ "./src/libraries/fl-controls/components/background/series-definitions/default.js");
/* harmony import */ var _builtin_patterns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./builtin-patterns */ "./src/libraries/fl-controls/components/background/series-definitions/pattern/builtin-patterns.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var forEach = FL.Builder.utils.objects.forEach;
var defaultPattern = {
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unnamed Pattern', 'fl-builder'),
  defaultState: {},
  controls: function controls() {
    return null;
  },
  getCSS: function getCSS() {
    return '';
  }
};
var firstPatternKey = Object.keys(_builtin_patterns__WEBPACK_IMPORTED_MODULE_4__)[0];
var getPattern = function getPattern() {
  var _patterns$name;
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : firstPatternKey;
  return (_patterns$name = _builtin_patterns__WEBPACK_IMPORTED_MODULE_4__[name]) !== null && _patterns$name !== void 0 ? _patterns$name : defaultPattern;
};
var Pattern = function Pattern(_ref) {
  var _state$pattern;
  var _ref$state = _ref.state,
    _state = _ref$state === void 0 ? {} : _ref$state,
    setState = _ref.setState;
  var pattern = (_state$pattern = _state === null || _state === void 0 ? void 0 : _state.pattern) !== null && _state$pattern !== void 0 ? _state$pattern : firstPatternKey;
  var _getPattern = getPattern(pattern),
    PatternControls = _getPattern.controls,
    defaultState = _getPattern.defaultState;
  var state = _objectSpread(_objectSpread(_objectSpread({}, defaultState), _state), {}, {
    pattern: pattern
  });
  var setStateProp = function setStateProp(name, value) {
    return setState(_objectSpread(_objectSpread({}, state), {}, _defineProperty({}, name, value)));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      padding: '16px',
      gap: 8,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: pattern,
    onChange: function onChange(e) {
      return setStateProp('pattern', e.target.value);
    }
  }, forEach(_builtin_patterns__WEBPACK_IMPORTED_MODULE_4__, function (key, _ref2) {
    var label = _ref2.label;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      key: key,
      value: key
    }, label);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      overflow: 'auto',
      scrollSnapType: 'x manditory'
    }
  }, forEach(_builtin_patterns__WEBPACK_IMPORTED_MODULE_4__, function (key, _ref3) {
    var label = _ref3.label,
      getCSS = _ref3.getCSS,
      defaultState = _ref3.defaultState;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: key,
      onClick: function onClick() {
        return setStateProp('pattern', key);
      },
      style: {
        flex: '0 0 160px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        aspectRatio: '3/2',
        background: getCSS(_objectSpread({}, defaultState)),
        boxShadow: key === pattern && 'inset 0 0 0 2px var(--fl-builder-accent-color)'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
      style: {
        margin: 0
      }
    }, label));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PatternControls, {
    state: state,
    setState: setState,
    setStateProp: setStateProp
  }));
};
var label = (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pattern', 'fl-builder');
var image = _objectSpread(_objectSpread({}, _default__WEBPACK_IMPORTED_MODULE_3__["default"]), {}, {
  label: label,
  /*
  getTitle: ( { state } ) => {
  	if ( undefined !== patterns[ state.pattern ] ) {
  		return sprintf( '%s Pattern', patterns[ state.pattern ].label )
  	}
  	return label
  },*/

  getCSS: function getCSS(_ref4) {
    var state = _ref4.state;
    var _getPattern2 = getPattern(state === null || state === void 0 ? void 0 : state.pattern),
      _getPattern2$getCSS = _getPattern2.getCSS,
      getCSS = _getPattern2$getCSS === void 0 ? function () {
        return '';
      } : _getPattern2$getCSS,
      _getPattern2$defaultS = _getPattern2.defaultState,
      defaultState = _getPattern2$defaultS === void 0 ? {} : _getPattern2$defaultS;
    return getCSS(_objectSpread(_objectSpread({}, defaultState), state));
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (image);

/***/ }),

/***/ "./src/libraries/fl-controls/components/background/utils.js":
/*!******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/background/utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLayerString: () => (/* binding */ _createLayerString),
/* harmony export */   getCSSForLayers: () => (/* binding */ getCSSForLayers),
/* harmony export */   isShortcodeBackground: () => (/* binding */ isShortcodeBackground),
/* harmony export */   isValidBackground: () => (/* binding */ isValidBackground)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Background layers in css
 *
 * A layer can consist of some or all of these. Layers are separated by commas.
 * <attachment> <bg-image>
 */
var getCSSForLayers = function getCSSForLayers() {
  var layers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defs = arguments.length > 1 ? arguments[1] : undefined;
  if (!layers || 'string' === typeof layers || 0 >= layers.length) {
    return '';
  }

  // Top to bottom
  var strings = layers.map(function (layer) {
    if (!layer || undefined === defs[layer.type]) {
      return null;
    }
    var string = defs[layer.type].getCSS(layer);
    if (isShortcodeBackground(string)) {
      var _FLBuilder$preview;
      (_FLBuilder$preview = FLBuilder.preview) === null || _FLBuilder$preview === void 0 || _FLBuilder$preview.delayPreview();
      return string.trim();
    }
    return isValidBackground(string) ? string.trim() : null;
  });
  return strings.filter(function (str) {
    return null !== str;
  }).join(', ');
};

/**
 * Convert data to background strings
 *
 * @param Object || Array<Object> || String
 * @return string
 */
var _createLayerString = function createLayerString(obj) {
  var parts = [];
  var layer = _objectSpread({
    image: '',
    attachment: '',
    position: '',
    size: ''
  }, obj);

  // Allow single layer to return multiple layer objects as array
  if (Array.isArray(obj)) {
    return obj.map(_createLayerString).join(', \n\t');

    // allow pre-rendered css background strings
  } else if ('string' === typeof obj) {
    return obj;

    // Convert object to string parts
  } else {
    var attachments = ['fixed', 'scroll', 'local'];
    if (attachments.includes(layer.attachment)) {
      parts.push(layer.attachment);
    }
    if ('' !== layer.image) {
      parts.push(layer.image);
    }
    if ('' !== layer.position && '' === layer.size) {
      parts.push(layer.position);
    }

    /*
    if ( '' !== layer.size ) {
    	parts.push( layer.size )
    }*/
  }
  var repeatValues = ['repeat', 'no-repeat', 'space', 'round', 'repeat-x', 'repeat-y'];
  if ('' !== layer.repeat && repeatValues.includes(layer.repeat)) {
    parts.push(layer.repeat);
  }
  return parts.join(' ');
};

var isValidBackground = function isValidBackground(value) {
  return CSS.supports('background', value);
};
var isShortcodeBackground = function isShortcodeBackground(string) {
  return /\[([^\]]+)\]/.test(string);
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/data-provider/context.js":
/*!*****************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/data-provider/context.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorPickerContext: () => (/* binding */ ColorPickerContext),
/* harmony export */   useColor: () => (/* binding */ useColor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ColorPickerContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
var useColor = function useColor() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ColorPickerContext);
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/data-provider/index.js":
/*!***************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/data-provider/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorProvider: () => (/* reexport safe */ _provider__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   useColor: () => (/* reexport safe */ _context__WEBPACK_IMPORTED_MODULE_0__.useColor)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/libraries/fl-controls/components/color/data-provider/context.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider */ "./src/libraries/fl-controls/components/color/data-provider/provider.js");




/***/ }),

/***/ "./src/libraries/fl-controls/components/color/data-provider/provider.js":
/*!******************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/data-provider/provider.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./src/libraries/fl-controls/components/color/data-provider/context.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var ColorPickerProvider = function ColorPickerProvider(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    children = _ref.children;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    rawValue = _useState2[0],
    setRawValue = _useState2[1];
  var isValid = CSS.supports('color', value);
  var api = {
    isValid: isValid,
    rawValue: rawValue,
    setValue: function setValue(v) {
      setRawValue(v);
      onChange(v);
    }
  };

  // Sync with external prop.value changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    rawValue !== value && setRawValue(value);
  }, [value]);
  return /*#__PURE__*/React.createElement(_context__WEBPACK_IMPORTED_MODULE_1__.ColorPickerContext.Provider, {
    value: api
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerProvider);

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/index.js":
/*!*************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Picker: () => (/* binding */ Picker),
/* harmony export */   Provider: () => (/* binding */ Provider),
/* harmony export */   Swatch: () => (/* reexport safe */ _ui_swatch__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   getComputedValue: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getComputedValue),
/* harmony export */   getMetadata: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_6__.getMetadata),
/* harmony export */   use: () => (/* binding */ use)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dialog */ "./src/libraries/fl-controls/components/dialog/index.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/libraries/fl-controls/components/color/ui/index.js");
/* harmony import */ var _ui_swatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/swatch */ "./src/libraries/fl-controls/components/color/ui/swatch.js");
/* harmony import */ var _data_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data-provider */ "./src/libraries/fl-controls/components/color/data-provider/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/libraries/fl-controls/components/color/utils/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/color/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["showReset", "style"],
  _excluded2 = ["value", "onChange"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }










// Allows other scripts to do Color.use()
var use = _data_provider__WEBPACK_IMPORTED_MODULE_5__.useColor;

// <Color.Provider />
var Provider = _data_provider__WEBPACK_IMPORTED_MODULE_5__.ColorProvider;
var SwatchButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref, ref) {
  var _ref$showReset = _ref.showReset,
    showReset = _ref$showReset === void 0 ? true : _ref$showReset,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useColor = (0,_data_provider__WEBPACK_IMPORTED_MODULE_5__.useColor)(),
    rawValue = _useColor.rawValue,
    setValue = _useColor.setValue;
  var hasValue = '' !== rawValue;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    className: "fl-controls-color-input",
    ref: ref,
    style: _objectSpread({
      '--radius': 'var(--fl-controls-radius)',
      '--size': '36px',
      display: 'flex',
      height: 'var(--size)'
    }, style)
  }, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_swatch__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: rawValue,
    as: "button",
    style: {
      '--radius': 'inherit',
      flexGrow: 1,
      width: 'auto',
      height: 'auto',
      borderTopRightRadius: hasValue && showReset ? 0 : null,
      borderBottomRightRadius: hasValue && showReset ? 0 : null
    }
  }), true === showReset && hasValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick(e) {
      setValue('');
      e.stopPropagation();
    },
    style: {
      padding: 0,
      width: 24,
      display: 'grid',
      placeContent: 'center',
      border: '1px solid var(--fl-controls-outline-color)',
      borderLeft: 'none',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 'var(--radius)',
      borderBottomRightRadius: 'var(--radius)',
      backgroundColor: 'var(--fl-controls-platter-bg-color)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_1__.Close, null)));
});
var ColorDialogButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref2, ref) {
  var _ref2$buttonComponent = _ref2.buttonComponent,
    Component = _ref2$buttonComponent === void 0 ? SwatchButton : _ref2$buttonComponent,
    _ref2$showReset = _ref2.showReset,
    showReset = _ref2$showReset === void 0 ? true : _ref2$showReset,
    filterTabs = _ref2.filterTabs,
    defaultTab = _ref2.defaultTab,
    onConnect = _ref2.onConnect,
    _ref2$buttonProps = _ref2.buttonProps,
    buttonProps = _ref2$buttonProps === void 0 ? {} : _ref2$buttonProps;
  var _useColor2 = (0,_data_provider__WEBPACK_IMPORTED_MODULE_5__.useColor)(),
    rawValue = _useColor2.rawValue;
  var sourceColor = '' !== rawValue ? rawValue : 'grey';
  var accentColor = "color-mix( in srgb, grey 30%, color-mix( in srgb-linear, black 40%, ".concat(sourceColor, " ) )");
  var platterFgColor = "color-mix( in srgb, grey 50%, color-mix( in srgb-linear, black 82%, ".concat(sourceColor, " ) )");
  var platterBgColor = "color-mix( in srgb-linear, var(--fl-controls-platter-bg-color) 70%, ".concat(sourceColor, " )");
  var platterFocusBgColor = "color-mix( in srgb-linear, var(--fl-controls-platter-bg-color) 70%, ".concat(sourceColor, " )");
  var outlineColor = "color-mix( in srgb, var(--fl-controls-outline-color) 88%, ".concat(sourceColor, " )");
  var isColor = function isColor(v) {
    return CSS.supports('color', v);
  };
  var colorStyleVars = {
    '--accent-color': isColor(accentColor) ? accentColor : null,
    '--platter-bg-color': isColor(platterBgColor) ? platterBgColor : null,
    '--platter-fg-color': isColor(platterFgColor) ? platterFgColor : null,
    '--platter-focus-bg-color': isColor(platterFocusBgColor) ? platterFocusBgColor : null,
    '--outline-color': isColor(outlineColor) ? outlineColor : null
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogButton, {
    button: Component,
    buttonProps: _objectSpread(_objectSpread({}, buttonProps), {}, {
      showReset: showReset
    }),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: _objectSpread(_objectSpread({}, colorStyleVars), {}, {
      '--bar-size': '44px',
      '--panel-size': '300px',
      width: 'var(--panel-size)',
      background: 'var(--bg-color)',
      display: 'grid',
      gridTemplateRows: 'var(--bar-size) minmax( 0, calc( var(--panel-size) + var(--bar-size) ) ) var(--bar-size)',
      borderRadius: 'var(--radius)'
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_3__["default"], {
    filterTabs: filterTabs,
    defaultTab: defaultTab,
    onConnect: onConnect
  })));
});

/**
 * Color Picker Button Component
 */
var Picker = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref3, ref) {
  var value = _ref3.value,
    _ref3$onChange = _ref3.onChange,
    onChange = _ref3$onChange === void 0 ? function () {} : _ref3$onChange,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_data_provider__WEBPACK_IMPORTED_MODULE_5__.ColorProvider, {
    value: value,
    onChange: onChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ColorDialogButton, _extends({
    ref: ref
  }, rest)));
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/style.scss":
/*!***************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/style.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/color-area.js":
/*!*********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/color-area.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ "./src/libraries/fl-controls/utils/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["style", "value", "onChange", "thumbStyle", "onPointerDown", "onPointerUp"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


var ColorArea = function ColorArea(_ref) {
  var style = _ref.style,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [0, 0] : _ref$value,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$thumbStyle = _ref.thumbStyle,
    thumbStyle = _ref$thumbStyle === void 0 ? {} : _ref$thumbStyle,
    _ref$onPointerDown = _ref.onPointerDown,
    onPointerDown = _ref$onPointerDown === void 0 ? function () {} : _ref$onPointerDown,
    _ref$onPointerUp = _ref.onPointerUp,
    onPointerUp = _ref$onPointerUp === void 0 ? function () {} : _ref$onPointerUp,
    rest = _objectWithoutProperties(_ref, _excluded);
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var thumb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var rAF = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDown = _useState2[0],
    setIsDown = _useState2[1];
  var calculateValues = function calculateValues(e) {
    if (rAF.current) {
      cancelAnimationFrame(rAF.current);
    }

    // Only perform the calc once per frame
    rAF.current = requestAnimationFrame(function () {
      // Pointer position relative to document
      var pageX = 'number' === typeof e.pageX ? e.pageX : e.touches[0].pageX;
      var pageY = 'number' === typeof e.pageY ? e.pageY : e.touches[0].pageY;

      // Element position (relative to viewport)
      var bounds = ref.current.getBoundingClientRect();

      // Factor in page offset in case of scroll
      var x = pageX - (bounds.left + window.top.pageXOffset);
      var y = pageY - (bounds.top + window.top.pageYOffset);

      // Get percentage x/y within container bounds
      var xPercent = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mapNumRange)((0,_utils__WEBPACK_IMPORTED_MODULE_1__.clamp)(x, 0, bounds.width), 0, bounds.width, 0, 100);
      var yPercent = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mapNumRange)((0,_utils__WEBPACK_IMPORTED_MODULE_1__.clamp)(y, 0, bounds.height), 0, bounds.height, 0, 100);
      var coords = [Math.round(xPercent), Math.round(yPercent)];
      if (coords[0] !== value[0] || coords[1] !== value[1]) {
        onChange(coords, {
          container: ref.current,
          rect: bounds,
          page: [pageX, pageY],
          xy: [pageX - bounds.left, pageY - bounds.top],
          percent: coords
        });
      }
    });
  };
  var onDown = function onDown(e) {
    onPointerDown();
    e.preventDefault();
    setIsDown(true);
    calculateValues(e);
  };
  var onUp = function onUp() {
    onPointerUp();
    setIsDown(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var onMove = function onMove(e) {
      return isDown && calculateValues(e);
    };
    var win = window.top;
    win.addEventListener('pointermove', onMove);
    win.addEventListener('pointerup', onUp);
    return function () {
      win.removeEventListener('pointermove', onMove);
      win.removeEventListener('pointerup', onUp);
    };
  }, [isDown]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onPointerDown: onDown,
    style: _objectSpread({
      boxSizing: 'border-box',
      aspectRatio: '3/2',
      background: 'grey',
      position: 'relative'
    }, style)
  }, rest), /*#__PURE__*/React.createElement("button", {
    ref: thumb,
    className: "fl-control fl-controls-drag-thumb",
    onPointerDown: onDown,
    style: _objectSpread(_objectSpread({
      boxSizing: 'border-box'
    }, thumbStyle), {}, {
      left: "".concat(value[0], "%"),
      top: "".concat(value[1], "%")
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorArea);

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/eyedropper.js":
/*!*********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/eyedropper.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "onChange"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




/**
 * Not all browsers support the EyeDropper API
 * Also a site must be served via SSL/HTTPS for eyedropper functionality
 * See https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API
 */
var EyeDropperButton = function EyeDropperButton(_ref) {
  var className = _ref.className,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isActive = _useState2[0],
    setIsActive = _useState2[1];
  if (undefined === window.EyeDropper) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('fl-controls-color-eyedropper', className),
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var eyeDropper, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            eyeDropper = new EyeDropper();
            _context.next = 3;
            return eyeDropper.open();
          case 3:
            result = _context.sent;
            if (result.sRGBHex) {
              onChange(result.sRGBHex);
            }
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))
  }, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_2__.Crosshair, null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EyeDropperButton);

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/index.js":
/*!****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../state */ "./src/libraries/fl-controls/state/index.js");
/* harmony import */ var _eyedropper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eyedropper */ "./src/libraries/fl-controls/components/color/ui/eyedropper.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./swatch */ "./src/libraries/fl-controls/components/color/ui/swatch.js");
/* harmony import */ var _tab_srgb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tab-srgb */ "./src/libraries/fl-controls/components/color/ui/tab-srgb.js");
/* harmony import */ var _tab_mix__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tab-mix */ "./src/libraries/fl-controls/components/color/ui/tab-mix.js");
/* harmony import */ var _tab_presets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tab-presets */ "./src/libraries/fl-controls/components/color/ui/tab-presets.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/color/ui/style.scss");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }











var availableTabs = {
  srgb: _tab_srgb__WEBPACK_IMPORTED_MODULE_7__["default"],
  mix: _tab_mix__WEBPACK_IMPORTED_MODULE_8__["default"],
  presets: _tab_presets__WEBPACK_IMPORTED_MODULE_9__["default"]
};
var Picker = function Picker(_ref) {
  var _ref$filterTabs = _ref.filterTabs,
    filterTabs = _ref$filterTabs === void 0 ? function () {
      return true;
    } : _ref$filterTabs,
    _ref$defaultTab = _ref.defaultTab,
    defaultTab = _ref$defaultTab === void 0 ? 'srgb' : _ref$defaultTab,
    _ref$placeholderText = _ref.placeholderText,
    placeholderText = _ref$placeholderText === void 0 ? '#123123...' : _ref$placeholderText,
    onConnect = _ref.onConnect;
  var _Color$use = ___WEBPACK_IMPORTED_MODULE_5__.Color.use(),
    _Color$use$rawValue = _Color$use.rawValue,
    rawValue = _Color$use$rawValue === void 0 ? '' : _Color$use$rawValue,
    setValue = _Color$use.setValue;

  // Process tabs
  var tabs = {};
  var tabKeys = Object.keys(availableTabs).filter(filterTabs);
  for (var key in availableTabs) {
    if (tabKeys.includes(key)) {
      tabs[key] = availableTabs[key];
    }
  }
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultTab),
    _useState2 = _slicedToArray(_useState, 2),
    visibleTab = _useState2[0],
    setVisibleTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isPresetSaved = _useState4[0],
    setIsPresetSaved = _useState4[1];
  var TabContent = tabs[visibleTab].content;
  var _useControlsStore = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useControlsStore)(),
    addColorPreset = _useControlsStore.addColorPreset;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-color-picker-toolbar",
    style: {
      gridArea: '1/1/span 1/-1',
      display: 'flex',
      borderTopRightRadius: 'var(--radius)',
      borderTopLeftRadius: 'var(--radius)',
      paddingLeft: undefined === window.EyeDropper ? 8 : null
    }
  }, window.EyeDropper && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      height: 'var(--bar-size)',
      aspectRatio: '1/1',
      display: 'grid',
      placeContent: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_eyedropper__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onChange: function onChange(v) {
      setValue(v);
      setVisibleTab(defaultTab);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "picker-input-wrap"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_swatch__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: rawValue,
    style: {
      borderRadius: '50%'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    autoFocus: true,
    type: "text",
    value: rawValue,
    onInput: function onInput(e) {
      return setValue(e.target.value);
    },
    placeholder: placeholderText,
    title: rawValue
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      flex: '1 0 auto',
      height: 'var(--bar-size)',
      minWidth: 'var(--bar-size)',
      display: 'grid',
      placeContent: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "fl-control",
    disabled: '' === rawValue,
    onClick: function onClick() {
      if ('' !== rawValue) {
        addColorPreset(rawValue);
        if (document.startViewTransition) {
          document.startViewTransition(function () {
            setIsPresetSaved(true);
            setTimeout(function () {
              document.startViewTransition(function () {
                return setIsPresetSaved(false);
              });
            }, 1000);
          });
        } else {
          setIsPresetSaved(true);
          setTimeout(function () {
            return setIsPresetSaved(false);
          }, 2000);
        }
      }
    },
    style: {
      boxSizing: 'border-box',
      aspectRatio: 1,
      display: 'grid',
      gridAutoFlow: 'column',
      placeContent: 'center',
      placeItems: 'center',
      gap: 4,
      padding: '0px 6px',
      viewTransitionName: 'fl-controls-color-picker-saved-preset-button'
    }
  }, !isPresetSaved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M15.6569 9.99999H4.34315",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M10 4.34314V15.6568",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), isPresetSaved && (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saved', 'fl-builder')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      gridArea: '2 / 1 / span 1 / -1',
      display: 'grid'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TabContent, {
    onConnect: onConnect
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-controls-picker-bottom-tabs",
    style: {
      gridArea: 'span 1 / 1 / -1 / -1',
      display: 'flex',
      justifyContent: 'center',
      background: 'var(--platter-bg-color)',
      borderBottomLeftRadius: 'var(--radius)',
      borderBottomRightRadius: 'var(--radius)',
      overflow: 'hidden'
    }
  }, Object.entries(tabs).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      label = _ref3[1].label;
    var isActiveTab = key === visibleTab;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      key: key,
      onClick: function onClick() {
        return setVisibleTab(key);
      },
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('fl-control', {
        'is-selected': isActiveTab
      }),
      style: {
        color: isActiveTab ? null : 'var(--fl-builder-platter-color)',
        background: isActiveTab ? 'var(--bg-color)' : 'var(--fl-builder-platter-bg-color)'
      }
    }, label);
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Picker);

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/style.scss":
/*!******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/style.scss ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/swatch.js":
/*!*****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/swatch.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SwatchGroup: () => (/* binding */ SwatchGroup),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/display */ "./src/libraries/fl-controls/components/color/utils/display.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["as", "value", "className", "style", "onClick", "children"],
  _excluded2 = ["as", "title", "className", "children", "appearance", "accessories"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }



var Swatch = function Swatch(_ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'div' : _ref$as,
    value = _ref.value,
    className = _ref.className,
    style = _ref.style,
    onClick = _ref.onClick,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  var Tag = 'function' === typeof onClick ? 'button' : as;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Tag, _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('fl-control', 'fl-controls-color-swatch', className),
    style: _objectSpread({
      '--color': CSS.supports('color', value) ? (0,_utils_display__WEBPACK_IMPORTED_MODULE_2__.getColorDisplayValue)(value) : null
    }, style),
    onClick: onClick
  }, rest), children);
};
var SwatchGroup = function SwatchGroup(_ref2) {
  var _ref2$as = _ref2.as,
    Tag = _ref2$as === void 0 ? 'div' : _ref2$as,
    title = _ref2.title,
    className = _ref2.className,
    children = _ref2.children,
    _ref2$appearance = _ref2.appearance,
    appearance = _ref2$appearance === void 0 ? 'swatches' : _ref2$appearance,
    accessories = _ref2.accessories,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Tag, _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_defineProperty({
      'fl-controls-swatch-group': true
    }, "fl-appearance-".concat(appearance), appearance), className)
  }, rest), title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-controls-swatch-group-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, title), accessories), children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Swatch);

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/tab-mix.js":
/*!******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/tab-mix.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ */ "./src/libraries/fl-controls/components/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var forEach = FL.Builder.utils.objects.forEach;
var Mix = function Mix() {
  var _Color$use = ___WEBPACK_IMPORTED_MODULE_3__.Color.use(),
    setValue = _Color$use.setValue;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('rgb(0, 255, 251)'),
    _useState2 = _slicedToArray(_useState, 2),
    colorA = _useState2[0],
    setColorA = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('rgb(254, 1, 136)'),
    _useState4 = _slicedToArray(_useState3, 2),
    colorB = _useState4[0],
    setColorB = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(50),
    _useState6 = _slicedToArray(_useState5, 2),
    percentA = _useState6[0],
    setPercentA = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('lch'),
    _useState8 = _slicedToArray(_useState7, 2),
    colorSpace = _useState8[0],
    setColorSpace = _useState8[1];
  var getValue = function getValue(a, b, percent, colorSpace) {
    return "color-mix( in ".concat(colorSpace, ", ").concat(a, " ").concat(percent, "%, ").concat(b, ")");
  };
  var currentValue = getValue(colorA, colorB, percentA, colorSpace);
  var rAF = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var colorSpaces = {
    'srgb': 'sRGB',
    'srgb-linear': 'Linear sRGB',
    'oklab': 'OKLAB',
    'lch': 'LCH',
    'oklch': 'OKLCH'

    /*'display-p3': 'Display-P3',*/
  };
  var swatchCount = 10;
  var swatches = new Array(swatchCount).fill('');
  var updateValue = function updateValue(value) {
    /**
     * Sync value setting with frames to prevent setting more than once per-frame update
     */
    if (rAF.current) {
      cancelAnimationFrame(rAF.current);
    }
    rAF.current = requestAnimationFrame(function () {
      return setValue(value);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: "calc( 32px * ".concat(Object.keys(colorSpaces).length, " ) 1fr")
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: "repeat( ".concat(swatchCount - 1, ", 1fr)"),
      background: 'charcoal'
    }
  }, Object.keys(colorSpaces).map(function (colorSpace) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: colorSpace
    }, swatches.map(function (_, i) {
      // Skip zero cause its just the pure start color
      if (0 === i) {
        return null;
      }
      var percent = Math.round(i * (100 / swatchCount));
      var value = getValue(colorA, colorB, percent, colorSpace);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.Color.Swatch, {
        key: i,
        className: "mix-swatch",
        style: {
          '--color': value,
          width: 'auto',
          height: 'auto'
        },
        onClick: function onClick() {
          setValue(value);
          setPercentA(percent);
          setColorSpace(colorSpace);
        },
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('%d%% Mix in %s Color Space', percent, colorSpaces[colorSpace])
      });
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      padding: '4px 16px',
      display: 'grid',
      gridAutoRows: 'var(--fl-controls-target-size)',
      gridRow: '2 / span 4',
      gap: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      placeContent: 'center'
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mix two color values to create a new color', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, var(--fl-controls-target-size)',
      placeContent: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.Color.Picker, {
    showReset: false,
    filterTabs: function filterTabs(tab) {
      return 'mix' !== tab;
    },
    value: colorB,
    onChange: function onChange(b) {
      setColorB(b);
      setValue(getValue(colorA, b, percentA, colorSpace));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      placeContent: 'center',
      fontSize: 24,
      color: 'var(--accent-color)'
    }
  }, "+"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.Color.Picker, {
    showReset: false,
    filterTabs: function filterTabs(tab) {
      return 'mix' !== tab;
    },
    value: colorA,
    onChange: function onChange(a) {
      setColorA(a);
      setValue(getValue(a, colorB, percentA, colorSpace));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      placeContent: 'center',
      fontSize: 24,
      color: 'var(--accent-color)'
    }
  }, "="), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.Color.Swatch, {
    style: {
      '--size': 'auto',
      '--color': currentValue,
      gridColumn: 'span 2',
      borderRadius: 'var(--fl-controls-radius)'
    },
    onClick: function onClick() {
      return setValue(currentValue);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      width: '6ch'
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mix', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_3__.Slider, {
    value: percentA,
    onChange: function onChange(e) {
      var percent = Math.round(e.target.value);
      setPercentA(percent);
      updateValue(getValue(colorA, colorB, percent, colorSpace));
    },
    min: 0,
    max: 100,
    step: 0.5,
    style: {
      '--thumb-color': getValue(colorA, colorB, percentA, colorSpace),
      '--track-color': "linear-gradient( in ".concat(colorSpace, " to left, ").concat(colorA, ", ").concat(colorB, " )")
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      width: '6ch',
      textAlign: 'right'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('%s%%', percentA))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      flexShrink: 0
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color Space', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    style: {
      flexGrow: 1
    },
    value: colorSpace,
    onChange: function onChange(e) {
      var space = e.target.value;
      setColorSpace(space);
      setValue(getValue(colorA, colorB, percentA, space));
    }
  }, forEach(colorSpaces, function (value, label) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      key: value,
      value: value
    }, label);
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mix', 'fl-builder'),
  content: Mix
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/tab-presets.js":
/*!**********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/tab-presets.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../state */ "./src/libraries/fl-controls/state/index.js");
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./swatch */ "./src/libraries/fl-controls/components/color/ui/swatch.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ */ "./src/libraries/fl-controls/components/index.js");






var forEach = FL.Builder.utils.objects.forEach;
var Presets = function Presets(_ref) {
  var onConnect = _ref.onConnect;
  var hasConnectLogic = 'function' === typeof onConnect;
  var _useControlsStore = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useControlsStore)(),
    colorPresets = _useControlsStore.colorPresets,
    colorSets = _useControlsStore.colorSets,
    deleteColorPreset = _useControlsStore.deleteColorPreset;
  var _Color$use = ___WEBPACK_IMPORTED_MODULE_5__.Color.use(),
    setValue = _Color$use.setValue;
  var formatColor = function formatColor(value) {
    if (!CSS.supports('color', value) && CSS.supports('color', "#".concat(value))) {
      return "#".concat(value);
    }
    return value;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      padding: '0 16px 16px',
      overflow: 'auto',
      gap: 8,
      alignContent: 'start'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_swatch__WEBPACK_IMPORTED_MODULE_4__.SwatchGroup, {
    title: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saved Colors', 'fl-builder')
  }, 0 >= colorPresets.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Once you choose a color you can save it as a preset by clicking the + button above.', 'fl-builder')), 0 < colorPresets.length && colorPresets.map(function (value) {
    var val = formatColor(value);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: value,
      className: "removable-swatch-wrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_swatch__WEBPACK_IMPORTED_MODULE_4__["default"], {
      as: "button",
      value: val,
      onClick: function onClick() {
        return setValue(val);
      },
      title: val
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "remove-swatch-button",
      onClick: function onClick() {
        if (window.confirm((0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to delete this preset?', 'fl-builder'))) {
          deleteColorPreset(val);
        }
      },
      style: {
        '--color': value
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_2__.Close, null))));
  })), hasConnectLogic && forEach(colorSets, function (key, _ref2) {
    var name = _ref2.name,
      colors = _ref2.colors;
    if (0 >= colors.length) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_swatch__WEBPACK_IMPORTED_MODULE_4__.SwatchGroup, {
      key: key,
      title: name,
      appearance: "list"
    }, colors.map(function (_ref3) {
      var uid = _ref3.uid,
        label = _ref3.label,
        color = _ref3.color,
        isGlobalColor = _ref3.isGlobalColor;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        key: uid,
        style: {
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          placeItems: 'center start',
          padding: 0,
          background: 'none',
          border: 'none',
          textTransform: 'capitalize'
        },
        onClick: function onClick(e) {
          onConnect({
            uid: uid,
            label: label,
            color: color,
            isGlobalColor: isGlobalColor
          }, e);
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_swatch__WEBPACK_IMPORTED_MODULE_4__["default"], {
        value: color,
        title: label
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, label));
    }));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Presets', 'fl-builder'),
  content: Presets
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/ui/tab-srgb.js":
/*!*******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/ui/tab-srgb.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var colorjs_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! colorjs.io */ "./node_modules/colorjs.io/dist/color.js");
/* harmony import */ var _color_area__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color-area */ "./src/libraries/fl-controls/components/color/ui/color-area.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/libraries/fl-controls/components/color/utils/index.js");
/* harmony import */ var _swatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./swatch */ "./src/libraries/fl-controls/components/color/ui/swatch.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["style"];
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }







var numRange = function numRange(start, stop) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from({
    length: (stop - start) / step + 1
  }, function (value, index) {
    return start + index * step;
  });
};
var stringFromHSL = function stringFromHSL(h, s, l, a) {
  var hue = Math.round(h);
  var sat = Math.round(s);
  var light = Math.round(l);
  var alpha = Number.parseFloat(a).toFixed(2);
  return "hsl(".concat(hue, " ").concat(sat, "% ").concat(light, "% ").concat(1 > alpha ? '/ ' + alpha : '', ")");
};
function hsv2hsl(hsvH, hsvS, hsvV) {
  var hslL = (200 - hsvS) * hsvV / 100;
  var hslS = 0 === hslL || 200 === hslL ? 0 : hsvS * hsvV / 100 / (100 >= hslL ? hslL : 200 - hslL) * 100,
    hslV = hslL * 5 / 10;
  return [hsvH, hslS, hslV];
}
function hsl2hsv(hslH, hslS, hslL) {
  var hsv1 = hslS * (hslL < 50 ? hslL : 100 - hslL) / 100;
  var hsvS = hsv1 === 0 ? 0 : 2 * hsv1 / (hslL + hsv1) * 100;
  var hsvV = hslL + hsv1;
  return [hslH, hsvS, hsvV];
}
var Page = function Page(_ref) {
  var style = _ref.style,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    className: "fl-color-picker-page",
    style: _objectSpread({
      boxSizing: 'border-box',
      scrollSnapAlign: 'start',
      flexShrink: 0,
      gridColumn: '1/-1',
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      gap: '0 8px'
    }, style)
  }, rest));
};
var HWBTab = function HWBTab() {
  var rAF = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _Color$use = ___WEBPACK_IMPORTED_MODULE_4__.Color.use(),
    rawValue = _Color$use.rawValue,
    setValue = _Color$use.setValue;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isPointerDown = _useState2[0],
    setIsPointerDown = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    hue = _useState4[0],
    setHue = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    saturation = _useState6[0],
    setSaturation = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    lightness = _useState8[0],
    setLightness = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    hsvValue = _useState10[0],
    setHSVValue = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState12 = _slicedToArray(_useState11, 2),
    alpha = _useState12[0],
    setAlpha = _useState12[1];
  var syncRawValue = function syncRawValue(value) {
    if (CSS.supports('color', value)) {
      try {
        var parsed = new colorjs_io__WEBPACK_IMPORTED_MODULE_2__["default"](value);
        var _alpha = parsed.alpha,
          space = parsed.space,
          hsl = parsed.hsl,
          hsv = parsed.hsv;
        if (alpha !== _alpha) {
          setAlpha(_alpha);
        }

        // Only interested in sRGB color values
        var spaces = ['sRGB', 'Linear sRGB', 'HSL', 'HSV', 'HWB'];
        if (spaces.includes(space.name)) {
          var _hsl = _slicedToArray(hsl, 3),
            h = _hsl[0],
            s = _hsl[1],
            l = _hsl[2];
          var v = hsv[2];
          if (hue !== h && 'NaN' !== typeof h) {
            /**
             * hue 0 and 360 are functionally the same and can get swapped during syntax translation
             * To avoid jitter, leave 360 alone if the new value is 0
             */
            var threshlold = 10;
            var isHueDifferent = hue - h < 360 && (h >= hue + threshlold || h <= hue - threshlold);
            if (isHueDifferent) {
              setHue(h);
            }
          }
          if (lightness !== l) {
            setLightness(l);
          }
          if (saturation !== s) {
            setSaturation(s);
          }
          if (hsvValue !== v) {
            setHSVValue(v);
          }
        }
      } catch (error) {

        // Can't parse, don't worry about it
      }
    }
  };

  /**
   * Update local state whenever the raw value is updated externally
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isPointerDown) {
      syncRawValue(rawValue);
    }
  }, [rawValue]);
  var opaqueColor = stringFromHSL.apply(void 0, _toConsumableArray(hsv2hsl(hue, saturation, hsvValue)));
  var hslGradient = "linear-gradient(to top, black, rgb(0 0 0 / 0 ) ),\n\t\t\t\t\t\t linear-gradient(to right, white, rgb(255 255 255 / 0 ) ),\n\t\t\t\t\t\t linear-gradient( hsl( ".concat(hue, " 100% 50%), hsl( ").concat(hue, " 100% 50%) )");

  /**
   * Stub for a true translation function.
   * This uses a dom element to get the browser's resolved rgb() value
   */
  var convertValue = function convertValue(value) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getComputedValue)(value);
  };
  var updateValue = function updateValue(value) {
    /**
     * Sync value setting with frames to prevent setting more than once per-frame update
     */
    if (rAF.current) {
      cancelAnimationFrame(rAF.current);
    }
    rAF.current = requestAnimationFrame(function () {
      return setValue(convertValue(value));
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'min-content minmax(0, 1fr ) minmax( 5ch, min-content )',
      flexDirection: 'column',
      scrollSnapType: 'y mandatory',
      color: 'var(--fg-color)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Page, {
    style: {
      gridTemplateRows: '1fr auto auto auto'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_color_area__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: [saturation, 100 - hsvValue],
    onChange: function onChange(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        x = _ref3[0],
        y = _ref3[1];
      var saturation = x;
      var value = 100 - y;
      setSaturation(saturation);
      setHSVValue(value);
      var hsl = hsv2hsl(hue, saturation, value);
      updateValue(stringFromHSL(hue, saturation, hsl[2], alpha));
    },
    onPointerDown: function onPointerDown() {
      return setIsPointerDown(true);
    },
    onPointerUp: function onPointerUp() {
      return setIsPointerDown(false);
    },
    style: {
      gridColumn: '1/-1',
      aspectRatio: 'none',
      background: hslGradient
    },
    thumbStyle: {
      '--color': opaqueColor
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "colorscale",
    style: {
      gridColumn: '1/-1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: isPointerDown ? 'none' : ''
    }
  }, ['transparent'].concat(_toConsumableArray(numRange(0, 100, 10).toReversed())).map(function (lightness) {
    var value = 'string' === typeof lightness ? lightness : stringFromHSL(0, 0, lightness);
    var textColor = 40 < lightness ? 'black' : 'white';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_swatch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: value,
      as: "button",
      value: value,
      onClick: function onClick() {
        return updateValue(value);
      },
      style: {
        '--size': '24px',
        '--radius': 0,
        '--text-color': textColor,
        flexGrow: 1,
        aspectRatio: 'none',
        boxShadow: 'none',
        cursor: 'pointer'
      }
    }, 'transparent' !== lightness && lightness);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      padding: '8px 0'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      alignContent: 'center',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 8,
      height: 'var(--bar-size)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hue', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.Slider, {
    className: "hue-slider",
    type: "range",
    min: 0,
    max: 360,
    value: hue,
    onChange: function onChange(e) {
      var _hue = Math.round(e.target.value);
      setHue(_hue);
      var hsl = stringFromHSL.apply(void 0, _toConsumableArray(hsv2hsl(_hue, saturation, hsvValue)).concat([alpha]));
      updateValue(hsl);
    },
    onPointerDown: function onPointerDown() {
      return setIsPointerDown(true);
    },
    onPointerUp: function onPointerUp() {
      return setIsPointerDown(false);
    },
    style: {
      '--hue': hue,
      '--sat': saturation
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, Math.round(hue))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      alignContent: 'center',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 8,
      height: 'var(--bar-size)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Alpha', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.Slider, {
    className: "alpha-slider",
    type: "range",
    min: 0,
    max: 1,
    step: .01,
    value: alpha,
    onChange: function onChange(e) {
      var _alpha = e.target.value;
      setAlpha(_alpha);
      updateValue(stringFromHSL.apply(void 0, _toConsumableArray(hsv2hsl(hue, saturation, hsvValue)).concat([_alpha])));
    },
    onPointerDown: function onPointerDown() {
      return setIsPointerDown(true);
    },
    onPointerUp: function onPointerUp() {
      return setIsPointerDown(false);
    },
    style: {
      '--thumb-color': stringFromHSL(hue, saturation, 50),
      '--hue': hue,
      '--sat': "".concat(saturation, "%")
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, parseInt(alpha * 100))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('sRGB', 'fl-builder'),
  content: HWBTab
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/utils/display.js":
/*!*********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/utils/display.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getColorDisplayValue: () => (/* binding */ getColorDisplayValue)
/* harmony export */ });
/**
 * Attempts to get a color value for a CSS variable
 * that is set in the layout iframe so that it can be
 * displayed in the controls.
 */
var getColorDisplayValue = function getColorDisplayValue(value) {
  var layoutFrame = window.parent.document.getElementById('fl-builder-ui-iframe');
  if (layoutFrame && value.startsWith('var(')) {
    var layoutDocument = layoutFrame.contentDocument || layoutFrame.contentWindow.document;
    var temp = layoutDocument.createElement('div');
    temp.style.color = value;
    layoutDocument.body.appendChild(temp);
    var computedStyle = layoutDocument.defaultView.getComputedStyle(temp);
    value = computedStyle.color ? computedStyle.color : value;
    layoutDocument.body.removeChild(temp);
  }
  return value;
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/color/utils/index.js":
/*!*******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/utils/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedValue: () => (/* reexport safe */ _meta__WEBPACK_IMPORTED_MODULE_0__.getComputedValue),
/* harmony export */   getMetadata: () => (/* reexport safe */ _meta__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _meta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./meta */ "./src/libraries/fl-controls/components/color/utils/meta.js");


// Don't use this yet - math still WIP


/***/ }),

/***/ "./src/libraries/fl-controls/components/color/utils/meta.js":
/*!******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/color/utils/meta.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getComputedValue: () => (/* binding */ getComputedValue)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils */ "./src/libraries/fl-controls/utils/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var rgbToHsl = _utils__WEBPACK_IMPORTED_MODULE_0__.color.rgbToHsl,
  rgbToHwb = _utils__WEBPACK_IMPORTED_MODULE_0__.color.rgbToHwb,
  rgbToHex = _utils__WEBPACK_IMPORTED_MODULE_0__.color.rgbToHex;

/**
 * Shared DOM Element reference for use in computing color values
 */
var element = null;
var getComputedValue = function getComputedValue(raw) {
  if (!element) {
    element = document.createElement('div');
    document.body.append(element);
  }
  element.style.color = raw;
  var value = window.getComputedStyle(element).getPropertyValue('color');
  element.style.color = '';
  return value;
};

/**
 * Break down the computed value
 */
var getComputedMeta = function getComputedMeta(value) {
  // Get the values between the ( ) of a color function value
  var parts = /\(([^)]+)\)/.exec(value)[1];
  var arr = parts.replaceAll(',', ' ').split(/(\s+)/).filter(function (str) {
    return str.trim().length > 0 && '/' !== str;
  }).map(function (str) {
    // Some values may be strings like colorspace
    if (isNaN(str)) {
      return str;
    }

    // But channel values should be converted to numbers
    return parseFloat(str);
  });

  // Get the {funcName}(0,0,0,0) off the color value }
  var funcName = value.split('(')[0];

  // Normalize channel data
  if ('color' === funcName) {
    var _arr = _toArray(arr),
      colorSpace = _arr[0],
      channels = _arr.slice(1);
    return {
      funcName: funcName,
      colorSpace: colorSpace,
      channels: 3 === channels.length ? [].concat(_toConsumableArray(channels), [1]) : channels // Ensure alpha value
    };
  } else {
    var _colorSpace = funcName;
    if ('rgb' === funcName) {
      _colorSpace = 'srgb';
    }
    return {
      funcName: funcName,
      colorSpace: _colorSpace,
      channels: 3 === arr.length ? [].concat(_toConsumableArray(arr), [1]) : arr // Ensure alpha value
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (value) {
  var computed = getComputedValue(value);
  var meta = getComputedMeta(computed);
  var colorSpace = meta.colorSpace;
  var getSRGB = function getSRGB() {
    var colorSpace = meta.colorSpace,
      channels = meta.channels;

    // meant to mimick the browser's default rgb value for invalid colors
    var rgba = {
      r: 60,
      g: 67,
      b: 74,
      a: 1
    };
    if ('srgb' === colorSpace) {
      rgba = _objectSpread(_objectSpread({}, rgba), {}, {
        r: channels[0],
        g: channels[1],
        b: channels[2],
        a: channels[3]
      });
    }
    var _rgba = rgba,
      r = _rgba.r,
      g = _rgba.g,
      b = _rgba.b,
      a = _rgba.a;
    var hex = rgbToHex(r, g, b);

    // Switch 255 values to percentages before converting
    var _r = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mapNumRange)(rgba.r, 0, 255, 0, 1);
    var _g = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mapNumRange)(rgba.g, 0, 255, 0, 1);
    var _b = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mapNumRange)(rgba.b, 0, 255, 0, 1);
    var _rgbToHsl = rgbToHsl(_r, _g, _b),
      _rgbToHsl2 = _slicedToArray(_rgbToHsl, 3),
      hue = _rgbToHsl2[0],
      saturation = _rgbToHsl2[1],
      lightness = _rgbToHsl2[2];
    var _rgbToHwb = rgbToHwb(_r, _g, _b),
      _rgbToHwb2 = _slicedToArray(_rgbToHwb, 3),
      _ = _rgbToHwb2[0],
      whiteness = _rgbToHwb2[1],
      blackness = _rgbToHwb2[2];
    return {
      rgb: rgba,
      rgbString: "rgb( ".concat(r, " ").concat(g, " ").concat(b, " / ").concat(a, " )"),
      hsl: {
        h: hue,
        s: saturation,
        l: lightness,
        a: a
      },
      hslString: "hsl( ".concat(hue, " ").concat(saturation, "% ").concat(lightness, "% / ").concat(a, ")"),
      hwbString: "hwb( ".concat(hue, " ").concat(whiteness, "% ").concat(blackness, "% / ").concat(a, ")"),
      hex: hex,
      alpha: a,
      red: r,
      green: g,
      blue: b,
      hue: hue,
      whiteness: whiteness,
      blackness: blackness,
      saturation: saturation,
      lightness: lightness
    };
  };
  return {
    rawValue: value,
    computedValue: computed,
    colorSpace: colorSpace,
    getSRGB: getSRGB
  };
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/dialog/dialog-button.js":
/*!**********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/dialog/dialog-button.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogButton: () => (/* binding */ DialogButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/libraries/fl-controls/components/dialog/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/libraries/fl-controls/utils/index.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




var DialogButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref, ref) {
  var _ref$button = _ref.button,
    Button = _ref$button === void 0 ? 'button' : _ref$button,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? 'Button' : _ref$label,
    children = _ref.children,
    className = _ref.className,
    appearance = _ref.appearance,
    _ref$buttonProps = _ref.buttonProps,
    buttonProps = _ref$buttonProps === void 0 ? {} : _ref$buttonProps,
    _ref$dialogProps = _ref.dialogProps,
    dialogProps = _ref$dialogProps === void 0 ? {} : _ref$dialogProps,
    position = _ref.position,
    _ref$enableViewTransi = _ref.enableViewTransitions,
    enableViewTransitions = _ref$enableViewTransi === void 0 ? false : _ref$enableViewTransi,
    tabs = _ref.tabs;
  var button = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var dialog = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * Close the dialog w/ View Transition support.
   */
  var close = function close() {
    var doClose = function doClose() {
      var _dialog$current;
      return (_dialog$current = dialog.current) === null || _dialog$current === void 0 ? void 0 : _dialog$current.close();
    };
    var document = window.top.document;
    if (enableViewTransitions && document.startViewTransition) {
      var transition = document.startViewTransition(doClose);
      transition.ready.then(function () {
        dialog.current.animate({
          scale: [1, .25]
        }, {
          duration: 500,
          easing: 'ease-in'
        });
      });
    }
    doClose();
  };

  /**
   * Show the dialog w/ View Transition Support
   */
  var showModal = function showModal() {
    var doShow = function doShow() {
      var _dialog$current2;
      return (_dialog$current2 = dialog.current) === null || _dialog$current2 === void 0 ? void 0 : _dialog$current2.showModal();
    };
    var document = window.top.document;
    if (enableViewTransitions && document.startViewTransition) {
      var transition = document.startViewTransition(doShow);
      transition.ready.then(function () {
        dialog.current.animate({
          scale: [.25, 1]
        }, {
          duration: 500,
          easing: 'ease-in'
        });
      });
    }
    doShow();
  };

  /**
   * Toggle the internal versions of showModal() and close()
   */
  var toggle = function toggle() {
    if (dialog.current && !!dialog.current.open) {
      close();
    } else {
      showModal();
    }
  };

  /*
   * Expose API object to parent component via ref
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, function () {
    return {
      button: button.current,
      dialog: dialog.current,
      showModal: showModal,
      close: close,
      toggle: toggle
    };
  }, [button.current, dialog.current, showModal, close, toggle]);
  var handlePosition = function handlePosition(_ref2, e) {
    var dialog = _ref2.dialog;
    var posStyles = {};
    if (button.current && dialog) {
      var _button$current;
      var btn = (_button$current = button.current) === null || _button$current === void 0 ? void 0 : _button$current.getBoundingClientRect();
      var dialogWidth = dialog.clientWidth,
        dialogHeight = dialog.clientHeight;
      var _window$top = window.top,
        viewportHeight = _window$top.innerHeight,
        viewportWidth = _window$top.innerWidth;
      var inset = 32;

      // Beside Left Top
      var left = btn.left - (dialogWidth + inset);
      var top = btn.top;
      var clampedLeft = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.clamp)(left, 0 + inset, viewportWidth - dialogWidth - inset);
      var clampedTop = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.clamp)(top, 0 + inset, viewportHeight - dialogHeight - inset);
      posStyles = {
        bottom: 'auto',
        right: 'auto',
        left: clampedLeft + 'px',
        top: clampedTop + 'px',
        transformOrigin: "".concat(dialogWidth - btn.width / 2, "px top")
      };
      if ('function' === typeof position) {
        posStyles = position({
          dialog: dialog,
          dialogRect: {
            width: dialogWidth,
            height: dialogHeight
          },
          button: button.current,
          buttonRect: btn,
          styles: posStyles
        }, e);
      }
      return posStyles;
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Button, _extends({
    ref: button,
    as: "div",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('fl-controls-dialog-button', className),
    onClick: toggle
  }, buttonProps), label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.Dialog, _extends({
    ref: dialog,
    appearance: appearance,
    position: handlePosition,
    enableViewTransitions: enableViewTransitions,
    tabs: tabs
  }, dialogProps), children));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DialogButton);

/***/ }),

/***/ "./src/libraries/fl-controls/components/dialog/dialog.js":
/*!***************************************************************!*\
  !*** ./src/libraries/fl-controls/components/dialog/dialog.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error */ "./src/libraries/fl-controls/components/error/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/libraries/fl-controls/components/dialog/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "children", "position", "tabs", "appearance", "enableViewTransitions", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




var useLightDimissDialog = function useLightDimissDialog() {
  var dismiss = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var startCoords = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var onPointerDown = function onPointerDown(_ref) {
    var pageX = _ref.pageX,
      pageY = _ref.pageY;
    return startCoords.current = {
      pageX: pageX,
      pageY: pageY
    };
  };
  var onKeyUp = function onKeyUp(e) {
    if ('Escape' === e.key) {
      dismiss(e);
    }
    e.stopPropagation();
  };
  var pointerStartedInside = function pointerStartedInside(e) {
    if (!startCoords.current) {
      return false;
    }
    var _startCoords$current = startCoords.current,
      pageX = _startCoords$current.pageX,
      pageY = _startCoords$current.pageY;
    var _e$target$getBounding = e.target.getBoundingClientRect(),
      top = _e$target$getBounding.top,
      left = _e$target$getBounding.left,
      width = _e$target$getBounding.width,
      height = _e$target$getBounding.height;
    var _window = window,
      pageYOffset = _window.pageYOffset,
      pageXOffset = _window.pageXOffset;
    var elTop = top + pageYOffset;
    var elLeft = left + pageXOffset;
    var rect = {
      left: elLeft,
      top: elTop,
      width: width,
      height: height
    };
    return pageX >= rect.left && pageX <= rect.left + rect.width && pageY >= rect.top && pageY <= rect.top + rect.height;
  };
  var onClick = function onClick(e) {
    if (!pointerStartedInside(e) && e.target.matches('dialog')) {
      dismiss(e);

      // Because we don't want to dismiss nested panels - just this one.
      e.stopPropagation();
    }
  };
  return {
    onPointerDown: onPointerDown,
    onMouseMove: function onMouseMove(e) {
      return e.stopPropagation();
    },
    onKeyUp: onKeyUp,
    onClick: onClick
  };
};
var Dialog = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref2, ref) {
  var className = _ref2.className,
    children = _ref2.children,
    position = _ref2.position,
    tabs = _ref2.tabs,
    _ref2$appearance = _ref2.appearance,
    appearance = _ref2$appearance === void 0 ? 'panel' : _ref2$appearance,
    _ref2$enableViewTrans = _ref2.enableViewTransitions,
    enableViewTransitions = _ref2$enableViewTrans === void 0 ? false : _ref2$enableViewTrans,
    style = _ref2.style,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var element = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * Light dismiss enables click outside of an element to dismiss as well as hitting ESC
   */
  var lightDismissProps = useLightDimissDialog(function () {
    var _element$current;
    return (_element$current = element.current) === null || _element$current === void 0 ? void 0 : _element$current.close();
  });

  /**
   * Ensure the ref we're using and a ref passed in are the same and always exist.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, function () {
    /**
     * Wrap showModal() and fire a custom "show" event because browser doesn't provide one.
     * This gives us an event to calculate position on.
     */
    var _showModal = element.current.showModal;
    element.current.showModal = function () {
      _showModal.call(element.current);

      // Wait a frame before firing to ensure we can read width/height of element for positioning.
      requestAnimationFrame(function () {
        return element.current.dispatchEvent(new Event('show'));
      });
    };

    // Expose the dialog element w/ extra methods via ref
    return element.current;
  }, [element.current]);

  /**
   * Use custom "show" event to determine position
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (element.current) {
      var _element$current2;
      var onShow = function onShow(e) {
        var styles = {};
        if ('function' === typeof position) {
          styles = position({
            dialog: element.current
          }, e);
        }
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.setElementStyles)(element.current, styles);
      };
      (_element$current2 = element.current) === null || _element$current2 === void 0 || _element$current2.addEventListener('show', onShow);
      return function () {
        var _element$current3;
        return (_element$current3 = element.current) === null || _element$current3 === void 0 ? void 0 : _element$current3.removeEventListener('show', onShow);
      };
    }
  }, [element.current, position]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("dialog", _extends({
    ref: element,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_defineProperty(_defineProperty({
      'fl-controls-dialog': true
    }, "fl-appearance-".concat(appearance), appearance), 'uses-view-transitions', undefined !== document.startViewTransition && enableViewTransitions), className),
    style: style
  }, lightDismissProps, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_error__WEBPACK_IMPORTED_MODULE_2__["default"].Boundary, null, children));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dialog);

/***/ }),

/***/ "./src/libraries/fl-controls/components/dialog/index.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/components/dialog/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dialog: () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   DialogButton: () => (/* reexport safe */ _dialog_button__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog */ "./src/libraries/fl-controls/components/dialog/dialog.js");
/* harmony import */ var _dialog_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialog-button */ "./src/libraries/fl-controls/components/dialog/dialog-button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/dialog/style.scss");



_dialog__WEBPACK_IMPORTED_MODULE_0__["default"].Button = _dialog_button__WEBPACK_IMPORTED_MODULE_1__["default"];


/***/ }),

/***/ "./src/libraries/fl-controls/components/dialog/style.scss":
/*!****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/dialog/style.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/dialog/utils.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/components/dialog/utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setElementStyles: () => (/* binding */ setElementStyles)
/* harmony export */ });
var setElementStyles = function setElementStyles(element) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (element) {
    for (var key in styles) {
      element.style[key] = styles[key];
    }
  }
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/error/index.js":
/*!*************************************************************!*\
  !*** ./src/libraries/fl-controls/components/error/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultError: () => (/* binding */ DefaultError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["error", "title", "children", "style"],
  _excluded2 = ["alternate", "children"];
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


var DefaultError = function DefaultError(_ref) {
  var error = _ref.error,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There seems to be an error', 'fl-builder') : _ref$title,
    children = _ref.children,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    rest = _objectWithoutProperties(_ref, _excluded);
  var boxStyle = _objectSpread({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    gap: 16,
    textAlign: 'center',
    minHeight: 0,
    maxHeight: '100%',
    lineBreak: 'anywhere'
  }, style);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    style: boxStyle
  }, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      color: 'inherit',
      fontSize: 14
    }
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", {
    style: {
      color: 'inherit'
    }
  }, error.message), children);
};
var Boundary = /*#__PURE__*/function (_Component) {
  function Boundary(props) {
    var _this;
    _classCallCheck(this, Boundary);
    _this = _callSuper(this, Boundary, [props]);
    _this.state = {
      hasError: false,
      error: null
    };
    return _this;
  }
  _inherits(Boundary, _Component);
  return _createClass(Boundary, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        _this$props$alternate = _this$props.alternate,
        alternate = _this$props$alternate === void 0 ? DefaultError : _this$props$alternate,
        children = _this$props.children,
        rest = _objectWithoutProperties(_this$props, _excluded2);
      var _this$state = this.state,
        hasError = _this$state.hasError,
        error = _this$state.error;
      if (hasError) {
        return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(alternate, _objectSpread({
          error: error
        }, rest));
      }
      return children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error
      };
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component); // Ensure the proper display name in the react dev tools tree
var Error = {
  Boundary: Boundary,
  DefaultError: DefaultError
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Error);

/***/ }),

/***/ "./src/libraries/fl-controls/components/gradient/index.js":
/*!****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/gradient/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input),
/* harmony export */   Range: () => (/* binding */ Range),
/* harmony export */   getCSS: () => (/* binding */ getCSS)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var fl_controls_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fl-controls/utils */ "./src/libraries/fl-controls/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/libraries/fl-controls/components/gradient/utils.js");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/gradient/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["value", "onChange", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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







var sortStops = function sortStops(stops) {
  return stops.toSorted(function (a, b) {
    return a.from - b.from;
  });
};
var Range = function Range(_ref) {
  var _sortedStops$, _stops$index, _stops$index2;
  var _ref$value = _ref.value,
    stops = _ref$value === void 0 ? [] : _ref$value,
    _onChange = _ref.onChange,
    colorSpace = _ref.colorSpace;
  var range = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var rAF = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // requestAnimationFrame id
  var preventWheel = (0,fl_controls_utils__WEBPACK_IMPORTED_MODULE_3__.usePreventWheel)();

  // Index of the stop currently being edited
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDown = _useState2[0],
    setIsDown = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    index = _useState4[0],
    setIndex = _useState4[1];
  var sortedStops = sortStops(stops);
  var rangeBG = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getGradientString)({
    type: 'linear',
    angle: 90,
    colorSpace: colorSpace,
    stops: stops
  });
  var firstStopColor = (_sortedStops$ = sortedStops[0]) === null || _sortedStops$ === void 0 ? void 0 : _sortedStops$.color;
  var lastStopColor = sortedStops[sortedStops.length - 1].color;
  var defaultStop = {
    color: null !== index ? stops[index].color : '#ff0000',
    from: 0,
    to: null
  };
  var calculateValues = function calculateValues(e) {
    if (rAF.current) {
      cancelAnimationFrame(rAF.current);
    }
    requestAnimationFrame(function () {
      var pageX = 'number' === typeof e.pageX ? e.pageX : e.touches[0].pageX;

      //const pageY = 'number' === typeof e.pageY ? e.pageY : e.touches[0].pageY

      if (range.current) {
        var bounds = range.current.getBoundingClientRect();
        var x = pageX - bounds.left;
        var xPercent = Math.round((0,fl_controls_utils__WEBPACK_IMPORTED_MODULE_3__.mapNumRange)((0,fl_controls_utils__WEBPACK_IMPORTED_MODULE_3__.clamp)(x, 0, bounds.width), 0, bounds.width, 0, 100));
        if (stops[index].from !== xPercent) {
          var newStops = stops.toSpliced(index, 1, _objectSpread(_objectSpread({}, stops[index]), {}, {
            from: xPercent
          }));
          _onChange(newStops);
        }
      }
    });
  };
  var _onPointerDown = function onPointerDown(i) {
    setIndex(i);
    setIsDown(true);
  };
  var reset = function reset() {
    return setIsDown(false);
  };
  var onPointerMove = function onPointerMove(e) {
    if (isDown) {
      calculateValues(e);
    }
    e.stopPropagation();
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (isDown) {
      var win = window.top;
      win.addEventListener('pointermove', onPointerMove);
      win.addEventListener('pointerup', reset);
      win.addEventListener('pointercancel', reset);
      return function () {
        win.removeEventListener('pointermove', onPointerMove);
        win.removeEventListener('pointerup', reset);
        win.removeEventListener('pointercancel', reset);
      };
    }
  }, [isDown]);
  var deleteSelectedStop = function deleteSelectedStop() {
    if (2 < stops.length) {
      _onChange(stops.filter(function (_, i) {
        return i !== index;
      }));
      setIndex(null);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.Color.Swatch, {
    className: "fl-controls-gradient-stop-range",
    style: {
      width: 'auto',
      height: ''
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "range-endcap",
    style: {
      background: firstStopColor
    },
    onClick: function onClick() {
      var newStops = sortStops([].concat(_toConsumableArray(stops), [_objectSpread({}, defaultStop)]));
      _onChange(newStops);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: range,
    className: "fl-controls-gradient-stops-wrapper",
    style: {
      background: rangeBG
    },
    onClick: function onClick(e) {
      var pageX = 'number' === typeof e.pageX ? e.pageX : e.touches[0].pageX;

      //const pageY = 'number' === typeof e.pageY ? e.pageY : e.touches[0].pageY

      var range = e.target;
      var bounds = range.getBoundingClientRect();
      var x = pageX - bounds.left;
      var xPercent = Math.round((0,fl_controls_utils__WEBPACK_IMPORTED_MODULE_3__.mapNumRange)((0,fl_controls_utils__WEBPACK_IMPORTED_MODULE_3__.clamp)(x, 0, bounds.width), 0, bounds.width, 0, 100));
      var newStops = sortStops([].concat(_toConsumableArray(stops), [_objectSpread(_objectSpread({}, defaultStop), {}, {
        from: xPercent
      })]));
      _onChange(newStops);
    }
  }, stops.map(function (stop, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      key: "gradient-stop-".concat(i),
      className: i === index ? 'is-selected' : '',
      "data-gradient-stop": i,
      onPointerDown: function onPointerDown(e) {
        return _onPointerDown(i, e);
      },
      onClick: function onClick(e) {
        e.stopPropagation();
      },
      onDoubleClick: function onDoubleClick(e) {
        deleteSelectedStop();
        e.stopPropagation();
      },
      onFocus: function onFocus() {
        return setIndex(i);
      },
      onKeyUp: function onKeyUp(e) {
        if ('Escape' === e.key) {
          e.target.blur();
        }
        if ('Backspace' === e.key) {
          deleteSelectedStop();
        }
        e.stopPropagation();
      },
      style: {
        '--color': stop.color,
        left: "".concat(stop.from, "%"),
        zIndex: null !== index && i === index ? '1' : ''
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "range-endcap",
    style: {
      background: lastStopColor
    },
    onClick: function onClick() {
      var newStops = sortStops([].concat(_toConsumableArray(stops), [_objectSpread(_objectSpread({}, defaultStop), {}, {
        from: 100
      })]));
      _onChange(newStops);
    }
  })), null !== index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.Color.Picker, {
    showReset: false,
    value: (_stops$index = stops[index]) === null || _stops$index === void 0 ? void 0 : _stops$index.color,
    onChange: function onChange(color) {
      return _onChange(stops["with"](index, _objectSpread(_objectSpread({}, stops[index]), {}, {
        color: color
      })));
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    ref: preventWheel,
    type: "number",
    value: (_stops$index2 = stops[index]) === null || _stops$index2 === void 0 ? void 0 : _stops$index2.from,
    onChange: function onChange(e) {
      return _onChange(stops["with"](index, _objectSpread(_objectSpread({}, stops[index]), {}, {
        from: e.target.value
      })));
    },
    min: "0",
    max: "100"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "stop-remove-button",
    onClick: function onClick() {
      _onChange(stops.filter(function (_, i) {
        return i !== index;
      }));
      setIndex(null);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_5__.Trash, null))), null === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: 'grid',
      gridColumn: '1/-1',
      placeContent: 'center'
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Color Stop', 'fl-builder')));
};
var types = {
  linear: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Linear', 'fl-builder'),
  radial: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Radial', 'fl-builder'),
  conic: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Conic', 'fl-builder')
};
var colorSpaces = {
  'sRGB': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('sRGB', 'fl-builder'),
  'srgb-linear': (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Linear sRGB', 'fl-builder'),
  oklab: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('OKLAB', 'fl-builder'),
  oklch: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('OKLCH', 'fl-builder')
};
var Input = function Input(_ref2) {
  var _ref2$value = _ref2.value,
    state = _ref2$value === void 0 ? _utils__WEBPACK_IMPORTED_MODULE_4__.defaultState : _ref2$value,
    _ref2$onChange = _ref2.onChange,
    setState = _ref2$onChange === void 0 ? function () {} : _ref2$onChange,
    style = _ref2.style,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var _defaultState$state = _objectSpread(_objectSpread({}, _utils__WEBPACK_IMPORTED_MODULE_4__.defaultState), state),
    type = _defaultState$state.type,
    colorSpace = _defaultState$state.colorSpace,
    angle = _defaultState$state.angle;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    className: "fl-controls-gradient-picker",
    style: _objectSpread({
      display: 'grid',
      gap: 8
    }, style)
  }, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.Color.Swatch, {
    style: {
      '--background': (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getGradientString)(state),
      gridColumn: '1/-1',
      aspectRatio: '3/2',
      width: 'auto',
      height: 'auto',
      borderRadius: 8
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Range, {
    value: Array.isArray(state.stops) ? state.stops : [],
    onChange: function onChange(stops) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        stops: stops
      }));
    },
    colorSpace: colorSpace
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-controls-grid-table span-cols"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.Select, {
    value: type,
    options: types,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        type: e.target.value
      }));
    }
  })), 'linear' === type && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Angle', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    min: "0",
    max: "360",
    step: "1",
    value: angle,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        angle: e.target.value
      }));
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color Space', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.Select, {
    value: colorSpace,
    options: colorSpaces,
    onChange: function onChange(e) {
      return setState(_objectSpread(_objectSpread({}, state), {}, {
        colorSpace: e.target.value
      }));
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "fl-control fl-controls-button",
    style: {
      display: 'grid',
      placeContent: 'center'
    },
    title: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Distribute color spots', 'fl-builder'),
    onClick: function onClick() {
      var newStops = sortStops(state.stops).map(function (stop, i) {
        return _objectSpread(_objectSpread({}, stop), {}, {
          from: Math.round(i * (100 / (state.stops.length - 1))),
          to: null
        });
      });
      setState(_objectSpread(_objectSpread({}, state), {}, {
        stops: newStops
      }));
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_5__.SpaceAroundHorizontal, null))));
};
var getCSS = _utils__WEBPACK_IMPORTED_MODULE_4__.getGradientString;

/***/ }),

/***/ "./src/libraries/fl-controls/components/gradient/style.scss":
/*!******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/gradient/style.scss ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/gradient/utils.js":
/*!****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/gradient/utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultState: () => (/* binding */ defaultState),
/* harmony export */   getGradientString: () => (/* binding */ getGradientString)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/libraries/fl-controls/utils/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var splitColorString = function splitColorString(string) {
  return string.split(',').map(function (item) {
    return {
      color: item,
      from: 0
    };
  });
};
var getStopString = function getStopString(_ref) {
  var _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'red' : _ref$color,
    _ref$from = _ref.from,
    from = _ref$from === void 0 ? 0 : _ref$from,
    _ref$to = _ref.to,
    to = _ref$to === void 0 ? null : _ref$to;
  return "".concat(color, " ").concat(from, "%").concat(to ? ' ' + to + '%' : '');
};
var defaultState = {
  type: 'linear',
  colorSpace: '',
  angle: 0,
  stops: []
};
var getGradientString = function getGradientString(state) {
  var _defaultState$state = _objectSpread(_objectSpread({}, defaultState), state),
    type = _defaultState$state.type,
    colorSpace = _defaultState$state.colorSpace,
    angle = _defaultState$state.angle,
    _stops = _defaultState$state.stops;
  var stops = 'string' === typeof _stops ? splitColorString(_stops) : _stops;
  var sorted = stops.toSorted(function (a, b) {
    return a.from - b.from;
  });
  var stopString = sorted.map(getStopString).join(', ');
  var origin = '';
  if ('' !== colorSpace) {
    origin = "in ".concat(colorSpace);
  }
  var getConicStopString = function getConicStopString(stops) {
    return stops.toSorted(function (a, b) {
      return a.from - b.from;
    }).map(function (_ref2) {
      var color = _ref2.color,
        from = _ref2.from;
      var xDeg = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.mapNumRange)(from, 0, 100, 0, 360);
      return "".concat(color, " ").concat(xDeg, "deg");
    }).join(', ');
  };
  if ('radial' === type || 'repeating-radial' === type) {
    origin += ' circle';
    return "".concat(type, "-gradient(").concat(origin, ", ").concat(stopString, " )");
  } else if ('conic' === type || 'repeating-conic' === type) {
    return "".concat(type, "-gradient(").concat(origin ? origin + ',' : '', " ").concat(getConicStopString(stops), " )");
  } else {
    var _angle = !angle ? 0 : angle;
    return "".concat(type, "-gradient(").concat(origin, " ").concat(_angle, "deg, ").concat(stopString, " )");
  }
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/index.js":
/*!*******************************************************!*\
  !*** ./src/libraries/fl-controls/components/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Background: () => (/* reexport module object */ _background__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   Color: () => (/* reexport module object */ _color__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   Dialog: () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_5__.Dialog),
/* harmony export */   DialogButton: () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_5__.DialogButton),
/* harmony export */   Error: () => (/* reexport safe */ _error__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Gradient: () => (/* reexport module object */ _gradient__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   Input: () => (/* reexport safe */ _input__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   Media: () => (/* reexport safe */ _media__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Section: () => (/* reexport safe */ _section__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   Select: () => (/* reexport safe */ _select__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   Series: () => (/* reexport safe */ _series__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Slider: () => (/* reexport safe */ _sliders__WEBPACK_IMPORTED_MODULE_10__.Slider),
/* harmony export */   SortableList: () => (/* reexport safe */ _sortable_list__WEBPACK_IMPORTED_MODULE_11__["default"])
/* harmony export */ });
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/style.scss");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./src/libraries/fl-controls/components/color/index.js");
/* harmony import */ var _gradient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gradient */ "./src/libraries/fl-controls/components/gradient/index.js");
/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media */ "./src/libraries/fl-controls/components/media/index.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./background */ "./src/libraries/fl-controls/components/background/index.js");
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dialog */ "./src/libraries/fl-controls/components/dialog/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./error */ "./src/libraries/fl-controls/components/error/index.js");
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./section */ "./src/libraries/fl-controls/components/section/index.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select */ "./src/libraries/fl-controls/components/select/index.js");
/* harmony import */ var _series__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./series */ "./src/libraries/fl-controls/components/series/index.js");
/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sliders */ "./src/libraries/fl-controls/components/sliders/index.js");
/* harmony import */ var _sortable_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sortable-list */ "./src/libraries/fl-controls/components/sortable-list/index.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./input */ "./src/libraries/fl-controls/components/input/index.js");


// Import pickers before background












/**
 * Input is a pass-through convenience component for other things
 * so it should be imported last to avoid circular or undefined references.
 */



/***/ }),

/***/ "./src/libraries/fl-controls/components/input/index.js":
/*!*************************************************************!*\
  !*** ./src/libraries/fl-controls/components/input/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/libraries/fl-controls/components/input/types/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ */ "./src/libraries/fl-controls/components/index.js");
var _excluded = ["type"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }





var types = {
  color: ___WEBPACK_IMPORTED_MODULE_4__.Color.Picker
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('fl_controls_input_component', 'fl-controls', function (Component) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (undefined !== types[type]) {
    return types[type];
  }
  return Component;
});

/**
 * Filter the type and create a suspense wrapper for chunked components.
 */
var FLControlsInput = function FLControlsInput(props) {
  var type = props.type,
    rest = _objectWithoutProperties(props, _excluded);
  var InputComponent = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.applyFilters)('fl_controls_input_component', _types__WEBPACK_IMPORTED_MODULE_3__.Input, type, props);
  return /*#__PURE__*/React.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, null, /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_4__.Error.Boundary, null, /*#__PURE__*/React.createElement(InputComponent, rest)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FLControlsInput);

/***/ }),

/***/ "./src/libraries/fl-controls/components/input/types/index.js":
/*!*******************************************************************!*\
  !*** ./src/libraries/fl-controls/components/input/types/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* reexport safe */ _input__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/libraries/fl-controls/components/input/types/input/index.js");



/***/ }),

/***/ "./src/libraries/fl-controls/components/input/types/input/index.js":
/*!*************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/input/types/input/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
var _excluded = ["type", "value", "className", "onChange"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }

var Input = function Input(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    value = _ref.value,
    className = _ref.className,
    onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("input", _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('fl-controls-input', className),
    type: type,
    value: value,
    onInput: onChange
  }, rest));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);

/***/ }),

/***/ "./src/libraries/fl-controls/components/media/index.js":
/*!*************************************************************!*\
  !*** ./src/libraries/fl-controls/components/media/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state */ "./src/libraries/fl-controls/state/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/media/style.scss");
var _excluded = ["attachmentId", "url", "onSelect", "onSizeSelect", "onRemove", "children"],
  _excluded2 = ["attachmentId", "url", "onChange"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }





var forEach = FL.Builder.utils.objects.forEach;
var ImagePickerButton = function ImagePickerButton(_ref) {
  var attachmentId = _ref.attachmentId,
    url = _ref.url,
    _ref$onSelect = _ref.onSelect,
    onSelect = _ref$onSelect === void 0 ? function () {} : _ref$onSelect,
    _ref$onSizeSelect = _ref.onSizeSelect,
    onSizeSelect = _ref$onSizeSelect === void 0 ? function () {} : _ref$onSizeSelect,
    _ref$onRemove = _ref.onRemove,
    onRemove = _ref$onRemove === void 0 ? function () {} : _ref$onRemove,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useControlsStore = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useControlsStore)(),
    addSizesForAttachment = _useControlsStore.addSizesForAttachment;

  /**
   * We're wrapping the media panel in a <dialog> element to ensure it presents above other flyouts
   */
  var dialog = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var mediaFrame = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var openMediaPicker = function openMediaPicker() {
    var _mediaFrame$current;
    return (_mediaFrame$current = mediaFrame.current) === null || _mediaFrame$current === void 0 ? void 0 : _mediaFrame$current.open();
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var frame = wp.media({
      title: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Image', 'fl-builder'),
      library: {
        type: 'image'
      },
      button: {
        text: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select', 'fl-builder')
      },
      multiple: false // Set to true to allow multiple files to be selected
    });
    frame.on('open', function () {
      if (!dialog.current) {
        var modal = this.$el.closest('.media-modal').get(0);
        var parent = modal.parentElement;
        dialog.current = document.createElement('dialog');
        dialog.current.classList.add('fl-controls-media-modal-dialog');
        parent.replaceChildren(dialog.current);
        dialog.current.append(modal);
      }
      if (dialog.current) {
        dialog.current.showModal();
      }
    }, frame);
    frame.on('close', function () {
      if (dialog.current) {
        dialog.current.close();
      }
    }, frame);
    frame.on('select', function () {
      var attachment = mediaFrame.current.state().get('selection').first().toJSON();
      addSizesForAttachment(attachment.id, attachment.sizes);
      onSelect(attachment);
    }, frame);
    mediaFrame.current = frame;
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: 'repeat(2, 36px)',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AttachmentSizeSelect, {
    attachmentId: attachmentId,
    url: url,
    onChange: onSizeSelect
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "fl-control fl-controls-button",
    onClick: openMediaPicker,
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "23",
    height: "18",
    viewBox: "0 0 23 18",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.27881 17.3462C1.33984 17.3462 0.365723 16.3906 0.365723 14.4795V3.14258C0.365723 1.23145 1.33984 0.266602 3.27881 0.266602H19.3286C21.2769 0.266602 22.2417 1.23145 22.2417 3.14258V14.4795C22.2417 16.3906 21.2769 17.3462 19.3286 17.3462H3.27881ZM15.7754 8.80176L20.748 13.4683V3.22607C20.748 2.26123 20.2285 1.76025 19.3101 1.76025H3.29736C2.36963 1.76025 1.85938 2.26123 1.85938 3.22607V13.4683L4.62402 10.9727C5.00439 10.6201 5.40332 10.4531 5.8208 10.4531C6.25684 10.4531 6.68359 10.6294 7.07324 10.9819L8.78955 12.5312L12.9829 8.7832C13.4097 8.40283 13.8643 8.22656 14.3745 8.22656C14.8755 8.22656 15.3672 8.42139 15.7754 8.80176ZM7.27734 8.89453C6.07129 8.89453 5.08789 7.91113 5.08789 6.70508C5.08789 5.5083 6.07129 4.51562 7.27734 4.51562C8.47412 4.51562 9.45752 5.5083 9.45752 6.70508C9.45752 7.91113 8.47412 8.89453 7.27734 8.89453Z",
    fill: "currentColor"
  })), attachmentId ? (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace', 'fl-builder') : (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Image', 'fl-builder')), attachmentId && /*#__PURE__*/React.createElement("button", {
    className: "fl-control fl-controls-button",
    onClick: onRemove,
    style: {
      flexGrow: 1
    }
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'fl-builder'))));
};
var AttachmentSizeSelect = function AttachmentSizeSelect(_ref2) {
  var attachmentId = _ref2.attachmentId,
    url = _ref2.url,
    _ref2$onChange = _ref2.onChange,
    _onChange = _ref2$onChange === void 0 ? function () {} : _ref2$onChange,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    sizes = _useState2[0],
    setSizes = _useState2[1];
  var _useControlsStore2 = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useControlsStore)(),
    getSizesForAttachment = _useControlsStore2.getSizesForAttachment;
  var getKeyforURL = function getKeyforURL(url) {
    var sizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (0 < Object.keys(sizes).length) {
      var match = Object.entries(sizes).find(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          size = _ref4[1];
        return url === size.url;
      });
      if (match) {
        return match[0];
      }
    }
    return '';
  };
  var value = getKeyforURL(url, sizes);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (attachmentId) {
      getSizesForAttachment(attachmentId).then(function (sizes) {
        if (undefined !== sizes && 0 < Object.keys(sizes).length) {
          setSizes(sizes);
        }
      });
    }
  }, [attachmentId]);
  if (!attachmentId || !sizes || 0 >= Object.keys(sizes).length) {
    return null;
  }
  return /*#__PURE__*/React.createElement(___WEBPACK_IMPORTED_MODULE_2__.Select, _extends({
    value: value,
    options: sizes,
    getLabel: function getLabel(_ref5, key) {
      var width = _ref5.width,
        height = _ref5.height;
      return "".concat(key, " - ").concat(width, " x ").concat(height);
    },
    onChange: function onChange(e) {
      return _onChange(sizes[e.target.value]);
    }
  }, rest));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  PickerButton: ImagePickerButton
});

/***/ }),

/***/ "./src/libraries/fl-controls/components/media/style.scss":
/*!***************************************************************!*\
  !*** ./src/libraries/fl-controls/components/media/style.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/section/index.js":
/*!***************************************************************!*\
  !*** ./src/libraries/fl-controls/components/section/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/section/style.scss");
var _excluded = ["as", "title", "className", "children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


var FLControlsSection = function FLControlsSection(_ref) {
  var _ref$as = _ref.as,
    Tag = _ref$as === void 0 ? 'div' : _ref$as,
    title = _ref.title,
    className = _ref.className,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('fl-controls-section', className)
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    className: "fl-controls-section-title-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fl-controls-section-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "fl-controls-section-content"
  }, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FLControlsSection);

/***/ }),

/***/ "./src/libraries/fl-controls/components/section/style.scss":
/*!*****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/section/style.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/select/index.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/components/select/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
var _excluded = ["className", "options", "getLabel"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }

var forEach = FL.Builder.utils.objects.forEach;
var Select = function Select(_ref) {
  var className = _ref.className,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options,
    _ref$getLabel = _ref.getLabel,
    getLabel = _ref$getLabel === void 0 ? function (label) {
      return label;
    } : _ref$getLabel,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("select", _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('fl-control', className)
  }, rest), forEach(options, function (value, label) {
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, getLabel(label, value));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/components/index.js":
/*!*************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/components/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleCard: () => (/* reexport safe */ _title_card__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _title_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title-card */ "./src/libraries/fl-controls/components/series/components/title-card/index.js");



/***/ }),

/***/ "./src/libraries/fl-controls/components/series/components/title-card/index.js":
/*!************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/components/title-card/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/series/components/title-card/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["as", "title", "description", "thumb", "thumbSize", "thumbProps", "className", "isSelected", "hasIssues"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




var TitleCard = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref, ref) {
  var _ref$as = _ref.as,
    Tag = _ref$as === void 0 ? 'div' : _ref$as,
    title = _ref.title,
    description = _ref.description,
    thumb = _ref.thumb,
    _ref$thumbSize = _ref.thumbSize,
    thumbSize = _ref$thumbSize === void 0 ? 'sm' : _ref$thumbSize,
    _ref$thumbProps = _ref.thumbProps,
    thumbProps = _ref$thumbProps === void 0 ? {} : _ref$thumbProps,
    className = _ref.className,
    _ref$isSelected = _ref.isSelected,
    isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
    _ref$hasIssues = _ref.hasIssues,
    hasIssues = _ref$hasIssues === void 0 ? false : _ref$hasIssues,
    rest = _objectWithoutProperties(_ref, _excluded);
  var hasThumb = thumb || thumbProps;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'fl-controls-title-card': true,
      'is-selected': isSelected,
      'has-issues': hasIssues
    }, className)
  }, rest), hasThumb && /*#__PURE__*/React.createElement("div", _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('card-visual', thumbProps.className)
  }, thumbProps, {
    style: _objectSpread({
      '--size': 'sm' === thumbSize ? '30px' : '36px'
    }, thumbProps.style)
  }), !hasIssues && thumb, hasIssues && /*#__PURE__*/React.createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_2__.Alert, null)), /*#__PURE__*/React.createElement("div", {
    className: "card-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "card-description"
  }, description)));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TitleCard);

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/components/title-card/style.scss":
/*!**************************************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/components/title-card/style.scss ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/series/definitions.js":
/*!********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/definitions.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatItemDefinitions: () => (/* binding */ formatItemDefinitions),
/* harmony export */   getBuiltinDefinitions: () => (/* binding */ getBuiltinDefinitions),
/* harmony export */   getDefaultItemState: () => (/* binding */ getDefaultItemState),
/* harmony export */   getItemDefinition: () => (/* binding */ getItemDefinition)
/* harmony export */ });
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _parts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts */ "./src/libraries/fl-controls/components/series/parts.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var objectMap = FL.Builder.utils.objects.objectMap;
var defaultField = {
  name: '',
  label: '',
  type: 'text',
  "default": ''
};
var formatField = function formatField(field) {
  return _objectSpread(_objectSpread({}, defaultField), field);
};
var formatFields = function formatFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return fields.map(formatField);
};
var defaultDefinition = {
  label: 'Untitled',
  titleField: '',
  descriptionField: '',
  thumbnailField: '',
  content: _parts__WEBPACK_IMPORTED_MODULE_1__.DefaultItemContent,
  fields: []
};
var builtInDefs = {
  custom: {
    label: 'Custom',
    titleField: 'title',
    fields: [{
      name: 'title',
      label: 'Title',
      type: 'text'
    }, {
      name: 'description',
      label: 'Descrition',
      type: 'text'
    }]
  },
  text: {
    label: (0,ui_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text', 'fl-builder'),
    titleField: 'title',
    fields: [{
      name: 'title',
      label: 'Title',
      type: 'text'
    }]
  }
};
var getBuiltinDefinitions = function getBuiltinDefinitions() {
  return builtInDefs;
};

// Creates a single definition object
var formatItemDefinition = function formatItemDefinition(name, _def) {
  var def = _objectSpread(_objectSpread({}, defaultDefinition), _def);
  var createItem = function createItem() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var state = {};
    for (var i in def.fields) {
      var _item$state;
      var field = def.fields[i];
      var value = '';
      if (undefined !== ((_item$state = item.state) === null || _item$state === void 0 ? void 0 : _item$state[field.name])) {
        value = item.state[field.name];
      } else if (field["default"]) {
        value = field["default"];
      }
      state[field.name] = value;
    }
    var newItem = {
      id: item.id ? item.id : Date.now(),
      type: name,
      state: state
    };
    if ('function' === typeof _def.createItem) {
      return _def.createItem(newItem);
    }
    return newItem;
  };
  var defaultGetState = function defaultGetState() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread(_objectSpread({}, getDefaultItemState(def)), item.state);
  };
  var getTitle = function getTitle(item) {
    if (undefined !== item.state[def.titleField] && '' !== item.state[def.titleField]) {
      return item.state[def.titleField];
    }
    return def.label;
  };
  var getDescription = function getDescription(item) {
    if (undefined === item.state[def.titleField] || '' === item.state[def.titleField]) {
      return null;
    } else if ('' === def.descriptionField) {
      return def.label;
    }
    return item.state[def.descriptionField];
  };
  return _objectSpread(_objectSpread({}, def), {}, {
    name: name,
    fields: formatFields(def.fields),
    createItem: createItem,
    getState: 'function' === typeof def.getState ? def.getState : defaultGetState,
    getTitle: 'function' === typeof def.getTitle ? def.getTitle : getTitle,
    getDescription: 'function' === typeof def.getDescription ? def.getDescription : getDescription
  });
};

// Creates an array of definition objects
var formatItemDefinitions = function formatItemDefinitions() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var includeBuiltIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var builtIn = getBuiltinDefinitions();
  if (0 >= defs.length) {
    return includeBuiltIn ? objectMap(builtIn, formatItemDefinition) : {};
  }
  var allDefs = includeBuiltIn ? _objectSpread(_objectSpread({}, builtIn), defs) : defs;
  return objectMap(allDefs, formatItemDefinition);
};
var getItemDefinition = function getItemDefinition(type) {
  var defs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var typeKeys = Object.keys(defs);
  var defaultType = defs[typeKeys[0]];
  return '' === type || !typeKeys.includes(type) ? defaultType : defs[type];
};
var getDefaultItemState = function getDefaultItemState(def) {
  var state = {};
  for (var i in def.fields) {
    var _def$fields$i = def.fields[i],
      name = _def$fields$i.name,
      _def$fields$i$default = _def$fields$i["default"],
      defaultValue = _def$fields$i$default === void 0 ? '' : _def$fields$i$default;
    state[name] = defaultValue;
  }
  return state;
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/fields.js":
/*!***************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/fields.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldRow: () => (/* binding */ FieldRow)
/* harmony export */ });
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var FieldRow = function FieldRow(_ref) {
  var item = _ref.item,
    field = _ref.field,
    setField = _ref.setField,
    deleteField = _ref.deleteField,
    setState = _ref.setState;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, true === field.custom && /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: field.label,
    onInput: function onInput(e) {
      return setField(_objectSpread(_objectSpread({}, field), {}, {
        label: e.target.value,
        name: e.target.value.replaceAll(' ', '_').toLowerCase()
      }));
    }
  }), true !== field.custom && /*#__PURE__*/React.createElement("div", null, field.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: item.state[field.name],
    onInput: function onInput(e) {
      return setState(field.name, e.target.value);
    }
  }), true === field.custom && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return deleteField(field.name);
    }
  }, /*#__PURE__*/React.createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_0__.Trash, null))));
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/index.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleCard: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.TitleCard),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definitions */ "./src/libraries/fl-controls/components/series/definitions.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item */ "./src/libraries/fl-controls/components/series/item.js");
/* harmony import */ var _parts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parts */ "./src/libraries/fl-controls/components/series/parts.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components */ "./src/libraries/fl-controls/components/series/components/index.js");
/* harmony import */ var _sortable_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sortable-list */ "./src/libraries/fl-controls/components/sortable-list/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/series/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var Series = function Series(_ref) {
  var _ref$items = _ref.items,
    _items = _ref$items === void 0 ? [] : _ref$items,
    _ref$setItems = _ref.setItems,
    setItems = _ref$setItems === void 0 ? function () {} : _ref$setItems,
    _ref$definitions = _ref.definitions,
    definitions = _ref$definitions === void 0 ? {} : _ref$definitions,
    _ref$setDefinitions = _ref.setDefinitions,
    setDefinitions = _ref$setDefinitions === void 0 ? false : _ref$setDefinitions,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'compact' : _ref$appearance,
    _ref$empty = _ref.empty,
    Empty = _ref$empty === void 0 ? _parts__WEBPACK_IMPORTED_MODULE_4__.DefaultEmpty : _ref$empty,
    _ref$appendNewItems = _ref.appendNewItems,
    appendNewItems = _ref$appendNewItems === void 0 ? 'after' : _ref$appendNewItems,
    _ref$toolbarPosition = _ref.toolbarPosition,
    toolbarPosition = _ref$toolbarPosition === void 0 ? 'before' : _ref$toolbarPosition,
    toolbarItems = _ref.toolbarItems,
    _ref$canReset = _ref.canReset,
    canReset = _ref$canReset === void 0 ? true : _ref$canReset,
    _ref$canAdd = _ref.canAdd,
    canAdd = _ref$canAdd === void 0 ? true : _ref$canAdd,
    cloneItem = _ref.cloneItem,
    deleteItem = _ref.deleteItem,
    clearItems = _ref.clearItems,
    customAddMenu = _ref.customAddMenu,
    className = _ref.className;
  var defs = (0,_definitions__WEBPACK_IMPORTED_MODULE_2__.formatItemDefinitions)(definitions);
  var items = (0,_item__WEBPACK_IMPORTED_MODULE_3__.formatItems)(_items, defs);
  var _clearItems = function _clearItems() {
    if ('function' === typeof clearItems) {
      return clearItems();
    }
    setItems([]);
  };
  var _cloneItem = function _cloneItem(clonedItem) {
    if ('function' === typeof cloneItem) {
      return cloneItem(clonedItem.id, clonedItem);
    }

    // Default behavior
    var newItem = _objectSpread(_objectSpread({}, clonedItem), {}, {
      id: Date.now()
    });
    var i = items.findIndex(function (item) {
      return item.id === clonedItem.id;
    });
    setItems(items.toSpliced(i + 1, 0, newItem));
  };
  var _deleteItem = function _deleteItem(id) {
    if ('function' === typeof deleteItem) {
      return deleteItem(id);
    }
    setItems(items.filter(function (item) {
      return id !== item.id;
    }));
  };
  var setItem = function setItem(newItem) {
    var i = items.findIndex(function (item) {
      return item.id === newItem.id;
    });
    setItems(items["with"](i, newItem));
  };
  var setDefinition = function setDefinition(name, config) {
    'function' === typeof setDefinitions && setDefinitions(_objectSpread(_objectSpread({}, defs), {}, _defineProperty({}, name, _objectSpread(_objectSpread({}, defs[name]), config))));
  };
  var Toolbar = function Toolbar() {
    return /*#__PURE__*/React.createElement("div", {
      className: "fl-series-toolbar"
    }, toolbarItems, /*#__PURE__*/React.createElement("div", null), canReset && /*#__PURE__*/React.createElement("button", {
      onClick: _clearItems
    }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear', 'fl-builder')), canAdd && /*#__PURE__*/React.createElement(_parts__WEBPACK_IMPORTED_MODULE_4__.AddItemButton, {
      defs: defs,
      addItem: function addItem(newItem) {
        var newItems = 'before' === appendNewItems ? [newItem].concat(_toConsumableArray(items)) : [].concat(_toConsumableArray(items), [newItem]);
        setItems(newItems);
      },
      customAddMenu: customAddMenu
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(_defineProperty(_defineProperty({
      'fl-controls-series': true
    }, "fl-appearance-".concat(appearance), appearance), "toolbar-position-".concat(toolbarPosition), toolbarPosition), className)
  }, 'before' === toolbarPosition && /*#__PURE__*/React.createElement(Toolbar, null), /*#__PURE__*/React.createElement(_sortable_list__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "fl-controls-series-list",
    items: items,
    setItems: setItems,
    item: _item__WEBPACK_IMPORTED_MODULE_3__.SeriesItem,
    getItemProps: function getItemProps(item) {
      return {
        item: item,
        setItem: setItem,
        definition: (0,_definitions__WEBPACK_IMPORTED_MODULE_2__.getItemDefinition)(item.type, defs),
        setDefinition: setDefinition,
        cloneItem: _cloneItem,
        deleteItem: _deleteItem,
        canCustomize: false !== setDefinitions
      };
    },
    empty: Empty,
    isItemEnabled: function isItemEnabled(item) {
      return Object.keys(defs).includes(item.type);
    }
  }), 'after' === toolbarPosition && /*#__PURE__*/React.createElement(Toolbar, null));
};
Series.TitleCard = _components__WEBPACK_IMPORTED_MODULE_5__.TitleCard;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Series);

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/item.js":
/*!*************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/item.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeriesItem: () => (/* binding */ SeriesItem),
/* harmony export */   formatItem: () => (/* binding */ formatItem),
/* harmony export */   formatItems: () => (/* binding */ formatItems)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ "./src/libraries/fl-controls/components/series/definitions.js");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fl_controls_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fl-controls/components */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error */ "./src/libraries/fl-controls/components/error/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var defaultItem = {
  id: '',
  type: '',
  state: {}
};
var formatItem = function formatItem(item) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread(_objectSpread(_objectSpread({}, defaultItem), item), {}, {
    state: def.getState(item)
  });
};

/**
 * Ensure proper structure for all items in an array
 */
var formatItems = function formatItems() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return items.map(function (item) {
    return formatItem(item, (0,_definitions__WEBPACK_IMPORTED_MODULE_1__.getItemDefinition)(item.type, defs));
  });
};
var SeriesItem = function SeriesItem(_ref) {
  var item = _ref.item,
    setItem = _ref.setItem,
    definition = _ref.definition,
    setDefinition = _ref.setDefinition,
    _ref$canCustomize = _ref.canCustomize,
    canCustomize = _ref$canCustomize === void 0 ? false : _ref$canCustomize,
    _cloneItem = _ref.cloneItem,
    _deleteItem = _ref.deleteItem;
  var ItemContent = definition.content,
    getTitle = definition.getTitle,
    getDescription = definition.getDescription;
  var cloneItem = function cloneItem(e) {
    e.preventDefault();
    _cloneItem(item);
  };
  var deleteItem = function deleteItem(e) {
    e.preventDefault();
    _deleteItem(item.id);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_error__WEBPACK_IMPORTED_MODULE_4__["default"].Boundary, null, /*#__PURE__*/React.createElement(ItemContent, {
    title: getTitle(item),
    description: getDescription(item),
    item: item,
    setItem: setItem,
    definition: definition,
    state: item.state,
    setState: function setState(state) {
      return setItem(_objectSpread(_objectSpread({}, item), {}, {
        state: state
      }));
    },
    style: {
      paddingLeft: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fl-series-item-actions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeContent: 'center start'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "19",
    viewBox: "0 0 10 19",
    fill: "none",
    style: {
      marginRight: 'auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2H8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 7H8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12H8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17H8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: cloneItem
  }, /*#__PURE__*/React.createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_2__.Clone, null)), /*#__PURE__*/React.createElement("button", {
    onClick: deleteItem
  }, /*#__PURE__*/React.createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_2__.Trash, null))));
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/parts.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/parts.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddItemButton: () => (/* binding */ AddItemButton),
/* harmony export */   DefaultEmpty: () => (/* binding */ DefaultEmpty),
/* harmony export */   DefaultItemContent: () => (/* binding */ DefaultItemContent),
/* harmony export */   DefaultMenuContent: () => (/* binding */ DefaultMenuContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ui_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/i18n */ "./src/builder/ui/i18n/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "./src/libraries/fl-controls/components/series/components/index.js");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fl-symbols */ "fl-symbols");
/* harmony import */ var fl_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fl_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ "./src/libraries/fl-controls/utils/index.js");
/* harmony import */ var _sortable_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sortable-list */ "./src/libraries/fl-controls/components/sortable-list/index.js");
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fields */ "./src/libraries/fl-controls/components/series/fields.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["emptyMessage", "className"],
  _excluded2 = ["item", "setItem", "definition", "state", "setState"];
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








var forEach = FL.Builder.utils.objects.forEach;
var AddItemButton = function AddItemButton(_ref) {
  var defs = _ref.defs,
    addItem = _ref.addItem,
    CustomMenu = _ref.customAddMenu;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isShowing = _useState2[0],
    setIsShowing = _useState2[1];
  var menu = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(function () {
    return setIsShowing(false);
  });
  var hasMultipleDefs = 1 < Object.keys(defs).length;
  var Menu = function Menu(_ref2) {
    var addItem = _ref2.addItem;
    return forEach(defs, function (type, def) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
        key: type
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        onClick: function onClick() {
          addItem(def.createItem());
        }
      }, def.label));
    });
  };
  var handleClick = function handleClick(e) {
    e.stopPropagation();
    if (!(hasMultipleDefs || CustomMenu)) {
      var def = defs[Object.keys(defs)[0]];
      'function' === typeof (def === null || def === void 0 ? void 0 : def.createItem) && addItem(def.createItem());
    } else {
      setIsShowing(!isShowing);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-series-add-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(fl_symbols__WEBPACK_IMPORTED_MODULE_4__.Plus, null)), isShowing && (hasMultipleDefs || CustomMenu) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    ref: menu,
    className: "fl-series-add-button-menu "
  }, CustomMenu ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CustomMenu, {
    addItem: addItem,
    closeMenu: function closeMenu() {
      return setIsShowing(false);
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Menu, {
    addItem: addItem
  })));
};
var DefaultEmpty = function DefaultEmpty(_ref3) {
  var _ref3$emptyMessage = _ref3.emptyMessage,
    emptyMessage = _ref3$emptyMessage === void 0 ? (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No Items', 'fl-builder') : _ref3$emptyMessage,
    className = _ref3.className,
    rest = _objectWithoutProperties(_ref3, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('fl-series-empty', className)
  }, rest), emptyMessage);
};
var DefaultItemContent = function DefaultItemContent(_ref4) {
  var item = _ref4.item,
    setItem = _ref4.setItem,
    definition = _ref4.definition,
    state = _ref4.state,
    setState = _ref4.setState,
    rest = _objectWithoutProperties(_ref4, _excluded2);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_3__.TitleCard, rest);
};
var DefaultMenuContent = function DefaultMenuContent(_ref5) {
  var item = _ref5.item,
    setItem = _ref5.setItem,
    definition = _ref5.definition,
    setDefinition = _ref5.setDefinition,
    canCustomize = _ref5.canCustomize,
    cloneItem = _ref5.cloneItem,
    deleteItem = _ref5.deleteItem;
  var setState = function setState(key, value) {
    return setItem(_objectSpread(_objectSpread({}, item), {}, {
      state: _objectSpread(_objectSpread({}, item.state), {}, _defineProperty({}, key, value))
    }));
  };
  var addField = function addField() {
    setDefinition(_objectSpread(_objectSpread({}, definition), {}, {
      fields: [].concat(_toConsumableArray(definition.fields), [{
        name: 'untitled',
        label: 'Untitled Field',
        type: 'text',
        "default": '',
        custom: true
      }])
    }));
  };
  var _setField = function setField(name, config) {
    var index = definition.fields.findIndex(function (field) {
      return field.name === name;
    });
    var newField = _objectSpread(_objectSpread({}, definition.fields[name]), config);
    setDefinition(_objectSpread(_objectSpread({}, definition), {}, {
      fields: definition.fields["with"](index, newField)
    }));
  };
  var deleteField = function deleteField(name) {
    setDefinition(_objectSpread(_objectSpread({}, definition), {}, {
      fields: definition.fields.filter(function (field) {
        return name !== field.name;
      })
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-series-item-editor"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-series-item-editor-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_sortable_list__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "fl-series-item-fields",
    items: definition.fields,
    item: _fields__WEBPACK_IMPORTED_MODULE_7__.FieldRow,
    getItemProps: function getItemProps(field) {
      return {
        field: field,
        setField: function setField(v) {
          return _setField(field.name, v);
        },
        deleteField: deleteField,
        item: item,
        setState: setState
      };
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fl-series-item-editor-toolbar"
  }, canCustomize && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: addField
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Field', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: cloneItem
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Duplicate', 'fl-builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: deleteItem
  }, (0,ui_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete', 'fl-builder'))));
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/series/style.scss":
/*!****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/series/style.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/sliders/index.js":
/*!***************************************************************!*\
  !*** ./src/libraries/fl-controls/components/sliders/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/components/sliders/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "vertical", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }

var Slider = function Slider(_ref) {
  var className = _ref.className,
    _ref$vertical = _ref.vertical,
    vertical = _ref$vertical === void 0 ? false : _ref$vertical,
    style = _ref.style,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "range",
    className: "fl-range-input ".concat(className),
    style: _objectSpread({
      writingMode: true === vertical ? 'vertical-lr' : null
    }, style)
  }, rest));
};

/***/ }),

/***/ "./src/libraries/fl-controls/components/sliders/style.scss":
/*!*****************************************************************!*\
  !*** ./src/libraries/fl-controls/components/sliders/style.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/components/sortable-list/index.js":
/*!*********************************************************************!*\
  !*** ./src/libraries/fl-controls/components/sortable-list/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultSortConfig: () => (/* binding */ defaultSortConfig),
/* harmony export */   reorderByIds: () => (/* binding */ reorderByIds)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/libraries/fl-controls/utils/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error */ "./src/libraries/fl-controls/components/error/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["items", "getId", "getItemProps", "sortConfig", "empty", "item", "setItems", "setItemOrder", "isItemEnabled", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




var defaultSortConfig = {
  items: 'li',
  cursor: 'move',
  distance: 3,
  opacity: 0.75,
  placeholder: 'fl-sortable-placeholder',
  tolerance: 'pointer',
  axis: 'y',
  helper: 'clone',
  start: function start() {},
  stop: function stop() {},
  update: function update() {}
};
var SortableList = function SortableList(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    _ref$getId = _ref.getId,
    getId = _ref$getId === void 0 ? function (item) {
      return item.id;
    } : _ref$getId,
    _ref$getItemProps = _ref.getItemProps,
    getItemProps = _ref$getItemProps === void 0 ? function (item) {
      return item;
    } : _ref$getItemProps,
    _ref$sortConfig = _ref.sortConfig,
    sortConfig = _ref$sortConfig === void 0 ? defaultSortConfig : _ref$sortConfig,
    Empty = _ref.empty,
    ItemContent = _ref.item,
    setItems = _ref.setItems,
    _ref$setItemOrder = _ref.setItemOrder,
    setItemOrder = _ref$setItemOrder === void 0 ? function () {} : _ref$setItemOrder,
    _ref$isItemEnabled = _ref.isItemEnabled,
    isItemEnabled = _ref$isItemEnabled === void 0 ? function () {
      return true;
    } : _ref$isItemEnabled,
    style = _ref.style,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDragging = _useState2[0],
    setIsDragging = _useState2[1];
  var hasItems = 0 < items.length;
  var rAF = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var ref = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.useJQuerySortable)(_objectSpread(_objectSpread({}, sortConfig), {}, {
    start: function start(e, ui) {
      setIsDragging(true);
      sortConfig.start(e, ui);
    },
    stop: function stop(e, ui) {
      setIsDragging(false);
      sortConfig.stop(e, ui);
    },
    update: function update(e, ui) {
      if (rAF.current) {
        cancelAnimationFrame(rAF.current);
      }
      rAF.current = requestAnimationFrame(function () {
        var ids = jQuery(e.target).sortable('toArray', {
          attribute: 'data-id'
        });
        setItemOrder(ids);
        if ('function' === typeof setItems) {
          setItems(reorderByIds(items, ids));
        }
        sortConfig.update(e, ui);
      });
    }
  }), [items]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", _extends({
    ref: ref,
    style: _objectSpread({
      listStyle: 'none',
      margin: 0,
      padding: 0
    }, style)
  }, rest), !hasItems && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Empty, null), hasItems && items.map(function (item, i) {
    if (!isItemEnabled(item)) {
      return null;
    }
    var id = getId(item, i);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: id,
      "data-id": id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_error__WEBPACK_IMPORTED_MODULE_3__["default"].Boundary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ItemContent, _extends({
      isDragging: isDragging
    }, getItemProps(item)))));
  }));
};
SortableList.defaultConfig = defaultSortConfig;

// Reorder layers based on an array of ids
var reorderByIds = function reorderByIds(layers, ids) {
  return layers.toSorted(function (a, b) {
    var aIndex = ids.findIndex(function (id) {
      return id == a.id;
    });
    var bIndex = ids.findIndex(function (id) {
      return id == b.id;
    });
    if (aIndex < bIndex) {
      return -1;
    } else if (aIndex > bIndex) {
      return 1;
    }
    return 0;
  });
};
SortableList.reorderByIds = reorderByIds;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SortableList);

/***/ }),

/***/ "./src/libraries/fl-controls/components/style.scss":
/*!*********************************************************!*\
  !*** ./src/libraries/fl-controls/components/style.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/field-types/background/index.js":
/*!*******************************************************************!*\
  !*** ./src/libraries/fl-controls/field-types/background/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components */ "./src/libraries/fl-controls/components/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var defaultValue = {
  layers: [],
  css: ''
};

/**
 * Main Background Field Component
 */
var BackgroundField = function BackgroundField(_ref) {
  var name = _ref.name,
    _ref$value = _ref.value,
    _value = _ref$value === void 0 ? defaultValue : _ref$value,
    setValue = _ref.setValue;
  var value = !_value ? defaultValue : _value;
  var layersInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var cssInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var updateInputs = function updateInputs(layers, css) {
    layersInput.current.value = JSON.stringify(layers);
    cssInput.current.value = css;
    jQuery(cssInput.current).trigger('change');
  };

  // Ensure css was initially generated
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (cssInput.current && '' === value.css) {
      setValue(_objectSpread(_objectSpread({}, value), {}, {
        css: _components__WEBPACK_IMPORTED_MODULE_1__.Background.getCSS(value.layers)
      }));
    }
  }, []);
  var setLayers = function setLayers(newLayers) {
    var css = _components__WEBPACK_IMPORTED_MODULE_1__.Background.getCSS(newLayers);
    setValue({
      layers: newLayers,
      css: css
    });
    updateInputs(newLayers, css);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Background.Input, {
    type: "background",
    value: Array.isArray(value.layers) ? value.layers : [],
    onChange: setLayers
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "hidden",
    name: "".concat(name, "[layers]"),
    value: Array.isArray(value.layers) ? JSON.stringify(value.layers) : '[]',
    ref: layersInput
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "hidden",
    name: "".concat(name, "[css]"),
    value: value.css,
    ref: cssInput
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'background',
  label: 'Background',
  content: BackgroundField
});

/***/ }),

/***/ "./src/libraries/fl-controls/field-types/color/index.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/field-types/color/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components */ "./src/libraries/fl-controls/components/index.js");



var ColorField = function ColorField(_ref) {
  var name = _ref.name,
    value = _ref.value,
    setValue = _ref.setValue,
    field = _ref.field,
    getFieldElement = _ref.getFieldElement;
  var picker = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var input = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _field$show_alpha = field.show_alpha,
    show_alpha = _field$show_alpha === void 0 ? true : _field$show_alpha,
    _field$show_reset = field.show_reset,
    show_reset = _field$show_reset === void 0 ? true : _field$show_reset;
  var processValue = function processValue(value) {
    // if its a hex without the # add it
    if (!CSS.supports('color', value) && CSS.supports('color', '#' + value)) {
      return '#' + value;
    }
    return value;
  };
  var _value = processValue(value);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Color.Picker, {
    ref: picker,
    value: _value,
    showAlpha: show_alpha,
    showReset: show_reset,
    onChange: function onChange(val) {
      setValue(val);
      input.current.value = val;
      jQuery(input.current).trigger('change');
    },
    onConnect: function onConnect(_ref2) {
      var uid = _ref2.uid,
        isGlobalColor = _ref2.isGlobalColor;
      if (undefined !== FLThemeBuilderFieldConnections) {
        var originalName = name.replace(/_(large|medium|responsive)$/, '');
        var _field = jQuery(getFieldElement(originalName));
        var property = isGlobalColor ? 'global_color_' + uid : 'theme_color_' + uid;
        var label = FLBuilderConfig.globalColorLabels[property];
        var config = {
          property: property,
          object: 'site',
          field: 'color',
          settings: null
        };
        FLThemeBuilderFieldConnections._connectField(_field, label, config);
        picker.current.close();
      }
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    ref: input,
    type: "hidden",
    name: name,
    value: _value,
    className: "fl-color-picker-value fl-react-color-picker-value"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'color',
  label: 'Color',
  content: ColorField
});

/***/ }),

/***/ "./src/libraries/fl-controls/field-types/index.js":
/*!********************************************************!*\
  !*** ./src/libraries/fl-controls/field-types/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   background: () => (/* reexport safe */ _background__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   color: () => (/* reexport safe */ _color__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/libraries/fl-controls/field-types/color/index.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background */ "./src/libraries/fl-controls/field-types/background/index.js");




/***/ }),

/***/ "./src/libraries/fl-controls/state/controls-store/index-v2.js":
/*!********************************************************************!*\
  !*** ./src/libraries/fl-controls/state/controls-store/index-v2.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducer */ "./src/libraries/fl-controls/state/controls-store/reducer.js");
/* harmony import */ var _requestidlecallback_polyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./requestidlecallback-polyfill */ "./src/libraries/fl-controls/state/controls-store/requestidlecallback-polyfill.js");
/* harmony import */ var _requestidlecallback_polyfill__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_requestidlecallback_polyfill__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




var defaultState = {
  color: {
    presets: []
  },
  backgrounds: {
    presets: []
  },
  attachmentSizes: {}
};

// eslint-disable-next-line
var createControlsStore = function createControlsStore() {
  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fl-controls';
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultState;
  var store = (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(_reducer__WEBPACK_IMPORTED_MODULE_2__["default"], initialState);
  var actions = {
    setState: function setState(state) {
      return store.dispatch({
        type: 'SET_STATE',
        state: state
      });
    },
    addColorPreset: function addColorPreset(value) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return wp.apiFetch({
                path: '/fl-controls/v1/color_presets',
                method: 'POST',
                data: {
                  addPresets: [value]
                }
              });
            case 2:
              data = _context.sent;
              return _context.abrupt("return", store.dispatch({
                type: 'SET_COLOR_PRESETS',
                presets: data.presets
              }));
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    deleteColorPreset: function deleteColorPreset(value) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return wp.apiFetch({
                path: '/fl-controls/v1/color_presets',
                method: 'DELETE',
                data: {
                  deletePresets: [value]
                }
              });
            case 2:
              data = _context2.sent;
              return _context2.abrupt("return", store.dispatch({
                type: 'SET_COLOR_PRESETS',
                presets: data.presets
              }));
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    clearColorPresets: function clearColorPresets() {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return wp.apiFetch({
                path: '/fl-controls/v1/color_presets',
                method: 'POST',
                data: {
                  clearPresets: true
                }
              });
            case 2:
              return _context3.abrupt("return", store.dispatch({
                type: 'SET_COLOR_PRESETS',
                presets: []
              }));
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    addBackgroundPreset: function addBackgroundPreset(value) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return wp.apiFetch({
                path: '/fl-controls/v1/background_presets',
                method: 'POST',
                data: {
                  addPresets: [value]
                }
              });
            case 2:
              data = _context4.sent;
              return _context4.abrupt("return", store.dispatch({
                type: 'SET_BACKGROUND_PRESETS',
                presets: data.presets
              }));
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    addSizesForAttachment: function addSizesForAttachment(id) {
      var sizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return store.dispatch({
        type: 'ADD_ATTACHMENT_SIZES',
        id: id,
        sizes: sizes
      });
    }
  };

  // Fetch initial state
  // eslint-disable-next-line
  requestIdleCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var state;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return wp.apiFetch({
            path: '/fl-controls/v1/state',
            method: 'GET'
          });
        case 2:
          state = _context5.sent;
          actions.setState(_objectSpread(_objectSpread({}, initialState), state));
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  var selectState = function selectState(state) {
    return {
      colorPresets: state.color.presets,
      colorSets: state.color.sets,
      backgroundPresets: state.backgrounds.presets,
      attachmentSizes: state.attachmentSizes
    };
  };
  return {
    useControlsStore: function useControlsStore() {
      var snapshot = store.getState();
      var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(selectState(snapshot)),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];
      (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        return store.subscribe(function () {
          return setState(selectState(store.getState()));
        });
      }, []);
      return _objectSpread(_objectSpread(_objectSpread({}, state), actions), {}, {
        // eslint-disable-next-line
        getSizesForAttachment: function () {
          var _getSizesForAttachment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
            var data;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(undefined !== state.attachmentSizes[id])) {
                    _context6.next = 4;
                    break;
                  }
                  return _context6.abrupt("return", state.attachmentSizes[id]);
                case 4:
                  _context6.next = 6;
                  return wp.apiFetch({
                    path: '/fl-controls/v1/attachment_sizes?id=' + id,
                    method: 'GET'
                  });
                case 6:
                  data = _context6.sent;
                  // Cache the sizes in the store before returning
                  actions.addSizesForAttachment(id, data.sizes);
                  return _context6.abrupt("return", data.sizes);
                case 9:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
          function getSizesForAttachment(_x) {
            return _getSizesForAttachment.apply(this, arguments);
          }
          return getSizesForAttachment;
        }()
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createControlsStore);

/***/ }),

/***/ "./src/libraries/fl-controls/state/controls-store/reducer.js":
/*!*******************************************************************!*\
  !*** ./src/libraries/fl-controls/state/controls-store/reducer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return _objectSpread({}, action.state);
    case 'SET_COLOR_PRESETS':
      return _objectSpread(_objectSpread({}, state), {}, {
        color: _objectSpread(_objectSpread({}, state.color), {}, {
          presets: action.presets
        })
      });
    case 'SET_BACKGROUND_PRESETS':
      return _objectSpread(_objectSpread({}, state), {}, {
        backgrounds: _objectSpread(_objectSpread({}, state.backgrounds), {}, {
          presets: action.presets
        })
      });
    case 'ADD_ATTACHMENT_SIZES':
      return _objectSpread(_objectSpread({}, state), {}, {
        attachmentSizes: _objectSpread(_objectSpread({}, state.attachmentSizes), {}, _defineProperty({}, action.id, action.sizes))
      });
    default:
      return _objectSpread(_objectSpread({}, state), {}, {
        color: _objectSpread(_objectSpread({}, state.color), {}, {
          presets: state.color.presets
        })
      });
  }
});

/***/ }),

/***/ "./src/libraries/fl-controls/state/controls-store/requestidlecallback-polyfill.js":
/*!****************************************************************************************!*\
  !*** ./src/libraries/fl-controls/state/controls-store/requestidlecallback-polyfill.js ***!
  \****************************************************************************************/
/***/ (() => {

window.requestIdleCallback = window.requestIdleCallback || function (cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};
window.cancelIdleCallback = window.cancelIdleCallback || function (id) {
  clearTimeout(id);
};

/***/ }),

/***/ "./src/libraries/fl-controls/state/create-external-store/index.js":
/*!************************************************************************!*\
  !*** ./src/libraries/fl-controls/state/create-external-store/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var createExternalStore = function createExternalStore(initial) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var state = initial;
  var subscribers = new Set();
  var subscribe = function subscribe(callback) {
    subscribers.add(callback);
    return function () {
      return subscribers["delete"](callback);
    };
  };
  var getSnapshot = function getSnapshot() {
    return state;
  };
  var setState = function setState(newState) {
    state = newState;
    subscribers.forEach(function (callback) {
      return callback();
    });
  };
  var useExternalState = function useExternalState() {
    var _state = (0,react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore)(subscribe, getSnapshot);
    return [_state, setState];
  };

  // Setup External API
  var api = {
    subscribe: subscribe,
    getSnapshot: getSnapshot,
    setState: setState,
    useExternalState: useExternalState
  };
  var _loop = function _loop() {
    var callback = config[prop];
    api[prop] = function () {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      return setState(callback.apply(void 0, [getSnapshot()].concat(rest)));
    };
  };
  for (var prop in config) {
    _loop();
  }
  return api;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createExternalStore);

/***/ }),

/***/ "./src/libraries/fl-controls/state/create-form-store/index.js":
/*!********************************************************************!*\
  !*** ./src/libraries/fl-controls/state/create-form-store/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_external_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../create-external-store */ "./src/libraries/fl-controls/state/create-external-store/index.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var createFormStore = function createFormStore() {
  var _forms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // Ensure state is an array even if a single object is given
  var forms = Array.isArray(_forms) ? _forms : [_forms];
  var store = (0,_create_external_store__WEBPACK_IMPORTED_MODULE_0__["default"])(forms, {
    /**
     * These functions get wrapped into the store object with state passed.
     */
    setForm: function setForm(state, value) {
      return [value];
    },
    pushForm: function pushForm(state, value) {
      return [].concat(_toConsumableArray(state), [value]);
    },
    updateForms: function updateForms(state, value) {
      return value;
    },
    pop: function pop(state) {
      return state.toSpliced(-1, 1);
    },
    reset: function reset() {
      return [];
    },
    setCurrentForm: function setCurrentForm(forms) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return forms.toSpliced(-1, 1, state);
    }
  });
  store.useFormState = store.useExternalState;
  return store;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createFormStore);

/***/ }),

/***/ "./src/libraries/fl-controls/state/index.js":
/*!**************************************************!*\
  !*** ./src/libraries/fl-controls/state/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createExternalStore: () => (/* reexport safe */ _create_external_store__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   createFormStore: () => (/* reexport safe */ _create_form_store__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   useControlsStore: () => (/* binding */ useControlsStore)
/* harmony export */ });
/* harmony import */ var _controls_store_index_v2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls-store/index-v2.js */ "./src/libraries/fl-controls/state/controls-store/index-v2.js");
/* harmony import */ var _create_external_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-external-store */ "./src/libraries/fl-controls/state/create-external-store/index.js");
/* harmony import */ var _create_form_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-form-store */ "./src/libraries/fl-controls/state/create-form-store/index.js");



var _createControlsStore = (0,_controls_store_index_v2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
  useControlsStore = _createControlsStore.useControlsStore;


/***/ }),

/***/ "./src/libraries/fl-controls/style.scss":
/*!**********************************************!*\
  !*** ./src/libraries/fl-controls/style.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/libraries/fl-controls/utils/color/index.js":
/*!********************************************************!*\
  !*** ./src/libraries/fl-controls/utils/color/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hexToRGB: () => (/* binding */ hexToRGB),
/* harmony export */   hslToRgb: () => (/* binding */ hslToRgb),
/* harmony export */   hwbToRgb: () => (/* binding */ hwbToRgb),
/* harmony export */   isHex: () => (/* binding */ isHex),
/* harmony export */   rgbToHex: () => (/* binding */ rgbToHex),
/* harmony export */   rgbToHsl: () => (/* binding */ rgbToHsl),
/* harmony export */   rgbToHwb: () => (/* binding */ rgbToHwb)
/* harmony export */ });
/**
 * Color functions - many pulled directly from W3C Spec
 * https://drafts.csswg.org/css-color
 */

/**
 * @param {number} hue - Hue as degrees 0..360
 * @param {number} sat - Saturation in reference range [0,100]
 * @param {number} light - Lightness in reference range [0,100]
 * @return {number[]} Array of sRGB components; in-gamut colors in range [0..1]
 */
function hslToRgb(hue, sat, light) {
  var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  hue = hue % 360;
  if (hue < 0) {
    hue += 360;
  }
  sat /= 100;
  light /= 100;
  function f(n) {
    var k = (n + hue / 30) % 12;
    var a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }
  return [f(0), f(8), f(4), a];
}

/**
 * @param {number} hue -  Hue as degrees 0..360
 * @param {number} white -  Whiteness in reference range [0,100]
 * @param {number} black -  Blackness in reference range [0,100]
 * @return {number[]} Array of RGB components 0..1
 */
function hwbToRgb(hue, white, black) {
  white /= 100;
  black /= 100;
  if (white + black >= 1) {
    var gray = white / (white + black);
    return [gray, gray, gray];
  }
  var rgb = hslToRgb(hue, 100, 50);
  for (var i = 0; i < 3; i++) {
    rgb[i] *= 1 - white - black;
    rgb[i] += white;
  }
  return rgb;
}

/**
 * @param {number} red - Red component 0..1
 * @param {number} green - Green component 0..1
 * @param {number} blue - Blue component 0..1
 * @return {number[]} Array of HSL values: Hue as degrees 0..360, Saturation and Lightness in reference range [0,100]
 */
function rgbToHsl(red, green, blue) {
  var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var hue = 0,
    sat = 0,
    light = (min + max) / 2;
  var d = max - min;
  if (d !== 0) {
    sat = light === 0 || light === 1 ? 0 : (max - light) / Math.min(light, 1 - light);
    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / d + 2;
        break;
      case blue:
        hue = (red - green) / d + 4;
    }
    hue = hue * 60;
  }

  // Very out of gamut colors can produce negative saturation
  // If so, just rotate the hue by 180 and use a positive saturation
  // see https://github.com/w3c/csswg-drafts/issues/9222
  if (sat < 0) {
    hue += 180;
    sat = Math.abs(sat);
  }
  if (hue >= 360) {
    hue = hue - 360;
  }
  return [parseInt(hue), (sat * 100).toFixed(2), (light * 100).toFixed(2), a];
}

/**
 * @param {number} red - Red component 0..1
 * @param {number} green - Green component 0..1
 * @param {number} blue - Blue component 0..1
 * @return {number[]} Array of HWB values: Hue as degrees 0..360, Whiteness and Blackness in reference range [0,100]
 */
function rgbToHwb(red, green, blue) {
  var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var hsl = rgbToHsl(red, green, blue);
  var white = Math.min(red, green, blue);
  var black = 1 - Math.max(red, green, blue);
  return [parseFloat(hsl[0].toFixed(2)), (white * 100).toFixed(2), (black * 100).toFixed(2), a];
}
var isHex = function isHex(color) {
  return /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
};
function hexToRGB(h) {
  var r = 0,
    g = 0,
    b = 0,
    a = 1;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];

    // 4 digits
  } else if (h.length == 5) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    a = "0x" + h[4] + h[4];

    // 8 digits
  } else if (h.length == 9) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = "0x" + h[7] + h[8];
  }
  a = +(a / 255).toFixed(3);
  r = parseInt(r);
  g = parseInt(g);
  b = parseInt(b);
  return [r, g, b, a];
}
var rgbToHex = function rgbToHex(r, g, b) {
  return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

/***/ }),

/***/ "./src/libraries/fl-controls/utils/index.js":
/*!**************************************************!*\
  !*** ./src/libraries/fl-controls/utils/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   color: () => (/* reexport module object */ _color__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   degreesToPercent: () => (/* binding */ degreesToPercent),
/* harmony export */   mapNumRange: () => (/* binding */ mapNumRange),
/* harmony export */   useClickOutside: () => (/* reexport safe */ _use_click_outside__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   useJQuerySortable: () => (/* reexport safe */ _use_jquery_sortable__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   usePreventWheel: () => (/* reexport safe */ _use_prevent_wheel__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _use_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-click-outside */ "./src/libraries/fl-controls/utils/use-click-outside.js");
/* harmony import */ var _use_jquery_sortable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-jquery-sortable */ "./src/libraries/fl-controls/utils/use-jquery-sortable.js");
/* harmony import */ var _use_prevent_wheel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-prevent-wheel */ "./src/libraries/fl-controls/utils/use-prevent-wheel.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color */ "./src/libraries/fl-controls/utils/color/index.js");





var clamp = function clamp(num, a, b) {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
};
var mapNumRange = function mapNumRange(num, inMin, inMax, outMin, outMax) {
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};
var degreesToPercent = function degreesToPercent(v) {
  return mapNumRange(v, 0, 360, 0, 100);
};

/***/ }),

/***/ "./src/libraries/fl-controls/utils/use-click-outside.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/utils/use-click-outside.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Fire callback if any click is outside of a certain dom element.
 * Given ref must be passed to dom element.
 */
var useClickOutside = function useClickOutside() {
  var onClickOutside = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var checkClick = function checkClick(e) {
    if (!e.composedPath().includes(ref.current)) {
      onClickOutside(e);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function () {
    window.parent.addEventListener('pointerdown', checkClick);
    return function () {
      return window.parent.removeEventListener('pointerdown', checkClick);
    };
  }, []);
  return ref;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useClickOutside);

/***/ }),

/***/ "./src/libraries/fl-controls/utils/use-jquery-sortable.js":
/*!****************************************************************!*\
  !*** ./src/libraries/fl-controls/utils/use-jquery-sortable.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Hook that accepts a jQuery.sortable() config object and returns a ref callback
 * Add the ref to the root list wrapper that you would normally apply sortable to.
 *
 * @param {Object} Sortable config
 * @param Array deps - just like dependencies for useCallback or useEffect
 * @return Function - ref callback
 */
var useJQuerySortable = function useJQuerySortable() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (el) {
    var $el = jQuery(el).sortable(config);
    //return () => $el.sortable( 'destroy' )
  }, deps);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useJQuerySortable);

/***/ }),

/***/ "./src/libraries/fl-controls/utils/use-prevent-wheel.js":
/*!**************************************************************!*\
  !*** ./src/libraries/fl-controls/utils/use-prevent-wheel.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var stopWheel = function stopWheel(e) {
  return e.stopPropagation();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    el = _useState2[0],
    setEl = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (el) {
      el.addEventListener('wheel', stopWheel, {
        passive: false
      });
      return function () {
        return el.removeEventListener('wheel', stopWheel);
      };
    }
  }, [el]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(setEl);
});

/***/ }),

/***/ "@wordpress/hooks":
/*!***************************!*\
  !*** external "wp.hooks" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = wp.hooks;

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = wp.i18n;

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

/***/ "redux":
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = Redux;

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
/*!********************************************!*\
  !*** ./src/libraries/fl-controls/index.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/libraries/fl-controls/state/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/libraries/fl-controls/components/index.js");
/* harmony import */ var _field_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field-types */ "./src/libraries/fl-controls/field-types/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/libraries/fl-controls/style.scss");




window.FL = window.FL || {};
FL.Controls = {
  useControlsStore: _state__WEBPACK_IMPORTED_MODULE_0__.useControlsStore,
  createFormStore: _state__WEBPACK_IMPORTED_MODULE_0__.createFormStore,
  Color: _components__WEBPACK_IMPORTED_MODULE_1__.Color,
  Background: _components__WEBPACK_IMPORTED_MODULE_1__.Background,
  Gradient: _components__WEBPACK_IMPORTED_MODULE_1__.Gradient,
  Dialog: _components__WEBPACK_IMPORTED_MODULE_1__.Dialog,
  DialogButton: _components__WEBPACK_IMPORTED_MODULE_1__.DialogButton,
  Error: _components__WEBPACK_IMPORTED_MODULE_1__.Error,
  Section: _components__WEBPACK_IMPORTED_MODULE_1__.Section,
  Series: _components__WEBPACK_IMPORTED_MODULE_1__.Series,
  Input: _components__WEBPACK_IMPORTED_MODULE_1__.Input,
  fieldTypes: _field_types__WEBPACK_IMPORTED_MODULE_2__
};
})();

/******/ })()
;
