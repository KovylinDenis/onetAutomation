# onetAutomation

## Local run

### Install

- Open terminal inside folder where you wanna install **onetAutomation**
- Install nvm:
  - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
- Install node:
  - `nvm install 14`
- Clone repo:
  - `git clone https://github.com/KovylinDenis/onetAutomation.git`
- Open **onetAutomation** folder in terminal:
  - `cd onetAutomation`
- Install dependencies:
  - `npm i`

### Usage

- Open **onetAutomation** folder, you should see _raw_, _src_, _node_modules_ folders and a bunch of files.
- Place text files with emails and passwords in _raw_ folder
  - Note 1: format should be **email:password** separated by _space_, _tab_ or _new line_.
  - Note 2: you can place folders with files instead, it will help you group all your accounts.
- Open **onetAutomation** folder in terminal
- You need to convert raw data that you placed in _raw_ folder into script-readable format. To do that run next command:
  - `npm run convertEmails`
- After that you will see all the accounts in JSON format stored in _src/database_ folder.
- Now you are prepared for disabling Firewall and enabling IMAP and SMTP for those accounts. Just simply run next command:
  - `npm run processAccounts`
- Please after run is completed run next commands to save updated database in repository:
  - (optional) `git config --global user.name "YourName"`
  - (optional) `git config --global user.email "yourEmail@someMail.com"`
  - `git add -A`
  - `git commit -m "Some message, like: Add new raw emails"`
  - `git push origin master`

## Cloud run

### Install (only git and clone repo)

- Install Git client (GitKraken, SourceTree, etc.) or _git Command Line Interface (CLI)_ on your device.
- If you use git CLI:

  - Run git settings commands:
    - `git config --global user.name "YourName"`
    - `git config --global user.email "yourEmail@someMail.com"`
  - Open terminal inside folder where you want install **onetAutomation**
  - Clone repo:
    - `git clone https://github.com/KovylinDenis/onetAutomation.git`

- If you use Git Client:
  - Find an option similar to "Clone repo/repository".
  - Paste URL of git repository(_https://github.com/KovylinDenis/onetAutomation.git_).
  - Chose a directory where to clone repo.

### Usage

- Open **onetAutomation** folder, you should see _raw_, _src_, _node_modules_ folders and a bunch of files.
- Place text files with emails and passwords in _raw_ folder

  - Note 1: format should be **email:password** separated by _space_, _tab_ or _new line_.
  - Note 2: you can place folders with files instead, it will help you group all your accounts.

- If you use git CLI

  - Open folder in terminal
  - Run next commands:
    - `git add -A`
    - `git commit -m "Some message, like: Add new raw emails"`
    - `git push origin master`

- If you use Git Client

  - Find on the UI option which says "Stage changes" (It may differ between different clients) and stage all changes that you have.
  - Press "Commit" button.
  - Press "Push" button.

- Open `https://github.com/KovylinDenis/onetAutomation/actions` in browser
- Find latest option with your commit message
- Open it and enjoy cloud calculations =) (There will be several jobs with stages and you can monitor them)
