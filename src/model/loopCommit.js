const util = require('util')
const exec = util.promisify(require('child_process').exec)

const commitRetries = 20

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const main = async () => {
  for (let i = 0; i < commitRetries; i++) {
    try {
      const {stdout, stderr} = await exec('sh ./src/sh/commitProcess.sh')
      console.log('stdout:', stdout)
      console.log('stderr:', stderr)
    } catch (err) {
      console.error(err)
    }
    await sleep(1000 + Math.floor(Math.random() * Math.floor(5000)))
  }
}

;(async () => {
  await main()
})()
