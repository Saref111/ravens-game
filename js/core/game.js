import Raven from "../components/raven.js"
export default class Game {
    constructor() {
        this.isOver = false 
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

    handleGameOver() {  
        const text = 'Game Over'
        this.ctx.fillStyle = '#000'
        this.ctx.font = '90px Arial'
        const textWidth = this.ctx.measureText(text).width

        this.ctx.fillText(
            text, 
            this.canvas.width / 2 - textWidth / 2, 
            this.canvas.height / 2
        )
    }

    handleRavens(deltaTime) {
        this.timeToNewRaven += deltaTime

        if (this.timeToNewRaven >= this.ravenInterval) {
            this.ravens.push(new Raven(this))
            this.timeToNewRaven = 0
        }
        
        this.ravens.forEach((raven) => {
            raven.update(deltaTime)
            
            if (raven.x < 0) {
                this.isOver = true
            }
        })
    }

    update(deltaTime) {
        this.handleRavens(deltaTime)
        
    }

    draw(deltaTime) {
        this.clear()

        this.ravens.forEach((raven) => {
            raven.draw(this.ctx)
        })

        if (this.isOver) {
            this.handleGameOver()
        }
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}