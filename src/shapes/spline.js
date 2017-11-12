import Canvas from '../canvas'
import Trig from '../trig'
import Path from './path'

// Curved version of a path

class Spline extends Path {
  constructor(x, y, strokeStyle = '#000', lineWidth = '#000', tension = 0.5) {
    super(x, y, strokeStyle, lineWidth)
    this.tension = tension
    this._controlPoints = []
  }

  addPoint (x, y) {
    this.points.push({
      x: x,
      y: y
    })
    if (this.numPoints > 2) {
      this._refreshControlPoints()
    }
  }

  _calculateControlPoints(p1, p2, p3) {
    const dx = p3.x - p1.x
    const dy = p3.y - p1.y
    const dist1 = Trig.distBetween(p1.x, p1.y, p2.x, p2.y)
    const dist2 = Trig.distBetween(p2.x, p2.y, p3.x, p3.y)
    const distTotal = dist1 + dist2

    // Return two control points
    return [
      {
        x: p2.x - dx * this.tension * dist1 / distTotal,
        y: p2.y - dy * this.tension * dist1 / distTotal
      },
      {
        x: p2.x + dx * this.tension * dist2 / distTotal,
        y: p2.y + dy * this.tension * dist2 / distTotal
      }
    ]
  }

  _refreshControlPoints(p1, p2) {
    this._controlPoints = []
    for (let i = 0; i < this.numPoints - 2; i++) {
      const [ cp1, cp2 ] = this._calculateControlPoints(this.points[i], this.points[i+1], this.points[i+2])
      console.dir(cp1)
      this._controlPoints.push(cp1, cp2)
    }
  }

  _drawSpline () {
    let ctx = Canvas.getContext()
    const numPoints = this.numPoints
    const pts = this.points
    const cps = this._controlPoints

    // Draw spline
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)

    // First curve is quadratic
    ctx.quadraticCurveTo(cps[0].x, cps[0].y, pts[1].x, pts[1].y)

    // Connect middle points with bezier
    let i
    for (i = 1; i < numPoints - 1; i++) {
      ctx.bezierCurveTo(
        cps[(i-1)*2].x, cps[(i-1)*2].y,
        cps[(i-1)*2+1].x, cps[(i-1)*2+1].y,
        pts[i].x, pts[i].y
      )
    }

    // Last curve is quadratic
    ctx.quadraticCurveTo(cps[(i-1)*2-1].x, cps[(i-1)*2-1].y, pts[i].x, pts[i].y)
    ctx.stroke()
  }

  draw () {
    if (this.numPoints > 1) {
      // Only draw if more than 1 point
      let ctx = Canvas.getContext()

      // Line style
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth

      if (this.numPoints === 2) {
        // Only two points, draw straight line
        this._drawLine()
      } else {
        this._drawSpline()
      }
    }
  }
}

export default Spline
