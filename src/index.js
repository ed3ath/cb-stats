const Web3 = require('web3')

const { Vars } = require('./models')

const nodes = {
  bsc: 'https://bsc-dataseed1.defibit.io/',
  heco: 'https://http-mainnet.hecochain.com'
}

const address = {
  bsc: {
    cryptoBlades: '0x39Bea96e13453Ed52A734B6ACEeD4c41F57B2271'
  },
  heco: {
    cryptoBlades: '0x29869EDb088466a49f75654d8F04edd16Bf60e75'
  }
}

const init = async (network) => {
  let hourlyIncome = await getData(network, 1)
  let hourlyFights = await getData(network, 2)
  let powerSum = await getData(network, 3)
  let powerAvg = await getData(network, 4)
  let payPerFight = await getData(network, 5)
  let timestamp = await getData(network, 6)
  let dailyMaxClaim = await getData(network, 7)

  console.log('Starting....')

  let time = 1

  setInterval(async () => {
    time += 1
    console.log('Retrieving index 1, 2 and 3')
    if (time >= 10) {
      time = 1
      console.log('Retrieving index 4, 5 and 7')
      powerAvg = await getData(network, 4)
      payPerFight = await getData(network, 5)
      dailyMaxClaim = await getData(network, 7)
    }
    hourlyIncome = await getData(network, 1)
    hourlyFights = await getData(network, 2)
    powerSum = await getData(network, 3)
    timestamp = await getData(network, 6)

    await Vars.create({
      network,
      hourlyIncome,
      hourlyFights,
      powerSum,
      powerAvg,
      payPerFight,
      timestamp,
      dailyMaxClaim
    })
  }, 1000)
}

const getData = async (network, index) => {
  const web3 = new Web3(nodes[network])
  const CryptoBlades = new web3.eth.Contract(require('./contracts/CryptoBlades.json'), address[network].cryptoBlades)
  return CryptoBlades.methods.vars(index).call()
}

module.exports = init
