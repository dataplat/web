const puppeteer = require('puppeteer');
const path = require('path');

// Get HTML and PNG paths from command line args
const htmlPath = process.argv[2];
const pngPath = process.argv[3];

if (!htmlPath || !pngPath) {
    console.error('Usage: node screenshot-card.js <html-file> <png-file>');
    process.exit(1);
}

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 800 });

        // Load the HTML file
        const absoluteHtml = path.resolve(htmlPath);
        await page.goto(`file:///${absoluteHtml}`, { waitUntil: 'networkidle0' });

        // Wait for fonts
        await page.evaluateHandle('document.fonts.ready');

        // Make body transparent
        await page.evaluate(() => document.body.style.background = 'transparent');

        // Screenshot just the card element
        const card = await page.$('.card');
        if (card) {
            await card.screenshot({
                path: pngPath,
                type: 'png',
                omitBackground: true
            });
            console.log(`Created: ${pngPath}`);
        } else {
            console.error('Error: .card element not found');
            process.exit(1);
        }

        await browser.close();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
})();
