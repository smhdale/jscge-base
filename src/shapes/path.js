import Canvas from '../canvas'

// Basically a long line that points can be added to

class Path {
  constructor (x, y, strokeStyle = '#000', lineWidth = 1) {
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth

    this.points = []
    this.addPoint(x, y)
  }

  get numPoints () {
    return this.points.length
  }

  addPoint (x, y) {
    this.points.push({
      x: x,
      y: y
    })
  }

  _drawLine () {
    let ctx = Canvas.getContext()

    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      let p = this.points[i]
      ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
  }

  draw () {
    if (this.numPoints > 1) {
      let ctx = Canvas.getContext()

      // Line style
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth

      // Draw path
      this._drawLine()
    }
  }
}

export default Path
