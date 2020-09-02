module.exports = class SettingsPage {
  constructor({page}) {
    this.page = page
    this.firewallSwitchCss = 'span[id="infoFirewall"]'
    this.IMAPSwitchCss = 'span[id="infoImap"]'
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

  async disableFirewall() {
    await this.page.goto('https://poczta.onet.pl/ustawienia/')

    const status = await this.getAttribute(this.firewallSwitchCss, 'class')

    if (status === this.switchStateOn) {
      for (let i = 0; i < this.clickRetryCount + 1; i++) {
        await this.click(this.firewallSwitchCss)
        console.log(`   * Firewall switch clicked, attempt: ${i + 1}`)

        await this.page.reload()
        await this.sleep(i * 1000)

        const newStatus = await this.getAttribute(
          this.firewallSwitchCss,
          'class'
        )
        if (newStatus === this.switchStateOn) {
          if (i >= this.clickRetryCount) {
            throw new Error('   * Firewall disabling failed!')
          } else {
            continue
          }
        }
        break
      }
    }
  }

  async enableIMAP() {
    await this.page.goto('https://poczta.onet.pl/ustawienia/')

    const status = await this.getAttribute(this.IMAPSwitchCss, 'class')

    if (status === this.switchStateOff) {
      for (let i = 0; i < this.clickRetryCount + 1; i++) {
        await this.click(this.IMAPSwitchCss)
        console.log(`   * IMAP switch clicked, attempt: ${i + 1}`)

        await this.page.reload()
        await this.sleep(i * 1000)

        const newStatus = await this.getAttribute(this.IMAPSwitchCss, 'class')
        if (newStatus === this.switchStateOff) {
          if (i >= this.clickRetryCount) {
            throw new Error('   * IMAP enabling failed!')
          } else {
            continue
          }
        }
        break
      }
    }
  }
}
