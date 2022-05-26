import Petal from './petal.js'

const IMG_WIDTH = 1944
const IMG_HEIGHT = 1296
const IMG_RATIO = IMG_HEIGHT / IMG_WIDTH

class App {
  petals = []

  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    document.addEventListener('pointerdown', this.handleClick.bind(this), false)

    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    if (this.stageHeight > IMG_HEIGHT * 2 && this.stageWidth > IMG_WIDTH) {
      this.treeWidth = IMG_WIDTH
      this.treeHeight = IMG_HEIGHT
    } else if (this.stageWidth * IMG_RATIO < this.stageHeight / 2) {
      this.treeWidth = this.stageWidth
      this.treeHeight = this.treeWidth * IMG_RATIO
    } else {
      this.treeHeight = this.stageHeight / 2
      this.treeWidth = this.treeHeight / IMG_RATIO
    }

    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio

    this.ctx.scale(this.pixelRatio, this.pixelRatio)
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    this.petals = this.petals.filter(petal => petal.animate(this.ctx))
  }

  handleClick(e) {
    if (this.stageWidth - this.treeWidth > e.clientX || this.treeHeight < e.clientY) {
      return
    }

    this.petals.push(new Petal(
      e.clientX,
      e.clientY,
      this.stageHeight,
      this.treeWidth,
    ))
    this.petals.push(new Petal(
      e.clientX + 10,
      e.clientY - 10,
      this.stageHeight,
      this.treeWidth,
    ))
    this.petals.push(new Petal(
      e.clientX - 10,
      e.clientY - 10,
      this.stageHeight,
      this.treeWidth,
    ))
    this.petals.push(new Petal(
      e.clientX + 10,
      e.clientY + 10,
      this.stageHeight,
      this.treeWidth,
    ))
    this.petals.push(new Petal(
      e.clientX - 10,
      e.clientY + 10,
      this.stageHeight,
      this.treeWidth,
    ))
  }
}

window.onload = () => {
  new App()
}
