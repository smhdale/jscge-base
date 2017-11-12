import Canvas from '../canvas'

// Basically a long line that points can be added to

class Polygon {
  constructor (x, y, points, fillStyle = '#000', lineWidth = 1, strokeStyle = '#000') {
    // Error checking
    if (!Array.isArray(points)) {
      throw new TypeError('Argument `points` should be array of { x, y }')
    } else if (points.length < 3) {
      throw new RangeError('Polygon must have at least three points')
    }
    this.points = points

    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
  }

  get numPoints () {
    return this.points.length
  }

  addPoint (x, y) {
    this.points.push({ x, y })
  }

  _drawPoly () {
    const ctx = Canvas.getContext()
    ctx.beginPath()

    // Draw shape
    for (let i = 0; i < this.numPoints; i++) {
      const { x, y } = this.points[i]
      if (i === 0) {
        ctx.moveTo(this.x + x, this.y + y)
      } else {
        ctx.lineTo(this.x + x, this.y + y)
      }
    }

    // Close shape
    ctx.closePath()
  }

  draw () {
    const ctx = Canvas.getContext()

    // Draw filled shape
    if (Canvas.colourVisible(ctx.fillStyle)) {
      ctx.fillStyle = this.fillStyle
      this._drawPoly()
      ctx.fill()
    }

    // Draw stroke
    if (this.lineWidth > 0) {
      ctx.lineWidth = this.lineWidth
      ctx.strokeStyle = this.strokeStyle
      this._drawPoly()
      ctx.stroke()
    }
  }
}

export default Polygon
