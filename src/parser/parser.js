const puppeteer = require("puppeteer")

const shortLangToLong = (lang) => {
    switch (lang) {
        case "en":
            return "english"
        case "ru":
            return "russian"
        case "de":
            return "german"
        default:
            return null
    }
}

const getCouples = async ({ langFrom, langTo, keyWord, lessonTheme }) => {
    const browser = await puppeteer.launch()

    let key

    if (lessonTheme && lessonTheme != undefined && lessonTheme != "undefined") {
        const pageForFindKeyWord = await browser.newPage()

        let findKeyWordMainLink

        switch (langFrom) {
            case "en":
                findKeyWordMainLink = `https://wordassociations.net/en/words-associated-with/${lessonTheme}`
                break
            case "ru":
                findKeyWordMainLink = `https://wordassociations.net/ru/ассоциации-к-слову/${lessonTheme}`
                break
            case "de":
                findKeyWordMainLink = `https://wordassociations.net/de/assoziationen-mit-dem-wor/${lessonTheme}`
                break
            default:
                findKeyWordMainLink = `https://wordassociations.net/ru/ассоциации-к-слову/${lessonTheme}`
                break
        }

        await pageForFindKeyWord.goto(findKeyWordMainLink)

        const keyWordsType = "#ADJECTIVE" // Прилагательное
        //const keyWordsType = "#NOUN" // Существительное

        key = await pageForFindKeyWord.$eval(keyWordsType, (nounBlock) => {
            const keyWords = Array.from(
                nounBlock.nextSibling.querySelectorAll("a")
            ).map((link) => link.innerText)

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

    console.log("Key word: ", key)

    const parseUrl = `https://context.reverso.net/translation/${shortLangToLong(
        langFrom
    )}-${shortLangToLong(langTo)}/${key}`

    const page = await browser.newPage()
    try {
        await page.goto(parseUrl)
        await page.screenshot({ path: "TEST_SCREENSHOT.png" })

        const translateBlocks = await page.$eval(
            "#examples-content",
            (examplesContent) => {
                let examplesContentArr = Array.from(
                    examplesContent.querySelectorAll(".example")
                )
                examplesContentArr = examplesContentArr.map((ex) => ({
                    from: ex.querySelector(".src").innerText,
                    to: ex.querySelector(".trg").innerText,
                }))

                return examplesContentArr.filter((ex) => ex.from.length <= 60)
            }
        )

        translateBlocks.forEach((block, i) =>
            console.log("couple", i, ":", block)
        )

        await browser.close()

        return translateBlocks
    } catch (error) {
        throw error
    }
}

module.exports = getCouples
