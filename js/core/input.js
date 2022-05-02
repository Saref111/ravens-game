export default class InputHandler {
    constructor(game) {
        this.game = game
        this.canvas = game.canvas
        this.ctx = game.ctx
        this.canvasPosition = this.canvas.getBoundingClientRect()

        window.addEventListener('click', this.handleClick.bind(this))
    }

    handleClick(event) {
        const x = event.clientX - this.canvasPosition.left
        const y = event.clientY - this.canvasPosition.top

        console.log(this.ctx.getImageData(x, y, 1, 1).data);
    }
}