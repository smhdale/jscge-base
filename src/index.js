// Control imports
import Canvas from './canvas'
import GameClock from './dt'
import Mouse from './mouse'
import Keyboard from './keyboard'

// Instance imports
import Paint from './objects/paint'
import MouseTrack from './objects/mousetrack'

let lines = []
const mouseTracker = new MouseTrack()

// Hide mouse
Canvas.setMouseVisibility(false)

// Draw
Mouse.onLeftDown(() => {
  lines.push(new Paint())
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

  mouseTracker.update()

  draw()
}

function draw () {
  Canvas.clear()

  //InstanceManager.drawAll()
  for (const line of lines) {
    line.draw()
  }

  mouseTracker.draw()
}

draw()
GameClock.start(update)
