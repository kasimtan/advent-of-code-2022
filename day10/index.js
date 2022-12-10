const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let x = 1
  let cycle = 0
  const result = []
  for (const line of input) {
    const [inst, num] = line.split(' ')
    if (inst === 'noop') {
      cycle += 1
      addToResultIfMetCheckpoint(result, cycle, x)
    }
    else {
      cycle += 1
      addToResultIfMetCheckpoint(result, cycle, x)
      cycle += 1
      addToResultIfMetCheckpoint(result, cycle, x)
      x += parseInt(num, 10)
    }
  }
  return result.reduce((acc, num) => acc + num, 0)
}

function part2(input) {
  let x = 1
  let cycle = 0
  let sprite = [x-1, x, x+1]
  let result = ''
  for (const line of input) {
    const [inst, num] = line.split(' ')
    if (inst === 'noop') {
      result += getPixel(cycle, sprite)
      cycle += 1
    } else {
      result += getPixel(cycle, sprite)
      cycle += 1
      result += getPixel(cycle, sprite)
      cycle += 1
      x += parseInt(num, 10)
      sprite = [x-1, x, x+1]
    }
  }
  return result
}

function addToResultIfMetCheckpoint(result, cycle, x) {
  const checkpoints = [20, 60, 100, 140, 180, 220]
  if (checkpoints.includes(cycle)) {
    result.push(cycle * x)
  }
}

function getPixel(cycle, sprite) {
  let pixel = ''
  const maxWide = 40
  if (cycle > 0 && cycle % maxWide === 0) {
    pixel += '\n'
  }
  if (sprite.includes(cycle % maxWide)) {
    pixel += '#'
  } else {
    pixel += '.'
  }
  return pixel
}