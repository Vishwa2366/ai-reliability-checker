export const getScoreLabel = (score) => {
  if (score >= 80) return { label: 'High Reliability', color: '#22c55e' }
  if (score >= 50) return { label: 'Moderate Reliability', color: '#f59e0b' }
  return { label: 'Low Reliability', color: '#ef4444' }
}

export const formatScore = (score) => Math.round(Number(score))

export const truncate = (str, len = 120) =>
  str && str.length > len ? str.slice(0, len) + '…' : str

export const isValidUrl = (str) => {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
