import { chromium } from "playwright";

export async function parseWB():Promise<any> {
 const browser = await chromium.launch({headless:true});
 const context = await browser.newContext();
 const page = await context.newPage();
 
 await page.goto(
   "https://www.wildberries.ru/catalog/elektronika/smartfony-i-telefony/vse-smartfony?sort=benefit&page=1"
 ,{waitUntil:"domcontentloaded"});
 await page.waitForLoadState();





await browser.close();
}