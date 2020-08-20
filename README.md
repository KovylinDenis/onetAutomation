# onetAutomation

## Install

- Open terminal inside folder where you wanna install **onetAutomation**
- Install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
- Install node: `nvm install 14`
- Clone repo: `git clone https://github.com/KovylinDenis/onetAutomation.git`
- Open **onetAutomation** folder in terminal: `cd onetAutomation`
- Install dependencies: `npm i`

## Usage

- Open **onetAutomation** folder, you should see _raw_, _src_, _node_modules_ folders and a bunch of files.
- Place text files with emails and passwords in _raw_ folder
  - Note 1: format should be **email:password** separated by _space_, _tab_ or _new line_.
  - Note 2: you can place folders with files instead, it will help you group all your accounts.
- Open **onetAutomation** folder in terminal
- You need to convert raw data that you placed in _raw_ folder into script-readable format. To do that run next command:
  `npm run convertEmails`
- After that you will see all the accounts in JSON format stored in _src/database_ folder.
- Now you are prepared for disabling Firewall and enabling IMAP for those accounts. Just simply run next command:
  `npm run turnOffFirewall`
