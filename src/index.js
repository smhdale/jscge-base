import Canvas from './canvas.js'
import GameClock from './dt.js'
import Mouse from './mouse.js'
import Keyboard from './keyboard.js'

let counter = 0
let seconds = 0
const FPS = GameClock.fps
const fpsArea = document.querySelector('#fps')

function update () {
  draw()
}

let drawGreen = false
let drawBlue = false

Mouse.onLeftDown(() => {
  drawGreen = true
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

function draw () {
  Canvas.clear()

  let side = 50
  Canvas.rect(Mouse.x - side/2, Mouse.y - side/2, side, side, '#f00')

  if (drawGreen) {
    Canvas.rect(Mouse.x - side/2, Mouse.y - side/2, side/2, side/2, '#0f0')
  }
  if (drawBlue) {
    Canvas.rect(Mouse.x, Mouse.y, side/2, side/2, '#00f')
  }
}

draw()
GameClock.start(update)
