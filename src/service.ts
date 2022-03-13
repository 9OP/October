import puppeteer from "puppeteer";

export const searchNumber = async (name: string, postalCode: string) => {
  let number = null;
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  // Via 118000
  let page = await browser.newPage();
  await page.goto(
    `https://www.118000.fr/search?label${postalCode}&who=${name}`
  );
  let element = await page.$(".atel");
  if (element) {
    number = await page.evaluate((el) => el?.textContent?.trim(), element);
  }

  // Via Google
  page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?client=firefox-b-d&q=telephone+${name}+${postalCode}`
  );
  element = await page.$(".mw31Ze");
  if (element && !number) {
    number = await page.evaluate((el) => el?.textContent?.trim(), element);
  }

  await browser.close();
  return number;
};
