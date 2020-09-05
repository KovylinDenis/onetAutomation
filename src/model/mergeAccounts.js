const fs = require('fs')
const path = require('path')
const {readFileAsync} = require(path.resolve('src', 'model', 'utils'))

const PARTS_COUNT = 15
const DATABASE_FILE = path.resolve('src', 'database', 'database.json')
const DATABASE_TEMP_FOLDER = path.resolve('src', 'database', 'temp')

const main = async () => {
  const mainDatabase = JSON.parse(await readFileAsync(DATABASE_FILE))

  for (let i = 0; i < PARTS_COUNT; i++) {
    const partDatabasePath = path.resolve(DATABASE_TEMP_FOLDER, `${i}.json`)
    const partDatabase = JSON.parse(await readFileAsync(partDatabasePath))

    for (let j = 0; j < partDatabase.length; j++) {
      const index = mainDatabase.findIndex(
        (element) => element.email === partDatabase[j].email
      )
      mainDatabase[index] = partDatabase[j]
    }
  }

  fs.writeFileSync(DATABASE_FILE, JSON.stringify(mainDatabase, null, 2))
}

;(async () => {
  await main()
})()
