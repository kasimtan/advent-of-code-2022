const Shape = {
  ROCK: 'X',
  PAPER: 'Y',
  SCISSORS: 'Z'
}
const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let total = 0
  for (const game of input) {
    const shape = game.split(' ')
    total += score(shape[0], shape[1])
  }
  return total
}

function part2(input) {
  let total = 0
  for (const game of input) {
    const symbol = game.split(' ')
    total += score(symbol[0], toShape(symbol[0], symbol[1]))
  }
  return total
}

function score(elf, me) {
  if (elf === 'A') { // rock
    if (me === Shape.ROCK) return 3 + 1 // draw
    if (me === Shape.PAPER) return 6 + 2 // win
    if (me === Shape.SCISSORS) return 0 + 3 // lose
  }
  else if (elf === 'B') { // paper
    if (me === Shape.PAPER) return 3 + 2 // draw
    if (me === Shape.SCISSORS) return 6 + 3 // win
    if (me === Shape.ROCK) return 0 + 1 // lose
  }
  else if (elf === 'C') { // scissors
    if (me === Shape.SCISSORS) return 3 + 3 // draw
    if (me === Shape.ROCK) return 6 + 1 // win
    if (me === Shape.PAPER) return 0 + 2 // lose
  }
}

function toShape(elf, me) {
  if (elf === 'A') { // rock
    if (me === 'Y') return Shape.ROCK // to draw
    if (me === 'Z') return Shape.PAPER // to win
    if (me === 'X') return Shape.SCISSORS // to lose
  }
  else if (elf === 'B') { // paper
    if (me === 'Y') return Shape.PAPER // to draw
    if (me === 'Z') return Shape.SCISSORS // to win
    if (me === 'X') return Shape.ROCK // to lose
  }
  else if (elf === 'C') { // scissors
    if (me === 'Y') return Shape.SCISSORS // to draw
    if (me === 'Z') return Shape.ROCK // to win
    if (me === 'X') return Shape.PAPER // to lose
  }
}
