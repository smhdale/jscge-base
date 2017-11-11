import Canvas from './canvas'

/**
 * Basic shapes for drawing
 */

// Line - simple straight line
class Line {
  constructor (x1, y1, x2, y2, colour = null, width = null) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.colour = colour
    this.width = width
  }

  draw () {
    let ctx = Canvas.getContext()

    // If line properties are stored, set them
    if (this.colour) {
      ctx.strokeStyle = this.colour
    }
    if (this.width) {
      ctx.lineWidth = this.width
    }

    let ctx = Canvas.getContext()
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}
