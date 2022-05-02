import { animate } from "./utils.js"
import Game from "./core/game.js"

const init = () => {
    const game = new Game()
    animate(game)
    document.removeEventListener('click', init)
    document.body.classList.add('started')
}

document.addEventListener('click', init)

