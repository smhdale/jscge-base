import ButtonMap from './buttonmap'

class jscge_Mouse extends ButtonMap {
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
export default new jscge_Mouse()
