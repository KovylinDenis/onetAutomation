const fs = require('fs').promises
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
      console.log(`Part: ${i}. PartUser ${j}`)
      console.log(partDatabase)
      mainDatabase[index] = partDatabase[j]
    }

    await fs.writeFile(partDatabasePath, JSON.stringify([], null, 2))
  }

  await fs.writeFile(DATABASE_FILE, JSON.stringify(mainDatabase, null, 2))
}

;(async () => {
  await main()
})()
