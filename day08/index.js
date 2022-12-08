const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n').map(v => v.split('').map(Number))
console.log(part1(input))
console.log(part2(input))

function part1(trees) {
  const totalRow = trees.length
  const totalCol = trees[0].length
  let totalVisible = 2 * totalRow + 2 * (totalCol - 2) // outermost trees
  for (let i = 1; i < totalRow - 1; i++) {
    for (let j = 1; j < totalCol - 1; j++) {
      if (getVisibility(i, j, trees).isVisible) {
        totalVisible += 1
      }
    }
  }
  return totalVisible
}

function part2(trees) {
  const totalRow = trees.length
  const totalCol = trees[0].length
  const scores = []
  for (let i = 1; i < totalRow - 1; i++) {
    for (let j = 1; j < totalCol - 1; j++) {
      scores.push(getVisibility(i, j, trees).score)
    }
  }
  return Math.max(...scores)
}

function getVisibility(row, col, trees) {
  const left = visibilityFromLeft(row, col, trees)
  const right = visibilityFromRight(row, col, trees)
  const top = visibilityFromTop(row, col, trees)
  const bottom = visibilityFromBottom(row, col, trees)
  return {
    isVisible: left.isVisible || right.isVisible || top.isVisible || bottom.isVisible,
    score: left.score * right.score * top.score * bottom.score
  }
}

function visibilityFromLeft(row, col, trees) {
  let score = 0
  let isVisible = true
  for (let i = col - 1; i >= 0; i--) {
    score += 1
    if (trees[row][i] >= trees[row][col]) {
      isVisible = false
      break
    }
  }
  return {isVisible, score}
}

function visibilityFromRight(row, col, trees) {
  let score = 0
  let isVisible = true
  for (let i = col + 1; i < trees[0].length; i++) {
    score += 1
    if (trees[row][i] >= trees[row][col]) {
      isVisible = false
      break
    }
  }
  return {isVisible, score}
}

function visibilityFromTop(row, col, trees) {
  let score = 0
  let isVisible = true
  for (let i = row - 1; i >= 0; i--) {
    score += 1
    if (trees[i][col] >= trees[row][col]) {
      isVisible = false
      break
    }
  }
  return {isVisible, score}
}

function visibilityFromBottom(row, col, trees) {
  let score = 0
  let isVisible = true
  for (let i = row + 1; i < trees.length; i++) {
    score += 1
    if (trees[i][col] >= trees[row][col]) {
      isVisible = false
      break
    }
  }
  return {isVisible, score}
}