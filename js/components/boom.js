import { FPS, BoomEnum } from "../consts.js"
import { getRandomNumber } from "../utils.js"

export default class Boom {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.width = BoomEnum.WIDTH
        this.height = BoomEnum.HEIGHT
        this.image = new Image()
        this.image.src = BoomEnum.SPRITE_SRC
        this.audio = new Audio()
        this.audio.src = BoomEnum.AUDIO_SRC
        this.isPlaySound = false
        this.frameInterval = 1000 / FPS
        this.frameCount = 0
        this.frameX = 0
        this.maxFrameX = BoomEnum.MAX_FRAME_X
        this.isOver = false
        this.angle = getRandomNumber(0, 360)
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

        if (!this.isPlaySound) {
            this.audio.play()
            this.isPlaySound = true
        }
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            0 - this.width / 2,
            0 - this.height / 2,
            this.width * this.size,
            this.height * this.size
        )
        ctx.restore()
    }
}