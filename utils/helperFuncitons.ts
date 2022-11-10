export function getWordCount(str: string) {
  return str.trim().split(/\s+/g).length
}

export function calculateMinutesToRead(wordCount: number) {
  return (wordCount / 100 + 1).toFixed(0)
}
