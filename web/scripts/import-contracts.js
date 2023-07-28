const fs = require('fs')

const TARGET_CONTRACTS_PATH = './.contracts'
const SOURCE_CONTRACTS_PATH = '../contracts'

const SOURCE_TYPECHAIN_PATH = `./${SOURCE_CONTRACTS_PATH}/typechain`
const SOURCE_CONTRACTS_JSON_PATH = `./${SOURCE_CONTRACTS_PATH}/contracts.json`

const TARGET_TYPECHAIN_PATH = `./${TARGET_CONTRACTS_PATH}/typechain`
const TARGET_CONTRACTS_JSON_PATH = `./${TARGET_CONTRACTS_PATH}/contracts.json`

function main() {
  // check if folder is exist
  if (!fs.existsSync(TARGET_CONTRACTS_PATH)) fs.mkdirSync(TARGET_CONTRACTS_PATH)

  // rm existing files from contracts
  fs.rmSync(TARGET_TYPECHAIN_PATH, { recursive: true, force: true })
  fs.rmSync(TARGET_CONTRACTS_JSON_PATH, { recursive: true, force: true })

  // cp contracts meta to web dir
  fs.cpSync(SOURCE_TYPECHAIN_PATH, TARGET_TYPECHAIN_PATH, { recursive: true })
  fs.cpSync(SOURCE_CONTRACTS_JSON_PATH, TARGET_CONTRACTS_JSON_PATH)
}

main()
