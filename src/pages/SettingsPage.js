module.exports = class SettingsPage {
  constructor({page}) {
    this.page = page
    this.firewallSwitchCss = 'span[id="infoFirewall"]'
    this.IMAPSwitchCss = 'span[id="infoImap"]'
    this.SMTPSwitchCss = 'span[id="infoSmtp"]'
    this.switchStateOff = 'switchoff2'
    this.switchStateOn = 'switchon2'
    this.clickRetryCount = 2
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async click(selector) {
    await this.page.waitFor(selector)
    await this.sleep(1500)

    return this.page.click(selector)
  }

  async type(selector, value) {
    await this.page.waitFor(selector)

    return this.page.type(selector, value)
  }

  async getAttribute(selector, attr) {
    await this.page.waitFor(selector)

    return this.page.$eval(
      selector,
      (el, attribute) => el.getAttribute(attribute),
      attr
    )
  }

  async checkSettingsSwitch({
    switchName,
    swithcSelector,
    desiredStateName,
    desiredStateAttribute
  }) {
    await this.page.goto('https://poczta.onet.pl/ustawienia/')

    const status = await this.getAttribute(swithcSelector, 'class')

    if (status !== desiredStateAttribute) {
      for (let i = 0; i < this.clickRetryCount + 1; i++) {
        await this.click(swithcSelector)
        console.log(`   * ${switchName} switch clicked, attempt: ${i + 1}`)

        await this.page.reload()
        await this.sleep(i * 1000)

        const newStatus = await this.getAttribute(swithcSelector, 'class')

        if (newStatus !== desiredStateAttribute) {
          if (i >= this.clickRetryCount) {
            return 'error: Too many attempts'
          } else {
            continue
          }
        }
        break
      }
    }

    return desiredStateName
  }

  async disableFirewall() {
    return await this.checkSettingsSwitch({
      switchName: 'Firewall',
      desiredStateName: 'off',
      swithcSelector: this.firewallSwitchCss,
      desiredStateAttribute: this.switchStateOff
    })
  }

  async enableIMAP() {
    return await this.checkSettingsSwitch({
      switchName: 'IMAP',
      desiredStateName: 'on',
      swithcSelector: this.IMAPSwitchCss,
      desiredStateAttribute: this.switchStateOn
    })
  }

  async enableSMTP() {
    return await this.checkSettingsSwitch({
      switchName: 'SMTP',
      desiredStateName: 'on',
      swithcSelector: this.SMTPSwitchCss,
      desiredStateAttribute: this.switchStateOn
    })
  }
}
