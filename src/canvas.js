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
export default new Canvas()
