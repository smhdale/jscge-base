import Canvas from '../canvas'

class Line {
  constructor (x1, y1, x2, y2, colour = '#000', width = 1) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.colour = colour
    this.width = width
  }

  draw () {
    let ctx = Canvas.getContext()

    // Line style
    ctx.strokeStyle = this.colour
    ctx.lineWidth = this.width

    // Draw line
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}

export default Line
