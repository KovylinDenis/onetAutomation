const path = require('path')
const puppeteer = require('puppeteer')
const {LoginPage, SettingsPage} = require(path.resolve('src', 'pages'))

const disableFirewallForUser = async ({user}) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
    defaultViewport: null,
    timeout: 30000
  })

  try {
    const page = await browser.newPage()
    const loginPage = new LoginPage({page})
    const settingsPage = new SettingsPage({page})

    await loginPage.doLogin({credentials: user})
    if (user.imap !== 'on') {
      await settingsPage.enableIMAP()
      user.imap = 'on'
    }

    await settingsPage.disableFirewall()
    user.firewall = 'off'
  } catch (error) {
    console.log(`ERROR! User: ${user.email}\n${error}`)
    user.firewall = 'error: ' + error
  } finally {
    await browser.close()
  }

  return user
}

module.exports = {disableFirewallForUser}
