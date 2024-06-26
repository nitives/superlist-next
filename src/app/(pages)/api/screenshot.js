import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import sitesData from "../../../../public/data/siteData.json" assert { type: "json" };
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(
  __dirname,
  "../../../../public/images/cache/captures"
);
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

async function takeScreenshot(url, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.screenshot({ path: filename });
  await browser.close();
}

const findBestFaviconURL = async function (page, url) {
  const rootUrl = new URL(url).protocol + "//" + new URL(url).host;
  const selectorsToTry = [`link[rel="icon"]`, `link[rel="shortcut icon"]`];
  let faviconUrlFromDocument = null;
  for (let i = 0; i < selectorsToTry.length; i++) {
    const href = await getDOMElementHRef(page, selectorsToTry[i]);
    if (typeof href === "undefined" || href === null || href.length === 0) {
      continue;
    }

    faviconUrlFromDocument = href;
    break;
  }

  if (faviconUrlFromDocument === null) {
    // No favicon link found in document, best URL is likley favicon.ico at root
    return rootUrl + "/favicon.ico";
  }

  if (
    faviconUrlFromDocument.substr(0, 4) === "http" ||
    faviconUrlFromDocument.substr(0, 2) === "//"
  ) {
    // absolute url
    return faviconUrlFromDocument;
  } else if (faviconUrlFromDocument.substr(0, 1) === "/") {
    // favicon relative to root
    return rootUrl + faviconUrlFromDocument;
  } else {
    // favicon relative to current (url) URL
    return url + "/" + faviconUrlFromDocument;
  }
};

async function captureScreenshots() {
  for (const site of sitesData) {
    const filename = path.join(
      screenshotsDir,
      `${site.name.replace(/\s/g, "_")}.png`
    );
    console.log(`Capturing screenshot for ${site.name}`);
    await takeScreenshot(site.link, filename).catch(
      (error) => {
        console.error(`Failed to capture screenshot for ${site.name}:`, error);
      },
      await findBestFaviconURL(site.link, filename).catch((error) => {
        console.error(`Failed to capture screenshot for ${site.name}:`, error);
      })
    );
  }
}

captureScreenshots();
