// Control imports
import Canvas from './canvas'
import GameClock from './dt'
import Mouse from './mouse'

// Instance imports
import Paint from './objects/paint'
import MouseTrack from './objects/mousetrack'

const lines = []
const mouseTracker = new MouseTrack()

Mouse.onLeftDown(() => {
  lines.push(new Paint())
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
