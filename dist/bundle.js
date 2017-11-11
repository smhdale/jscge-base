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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
    for (let fn of this._downEvents) {
      fn()
    }
  }
  release () {
    this.down = false
    for (let fn of this._upEvents) {
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
    let b = this._getOrAddButton(button)
    b.addDownEvent(callback)
  }

  // Add a callback event to button release
  _addUpEvent (button, callback) {
    let b = this._getOrAddButton(button)
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_keycode__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_keycode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_keycode__);



class jscge_Keyboard extends __WEBPACK_IMPORTED_MODULE_0__buttonmap__["a" /* default */] {
  constructor () {
    super()
    this._addEventListeners()
  }

  _parseKey (key) {
    if (typeof key === 'string') {
      // If key is string, convert it to keycode
      let keyCode = __WEBPACK_IMPORTED_MODULE_1_keycode___default()(key)
      if (keyCode === undefined) {
        throw new TypeError(`The specified key does not exist: ${key}`)
      }
      return keyCode
    } else if (typeof key === 'number') {
      // User used keyCode directly
      return key
    } else {
      // Argument error
      throw new TypeError('Key must be either string or integer keyCode')
    }
  }

  onKeyDown (key, callback) {
    let keyCode = this._parseKey(key)
    this._addDownEvent(keyCode, callback)
  }

  onKeyUp (key, callback) {
    let keyCode = this._parseKey(key)
    this._addUpEvent(keyCode, callback)
  }

  _addEventListeners () {
    window.addEventListener('keydown', e => this._handleButtonDown(e.keyCode))
    window.addEventListener('keyup', e => this._handleButtonUp(e.keyCode))
  }
}

// Singleton class
/* harmony default export */ __webpack_exports__["a"] = (new jscge_Keyboard());


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function distBetween (x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2, (y2 - y1) ** 2)
}

/* harmony default export */ __webpack_exports__["a"] = ({
  distBetween
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__line__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rect__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spline__ = __webpack_require__(13);
/* unused harmony reexport Line */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__rect__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__path__["a"]; });
/* unused harmony reexport Spline */








/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


// Basically a long line that points can be added to

class Path {
  constructor (x, y, strokeStyle = '#000', lineWidth = 1) {
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth

    this.points = []
    this.addPoint(x, y)
  }

  get numPoints () {
    return this.points.length
  }

  addPoint (x, y) {
    this.points.push({
      x: x,
      y: y
    })
  }

  _drawLine () {
    let ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      let p = this.points[i]
      ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
  }

  draw () {
    if (this.numPoints > 1) {
      let ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_paint__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_mousetrack__ = __webpack_require__(14);
// Control imports





// Instance imports



let counter = 0
let seconds = 0
const FPS = __WEBPACK_IMPORTED_MODULE_1__dt__["a" /* default */].fps
const fpsArea = document.querySelector('#fps')

let lines = []
const mouseTracker = new __WEBPACK_IMPORTED_MODULE_5__objects_mousetrack__["a" /* default */]()

__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].onLeftDown(() => {
  lines.push(new __WEBPACK_IMPORTED_MODULE_4__objects_paint__["a" /* default */]())
})

function update () {
  __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].update()

  // Update all instances
  //InstanceManager.updateAll()
  for (let line of lines) {
    line.update()
  }

  mouseTracker.update()

  draw()
}

function draw () {
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].clear()

  //InstanceManager.drawAll()
  for (let line of lines) {
    line.draw()
  }

  mouseTracker.draw()
}

draw()
__WEBPACK_IMPORTED_MODULE_1__dt__["a" /* default */].start(update)


/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trig__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shapes_index__ = __webpack_require__(5);




