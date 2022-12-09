const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  const rope = createRope(2)
  const tailPos = new Set(['0,0'])
  for (const line of input) {
    const [direction, step] = line.split(' ')
    markTailPosForEachMove(rope, tailPos, direction, step)
  }
  return tailPos.size
}

function part2(input) {
  const rope = createRope(10)
  const tailPos = new Set(['0,0'])
  for (const line of input) {
    const [direction, step] = line.split(' ')
    markTailPosForEachMove(rope, tailPos, direction, step)
  }
  return tailPos.size
}

function createRope(len) {
  return new Array(len).fill(0).map(() => [0, 0])
}

function markTailPosForEachMove(rope, tailPos, direction, step) {
  const len = rope.length
  for (let i = 0; i < step; i++) {
    moveHead(rope[0], direction)
    for (let j = 1; j < len; j++) {
      moveTail(rope, j)
    }
    tailPos.add(rope[len-1].join())
  }
}

function moveHead(head, direction) {
  if (direction === 'R') {
    head[1] += 1
  }
  else if (direction === 'L') {
    head[1] -= 1
  }
  else if (direction === 'U') {
    head[0] += 1
  }
  else if (direction === 'D') {
    head[0] -= 1
  }
}

function moveTail(rope, index) {
  const currSegment = rope[index]
  const prevSegment = rope[index-1]
  const rowGap = Math.abs(currSegment[0] - prevSegment[0])
  const colGap = Math.abs(currSegment[1] - prevSegment[1])
  if (rowGap > 1 || colGap > 1) {
    if (currSegment[0] === prevSegment[0]) {
      // same row, move the col
      currSegment[1] = currSegment[1] + (currSegment[1] < prevSegment[1] ? 1 : -1)
    }
    else if (currSegment[1] === prevSegment[1]) {
      // same col, move the row
      currSegment[0] = currSegment[0] + (currSegment[0] < prevSegment[0] ? 1 : -1)
    }
    else {
      // diagonal, move both the row and col
      currSegment[0] = currSegment[0] + (currSegment[0] < prevSegment[0] ? 1 : -1)
      currSegment[1] = currSegment[1] + (currSegment[1] < prevSegment[1] ? 1 : -1)
    }
  }
}