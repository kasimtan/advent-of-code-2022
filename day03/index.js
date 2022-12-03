const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let total = 0
  for (const line of input) {
    const half = line.length / 2
    const firstSack = line.substring(0, half)
    const secondSack = line.substring(half)
    total += findOverlapCharScore(firstSack, secondSack)
  }
  return total
}

function part2(input) {
  let total = 0
  for (let i = 0; i < input.length; i += 3) {
    total += findOverlapCharScore(input[i], input[i+1], input[i+2])
  }
  return total
}

function findOverlapCharScore(sack1, sack2, sack3) {
  const target1 = sack2.split('')
  const target2 = sack3?.split('')
  for (const char of sack1) {
    if (target1.indexOf(char) > -1 && (!target2 || target2.indexOf(char) > -1)) {
      return score(char)
    }
  }
  return 0
}

function score(char) {
  const c = char.charCodeAt()
  if (c < 97) {
    return c - 38
  } else {
    return c - 96
  }
}