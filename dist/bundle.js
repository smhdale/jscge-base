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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__canvas_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dt_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dt_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dt_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mouse_js__);




let counter = 0
let seconds = 0
const FPS = __WEBPACK_IMPORTED_MODULE_1__dt_js___default.a.fps
const fpsArea = document.querySelector('#fps')

function update () {
  draw()
}

function draw () {
  __WEBPACK_IMPORTED_MODULE_0__canvas_js___default.a.clear()

  let side = 50
  __WEBPACK_IMPORTED_MODULE_0__canvas_js___default.a.rect(__WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.x - side/2, __WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.y - side/2, side, side, '#f00')

  if (__WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.leftDown) {
    __WEBPACK_IMPORTED_MODULE_0__canvas_js___default.a.rect(__WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.x - side/2, __WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.y - side/2, side/2, side/2, '#0f0')
  }
  if (__WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.rightDown) {
    __WEBPACK_IMPORTED_MODULE_0__canvas_js___default.a.rect(__WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.x, __WEBPACK_IMPORTED_MODULE_2__mouse_js___default.a.y, side/2, side/2, '#00f')
  }
}

draw()
__WEBPACK_IMPORTED_MODULE_1__dt_js___default.a.start(update)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
  line (x1, y1, x2, y2, stroke) {
    this._setStroke(stroke)
    this._ctx.beginPath()
    this._ctx.moveTo(x1, y1)
    this._ctx.lineTo(x2, y2)
    this._ctx.stroke()
  }

  // Rectangle
  rect (x, y, w, h, fill = '#000', stroke = null) {
    // Handle fill
    if (fill) {
      this._setFill(fill)
      this._ctx.fillRect(x, y, w, h)
    }

    // Handle stroke
    if (stroke) {
      this._setStroke(stroke)
      this._ctx.strokeRect(x, y, w, h)
    }
  }
}

// Singleton class
module.exports = new Canvas()


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
module.exports = new DeltaTime()


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const keycode = __webpack_require__(4)

class Mouse {
  constructor () {
    this.x = 0
    this.y = 0

    this.xPrev = 0
    this.yPrev = 0

    this._buttons = [
      {
        button: 0,
        down: false,
        downListeners: [],
        upListeners: []
      },
      {
        button: 2,
        down: false,
        downListeners: [],
        upListeners: []
      }
    ]

    const _buttonNames = {
      'left': 0,
      'right': 2
    }

    this.addEventListeners()
  }

  get dx () {
    return this.x - this.xPrev
  }
  get dy () {
    return this.y - this.yPrev
  }

  get leftDown () {
    return this._buttons.find(btn => btn.button === 0).down
  }
  get rightDown () {
    return this._buttons.find(btn => btn.button === 2).down
  }

  // Checks if a button is mapped
  _checkMapped (btnCheck) {
    if (this._buttons.find(btn => btn.button === btnCheck) === undefined) {
      // Button doesnt exist in our button map
      
    }
  }

  // Tracking mouse position
  _setPos (evt) {
    this.xPrev = this.x
    this.yPrev = this.y
    this.x = evt.clientX
    this.y = evt.clientY
  }

  // For tracking whether a mouse button is pressed
  _handleButtonDown (evt) {
    for (let btn of this._buttons) {
      if (evt.button === btn.button && !btn.down) {
        btn.down = true

        // Run any attached listeners
        if (btn.downListeners.length > 0) {
          for (let fn of btn.downListeners) {
            fn()
          }
        }
      }
    }
  }
  _handleButtonUp (evt) {
    for (let btn of this._buttons) {
      if (evt.button === btn.button && btn.down) {
        btn.down = false

        // Run any attached listeners
        if (btn.upListeners.length > 0) {
          for (let fn of btn.upListeners) {
            fn()
          }
        }
      }
    }
  }

  addEventListeners () {
    window.addEventListener('mousemove', this._setPos.bind(this))
    window.addEventListener('mousedown', this._handleButtonDown.bind(this))
    window.addEventListener('mouseup', this._handleButtonUp.bind(this))
    window.addEventListener('contextmenu', evt => evt.preventDefault())
  }
}

// Singleton class
module.exports = new Mouse()


/***/ }),
/* 4 */
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


/***/ })
/******/ ]);