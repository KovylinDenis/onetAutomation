const fs = require('fs')
const path = require('path')
const {readAllFilesAsync, normalizeText, readFileAsync} = require(path.resolve(
  'src',
  'model',
  'utils'
))

const RAW_CREDENTIALS = path.resolve('raw')
const DATABASE_FILE = path.resolve('src', 'database', 'database.json')

const main = async () => {
  const rawData = await readAllFilesAsync(`${RAW_CREDENTIALS}${path.sep}`)
  const database = JSON.parse(await readFileAsync(DATABASE_FILE))
  let credentialsCount = 0

  for (let i = 0; i < rawData.length; i++) {
    const normalized = normalizeText(rawData[i])
    const credentialsArray = normalized.split(' ')

    for (let j = 0; j < credentialsArray.length; j++) {
      const singleCredentials = credentialsArray[j].split(':')
      const found = database.find(
        (element) => element.email === singleCredentials[0]
      )
      if (found === undefined) {
        credentialsCount++
        database.push({
          email: singleCredentials[0],
          password: singleCredentials[1]
        })
      }
    }
  }

  fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2), () => {})

  console.log(`${credentialsCount} credentials were migrated!`)
}

;(async () => {
  await main()
})()
