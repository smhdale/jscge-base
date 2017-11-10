import Canvas from '../canvas'
import Mouse from '../mouse'

class Line {
  constructor () {
    // Props
    this.points = []
    this.threshold = 2
    this.drawing = true

    // Methods
    this.addPoint = function () {
      this.points.push({ x: Mouse.x, y: Mouse.y })
    }
    this.getLatestPoint = () => this.points[this.points.length - 1]
    this.distBetween = function (x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    }

    // Mouse & KB bindings
    Mouse.onLeftUp(() => {
      this.drawing = false
    })
  }

  update () {
    if (this.drawing) {
      if (this.points.length === 0) {
        this.addPoint()
      } else {
        let latest = this.getLatestPoint()
        if (this.distBetween(latest.x, latest.y, Mouse.x, Mouse.y) > this.threshold) {
          this.addPoint()
        }
      }
    }
  }

  draw () {
    let numPoints = this.points.length
    if (numPoints > 1) {
      for (let i = 1; i < numPoints; i++) {
        let p1 = this.points[i-1]
        let p2 = this.points[i]
        Canvas.line(p1.x, p1.y, p2.x, p2.y, '#000')
      }
    }
  }
}

export default Line
