const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  const map = buildStackMap(input[0].split('\n'))
  const moves = buildMoves(input[1].split('\n'))
  for (const [totalToMove, from, to] of moves) {
    for (let i = 0; i < totalToMove && map[from].length > 0; i++) {
      map[to].push(map[from].pop())
    }
  }
  const topStack = []
  const totalStack = Object.keys(map).length
  for (let i = 1; i <= totalStack && map[i].length > 0; i++) {
    topStack.push(map[i].pop())
  }
  return topStack.join('')
}

function part2(input) {
  const map = buildStackMap(input[0].split('\n'))
  const moves = buildMoves(input[1].split('\n'))
  for (const [totalToMove, from, to] of moves) {
    const temp = []
    for (let i = 0; i < totalToMove && map[from].length > 0; i++) {
      temp.push(map[from].pop())
    }
    while (temp.length > 0) {
      map[to].push(temp.pop())
    }
  }
  const topStack = []
  const totalStack = Object.keys(map).length
  for (let i = 1; i <= totalStack && map[i].length > 0; i++) {
    topStack.push(map[i].pop())
  }
  return topStack.join('')
}

function buildStackMap(lines) {
  const table = {}
  for (const line of lines) {
    if (line.indexOf('[') < 0) break
    for (let i = 1, j = 1; i < line.length; i += 4, j++) {
      if (!table[j]) {
        table[j] = []
      }
      if (line[i] !== ' ') {
        table[j].unshift(line[i])
      }
    }
  }
  return table
}

function buildMoves(lines) {
  const moves = []
  for (const line of lines) {
    moves.push(line.match(/\d+/g).map(Number))
  }
  return moves
}