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
export default new Canvas()
