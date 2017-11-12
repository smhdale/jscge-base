import Mouse from '../mouse'
import Keyboard from '../keyboard'
import { Rect, Ellipse } from '../shapes/index'

class MouseTrack {
  constructor () {
    this.side = 50
    this.mainRect = new Rect(0, 0, this.side, this.side, '#f00', 1)
    this.clickRect = new Ellipse(0, 0, this.side/4, this.side/4, '#0f0', 5, '#ff0')
    this.spaceRect = new Rect(0, 0, this.side/2, this.side/2, '#00f')

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
    this.mainRect.x = Mouse.x - this.side / 2
    this.mainRect.y = Mouse.y - this.side / 2
    this.clickRect.x = Mouse.x - this.side / 4
    this.clickRect.y = Mouse.y - this.side / 4
    this.spaceRect.x = Mouse.x
    this.spaceRect.y = Mouse.y
  }

  draw () {
    this.mainRect.draw()
    if (this.showClick) {
      this.clickRect.draw()
    }
    if (this.showSpace) {
      this.spaceRect.draw()
    }
  }
}

export default MouseTrack
