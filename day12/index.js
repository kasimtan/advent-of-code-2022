const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  const {maze, startPoints, endPos} = buildMaze(input, 'S', 'E')
  return findLeastSteps(maze, startPoints, endPos)
}

function part2(input) {
  const {maze, startPoints, endPos} = buildMaze(input, 'a', 'E')
  return findLeastSteps(maze, startPoints, endPos)
}

function findLeastSteps(maze, startPoints, endPos) {
  const [endRow, endCol] = endPos
  const visited = {}
  const directions = [[0,1], [1,0], [0,-1], [-1,0]]
  const queue = startPoints.map(([i, j]) => ({ row: i, col: j, steps: 0 }))
  let current = queue.shift()
  while (current.row !== endRow || current.col !== endCol) {
    const {row, col, steps} = current
    if (visited[`${row},${col}`]) {
      current = queue.shift()
      continue
    }
    for (const [i, j] of directions) {
      const newRow = row + i
      const newCol = col + j
      const isVisited = visited[`${newRow},${newCol}`]
      const isOutOfBound = newRow < 0 || newCol < 0
          || newRow >= maze.length || newCol >= maze[0].length
      if (isVisited || isOutOfBound || maze[newRow][newCol] > maze[row][col] + 1) {
        continue
      }
      queue.push({ row: newRow, col: newCol, steps: steps + 1 })
    }
    visited[`${row},${col}`] = true
    current = queue.shift()
  }
  return current.steps
}

function buildMaze(input, startChar, endChar) {
  let endPos
  const maze = []
  const startPoints = []
  for (let i = 0; i < input.length; i++) {
    const row = []
    for (let j = 0; j < input[0].length; j++) {
      let elevation = 0
      const char = input[i][j]
      if (char === startChar) {
        startPoints.push([i, j])
      }
      else if (char === endChar) {
        endPos = [i, j]
        elevation = 25 // end of 26 alphabets
      }
      else {
        elevation = char.charCodeAt(0) - 'a'.charCodeAt(0)
      }
      row.push(elevation)
    }
    maze.push(row)
  }
  return {maze, startPoints, endPos}
}