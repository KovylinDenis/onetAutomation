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
    const artifactDatabasePath = path.resolve(DATABASE_TEMP_FOLDER,`` , `${i}.json`)
    const partArtifactDatabase = JSON.parse(await readFileAsync(artifactDatabasePath))

    for (let j = 0; j < partArtifactDatabase.length; j++) {
      const index = mainDatabase.findIndex(
        (element) => element.email === partArtifactDatabase[j].email
      )
      console.log(`Part: ${i}. PartUser ${j}`)
      console.log(partArtifactDatabase)
      mainDatabase[index] = partArtifactDatabase[j]
    }

    await fs.writeFile(partDatabasePath, JSON.stringify([], null, 2))
  }

  await fs.writeFile(DATABASE_FILE, JSON.stringify(mainDatabase, null, 2))
}

;(async () => {
  await main()
})()
