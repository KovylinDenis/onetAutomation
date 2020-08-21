const path = require('path')
const puppeteer = require('puppeteer')
const {LoginPage, SettingsPage} = require(path.resolve('src', 'pages'))

const disableFirewallForUser = async ({user}) => {
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
    if (user.imap !== 'on') {
      await settingsPage.enableIMAP()
      console.log('   * IMAP enabled')
      user.imap = 'on'
    } else {
      console.log('   * IMAP already enabled')
    }

    await settingsPage.disableFirewall()
    console.log('   * Firewall disabled')
    user.firewall = 'off'
  } catch (error) {
    console.log('   * ERROR! Reason:')
    console.log(error)
    user.firewall = 'error: ' + error
  } finally {
    await browser.close()
  }

  return user
}

module.exports = {disableFirewallForUser}
