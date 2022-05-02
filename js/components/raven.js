import { RavenEnum, FPS } from "../consts.js";
import { getRandomNumber } from "../utils.js";

export default class Raven {
    constructor(game) {
        this.game = game
        this.width = RavenEnum.WIDTH
        this.height = RavenEnum.HEIGHT
        this.x = this.game.canvas.width
        this.y = getRandomNumber(0, this.game.canvas.height - this.height)
        this.speedX = getRandomNumber(0, 4)
        this.speedY = getRandomNumber(-2.5, 2.5)

        this.image = new Image()
        this.image.src = RavenEnum.SPRITE_SRC
        this.frameX = 0
        this.maxFrameX = RavenEnum.MAX_FRAME_X
        this.frameCount = 0
        this.frameInterval = 1000 / FPS
    }

    amendSpeed() {
        if (this.y + this.height >= this.game.canvas.height) {
            this.speedY = -this.speedY
        } 

        if (this.y <= 0) {
            this.speedY = -this.speedY
        }
    }

    update(deltaTime) {
        this.x -= this.speedX
        this.y -= this.speedY

        this.frameCount += deltaTime
        if (this.frameCount >= this.frameInterval / this.speedX) {
            this.frameCount = 0
            this.frameX += 1
            if (this.frameX >= this.maxFrameX) {
                this.frameX = 0
            }
        } 

        this.amendSpeed()
    }

    draw(ctx) {
        // ctx.fillStyle = '#000'
        // ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}