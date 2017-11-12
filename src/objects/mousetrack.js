import Mouse from '../mouse'
import Keyboard from '../keyboard'
import Trig from '../trig'
import { Rect, Ellipse, Polygon } from '../shapes/index'

// Wang Yu Wei

class MouseTracker {
  constructor () {
    const side = 100
    this.side = side

    const mainRectPts = [
      { x: 0, y: 0 },
      { x: Trig.lengthdirX(side, Math.PI / 4), y: Trig.lengthdirY(side, Math.PI / 4) },
      { x: Trig.lengthdirX(side * 0.85, Math.PI * 4 / 12), y: Trig.lengthdirY(side * 0.85, Math.PI * 4 / 12) },
      { x: Trig.lengthdirX(side * 1.2, Math.PI * 4.15 / 12), y: Trig.lengthdirY(side * 1.2, Math.PI * 4.15 / 12) },
      { x: Trig.lengthdirX(side * 1.2, Math.PI * 4.85 / 12), y: Trig.lengthdirY(side * 1.2, Math.PI * 4.85 / 12) },
      { x: Trig.lengthdirX(side * 0.85, Math.PI * 5 / 12), y: Trig.lengthdirY(side * 0.85, Math.PI * 5 / 12) },
      { x: 0, y: side }
    ]
    this.mainRect = new Polygon(0, 0, mainRectPts, '#f00', 5, '#0ff')

    this.clickRect = new Ellipse(0, 0, this.side / 4, this.side / 4, '#ff0', 5, '#0f0')
    this.spaceRect = new Rect(0, 0, this.side / 2, this.side / 2, '#00f')

    this.showClick = false
    this.showSpace = false

    // Listeners
    Mouse.onLeftDown(() => {
      this.showClick = true
    })
    Mouse.onLeftUp(() => {
      this.showClick = false
    })
    Keyboard.onKeyDown('space', () => {
      this.showSpace = true
    })
    Keyboard.onKeyUp('space', () => {
      this.showSpace = false
    })
  }

  update () {
    this.mainRect.x = Mouse.x
    this.mainRect.y = Mouse.y
    this.clickRect.x = Mouse.x
    this.clickRect.y = Mouse.y
    this.spaceRect.x = Mouse.x - this.side / 4
    this.spaceRect.y = Mouse.y - this.side / 4
  }

  draw () {
    if (this.showClick) {
      this.clickRect.draw()
    }
    if (this.showSpace) {
      this.spaceRect.draw()
    }
    this.mainRect.draw()
  }
}

export default MouseTracker
