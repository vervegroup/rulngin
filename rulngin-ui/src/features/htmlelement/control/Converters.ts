
export const toBoolConverter = (value: unknown): boolean => {
  if (value === undefined || value === null || value === false) {
    return false
  }

  if (value === true) {
    return true
  }

  return `${value}`.toLowerCase() === 'true'
}
