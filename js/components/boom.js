import { FPS, BoomEnum } from "../consts.js"

export default class Boom {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.width = BoomEnum.WIDTH
        this.height = BoomEnum.HEIGHT
        this.image = new Image()
        this.image.src = BoomEnum.SPRITE_SRC
        this.frameInterval = 1000 / FPS
        this.frameCount = 0
        this.frameX = 0
        this.maxFrameX = BoomEnum.MAX_FRAME_X
        this.isOver = false
    }

    update(deltaTime) {
        this.frameCount += deltaTime
        if (this.frameCount >= this.frameInterval) {
            this.frameCount = 0
            this.frameX += 1
            if (this.frameX >= this.maxFrameX) {
                this.frameX = 0
                this.isOver = true
            }
        }

        
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width * this.size,
            this.height * this.size
        )
    }
}