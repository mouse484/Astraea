export function setTitle(title?: string) {
  return {
    title: title ? `${title} - Astraea` : 'Astraea',
  }
}
