let lastTime = 0
export const animate = (game, timestamp = 0) => {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    game.update(deltaTime)
    game.draw(deltaTime)
    if (!game.isOver) {
        requestAnimationFrame((timestamp) => animate(game, timestamp))
    }
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}