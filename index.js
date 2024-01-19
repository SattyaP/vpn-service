const puppeteer = require('puppeteer-extra')
const path = require('path')
const zenmate = path.join(process.cwd(), "extension/zenmate/");
const cghost = path.join(process.cwd(), "extension/cghost/");
const spoof = path.join(process.cwd(), "extension/spoof/");

function sleep(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

// VPN Zenmate
const vpnZenMate = async (page) => {
    try {
        await page.goto('chrome-extension://pcfnkocjbnadnalbgnlaaiipolophbcf/index.html', {
            waitUntil: ['networkidle2', 'domcontentloaded'],
            timeout: 120000
        })

        const closeTour = await page.waitForSelector('.close-btn')
        closeTour && await closeTour.click()

        await sleep(3000)

        const pickCountry = await page.waitForSelector('body > app-root > main > app-home > div > div.proxy-status-container > div.pt-1.location-info > div > a')
        pickCountry && await pickCountry.click()

        await sleep(3000)

        const search = await page.$("body > app-root > main > app-servers > div > div:nth-child(1) > span.nav-link.right-link.p-0.pointer")
        search && await search.click()

        const searchBox = await page.waitForSelector('body > app-root > main > app-servers > div > div:nth-child(2) > div > input')
        searchBox && await searchBox.type('US')

        const country = await page.waitForSelector('body > app-root > main > app-servers > div > div.pt-4 > div > app-servers-list > div > p > span')
        country && await country.click()

        await sleep(5000)

        await page.goto('https://whoer.net/', {
            waitUntil: ['networkidle2', 'domcontentloaded'],
            timeout: 120000
        })
    } catch (error) {
        throw error;
    }
}

// VPN CyberGhost
const vpnCghost = async (page) => {
    try {
        await page.goto('chrome-extension://fhamnkhmphkahlnnjpgfpmcoeofilain/index.html', {
            waitUntil: ['networkidle2', 'domcontentloaded'],
            timeout: 120000
        })

        const pickCountry = await page.waitForSelector('.selected-country')
        pickCountry && await pickCountry.click()

        await sleep(3000)

        const regionId = ['romania', 'netherlands', 'germany', 'united states']

        await page.evaluate((regionId) => {
            let region;
            if (regionId.length > 1) {
                region = regionId[Math.floor(Math.random() * regionId.length)]
            } else {
                region = regionId.join('')
            }

            const country = document.querySelectorAll('mat-option > .mat-option-text')
            country.forEach((e) => {
                const reg = e.innerText
                reg.toLowerCase().includes(region) && e.click()
            })
        }, regionId)

        await sleep(3000)

        const connect = await page.waitForSelector('body > app-root > main > app-home > div > div.spinner > app-switch > div')
        connect && await connect.click()

        await sleep(5000)

        await page.goto('https://whoer.net/', {
            waitUntil: ['networkidle2', 'domcontentloaded'],
            timeout: 120000
        })
    } catch (error) {
        throw error;
    }
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            `--disable-extensions-except=${spoof},${cghost}`,
            `--load-extension=${spoof},${cghost}`,
        ]
    })

    const page = await browser.newPage()

    try {
        // await vpnZenMate(page)
        // await vpnCghost(page)

    } catch (error) {
        console.error(error)
        await browser.close()
    }
})()