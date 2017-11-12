/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Canvas {
  constructor () {
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d')

    this._initCanvas()

    this._transparentColours = /^(transparent|rgba\(\d+ ?, ?\d+ ?, ?\d+ ?, ?0\)|hsla\(\d+ ?, ?\d+ ?, ?\d+ ?, ?0\))$/

    // Canvas defaults
    this.fillStyle = '#000'
    this.strokeStyle = '#000'
    this.lineWidth = 0
  }

  // Canvas props
  get width () {
    return this._canvas.width
  }
  get height () {
    return this._canvas.height
  }

  // Set up canvas and add to DOM
  _initCanvas () {
    this._canvas.width = window.innerWidth
    this._canvas.height = window.innerHeight
    this._canvas.style.position = 'absolute'
    this._canvas.style.width = '100vw'
    this._canvas.style.height = '100vh'
    document.body.appendChild(this._canvas)
  }

  colourVisible (col) {
    return (col && !this._transparentColours.test(col))
  }

  // Get canvas context for fine-grained drawing control
  getContext () {
    return this._ctx
  }

  // Clear canvas, called automatically at start of every draw
  clear () {
    this._ctx.clearRect(0, 0, this.width, this.height)
  }

  // Shows or hides mouse
  setMouseVisibility (visible = true) {
    this._canvas.style.cursor = (visible ? 'default' : 'none')
  }
}

// Singleton class
/* harmony default export */ __webpack_exports__["a"] = (new Canvas());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttonmap__ = __webpack_require__(2);


class jscge_Mouse extends __WEBPACK_IMPORTED_MODULE_0__buttonmap__["a" /* default */] {
  constructor () {
    super()
    this.x = 0
    this.y = 0

    this.xPrev = 0
    this.yPrev = 0

    this._buttonNames = {
      'left': 0,
      'right': 2
    }

    this._addEventListeners()
  }

  get dx () {
    return this.x - this.xPrev
  }
  get dy () {
    return this.y - this.yPrev
  }

  get leftDown () {
    return this
  }
  get rightDown () {
    return this.checkPressed(this._buttonNames.right)
  }

  // Tracking mouse position
  _setPos (evt) {
    this.x = evt.clientX
    this.y = evt.clientY
  }

  update () {
    if (this.xPrev !== this.x || this.yPrev !== this.y) {
      this.xPrev = this.x
      this.yPrev = this.y
    }
  }

  _addEventListeners () {
    window.addEventListener('mousemove', this._setPos.bind(this))
    window.addEventListener('mousedown', e => this._handleButtonDown(e.button))
    window.addEventListener('mouseup', e => this._handleButtonUp(e.button))
    window.addEventListener('contextmenu', evt => evt.preventDefault())
  }

  // PUBLIC METHODS

  // For adding callbacks to left mouse button
  onLeftDown (callback) {
    this._addDownEvent(this._buttonNames.left, callback)
  }
  onLeftUp (callback) {
    this._addUpEvent(this._buttonNames.left, callback)
  }

  // For adding callbacks to right mouse button
  onRightDown (callback) {
    this._addDownEvent(this._buttonNames.right, callback)
  }
  onRightUp (callback) {
    this._addUpEvent(this._buttonNames.right, callback)
  }
}

// Singleton class
/* harmony default export */ __webpack_exports__["a"] = (new jscge_Mouse());


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Simple button class
 */

class jscge_Button {
  constructor (id) {
    this.button = id
    this.down = false
    this._downEvents = []
    this._upEvents = []
  }

  // Add an event
  addDownEvent (callback) {
    this._downEvents.push(callback)
  }
  addUpEvent (callback) {
    this._upEvents.push(callback)
  }

  // Run all events bound to button up/down
  press () {
    this.down = true
    for (const fn of this._downEvents) {
      fn()
    }
  }
  release () {
    this.down = false
    for (const fn of this._upEvents) {
      fn()
    }
  }
}

/**
 * Class for keeping track of multiple button states
 * and applying event listeners to press & release events
 */

class jscge_ButtonMap {
  constructor () {
    this._buttons = {}
  }

  // PRIVATE METHODS

  // Gets a button from the map
  // Returns undefined if it doesn't exist
  _getButton (button) {
    if (this._buttons.hasOwnProperty(button)) {
      return this._buttons[button]
    }
    return undefined
  }

