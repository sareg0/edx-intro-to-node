//this is the provided solution
const mongodb = require('mongodb')
const async = require('async')
const url = 'mongodb://localhost:27017/edx-course-db'
const customers = require('./data/m3-customer-data.json')
const customerAddresses = require('./data/m3-customer-address-data.json')

const batchSize = parseInt(process.argv[2], 10) || 1000

console.log(`batch size: ${batchSize}`)

let tasks = []

mongodb.MongoClient.connect(url, (error, client) => {
  const database = client.db('edx-course-db')
  if (error) return process.exit(1)
  const startTime = Date.now()
  customers.forEach((customer, index, list) => {
    customers[index] = Object.assign(customer, customerAddresses[index])

    if (index % batchSize == g 0) {
    const startPoint = index
    const endPoint = (startPoint + batchSize > customers.length) ? customers.length - 1 : startPoint + batchSize
    tasks.push((done) => {
      console.log(`Processing records ${startPoint}-${endPoint} out of ${customers.length}`)
      database.collection('customers2').insert(customers.slice(startPoint, endPoint), (error, results) => {
        done(error, results)
      })
    })
  }
})

async.parallel(tasks, (error, result) => {
  if (error) console.log(error)
  const endTime = Date.now()
  console.log(`It took ${endTime - startTime} to process the records`)
  client.close()
})
})
