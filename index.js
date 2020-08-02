const puppeteer = require("puppeteer");
const fullPageScreenshot = require("puppeteer-full-page-screenshot").default;

const main = async () => {
  const screenSizes = [
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(screenSizes[0]);

  await page.goto(
    "https://www.nytimes.com/paidpost/audemars-piguet/step-inside-a-spiraling-watch-museum-in-the-swiss-jura-mountains.html",
    { waitUntil: "networkidle0" }
  );

  await page.evaluate(() => {
    const gdprAcceptBtnEl = document.querySelector(".gdpr.shown");
    if (gdprAcceptBtnEl) {
      gdprAcceptBtnEl.style.display = "none";
    }
  });

  await fullPageScreenshot(page, { path: "./screenshots/full.jpg" });
  await browser.close();
};

main().catch((err) => console.log(err));