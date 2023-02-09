const puppeteer = require('puppeteer')
const readline = require('readline');
const reader = require('xlsx');

const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

let fileName = 'placeholder'
let startIndex = 0
let mode
  
let data = []

function getScreenshotName(ticker, date) {
  let today = new Date(Date.now())
  let timeStamp = today.toISOString().split('T')[0]
  timeStamp = timeStamp.replace(/-/g, '')
  const hours = `${today.getHours()}`.padStart(2, "0")
  const minutes = `${today.getMinutes()}`.padStart(2, "0")
  const seconds = `${today.getSeconds()}`.padStart(2, "0")
  const formattedDate = date.replace(/\//g, '')
  timeStamp = `${timeStamp}-${hours}${minutes}${seconds}-${ticker}-${formattedDate}`
  return timeStamp
}

function readExcel(path) {
  return new Promise((resolve)=>{
    // Reading our test file
    const file = reader.readFile(`./tables/${path}.xlsx`)

    const sheets = file.SheetNames

    for(let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]], { raw: false })
      temp.forEach((res) => {
        let date = res.DateTime.split(' ')[0]
        date = date.split('-')
        date = `${date[1]}/${date[2]}/${date[0]}`
        data.push({ticker: res.ticker, date: date})
      })
    }
    // Printing data
    console.log(data)
    resolve()
  })
}

//why are here three functions for the same thing
function waitForInput() {
  return new Promise((resolve) => {
    rl.question('Aby kontynuować wciśnij ENTER, aby zamknąć - CTRL+C ', (answer) => {
      resolve()
    });
  })
}

function waitForFileName() {
  return new Promise((resolve) => {
    rl.question('Wpisz nazwę pliku (bez rozszerzenia): ', (answer) => {
      fileName = answer
      resolve()
    });
  })
}

function waitForIndex() {
  return new Promise((resolve) => {
    rl.question('Wpisz indeks początkowy (od 1): ', (answer) => {
      if (answer > 0) {startIndex = answer - 1}
      resolve()
    });
  })
}

function waitForMode() {
  return new Promise((resolve) => {
    rl.question('Wybierz wariant - 0.manualny 1.automatyczny: ', (answer) => {
      if (answer != '0') {
        mode = 1
      } else { mode = 0}
      resolve()
    });
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function open(index) {
  console.log(`otwieram: ${data[index].ticker}, date: ${data[index].date}`)

  //go to page and wait for it to load
  await Promise.all([page.goto(`https://www.barchart.com/stocks/quotes/${data[index].ticker}/interactive-chart/fullscreen`), page.waitForNavigation()]).catch(err => console.log(err))

  //handle sign in popup
  const signInBlock = await page.$(".sign-in-block", el => el.innerHTML)
  if (signInBlock) {
    await page.click('i[class="bc-glyph-times form-close"]')
    await sleep(1000)
  }

  //handle intraday only once
  if (index === startIndex) {
    const [dropdown] = await page.$x("//a[contains(., 'Daily')]");
      if (dropdown) {
        await dropdown.click();
        const [intraday] = await page.$x("//li[contains(., 'Intraday')]");
        if (intraday) {
          await intraday.click();
          await page.focus('input[aria-label="enter aggregation size in minutes"]')
          await page.keyboard.press('Backspace');
          await page.keyboard.type(`1`)
        }
      }
  }

  await page.waitForSelector('.calendar-icon')
  //focus on 
  await page.click('.calendar-icon')
  await page.waitForSelector('input[data-ng-model="selectedAggregation.range.from"]')
  await page.focus('input[data-ng-model="selectedAggregation.range.from"]')

  //delete cached input date
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Backspace');
  }
  await page.keyboard.type(`${data[index].date}`)
  await page.focus('input[data-ng-model="selectedAggregation.range.to"]')
  await page.keyboard.type(`${data[index].date}`)
  await page.$eval('button[class="bc-button light-blue"]', element => element.click())

  await sleep(1000)

  await page.mouse.move(450, 350)

  //take screenshot
  await page.screenshot({ 
    path: `./screenshots/${getScreenshotName(data[index].ticker, data[index].date)}.png`,
    fullPage: true 
  })
  
  await sleep(2000)
}

async function main() {
  await waitForFileName()
  await waitForIndex()
  await waitForMode() 
  await readExcel(fileName).catch(err => {console.log(err)})
  try {
    browser = await puppeteer.launch({
      //executablePath: './chromium/chrome/win64-1069273/chrome-win/chrome.exe',
      headless: false,
      defaultViewport: null
    })
    page = await browser.newPage()
    await page.setCacheEnabled(false)
  
    //sequentially execute for all rows
    for (let i = startIndex; i < data.length; i++) {
      await open(i).catch(err => console.log(err))
      if (mode === 0 || i === startIndex) {
        await waitForInput().catch(err => console.log(err))
        if (i === startIndex) {
          await page.screenshot({ 
            path: `./screenshots/${getScreenshotName(data[startIndex].ticker, data[startIndex].date)}.png`,
            fullPage: true 
          })
        }
      }
    }
  } catch(err) {console.log(err)}
  rl.close();
}

let browser, page

main()