// Control imports
import Canvas from './canvas'
import GameClock from './dt'
import Mouse from './mouse'
import Keyboard from './keyboard'

// Object imports
import Paint from './objects/paint'
import MouseTrack from './objects/mousetrack'
import ExpandingCircle from './objects/expandingcircle'

let lines = []
const circles = []
const mouseTracker = new MouseTrack()

// Hide mouse
Canvas.setMouseVisibility(false)
let cx = 0
let cy = 0

// Draw
Mouse.onLeftDown(() => {
  lines.push(new Paint())
  cx = Mouse.x
  cy = Mouse.y
})

Mouse.onLeftUp(() => {
  if (Mouse.x === cx && Mouse.y === cy) {
    circles.push(new ExpandingCircle())
  }
})

// Undo
Keyboard.onKeyDown('z', () => {
  if (lines.length > 0 && Keyboard.checkPressed('control')) {
    lines = lines.filter((_, i) => i < lines.length - 1)
  }
})

function update () {
  Mouse.update()

  // Update all instances
  //InstanceManager.updateAll()
  for (const line of lines) {
    line.update()
  }

  for (const circle of circles) {
    circle.update()
  }

  mouseTracker.update()

  draw()
}

function draw () {
  Canvas.clear()

  //InstanceManager.drawAll()
  for (const line of lines) {
    line.draw()
  }

  for (const circle of circles) {
    circle.draw()
  }

  mouseTracker.draw()
}

draw()
GameClock.start(update)
