import Canvas from '../canvas'

export default class Rect {
  constructor (x, y, width, height, fillStyle = '#000', lineWidth = 0, strokeStyle = '#000') {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
  }

  draw () {
    const ctx = Canvas.getContext()

    // Draw filled rect
    if (Canvas.colourVisible(this.fillStyle)) {
      ctx.fillStyle = this.fillStyle
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    // Draw stroke
    if (this.lineWidth > 0) {
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
