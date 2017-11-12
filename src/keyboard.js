import ButtonMap from './buttonmap'
import keycode from 'keycode'

// Parse key strings to keyCodes

function parseKey (key) {
  if (typeof key === 'string') {
    // If key is string, convert it to keycode
    const keyCode = keycode(key)
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

class jscge_Keyboard extends ButtonMap {
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
export default new jscge_Keyboard()
