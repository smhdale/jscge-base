import Mouse from '../mouse'
import Trig from '../trig'
import { Path } from '../shapes/index'

class Paint {
  constructor () {
    // Props
    this.path = new Path(Mouse.x, Mouse.y)
    this.threshold = 2
    this.drawing = true

    // Methods
    this.addPoint = function () {
      this.path.addPoint(Mouse.x, Mouse.y)
    }
    this.getLatestPoint = function () {
      return this.path.points[this.path.numPoints - 1]
    }

    // Mouse & KB bindings
    Mouse.onLeftUp(() => {
      this.drawing = false
    })
  }

  update () {
    if (this.drawing) {
      const latest = this.getLatestPoint()
      if (Trig.distBetween(latest.x, latest.y, Mouse.x, Mouse.y) > this.threshold) {
        this.addPoint()
      }
    }
  }

  draw () {
    this.path.draw()
  }
}

export default Paint
