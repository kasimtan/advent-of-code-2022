const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let fullyContainCount = 0
  for (const line of input) {
    const pair = line.split(',')
    const [range1Min, range1Max] = pair[0].split('-').map(Number)
    const [range2Min, range2Max] = pair[1].split('-').map(Number)
    if ((range2Min >= range1Min && range2Max <= range1Max) || (range1Min >= range2Min && range1Max <= range2Max)) {
      fullyContainCount += 1
    }
  }
  return fullyContainCount
}

function part2(input) {
  let noOverlapCount = 0
  for (const line of input) {
    const pair = line.split(',')
    const [range1Min, range1Max] = pair[0].split('-').map(Number)
    const [range2Min, range2Max] = pair[1].split('-').map(Number)
    if ((range2Min > range1Max) || (range1Min > range2Max)) {
      noOverlapCount += 1
    }
  }
  return input.length - noOverlapCount
}