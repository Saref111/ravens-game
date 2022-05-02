import { RavenEnum } from "../consts.js";
import { getRandomNumber } from "../utils.js";

export default class Raven {
    constructor(game) {
        this.game = game
        this.width = RavenEnum.WIDTH
        this.height = RavenEnum.HEIGHT
        this.x = this.game.canvas.width
        this.y = getRandomNumber(0, this.game.canvas.height - this.height)
        this.speedX = getRandomNumber(1, 5)
        this.speedY = getRandomNumber(-2.5, 2.5)
    }

    update(deltaTime) {
        this.x -= this.speedX
        this.y -= this.speedY
    }

    draw(ctx) {
        ctx.fillColor = '#000'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}