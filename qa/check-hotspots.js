const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const pageUrl = `file://${path.join(root, "case-studies", "fragrance.html")}`;
const viewports = [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }];

async function waitForPage(page) {
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = "eager";
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
  await page.evaluate(() => document.fonts && document.fonts.ready);
}

async function measure(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll(".hot")).map((hot) => {
    const image = hot.closest(".poster--hot").querySelector("img");
    const imageBox = image.getBoundingClientRect();
    const box = hot.getBoundingClientRect();
    const left = parseFloat(hot.style.left);
    const top = parseFloat(hot.style.top);
    const width = parseFloat(hot.style.width);
    const height = parseFloat(hot.style.height);
    const expected = { x: imageBox.left + (left + width / 2) / 100 * imageBox.width, y: imageBox.top + (top + height / 2) / 100 * imageBox.height };
    const actual = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    const receiver = document.elementFromPoint(expected.x, expected.y);
    return { key: hot.dataset.k, viewport: innerWidth, offsetX: actual.x - expected.x, offsetY: actual.y - expected.y, receiver: receiver && receiver.dataset ? receiver.dataset.k : receiver && receiver.className };
  }));
}

(async () => {
  fs.mkdirSync(path.join(root, "qa", "before"), { recursive: true });
  fs.mkdirSync(path.join(root, "qa", "before-debug"), { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = [];
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(pageUrl, { waitUntil: "networkidle" });
    await waitForPage(page);
    await page.screenshot({ path: path.join(root, "qa", "before", `${viewport.width}x${viewport.height}.png`), fullPage: true });
    report.push(...await measure(page));
    await page.goto(`${pageUrl}?debug=1`, { waitUntil: "networkidle" });
    await waitForPage(page);
    await page.screenshot({ path: path.join(root, "qa", "before-debug", `${viewport.width}x${viewport.height}.png`), fullPage: true });
    await page.close();
  }
  await browser.close();
  const failures = report.filter((item) => Math.abs(item.offsetX) > item.viewport * 0.004 || item.receiver !== item.key);
  console.table(failures);
  fs.writeFileSync(path.join(root, "qa", "hotspot-report.json"), JSON.stringify({ viewports, failures, checked: report.length }, null, 2));
  process.exitCode = failures.length ? 1 : 0;
})();
