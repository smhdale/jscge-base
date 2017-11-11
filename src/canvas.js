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

  // Get canvas context for fine-grained drawing control
  getContext() {
    return this._ctx
  }

  // Canvas props
  get width () {
    return this._canvas.width
  }
  get height () {
    return this._canvas.height
  }

  // Fill colour
  get fillStyle () {
    return this._ctx.fillStyle
  }
  set fillStyle (col) {
    this._ctx.fillStyle = col
  }

  // Stroke colour
  get strokeStyle () {
    return this._ctx.strokeStyle
  }
  set strokeStyle (col) {
    this._ctx.strokeStyle = col
  }

  // Line width
  get lineWidth () {
    return this._lineWidth
  }
  set lineWidth (wid) {
    // ctx lineWidth cannot be set to 0, so track locally also
    this._lineWidth = wid
    this._ctx.lineWidth = wid
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

  // Clear canvas, called automatically at start of every draw
  clear () {
    this._ctx.clearRect(0, 0, this.width, this.height)
  }

  // Functions for checking what should be drawn

  _lineVisible (line) {
    return (line && line > 0)
  }
  _colourVisible (col) {
    return (col && !this._transparentColours.test(col))
  }

  get _doFill () {
    return this._colourVisible(this.fillStyle)
  }
  get _doStroke () {
    return this._lineVisible(this.lineWidth) && this._colourVisible(this.strokeStyle)
  }

  // Drawing functions

  // Line
  line (x1, y1, x2, y2) {
    if (this._doStroke) {
      this._ctx.beginPath()
      this._ctx.moveTo(x1, y1)
      this._ctx.lineTo(x2, y2)
      this._ctx.stroke()
    }
  }

  // Rectangle
  rect (x, y, w, h) {
    // Handle fill
    if (this._doFill) {
      this._ctx.fillRect(x, y, w, h)
    }

    // Handle stroke
    if (this._doStroke) {
      this._ctx.strokeRect(x, y, w, h)
    }
  }
}

// Singleton class
export default new Canvas()
