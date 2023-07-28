const fs = require('fs')
const path = require('path')

const CONTRACTS_PATH = './.contracts'
const SIDE_DIR = path.join(CONTRACTS_PATH, 'custom')
const ABIS_DIR = path.join(SIDE_DIR, 'abis')
const TARGET_ABIS_FILE = path.join(SIDE_DIR, 'abis.json')

function main() {
  const files = fs.readdirSync(ABIS_DIR)
  console.log('Abis:\n-', files.join('\n-'))

  const abis = {}
  for (const fileName of files) {
    const filePath = path.join(ABIS_DIR, fileName)
    const content = JSON.parse(fs.readFileSync(filePath).toString())
    abis[fileName.slice(0, -'.json'.length)] = content
  }

  fs.writeFileSync(TARGET_ABIS_FILE, JSON.stringify(abis, undefined, 2))
}

main()
