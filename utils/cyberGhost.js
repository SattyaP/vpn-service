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

module.exports = vpnCghost