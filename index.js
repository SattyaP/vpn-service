const fs = require('fs')
const path = require('path');
const { executablePath, default: puppeteer } = require('puppeteer');

const cghost = path.join(process.cwd(), "extension/cghost/");
const spoof = path.join(process.cwd(), "extension/spoof/");

function sleep(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: executablePath(),
        args: [
            `--disable-extensions-except=${spoof}`,
            `--load-extension=${spoof}`,
        ]
    })

    const [page] = await browser.pages()
    
    try {

    } catch (error) {
        console.error(error)
        await browser.close()
    }
})()