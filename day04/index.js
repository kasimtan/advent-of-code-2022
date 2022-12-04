const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let fullyContainCount = 0
  for (const line of input) {
    const pair = line.split(',')
    const first = pair[0].split('-').map(Number)
    const second = pair[1].split('-').map(Number)
    if ((second[0] >= first[0] && second[1] <= first[1]) || (first[0] >= second[0] && first[1] <= second[1])) {
      fullyContainCount += 1
    }
  }
  return fullyContainCount
}

function part2(input) {
  let noOverlapCount = 0
  for (const line of input) {
    const pair = line.split(',')
    const first = pair[0].split('-').map(Number)
    const second = pair[1].split('-').map(Number)
    if ((second[0] > first[1]) || (first[0] > second[1])) {
      noOverlapCount += 1
    }
  }
  return input.length - noOverlapCount
}