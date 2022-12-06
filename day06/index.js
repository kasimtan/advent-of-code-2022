const fs = require('fs')
const input = fs.readFileSync(`./input.txt`, 'utf-8')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  return findFirstMarker(input, 4)
}

function part2(input) {
  return findFirstMarker(input, 14)
}

function findFirstMarker(str, numOfDistinctChar) {
  for (let i = numOfDistinctChar-1; i < str.length; i++) {
    if (!hasDuplicateChar(str.substring(i-numOfDistinctChar+1, i+1))) {
      return i + 1
    }
  }
  return -1
}

function hasDuplicateChar(str) {
  return /(.).*\1/.test(str);
}