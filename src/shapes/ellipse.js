import Canvas from '../canvas'

class Ellipse {
  constructor (x, y, radiusX, radiusY, fillStyle = '#000', lineWidth = 0, strokeStyle = '#000') {
    this.x = x
    this.y = y
    this.radiusX = radiusX
    this.radiusY = radiusY
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth

    // Angle properties
    this.rotation = 0
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
  }

  draw () {
    const ctx = Canvas.getContext()

    // Draw filled rect
    if (Canvas.colourVisible(this.fillStyle)) {
      ctx.fillStyle = this.fillStyle
      ctx.beginPath()
      ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
      ctx.fill()
    }

    // Draw stroke
    if (this.lineWidth > 0) {
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth
      ctx.beginPath()
      ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
      ctx.stroke()
    }
  }
}

export default Ellipse
