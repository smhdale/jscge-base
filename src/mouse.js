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
