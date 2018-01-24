const csvconverter = require('csvtojson')
const csvFilePath = './customer-data.csv'
const fs = require('fs')

let i = 0

const destinationFile = fs.createWriteStream('customer-data.json')

destinationFile.write('[')

csvconverter()
  .fromFile(csvFilePath)
  .on('json', (jsonObj) => {
    const prefix = i == 0 ? '' : ',\n'
    destinationFile.write(prefix + JSON.stringify(jsonObj))
    i++
  })
  .on('end', () => {
    destinationFile.write(']')
    destinationFile.end()
  })