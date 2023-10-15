
export const splitOnFirst = (char, string) => {
  const index = string.indexOf(char)
  if(index === -1) return [string, '']
  return [string.substring(0, index), string.substring(index + char.length)]
}

export const dictionarify = (template: string) => {
  const dictionary : Record<string, string> = {}
  const lines = template.split('\n')
  for(let line of lines) {
    line = line.trim()
    if(line.length === 0) continue
    const values = line.split('!');
    dictionary[values[0]] = values[1] || values[0]
  }
  return dictionary
}

export const purgedLines = (template: string) => 
  template.trim().split('\n').map(l => l.trim()).filter( l => l !== '')

export const clean = (template: string) => 
  template.trim().split('\n').map(l => l.trim()).filter( l => l !== '').join('\n')