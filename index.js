'use strict'

const fetch = require('node-fetch')
const time = require('promise-time')

const url = 'https://pgorelease.nianticlabs.com/plfe/'

function getTimePromise () {
  return time(fetch)(url)
}

function judge (time) {
  if (time === -1) return 'Error! Probably not a good sign, but try again.|' + time
  if (time < 800) return 'Yep. Go outside and catch some!|'+ time
  if (time >= 800 && time < 3000) return 'Yep, but the servers are struggling :-(|' + time
  if (time >= 3000) return 'Nope, servers are down! Go back to work.|' + time
}

function isPokemonGoUp () {
  const p = getTimePromise()

  return p.then(() => judge(p.time)).catch(() => judge(-1))
}

module.exports = isPokemonGoUp
module.exports.judge = judge

