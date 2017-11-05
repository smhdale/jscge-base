import Canvas from './canvas.js'
import GameClock from './dt.js'
import Mouse from './mouse.js'

let counter = 0
let seconds = 0
const FPS = GameClock.fps
const fpsArea = document.querySelector('#fps')

function update () {
  draw()
}

function draw () {
  Canvas.clear()

  let side = 50
  Canvas.rect(Mouse.x - side/2, Mouse.y - side/2, side, side, '#f00')

  if (Mouse.leftDown) {
    Canvas.rect(Mouse.x - side/2, Mouse.y - side/2, side/2, side/2, '#0f0')
  }
  if (Mouse.rightDown) {
    Canvas.rect(Mouse.x, Mouse.y, side/2, side/2, '#00f')
  }
}

draw()
GameClock.start(update)
