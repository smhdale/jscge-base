import Mouse from '../mouse'
import Tween from '../tween'
import { Ellipse } from '../shapes/index'

export default class ExpandingCircle {
  constructor () {
    this.radius = 0
    this.maxRadius = 150
    this.expanding = false

    this.circle = new Ellipse(0, 0, 0, 0, null, 2, '#000')
    this.circle.x = Mouse.x
    this.circle.y = Mouse.y

    this.anim = 0
    this.animSpd = 1 / 60
  }

  update () {
    this.circle.radiusX = this.radius
    this.circle.radiusY = this.radius

    if (this.anim < 1) {
      this.anim += this.animSpd
      this.radius = Tween.easeOutQuad(this.anim) * this.maxRadius
    }
  }

  draw () {
    if (this.radius > 0) {
      this.circle.draw()
    }
  }
}
