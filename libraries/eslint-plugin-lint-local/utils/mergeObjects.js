module.exports = {
  mergeObjects: (objects) => objects.reduce((accumulation, current) => ({
    ...accumulation,
    ...current
  })),
}