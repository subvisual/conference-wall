export function parameterize(string) {
  return string.toLowerCase().replace(/\s+/g, '-')
}
