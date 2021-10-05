const puppeteer = require("puppeteer")

const getCouples = async ({ langFrom, langTo, keyWord, lessonTheme }) => {
    const browser = await puppeteer.launch()

    let key

    if (lessonTheme) {
        const pageForFindKeyWord = await browser.newPage()

        const findKeyWordMainLink = `https://wordassociations.net/ru/ассоциации-к-слову/${lessonTheme}`

        await pageForFindKeyWord.goto(findKeyWordMainLink)

        const keyWordsType = "#ADJECTIVE" // Прилагательное
        //const keyWordsType = "#NOUN" // Существительное

        key = await pageForFindKeyWord.$eval(keyWordsType, (nounBlock) => {
            const keyWords = Array.from(nounBlock.nextSibling.querySelectorAll("a")).map(
                (link) => link.innerText
            )

            const randomIndex = +(
                (Math.random().toFixed(2) * 100) %
                keyWords.length
            ).toFixed(0)

            return keyWords[randomIndex]
        })
    } else if (keyWord) {
        key = keyWord
    }

    key = key.toLowerCase()

    const parseUrl = `https://context.reverso.net/translation/${langFrom}-${langTo}/${key}`

    const page = await browser.newPage()
    try {
        await page.goto(parseUrl)
        await page.screenshot({ path: "TEST_SCREENSHOT.png" })

        const translateBlocks = await page.$eval(
            "#examples-content",
            (examplesContent) => {
                const examplesContentArr = Array.from(
                    examplesContent.querySelectorAll(".example")
                )
                return examplesContentArr.map((ex) => ({
                    from: ex.querySelector(".src").innerText,
                    to: ex.querySelector(".trg").innerText,
                }))
            }
        )

        translateBlocks.forEach((block, i) => console.log("couple", i, ":", block))

        await browser.close()

        return translateBlocks
    } catch (error) {
        throw error
    }
}

module.exports = getCouples

// const translateBlocks = await page.$$eval(".example", (couples) => {
//     return couples.map((coupleStr) => {
//         const coupleArr = coupleStr.textContent
//             .replace(/\s+/g, " ")
//             .trim()
//             .split(".")
//         const couple = { from: coupleArr[0], to: coupleArr[1] }
//         // const couple =
//         //     !coupleArr[0] && !coupleArr[1]
//         //         ? { from: coupleArr[0], to: coupleArr[1] }
//         //         : null
//         return couple
//     })
// })
//translateBlocks.forEach((block, i) => console.log("couple", i, ":", block))
