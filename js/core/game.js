import InputHandler from "./input.js"
import Raven from "../components/raven.js"
export default class Game {
    constructor() {
        this.isOver = false 
        this.canvas = null
        this.ctx = null
        this.timeToNewRaven = 0
        this.ravenInterval = 500
        this.ravens = []

        this.scores = 0
        
        this.setCanvas()
        this.input = new InputHandler(this)
    }
    
    setCanvas() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)

        this.collisionCanvas = document.createElement('canvas')
        this.collisionCanvas.width = window.innerWidth
        this.collisionCanvas.height = window.innerHeight
        this.collCtx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    drawScores() {
        this.ctx.fillStyle = '#000'
        this.ctx.font = '30px Impact'
        this.ctx.fillText(
            `Score: ${this.scores}`, 
            10, 
            30
        )
    }

    handleGameOver() {  
        const text = 'Game Over'
        this.ctx.fillStyle = '#000'
        this.ctx.font = '90px Impact'
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

        const drawable = [
            ...this.ravens
        ]
        drawable.forEach((object) => {
            object.draw(this.ctx, this.collCtx)
        })

        this.drawScores()

        if (this.isOver) {
            this.handleGameOver()
        }
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}