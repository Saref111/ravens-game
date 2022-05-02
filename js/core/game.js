import InputHandler from "./input.js"
import Raven from "../components/raven.js"
import Boom from "../components/boom.js"
export default class Game {
    constructor() {
        this.isOver = false 
        this.canvas = null
        this.collisionCanvas = null
        this.ctx = null
        this.collCtx = null
        this.timeToNewRaven = 0
        this.ravenInterval = 500
        this.ravens = []
        this.booms = []
        this.scores = 0
        
        this.setCanvases()
        this.input = new InputHandler(this)
    }
    
    setCanvases() {
        this.collisionCanvas = document.createElement('canvas')
        this.collisionCanvas.width = window.innerWidth
        this.collisionCanvas.style.opacity = 0
        this.collisionCanvas.height = window.innerHeight
        this.collCtx = this.collisionCanvas.getContext('2d')
        document.body.appendChild(this.collisionCanvas)

        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    addBoom({x, y, size}) {
        this.booms.push(new Boom(x, y, size))
    }

    removeRaven(index) {
        this.ravens.splice(index, 1)
    }

    checkCollisionByColor(colorArray) {
        const [r, g, b] = colorArray
        const ravens = [...this.ravens]

        ravens.forEach((raven, i) => {
            if (r === raven.color[0] && g === raven.color[1] && b === raven.color[2]) {
                this.addBoom(raven)
                this.removeRaven(i)
                this.scores++
            }
        })
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
            this.ravens.sort((a, b) => a.width - b.width)
            this.timeToNewRaven = 0
        }
        
        this.ravens.forEach((raven) => {
            raven.update(deltaTime)
            
            if (raven.x < 0) {
                this.isOver = true
            }
        })

    }

    handleBooms(deltaTime) {
        this.booms.forEach((boom, i) => {
            boom.update(deltaTime)
            if (boom.isOver) {
                this.booms.splice(i, 1)
            }
        })
    }

    update(deltaTime) {
        this.handleRavens(deltaTime)
        this.handleBooms(deltaTime)
    }

    draw(deltaTime) {
        this.clear()

        const drawable = [
            ...this.ravens,
            ...this.booms
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
        this.collCtx.clearRect(0, 0, this.collisionCanvas.width, this.collisionCanvas.height)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}