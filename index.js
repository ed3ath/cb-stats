const mongoose = require('mongoose')
const path = require('path')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

require('dotenv').config()

let connectionString = process.env.MONGDB_URL
if (parseInt(process.env.MONGODB_SSL)) connectionString += `&tls=true&tlsCAFile=${path.join(__dirname, 'cert.crt')}`
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err)
    process.exit(0)
  }

  let network = 'bsc'
  try {
    if (argv.network) network = argv.network
    const start = require('./src/')
    start(network)
  } catch (e) {
    console.log('Module not found')
    process.exit(0)
  }
})
module.exports = mongoose
