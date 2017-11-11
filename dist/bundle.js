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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
  }

  get width () {
    return this._canvas.width
  }

  get height () {
    return this._canvas.height
  }

  _initCanvas () {
    this._canvas.width = window.innerWidth
    this._canvas.height = window.innerHeight
    this._canvas.style.position = 'absolute'
    this._canvas.style.width = '100vw'
    this._canvas.style.height = '100vh'
    document.body.appendChild(this._canvas)
  }

  clear () {
    this._ctx.clearRect(0, 0, this.width, this.height)
  }

  // Set fill and stroke styles
  _setFill (col) {
    this._ctx.fillStyle = col
  }
  _setStroke (col) {
    this._ctx.strokeStyle = col
  }

  // Drawing functions

  // Line
  line (x1, y1, x2, y2, strokeCol) {
    this._setStroke(strokeCol)
    this._ctx.beginPath()
    this._ctx.moveTo(x1, y1)
    this._ctx.lineTo(x2, y2)
    this._ctx.stroke()
  }

  // Rectangle
  rect (x, y, w, h, fillCol = '#000', strokeCol = null) {
    // Handle fill
    if (fillCol) {
      this._setFill(fillCol)
      this._ctx.fillRect(x, y, w, h)
    }

    // Handle stroke
    if (strokeCol) {
      this._setStroke(strokeCol)
      this._ctx.strokeRect(x, y, w, h)
    }
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
  onRightDown (callback) {
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
    this._buttons = []
  }

  // PRIVATE METHODS

  // Gets a button from the map
  // Returns undefined if it doesn't exist
  _getButton (button) {
    return this._buttons.find(_ => _.button === button)
  }

  // Adds a button to the button map and return it
  _addButton (button) {
    const newButton = new jscge_Button(button)
    this._buttons.push(newButton)
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keyboard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_line__ = __webpack_require__(7);
// Control imports





// Instance imports


let counter = 0
let seconds = 0
const FPS = __WEBPACK_IMPORTED_MODULE_1__dt__["a" /* default */].fps
const fpsArea = document.querySelector('#fps')

let drawGreen = false
let drawBlue = false
let lines = []

function update () {
  __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].update()

  // Update all instances
  //InstanceManager.updateAll()
  for (let line of lines) {
    line.update()
  }
  draw()
}

__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].onLeftDown(() => {
  drawGreen = true
  lines.push(new __WEBPACK_IMPORTED_MODULE_4__objects_line__["a" /* default */]())
})
__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].onLeftUp(() => {
  drawGreen = false
})

__WEBPACK_IMPORTED_MODULE_3__keyboard__["a" /* default */].onKeyDown('space', () => {
  drawBlue = true
})
__WEBPACK_IMPORTED_MODULE_3__keyboard__["a" /* default */].onKeyUp('space', () => {
  drawBlue = false
})

function draw () {
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].clear()

  for (let line of lines) {
    line.draw()
  }

  let side = 50
  __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].rect(__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].x - side/2, __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].y - side/2, side, side, '#f00')

  if (drawGreen) {
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].rect(__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].x - side/2, __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].y - side/2, side/2, side/2, '#0f0')
  }
  if (drawBlue) {
    __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].rect(__WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].x, __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */].y, side/2, side/2, '#00f')
  }

  //InstanceManager.drawAll()
}

draw()
__WEBPACK_IMPORTED_MODULE_1__dt__["a" /* default */].start(update)


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttonmap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_keycode__ = __webpack_require__(6);
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse__ = __webpack_require__(1);



class Line {
  constructor () {
    // Props
    this.points = []
    this.threshold = 2
    this.drawing = true

    // Methods
    this.addPoint = function () {
      this.points.push({ x: __WEBPACK_IMPORTED_MODULE_1__mouse__["a" /* default */].x, y: __WEBPACK_IMPORTED_MODULE_1__mouse__["a" /* default */].y })
    }
    this.getLatestPoint = () => this.points[this.points.length - 1]
    this.distBetween = function (x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    }

    // Mouse & KB bindings
    __WEBPACK_IMPORTED_MODULE_1__mouse__["a" /* default */].onLeftUp(() => {
      this.drawing = false
    })
  }

  update () {
    if (this.drawing) {
      if (this.points.length === 0) {
        this.addPoint()
      } else {
        let latest = this.getLatestPoint()
        if (this.distBetween(latest.x, latest.y, __WEBPACK_IMPORTED_MODULE_1__mouse__["a" /* default */].x, __WEBPACK_IMPORTED_MODULE_1__mouse__["a" /* default */].y) > this.threshold) {
          this.addPoint()
        }
      }
    }
  }

  draw () {
    let numPoints = this.points.length
    if (numPoints > 1) {
      for (let i = 1; i < numPoints; i++) {
        let p1 = this.points[i-1]
        let p2 = this.points[i]
        __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */].line(p1.x, p1.y, p2.x, p2.y, '#000')
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Line);


/***/ })
/******/ ]);