  // Adds a button to the button map and return it
  _addButton (button) {
    const newButton = new jscge_Button(button)
    this._buttons[button] = newButton
    return newButton
  }

  // Add to map if undefined
  _getOrAddButton (button) {
    const b = this._getButton(button)
    if (b) {
      return b
    }
    return this._addButton(button)
  }

  // Handle button press
  _handleButtonDown (button) {
    const b = this._getOrAddButton(button)
    if (!b.down) {
      b.press()
    }
  }

  // Handle button release
  _handleButtonUp (button) {
    const b = this._getOrAddButton(button)
    if (b.down) {
      b.release()
    }
  }

  // Add a callback event to button press
  _addDownEvent (button, callback) {
    const b = this._getOrAddButton(button)
    b.addDownEvent(callback)
  }

  // Add a callback event to button release
  _addUpEvent (button, callback) {
    const b = this._getOrAddButton(button)
    b.addUpEvent(callback)
  }

  // PUBLIC METHODS

  // Checks if a button is pressed
  checkPressed (button) {
    const b = this._getOrAddButton(button)
    return b.down
  }
}

/* harmony default export */ __webpack_exports__["a"] = (jscge_ButtonMap);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttonmap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_keycode__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_keycode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_keycode__);



// Parse key strings to keyCodes

function parseKey (key) {
  if (typeof key === 'string') {
    // If key is string, convert it to keycode
    const keyCode = __WEBPACK_IMPORTED_MODULE_1_keycode___default()(key)
    if (keyCode === undefined) {
      throw new TypeError(`The specified key does not exist: ${key}`)
    }
    return keyCode
  } else if (typeof key === 'number') {
    // User used keyCode directly
    return key
  }
  // Argument error
  throw new TypeError('Key must be either string or integer keyCode')
}

// Keyboard class

class jscge_Keyboard extends __WEBPACK_IMPORTED_MODULE_0__buttonmap__["a" /* default */] {
  constructor () {
    super()
    this._addEventListeners()
  }

  _addEventListeners () {
    window.addEventListener('keydown', e => this._handleButtonDown(e.keyCode))
    window.addEventListener('keyup', e => this._handleButtonUp(e.keyCode))
  }

  onKeyDown (key, callback) {
    const keyCode = parseKey(key)
    this._addDownEvent(keyCode, callback)
  }

  onKeyUp (key, callback) {
    const keyCode = parseKey(key)
    this._addUpEvent(keyCode, callback)
  }

  // Checks if a button is pressed
  checkPressed (key) {
    const keyCode = parseKey(key)
    return super.checkPressed(keyCode)
  }
}

// Singleton class
/* harmony default export */ __webpack_exports__["a"] = (new jscge_Keyboard());


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const distBetween = (x1, y1, x2, y2) => ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
const lengthdirX = (len, dir) => len * Math.cos(dir)
const lengthdirY = (len, dir) => len * Math.sin(dir)

/* harmony default export */ __webpack_exports__["a"] = ({
  distBetween,
  lengthdirX,
  lengthdirY
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__line__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__path__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rect__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ellipse__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__polygon__ = __webpack_require__(14);
/* unused harmony reexport Line */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__path__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__rect__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__ellipse__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__polygon__["a"]; });









/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dt__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_paint__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_mousetrack__ = __webpack_require__(15);
// Control imports





// Instance imports



let lines = []
const mouseTracker = new __WEBPACK_IMPORTED_MODULE_5__objects_mousetrack__["a" /* default */]()

// Hide mouse
__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].setMouseVisibility(false)

// Draw
__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].onLeftDown(() => {
  lines.push(new __WEBPACK_IMPORTED_MODULE_4__objects_paint__["a" /* default */]())
})

// Undo
__WEBPACK_IMPORTED_MODULE_3__keyboard__["a" /* default */].onKeyDown('z', () => {
  if (lines.length > 0 && __WEBPACK_IMPORTED_MODULE_3__keyboard__["a" /* default */].checkPressed('control')) {
    lines = lines.filter((_, i) => i < lines.length - 1)
  }
})

function update () {
  __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].update()

  // Update all instances
  //InstanceManager.updateAll()
  for (const line of lines) {
    line.update()
  }

  mouseTracker.update()

  draw()
}

