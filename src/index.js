import Canvas from './canvas.js'
import GameClock from './dt.js'
console.dir(GameClock)

let counter = 0
let seconds = 0
const FPS = GameClock.fps
const fpsArea = document.querySelector('#fps')

function update () {
  if (counter++ > FPS) {
    counter = 0
    seconds++
    draw()
  }
}

function draw () {
  Canvas.clear()
  Canvas.rect(seconds, seconds, 50, 50, '#f00')
}

draw()
GameClock.start(update)
