// Control imports
import Canvas from './canvas'
import GameClock from './dt'
import Mouse from './mouse'
import Keyboard from './keyboard'

// Instance imports
import Line from './objects/line'

let counter = 0
let seconds = 0
const FPS = GameClock.fps
const fpsArea = document.querySelector('#fps')

let drawGreen = false
let drawBlue = false
let lines = []

function update () {
  Mouse.update()

  // Update all instances
  //InstanceManager.updateAll()
  for (let line of lines) {
    line.update()
  }
  draw()
}

Mouse.onLeftDown(() => {
  drawGreen = true
  lines.push(new Line())
})
Mouse.onLeftUp(() => {
  drawGreen = false
})

Keyboard.onKeyDown('space', () => {
  drawBlue = true
})
Keyboard.onKeyUp('space', () => {
  drawBlue = false
})
// Keyboard.onKeyUp('f', () => {
//   console.dir(Keyboard)
//   console.dir(Mouse)
// })

function draw () {
  Canvas.clear()

  //InstanceManager.drawAll()
  for (let line of lines) {
    line.draw()
  }

  let side = 50
  Canvas.fillStyle = '#f00'
  Canvas.lineWidth = 0

  Canvas.rect(Mouse.x - side/2, Mouse.y - side/2, side, side, '#f00')

  if (drawGreen) {
    Canvas.fillStyle = '#0f0'
    Canvas.rect(Mouse.x - side/2, Mouse.y - side/2, side/2, side/2, '#0f0')
  }
  if (drawBlue) {
    Canvas.fillStyle = null
    Canvas.lineWidth = 1
    Canvas.rect(Mouse.x, Mouse.y, side/2, side/2, '#00f')
  }
}

draw()
GameClock.start(update)