function draw () {
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].clear()

  //InstanceManager.drawAll()
  for (const line of lines) {
    line.draw()
  }

  mouseTracker.draw()
}

draw()
__WEBPACK_IMPORTED_MODULE_1__dt__["a" /* default */].start(update)


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DeltaTime {
  constructor (fps = 60) {
    this.fps = fps
    this._animLoop = null

    this._updateFunction = this._update.bind(this)
    this._gameLoopFunction = null

    this._lastUpdate = -1
  }

  get frameTime () {
    return 1000 / this.fps
  }

  // Takes a callback update function
  start (gameLoopFunction) {
    if (gameLoopFunction) {
      this._gameLoopFunction = gameLoopFunction
      window.requestAnimationFrame(this._updateFunction)
    }
  }

  // Sets the FPS for game logic
  setFPS (fps) {
    if (typeof fps !== 'number') {
      throw new TypeError('FPS must be numberical')
    }
    this.fps = fps
  }

  // Handles requestAnimationFrame
  _update (timestamp) {
    // Handle dt
    if (this._lastUpdate === -1) {
      this._lastUpdate = timestamp
    }

    // Time elapsed since last draw
    let dt = timestamp - this._lastUpdate
    this._lastUpdate = timestamp

    // Pause the game when tab loses focus for > 1 sec
    if (dt > this.frameTime * this.fps) {
      dt = 0
    }

    // Run game logic at constant FPS
    while (dt - this.frameTime > 0) {
      this._gameLoopFunction()
      dt -= this.frameTime
    }

    window.requestAnimationFrame(this._updateFunction)
  }
}

// Singleton class
/* harmony default export */ __webpack_exports__["a"] = (new DeltaTime());


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trig__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shapes_index__ = __webpack_require__(5);




class Paint {
  constructor () {
    // Props
    this.path = new __WEBPACK_IMPORTED_MODULE_2__shapes_index__["b" /* Path */](__WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x, __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y)
    this.threshold = 2
    this.drawing = true

    // Methods
    this.addPoint = function () {
      this.path.addPoint(__WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x, __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y)
    }
    this.getLatestPoint = function () {
      return this.path.points[this.path.numPoints - 1]
    }

    // Mouse & KB bindings
    __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].onLeftUp(() => {
      this.drawing = false
    })
  }

  update () {
    if (this.drawing) {
      const latest = this.getLatestPoint()
      if (__WEBPACK_IMPORTED_MODULE_1__trig__["a" /* default */].distBetween(latest.x, latest.y, __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x, __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y) > this.threshold) {
        this.addPoint()
      }
    }
  }

  draw () {
    this.path.draw()
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Paint);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


class Line {
  constructor (x1, y1, x2, y2, lineWidth = 1, strokeStyle = '#000') {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
  }

  draw () {
    const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    // Line style
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth

    // Draw line
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke()
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Line);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


// Basically a long line that points can be added to

class Path {
  constructor (x, y, lineWidth = 1, strokeStyle = '#000') {
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth

    this.points = []
    this.addPoint(x, y)
  }

  get numPoints () {
    return this.points.length
  }

  addPoint (x, y) {
    this.points.push({ x, y })
  }

  _drawLine () {
    const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      const p = this.points[i]
      ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
  }