class Paint {
  constructor () {
    // Props
    this.path = new __WEBPACK_IMPORTED_MODULE_2__shapes_index__["a" /* Path */](__WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x, __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y)
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
      let latest = this.getLatestPoint()
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


class Line {
  constructor (x1, y1, x2, y2, colour = '#000', width = 1) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.colour = colour
    this.width = width
  }

  draw () {
    let ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

    // Line style
    ctx.strokeStyle = this.colour
    ctx.lineWidth = this.width

    // Draw line
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Line);


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
    this.strokeStyle = strokeStyle,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trig__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path__ = __webpack_require__(6);




// Curved version of a path

class Spline extends __WEBPACK_IMPORTED_MODULE_2__path__["a" /* default */] {
  constructor(x, y, strokeStyle = '#000', lineWidth = '#000', tension = 0.5) {
    super(x, y, strokeStyle, lineWidth)
    this.tension = tension
    this._controlPoints = []
  }

  addPoint (x, y) {
    this.points.push({
      x: x,
      y: y
    })
    if (this.numPoints > 2) {
      this._refreshControlPoints()
    }
  }

  _calculateControlPoints(p1, p2, p3) {
    const dx = p3.x - p1.x
    const dy = p3.y - p1.y
    const dist1 = __WEBPACK_IMPORTED_MODULE_1__trig__["a" /* default */].distBetween(p1.x, p1.y, p2.x, p2.y)
    const dist2 = __WEBPACK_IMPORTED_MODULE_1__trig__["a" /* default */].distBetween(p2.x, p2.y, p3.x, p3.y)
    const distTotal = dist1 + dist2

    // Return two control points
    return [
      {
        x: p2.x - dx * this.tension * dist1 / distTotal,
        y: p2.y - dy * this.tension * dist1 / distTotal
      },
      {
        x: p2.x + dx * this.tension * dist2 / distTotal,
        y: p2.y + dy * this.tension * dist2 / distTotal
      }
    ]
  }

  _refreshControlPoints(p1, p2) {
    this._controlPoints = []
    for (let i = 0; i < this.numPoints - 2; i++) {
      const [ cp1, cp2 ] = this._calculateControlPoints(this.points[i], this.points[i+1], this.points[i+2])
      console.dir(cp1)
      this._controlPoints.push(cp1, cp2)
    }
  }

  _drawSpline () {
    let ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()
    const numPoints = this.numPoints
    const pts = this.points
    const cps = this._controlPoints

    // Draw spline
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)

    // First curve is quadratic
    ctx.quadraticCurveTo(cps[0].x, cps[0].y, pts[1].x, pts[1].y)

    // Connect middle points with bezier
    let i
    for (i = 1; i < numPoints - 1; i++) {
      ctx.bezierCurveTo(
        cps[(i-1)*2].x, cps[(i-1)*2].y,
        cps[(i-1)*2+1].x, cps[(i-1)*2+1].y,
        pts[i].x, pts[i].y
      )
    }

    // Last curve is quadratic
    ctx.quadraticCurveTo(cps[(i-1)*2-1].x, cps[(i-1)*2-1].y, pts[i].x, pts[i].y)
    ctx.stroke()
  }

  draw () {
    if (this.numPoints > 1) {
      // Only draw if more than 1 point
      let ctx = __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].getContext()

      // Line style
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth

      if (this.numPoints === 2) {
        // Only two points, draw straight line
        this._drawLine()
      } else {
        this._drawSpline()
      }
    }
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Spline);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shapes_index__ = __webpack_require__(5);




class MouseTrack {
  constructor () {
    this.side = 50
    this.mainRect = new __WEBPACK_IMPORTED_MODULE_2__shapes_index__["b" /* Rect */](0, 0, this.side, this.side, '#f00', 1)
    this.clickRect = new __WEBPACK_IMPORTED_MODULE_2__shapes_index__["b" /* Rect */](0, 0, this.side/2, this.side/2, '#0f0')
    this.spaceRect = new __WEBPACK_IMPORTED_MODULE_2__shapes_index__["b" /* Rect */](0, 0, this.side/2, this.side/2, '#00f')

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
    this.mainRect.x = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x - this.side / 2
    this.mainRect.y = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y - this.side / 2
    this.clickRect.x = this.mainRect.x
    this.clickRect.y = this.mainRect.y
    this.spaceRect.x = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].x
    this.spaceRect.y = __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* default */].y
  }

  draw () {
    this.mainRect.draw()
    if (this.showClick) {
      this.clickRect.draw()
    }
    if (this.showSpace) {
      this.spaceRect.draw()
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MouseTrack);


/***/ })
/******/ ]);