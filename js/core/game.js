export default class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.setCanvas()
    }
    
    setCanvas() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    update(deltaTime) {}

    draw(deltaTime) {
        this.clear()
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}