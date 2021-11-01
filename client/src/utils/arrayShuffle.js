const shuffleArray = (array, confusingItems = []) => {
    if (!array) return []
    console.log("array param", array)

    let shuffledArr = [...array, ...confusingItems]

    for (let i = shuffledArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]
    }

    console.log("shuffled array ", shuffledArr)

    return shuffledArr
}

export { shuffleArray }
