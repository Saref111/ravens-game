export default class InputHandler {
    constructor(game) {
        this.game = game
        this.canvas = game.canvas
        this.ctx = game.ctx
        this.collCtx = game.collCtx
        this.canvasPosition = this.canvas.getBoundingClientRect()

        window.addEventListener('click', this.handleClick.bind(this))
        window.addEventListener('touchstart', this.handleClick.bind(this))
    }

    handleClick(event) {
        const x = event.clientX - this.canvasPosition.x
        const y = event.clientY - this.canvasPosition.y
        
        if (!this.game.isOver) { 
            this.game.checkCollisionByColor(this.collCtx.getImageData(x, y, 1, 1).data)
        }
    }
}