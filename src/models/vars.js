const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  network: String,
  hourlyIncome: Number,
  hourlyFights: Number,
  powerSum: Number,
  powerAvg: Number,
  payPerFight: Number,
  timestamp: Number,
  dailyMaxClaim: Number
})
module.exports = mongoose.model('Vars', Schema)
