export function calculateNewPosition(container) {
  let highest = 0
  for (let i = 0; i < container.length; i++) {
    if (container[i].id > highest) {
      highest = container[i].id
    }
  }
  return highest + 1
}
