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
