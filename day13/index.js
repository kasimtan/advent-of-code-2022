const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let sum = 0
  for (let i = 0; i < input.length; i++) {
    const [left, right] = input[i].split('\n').map(v => eval(v))
    if (isInRightOrder(left, right)) {
      sum += i + 1
    }
  }
  return sum
}

function part2(input) {
  const x = [[2]]
  const y = [[6]]
  const list = [x, y]
  for (const pairs of input) {
    list.push(...pairs.split('\n').map(v => eval(v)))
  }
  list.sort((a,b) => isInRightOrder(a,b) ? -1 : 1)
  return (list.indexOf(x) + 1) * (list.indexOf(y) + 1)
}

function isInRightOrder(left, right) {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left === right) {
      return undefined
    }
    else {
      return left < right
    }
  }
  else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const result = isInRightOrder(left[i], right[i])
      if (result !== undefined) {
        return result
      }
    }
    if (left.length === right.length) {
      return undefined
    }
    else {
      return left.length < right.length
    }
  }
  else {
    return isInRightOrder(
      !Array.isArray(left) ? [left] : left,
      !Array.isArray(right) ? [right] : right,
    )
  }
}