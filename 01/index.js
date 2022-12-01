const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let maxCal = 0
  for (const elf of input) {
    const totalCal = elf.split('\n').reduce((acc, cur) => acc + +cur, 0)
    maxCal = Math.max(maxCal, totalCal)
  }
  return maxCal
}

function part2(input) {
  const totalCal = []
  for (const elf of input) {
    totalCal.push(elf.split('\n').reduce((acc, cur) => acc + +cur, 0))
  }
  totalCal.sort((a,b) => b-a)
  return totalCal[0] + totalCal[1] + totalCal[2]
}