import { getAngles, getDistances, getPoints, getRandom } from './utils.js'

class Petal {
  constructor(x, y, stageHeight, treeWidth) {
    this.t = 0
    this.w = this.initialW = (treeWidth / 80) * 1
    this.wv = getRandom(-20, 20)
    this.x = this.initialX = x + getRandom(-(this.initialW * 4), (this.initialW * 4))
    this.y = this.initialY = y + getRandom(-(this.initialW * 4), (this.initialW * 4))
    this.h = this.initialH = treeWidth / 70
    this.rotation = getRandom(0, 2 * Math.PI)
    this.rDirection = Math.random() < 0.5
    this.opacity = 0
    this.finalOpacity = getRandom(0.5, 1.1)
    this.stageHeight = stageHeight
  }

  animate(ctx) {
    this.t += 1
    this.move()
    this.scale()
    this.rotate()

    if (this.y > this.stageHeight + this.initialH) {
      return false
    }

    const angles = getAngles(this.w, this.h, this.rotation)
    const distances = getDistances(this.w, this.h)
    const points = getPoints(this.x, this.y, distances, angles)

    this.setGradient(ctx)
    this.draw(ctx, points)
    ctx.fill();
    return true
  }

  move() {
    this.y  = (this.t * (this.initialW / 2)) + this.initialY
    this.x += getRandom(-2, 2)
  }

  scale() {
    this.wv += getRandom(-2, 2)
    this.w = this.initialW * Math.cos((this.t + this.wv) / 20)
  }

  rotate() {
    const v = getRandom(0.05, 0.4)
    if (this.rDirection) {
      this.rotation -= v
    } else {
      this.rotation += v
    }

    if (this.rotation > 2 * Math.PI) {
      this.rotation = this.rotation % (2 * Math.PI)
    }
  }

  setGradient(ctx) {
    this.gradient = ctx.createLinearGradient(
      this.x,
      this.y - (this.h / 2),
      this.x,
      this.y + (this.h / 2)
    );

    if (this.opacity < this.finalOpacity) {
      this.opacity += 0.05
    }
    this.gradient.addColorStop(0, `rgba(236, 119, 164, ${this.opacity})`);
    this.gradient.addColorStop(1, `rgba(233, 86, 92, ${this.opacity})`);
    ctx.fillStyle = this.gradient;
  }

  draw(ctx, p) {
    ctx.beginPath()
    ctx.moveTo(p[0].x, p[0].y)
    ctx.quadraticCurveTo(
      p[1].x,
      p[1].y,
      p[2].x,
      p[2].y,
    )
    ctx.quadraticCurveTo(
      p[3].x,
      p[3].y,
      p[4].x,
      p[4].y,
    )
    ctx.quadraticCurveTo(
      p[5].x,
      p[5].y,
      p[0].x,
      p[0].y,
    )
    ctx.closePath()
  }
}

export default Petal
