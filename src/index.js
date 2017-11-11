// Control imports
import Canvas from './canvas'
import GameClock from './dt'
import Mouse from './mouse'
import Keyboard from './keyboard'

// Instance imports
import Paint from './objects/paint'
import MouseTrack from './objects/mousetrack'

let counter = 0
let seconds = 0
const FPS = GameClock.fps
const fpsArea = document.querySelector('#fps')

let lines = []
const mouseTracker = new MouseTrack()

Mouse.onLeftDown(() => {
  lines.push(new Paint())
})

function update () {
  Mouse.update()

  // Update all instances
  //InstanceManager.updateAll()
  for (let line of lines) {
    line.update()
  }

  mouseTracker.update()

  draw()
}

function draw () {
  Canvas.clear()

  //InstanceManager.drawAll()
  for (let line of lines) {
    line.draw()
  }

  mouseTracker.draw()
}

draw()
GameClock.start(update)
