let lastTime = 0
export const animate = (timestamp, game) => {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    game.update(deltaTime)
    game.draw(deltaTime)
    requestAnimationFrame(timestamp => animate(timestamp, game))
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}