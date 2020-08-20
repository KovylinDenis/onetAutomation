const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const {readFileAsync} = require(path.resolve('src', 'model', 'utils'))
const {LoginPage, SettingsPage} = require(path.resolve('src', 'pages'))
const DATABASE_FILE = path.resolve('src', 'database', 'database.json')
const retries = 2

const main = async () => {
  const t0 = Date.now()

  for (let retry = 0; retry < retries + 1; retry++) {
    const database = JSON.parse(await readFileAsync(DATABASE_FILE))

    for (let i = 0; i < database.length; i++) {
      if (!('firewall' in database[i]) || database[i].firewall !== 'off') {
        console.log(
          `i: ${i} retry: ${retry} Disabling firewall for: ${database[i].email}`
        )

        const browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          timeout: 30000
        })

        try {
          const page = await browser.newPage()
          const loginPage = new LoginPage({page})
          const settingsPage = new SettingsPage({page})

          await loginPage.doLogin({credentials: database[i]})
          if (database[i].imap !== 'on') {
            await settingsPage.enableIMAP()
            database[i].imap = 'on'
          }

          await settingsPage.disableFirewall()
          database[i].firewall = 'off'
        } catch (error) {
          console.log(`ERROR! User: ${database[i].email}\n${error}`)
          database[i].firewall = 'error: ' + error
        } finally {
          await browser.close()
        }
      }
    }
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2), () => {})
  }
  const t1 = Date.now()
  console.log(`Done! Time passed: ${(t1 - t0) / 1000} seconds`)
}

;(async () => {
  await main()
})()
