module.exports = class SettingsPage {
  constructor({page}) {
    this.page = page
    this.firewallSwitchCss = 'span[id="infoFirewall"]'
    this.IMAPSwitchCss = 'span[id="infoImap"]'
    this.switchStateOff = 'switchoff2'
    this.switchStateOn = 'switchon2'
  }

  async click(selector) {
    await this.page.waitFor(selector)

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
    await this.page.waitFor(this.firewallSwitchCss)
  
    const status = await this.getAttribute(this.firewallSwitchCss, 'class')

    if (status === this.switchStateOn) {
      await this.page.waitFor(this.firewallSwitchCss)
      await this.click(this.firewallSwitchCss)
    }

    await this.page.reload()
    await this.page.waitFor(this.firewallSwitchCss)

    const newStatus = await this.getAttribute(this.firewallSwitchCss, 'class')
    if (newStatus === this.switchStateOn) {
      throw new Error('Firewall disabling failed!')
    }
  }

  async enableIMAP() {
    await this.page.goto('https://poczta.onet.pl/ustawienia/')
    await this.page.waitFor(this.IMAPSwitchCss)
  
    const status = await this.getAttribute(this.IMAPSwitchCss, 'class')

    if (status === this.switchStateOff) {
      await this.page.waitFor(this.IMAPSwitchCss)
      await this.click(this.IMAPSwitchCss)
    }

    await this.page.reload()
    await this.page.waitFor(this.IMAPSwitchCss)

    const newStatus = await this.getAttribute(this.IMAPSwitchCss, 'class')
    if (newStatus === this.switchStateOff) {
      throw new Error('IMAP enabling failed!')
    }
  }
}
