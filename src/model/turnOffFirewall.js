const fs = require('fs')
const path = require('path')
const {readFileAsync} = require(path.resolve('src', 'model', 'utils'))
const {disableFirewallForUser} = require(path.resolve(
  'src',
  'controller',
  'puppeteerController'
))
const DATABASE_FILE = path.resolve('src', 'database', 'database.json')
const retries = 4

const searchForUsersWithFirewall = async () => {
  const database = JSON.parse(await readFileAsync(DATABASE_FILE))
  const usersWithFirewall = []

  for (let i = 0; i < database.length; i++) {
    if (!('firewall' in database[i]) || database[i].firewall !== 'off') {
      usersWithFirewall.push(database[i])
    }
  }

  return usersWithFirewall
}

const rewriteUser = async ({user}) => {
  const database = JSON.parse(await readFileAsync(DATABASE_FILE))
  const userIndexInDataBase = database.findIndex(
    (el) => el.email === user.email
  )

  if (userIndexInDataBase !== -1) {
    database[userIndexInDataBase] = user
  } else {
    database.push(user)
  }

  fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2))
}

const main = async () => {
  const t0 = Date.now()
  for (let retry = 0; retry < retries + 1; retry++) {
    const users = await searchForUsersWithFirewall()

    if (users.length !== 0) {
      const t00 = Date.now()
      console.log(`${users.length} users were found for ${retry + 1} retry`)

      for (let i = 0; i < users.length; i++) {
        console.log(
          `Loop: ${retry + 1} Index: ${i} Disabling firewall for: ${
            users[i].email
          }`
        )
        users[i] = await disableFirewallForUser({user: users[i]})
        await rewriteUser({user: users[i]})
        console.log('   * All done for this user')
      }

      const t11 = Date.now()
      console.log(
        `Done! Time passed for ${retry + 1} iteration: ${(t11 - t00) /
          1000} seconds`
      )
      continue
    }
    console.log(`No more users with turned on firewall were found!`)
    break
  }
  const t1 = Date.now()
  console.log(`Done! Total time passed: ${(t1 - t0) / 1000} seconds`)
}

;(async () => {
  await main()
})()
