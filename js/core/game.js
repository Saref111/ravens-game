import Raven from "../components/raven.js"
export default class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.ravens = []

        this.setCanvas()
    }
    
    setCanvas() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    update(deltaTime) {
        if (this.ravens.length == 0) {
            this.ravens.push(new Raven(this))
        }

        this.ravens.forEach((raven) => {
            raven.update(deltaTime)
        })
    }

    draw(deltaTime) {
        this.clear()

        this.ravens.forEach((raven) => {
            raven.draw(this.ctx)
        })
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}