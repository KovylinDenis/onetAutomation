module.exports = class LoginPage {
  constructor({page}) {
    this.page = page
    this.loginInputCss = 'input[id="mailFormLogin"]'
    this.acceptPolicyButtonCss =
      'button[class="cmp-button_button cmp-intro_acceptAll "]'
    this.passwordInputCss = 'input[id="mailFormPassword"]'
    this.loginButtonCss = 'input[class="loginButton"]'
  }

  async click(selector) {
    await this.page.waitFor(selector)

    return this.page.click(selector)
  }

  async type(selector, value) {
    await this.page.waitFor(selector)

    return this.page.type(selector, value)
  }

  async doLogin({credentials}) {
    await this.page.goto('https://www.onet.pl/poczta')
    await this.page.waitFor(this.acceptPolicyButtonCss)
    await this.click(this.acceptPolicyButtonCss)
    await this.type(this.loginInputCss, credentials.email)
    await this.type(this.passwordInputCss, credentials.password)
    await this.click(this.loginButtonCss)
    await this.page.waitFor(() => document.URL === 'https://poczta.onet.pl/')
  }
}
