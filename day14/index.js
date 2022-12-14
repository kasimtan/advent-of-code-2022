const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  const {walls, abyss} = buildWalls(input)
  return getTotalSandFilled(walls, abyss, true)
}

function part2(input) {
  const {walls, abyss} = buildWalls(input)
  return getTotalSandFilled(walls, abyss, false)
}

function getTotalSandFilled(walls, abyss, shouldStopWhenReachAbyss) {
  let total = 0
  const sandSource = [500, 0]
  while (!walls.has(`${sandSource[0]},${sandSource[1]}`)) {
    let currentSand = {x: sandSource[0], y: sandSource[1]}
    while (true) {
      if (currentSand.y === abyss) {
        if (shouldStopWhenReachAbyss) {
          return total
        }
        else {
          walls.add(`${currentSand.x},${currentSand.y}`)
          break
        }
      }
      const nextRowDownHasWall = walls.has(`${currentSand.x},${currentSand.y+1}`)
      const nextRowLeftHasWall = walls.has(`${currentSand.x-1},${currentSand.y+1}`)
      const nextRowRightHasWall = walls.has(`${currentSand.x+1},${currentSand.y+1}`)
      if (!nextRowDownHasWall) {
        currentSand.y += 1
      }
      else if (!nextRowLeftHasWall) {
        currentSand.x -= 1
        currentSand.y += 1
      }
      else if (!nextRowRightHasWall) {
        currentSand.x += 1
        currentSand.y += 1
      }
      else {
        walls.add(`${currentSand.x},${currentSand.y}`)
        break
      }
    }
    total += 1
  }
  return total
}

function buildWalls(input) {
  let abyss = 0
  const walls = new Set()
  for (const line of input) {
    const points = line.split(' -> ').map(v => v.split(',').map(Number))
    for (let i = 1; i < points.length; i++) {
      const [fromRow, fromCol] = points[i-1]
      const [toRow, toCol] = points[i]
      const minX = Math.min(fromRow, toRow)
      const maxX = Math.max(fromRow, toRow)
      const minY = Math.min(fromCol, toCol)
      const maxY = Math.max(fromCol, toCol)
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          walls.add(`${x},${y}`)
        }
      }
      abyss = Math.max(abyss, maxY + 1)
    }
  }
  return {walls, abyss}
}