  draw () {
    if (this.numPoints > 1) {
      const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

      // Line style
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth

      // Draw path
      this._drawLine()
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Path);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


class Rect {
  constructor (x, y, width, height, fillStyle = '#000', lineWidth = 0, strokeStyle = '#000') {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
  }

  draw () {
    const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    // Draw filled rect
    if (__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].colourVisible(this.fillStyle)) {
      ctx.fillStyle = this.fillStyle
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    // Draw stroke
    if (this.lineWidth > 0) {
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Rect);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


class Ellipse {
  constructor (x, y, radiusX, radiusY, fillStyle = '#000', lineWidth = 0, strokeStyle = '#000') {
    this.x = x
    this.y = y
    this.radiusX = radiusX
    this.radiusY = radiusY
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth

    // Angle properties
    this.rotation = 0
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
  }

  draw () {
    const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    // Draw filled rect
    if (__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].colourVisible(this.fillStyle)) {
      ctx.fillStyle = this.fillStyle
      ctx.beginPath()
      ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
      ctx.fill()
    }

    // Draw stroke
    if (this.lineWidth > 0) {
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth
      ctx.beginPath()
      ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
      ctx.stroke()
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ellipse);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


// Basically a long line that points can be added to

class Polygon {
  constructor (x, y, points, fillStyle = '#000', lineWidth = 1, strokeStyle = '#000') {
    // Error checking
    if (!Array.isArray(points)) {
      throw new TypeError('Argument `points` should be array of { x, y }')
    } else if (points.length < 3) {
      throw new RangeError('Polygon must have at least three points')
    }
    this.points = points

    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
  }

  get numPoints () {
    return this.points.length
  }

  addPoint (x, y) {
    this.points.push({ x, y })
  }

  _drawPoly () {
    const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()
    ctx.beginPath()

    // Draw shape
    for (let i = 0; i < this.numPoints; i++) {
      const { x, y } = this.points[i]
      if (i === 0) {
        ctx.moveTo(this.x + x, this.y + y)
      } else {
        ctx.lineTo(this.x + x, this.y + y)
      }
    }

    // Close shape
    ctx.closePath()
  }

  draw () {
    const ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    // Draw filled shape
    if (__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].colourVisible(ctx.fillStyle)) {
      ctx.fillStyle = this.fillStyle
      this._drawPoly()
      ctx.fill()
    }

    // Draw stroke
    if (this.lineWidth > 0) {
      ctx.lineWidth = this.lineWidth
      ctx.strokeStyle = this.strokeStyle
      this._drawPoly()
      ctx.stroke()
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Polygon);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trig__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shapes_index__ = __webpack_require__(5);





// Wang Yu Wei

class MouseTracker {
  constructor () {
    const side = 100
    this.side = side

    const mainRectPts = [
      { x: 0, y: 0 },
      { x: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirX(side, Math.PI / 4), y: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirY(side, Math.PI / 4) },
      { x: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirX(side * 0.85, Math.PI * 4 / 12), y: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirY(side * 0.85, Math.PI * 4 / 12) },
      { x: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirX(side * 1.2, Math.PI * 4.15 / 12), y: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirY(side * 1.2, Math.PI * 4.15 / 12) },
      { x: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirX(side * 1.2, Math.PI * 4.85 / 12), y: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirY(side * 1.2, Math.PI * 4.85 / 12) },
      { x: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirX(side * 0.85, Math.PI * 5 / 12), y: __WEBPACK_IMPORTED_MODULE_2__trig__["a" /* default */].lengthdirY(side * 0.85, Math.PI * 5 / 12) },
      { x: 0, y: side }
    ]
    this.mainRect = new __WEBPACK_IMPORTED_MODULE_3__shapes_index__["c" /* Polygon */](0, 0, mainRectPts, '#f00', 5, '#0ff')

    this.clickRect = new __WEBPACK_IMPORTED_MODULE_3__shapes_index__["a" /* Ellipse */](0, 0, this.side / 4, this.side / 4, '#ff0', 5, '#0f0')
    this.spaceRect = new __WEBPACK_IMPORTED_MODULE_3__shapes_index__["d" /* Rect */](0, 0, this.side / 2, this.side / 2, '#00f')

    this.showClick = false
    this.showSpace = false

    // Listeners
    __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].onLeftDown(() => {
      this.showClick = true
    })
    __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].onLeftUp(() => {
      this.showClick = false
    })
    __WEBPACK_IMPORTED_MODULE_1__keyboard__["a" /* default */].onKeyDown('space', () => {
      this.showSpace = true
    })
    __WEBPACK_IMPORTED_MODULE_1__keyboard__["a" /* default */].onKeyUp('space', () => {
      this.showSpace = false
    })
  }

  update () {
    this.mainRect.x = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x
    this.mainRect.y = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y
    this.clickRect.x = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x
    this.clickRect.y = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y
    this.spaceRect.x = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x - this.side / 4
    this.spaceRect.y = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y - this.side / 4
  }

  draw () {
    if (this.showClick) {
      this.clickRect.draw()
    }
    if (this.showSpace) {
      this.spaceRect.draw()
    }
    this.mainRect.draw()
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MouseTracker);


/***/ })
/******/ ]);