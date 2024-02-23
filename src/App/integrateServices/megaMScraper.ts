import fs from "fs";
import { chromium } from "playwright";

const url = "https://megamarket.ru/catalog/smartfony/#?sort=6";
const dataObj: {
  title: string;
  discount: string;
  money: string;
  ref: string;
  detail: string;
}[] = [];

export async function scrapMM(): Promise<
  {
    title: string;
    discount: string;
    money: string;
    ref: string;
    detail: string;
  }[]
> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForLoadState();

  //const innerhtml = await page.locator("div.catalog-items-list");
  const itemblock = await page.locator(".item-block").all();
  for (const el of itemblock) {
    const rdiscount = await el.locator(".badge-list-container").allInnerTexts();
    let hdiscount = "";
    for (const el of rdiscount) {
      hdiscount += el;
    }
    let rref = await el
      .locator(".item-title")
      .locator("a")
      .getAttribute("href");
    const href: string = typeof rref === "string" ? rref : "";
    const hmoney = await el.locator(".item-price").locator("span").innerText();
    const rtitle = await el
      .locator(".item-title")
      .locator("a")
      .getAttribute("title");
    const htitle: string = typeof rtitle === "string" ? rtitle : "";
    const rdetail = await el
      .locator(".catalog-item-properties")
      .locator(".item-details")
      .allTextContents();
    let hdetail = "";
    for (const el of rdetail) {
      hdetail += +" "+el;
    }

    dataObj.push({
      title: htitle,
      discount: hdiscount,
      money: hmoney,
      ref: "https://megamarket.ru/" + href,
      detail: hdetail,
    });
  }
  await browser.close();
  //const jsonData = JSON.stringify(dataObj);

  return dataObj;
  /* fs.writeFile("result.json", jsonData, (error) => {
    if (error) console.log("file not saved" + error);
    else console.log("file saved succes");
  });
 */
}
