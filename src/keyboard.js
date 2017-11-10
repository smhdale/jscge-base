import ButtonMap from './buttonmap'
import keycode from 'keycode'

class jscge_Keyboard extends ButtonMap {
  constructor () {
    super()
    this._addEventListeners()
  }

  _parseKey (key) {
    if (typeof key === 'string') {
      // If key is string, convert it to keycode
      let keyCode = keycode(key)
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
export default new jscge_Keyboard()
