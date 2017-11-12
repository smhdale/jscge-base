import Canvas from '../canvas'

// Basically a long line that points can be added to

class Path {
  constructor (x, y, lineWidth = 1, strokeStyle = '#000') {
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth

    this.points = []
    this.addPoint(x, y)
  }

  get numPoints () {
    return this.points.length
  }

  addPoint (x, y) {
    this.points.push({ x, y })
  }

  _drawLine () {
    const ctx = Canvas.getContext()

    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      const p = this.points[i]
      ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
  }

  draw () {
    if (this.numPoints > 1) {
      const ctx = Canvas.getContext()

      // Line style
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth

      // Draw path
      this._drawLine()
    }
  }
}

export default Path
