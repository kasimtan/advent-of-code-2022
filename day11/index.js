const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  const monkeys = buildMonkeys(input)
  const inspect = new Array(monkeys.length).fill(0)
  for (let round = 0; round < 20; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const {items, operation, divisibleBy, giveTo} = monkeys[i]
      let oldItem = items.shift()
      while (oldItem) {
        inspect[i] += 1
        const newItem = Math.floor(operation(oldItem) / 3)
        monkeys[giveTo[+!!(newItem % divisibleBy)]].items.push(newItem)
        oldItem = items.shift()
      }
    }
  }
  inspect.sort((a,b) => b-a)
  return inspect[0] * inspect[1]
}
function part2(input) {
  const monkeys = buildMonkeys(input)
  const inspect = new Array(monkeys.length).fill(0)
  let lcm = 1
  for (const monkey of monkeys) {
    lcm *= monkey.divisibleBy
  }
  for (let round = 0; round < 10000; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const {items, operation, divisibleBy, giveTo} = monkeys[i]
      let oldItem = items.shift()
      while (oldItem) {
        inspect[i] += 1
        const newItem = operation(oldItem) % lcm
        monkeys[giveTo[+!!(newItem % divisibleBy)]].items.push(newItem)
        oldItem = items.shift()
      }
    }
  }
  inspect.sort((a,b) => b-a)
  return inspect[0] * inspect[1]
}

function buildMonkeys(input) {
  const monkeys = []
  for (const section of input) {
    const lines = section.split('\n')
    const items = lines[1].match(/\d+/g).map(Number)
    const operation = (old) => eval(lines[2].split('= ')[1])
    const divisibleBy = +lines[3].match(/\d+/g)[0]
    const giveTo = [4, 5].map(i => +lines[i].match(/\d+/g)[0])
    monkeys.push({
      items, operation, divisibleBy, giveTo
    })
  }
  return monkeys
}