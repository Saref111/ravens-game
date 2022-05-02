import Raven from "../components/raven.js"
export default class Game {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.timeToNewRaven = 0
        this.ravenInterval = 500
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

    handleRavens(deltaTime) {
        this.timeToNewRaven += deltaTime

        if (this.timeToNewRaven >= this.ravenInterval) {
            this.ravens.push(new Raven(this))
            this.timeToNewRaven = 0
        }

        this.ravens.forEach((raven) => {
            raven.update(deltaTime)
        })

        this.ravens = this.ravens.filter((raven) => !(raven.x + raven.width < 0))
    }

    update(deltaTime) {
        this.handleRavens(deltaTime)
        
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