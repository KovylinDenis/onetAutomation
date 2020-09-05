const path = require('path')
const {
  searchForAccountsToProcess,
  rewriteUser,
  readFileAsync
} = require(path.resolve('src', 'model', 'utils'))
const {processUser} = require(path.resolve(
  'src',
  'controller',
  'puppeteerController'
))
const DATABASE_FILE =
  process.env.DATABASE_PART === undefined
    ? path.resolve('src', 'database', 'database.json')
    : path.resolve(
        'src',
        'database',
        'temp',
        `${process.env.DATABASE_PART}.json`
      )
const retries = 4

const main = async () => {
  const t0 = Date.now()
  for (let retry = 0; retry < retries + 1; retry++) {
    let users = []

    if (process.env.DATABASE_PART === undefined) {
      users = await searchForAccountsToProcess({databasePath: DATABASE_FILE})
    } else {
      users = JSON.parse(await readFileAsync(DATABASE_FILE))
    }

    if (users.length !== 0) {
      const t00 = Date.now()
      console.log(`${users.length} users were found for ${retry} retry`)

      for (let i = 0; i < users.length; i++) {
        console.log(`Loop: ${retry} Index: ${i} User : ${users[i].email}`)
        users[i] = await processUser({user: users[i]})
        await rewriteUser({user: users[i], databasePath: DATABASE_FILE})
        console.log('   * All done for this user')
      }

      const t11 = Date.now()
      console.log(
        `Done! Time passed for ${retry} iteration: ${(t11 - t00) /
          1000} seconds`
      )
      continue
    }
    console.log(`No users to process were found!`)
    break
  }
  const t1 = Date.now()
  console.log(`Done! Total time passed: ${(t1 - t0) / 1000} seconds`)
}

;(async () => {
  await main()
})()
