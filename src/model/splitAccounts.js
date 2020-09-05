const fs = require('fs').promises
const path = require('path')
const {searchForAccountsToProcess} = require(path.resolve(
  'src',
  'model',
  'utils'
))

const PARTS_COUNT = 15
const DATABASE_FILE = path.resolve('src', 'database', 'database.json')
const DATABASE_TEMP_FOLDER = path.resolve('src', 'database', 'temp')

const main = async () => {
  const allUsers = await searchForAccountsToProcess({
    databasePath: DATABASE_FILE
  })
  const avgUsersPerFile = Math.floor(allUsers.length / PARTS_COUNT)

  for (let i = 0; i < PARTS_COUNT; i++) {
    let partUsers = []
    if (i < PARTS_COUNT - 1) {
      for (let j = i * avgUsersPerFile; j < (i + 1) * avgUsersPerFile; j++) {
        partUsers.push(allUsers[j])
      }
    } else {
      for (let j = i * avgUsersPerFile; j < allUsers.length; j++) {
        partUsers.push(allUsers[j])
      }
    }
    const databasePath = path.resolve(DATABASE_TEMP_FOLDER, `${i}.json`)

    await fs.writeFile(databasePath, JSON.stringify(partUsers, null, 2))
  }
}

;(async () => {
  await main()
})()
