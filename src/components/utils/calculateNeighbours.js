function calculateNeighbours(array, index) {
  return {
    totalLength: array.length,
    above: index > 0 ? array[index - 1].id : null,
    below: index < array.length - 1 ? array[index + 1].id : null,
  }
}

export { calculateNeighbours }
