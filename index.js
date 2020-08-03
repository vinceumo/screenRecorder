const puppeteer = require("puppeteer");

const main = async () => {
  const project = {
    name: "AP",
    url:
      "https://www.nytimes.com/paidpost/audemars-piguet/step-inside-a-spiraling-watch-museum-in-the-swiss-jura-mountains.html",
  };
  const screenSizes = [
    { width: 414, height: 736 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(project.url, { waitUntil: "networkidle0" });

  await page.evaluate(() => {
    const gdprAcceptBtnEl = document.querySelector(".gdpr.shown");
    if (gdprAcceptBtnEl) {
      gdprAcceptBtnEl.style.display = "none";
    }
  });

  for await (let size of screenSizes) {
    await page.setViewport(size);
    await page.screenshot({
      path: `./screenshots/${project.name}-${size.width}.jpg`,
    });
  }

  await browser.close();
};

main().catch((err) => console.log(err.message));
