function distBetween (x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2, (y2 - y1) ** 2)
}

const lengthdirX = (len, dir) => len * Math.cos(dir)
const lengthdirY = (len, dir) => len * Math.sin(dir)

export default {
  distBetween,
  lengthdirX,
  lengthdirY
}
