const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = buildFolderHierarchySize(data.split('\n'))
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let total = 0
  const targetMaxSize = 1e5
  for (const key in input) {
    const size = input[key]
    if (size <= targetMaxSize) {
      total += size
    }
  }
  return total
}

function part2(input) {
  const availableSpace = 7e7
  const targetMinFreeSpace = 3e7
  const totalUsages = input['']
  const sizeToFreeUp = totalUsages - (availableSpace - targetMinFreeSpace)
  const sizes = Object.values(input).sort((a,b) => a-b)
  for (const size of sizes) {
    if (size >= sizeToFreeUp) {
      return size
    }
  }
  return 0
}

function buildFolderHierarchySize(input) {
  const folderMap = {}
  const currentPath = []
  for (const line of input) {
    const [type, command, dir] = line.split(' ')
    if (command === 'cd') {
      if (dir === '..') {
        currentPath.pop()
      }
      else {
        const path = dir === '/' ? '' : `${currentPath.join('')}/${dir}`
        currentPath.push(path)
        if (!folderMap[path]) {
          folderMap[path] = 0
        }
      }
    }
    else if (command !== 'ls' && type !== 'dir') {
      const fileSize = parseInt(type, 10)
      for (const path of currentPath) {
        folderMap[path] += fileSize
      }
    }
  }
  return folderMap
}