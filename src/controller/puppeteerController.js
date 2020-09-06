const path = require('path')
const puppeteer = require('puppeteer')
const {LoginPage, SettingsPage} = require(path.resolve('src', 'pages'))

const processUser = async ({user}) => {
  let browser
  try {
    if (process.env.PUPPETEER_EXEC_PATH === undefined) {
      browser = await puppeteer.launch({
        headless: false,
        timeout: 30000
      })
    } else {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--window-size=1920,1080'],
        headless: false,
        executablePath: process.env.PUPPETEER_EXEC_PATH,
        timeout: 30000
      })
    }
  } catch (error) {
    console.log('   * ERROR browser crashed')
    console.log(error)

    return user
  }

  try {
    const page = await browser.newPage()
    const loginPage = new LoginPage({page})
    const settingsPage = new SettingsPage({page})

    await loginPage.doLogin({credentials: user})
    console.log('   * Login passed')

    if (user.imap !== 'on') {
      const status = await settingsPage.enableIMAP()
      console.log('   * IMAP enabled')
      user.imap = status
    } else {
      console.log('   * IMAP already enabled')
    }

    if (user.smtp !== 'on') {
      const status = await settingsPage.enableSMTP()
      console.log('   * SMTP enabled')
      user.smtp = status
    } else {
      console.log('   * SMTP already enabled')
    }

    if (user.firewall !== 'off') {
      const status = await settingsPage.disableFirewall()
      console.log('   * Firewall disabled')
      user.firewall = status
    } else {
      console.log('   * Firewall already enabled')
    }
  } catch (error) {
    console.log('   * ERROR! Reason:')
    console.log(error)
    user.firewall = 'error: ' + error
    user.imap = 'error'
    user.smtp = 'error'
  } finally {
    await browser.close()
  }

  return user
}

module.exports = {processUser}
