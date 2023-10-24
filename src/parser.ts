import { filterTemplate, ruleTemplate, shortcuts } from "./templates.preprocess";
import { colorsTemplate, opacityKeysTemplate, opacityValuesTemplate } from "./colors.preprocess";

// parse opacity variants
const opacityKeys = opacityKeysTemplate.split('!')
const opacityValues = opacityValuesTemplate.split('!')

// parse colors
const colorVariants = `50!100!200!300!400!500!600!700!800!900!950`.split('!')
let colors = 'transparent!inherit' 
for( let [colorName, value] of Object.entries({'white': '#ffffff', 'black': '#000000'})){
  colors+= '!' + colorName + '^' + value
  for(let k = 0; k < opacityKeys.length; k++){
    const opacityKey = opacityKeys[k]
    const opacityValue = opacityValues[k]
    colors+= '!' + colorName + '/' + opacityKey 
      + '^' + value + opacityValue
  }

}
const colorsLines = colorsTemplate.split('\n')
for(let i = 0; i < colorsLines.length; i++) {
  const colorName = colorsLines[i]
  for(let variant of colorVariants) {
    i+= 1
    colors+= '!' + colorName + '-' + variant + '^' + colorsLines[i]
    for(let k = 0; k < opacityKeys.length; k++){
      const opacityKey = opacityKeys[k]
      const opacityValue = opacityValues[k]
      colors+= '!' + colorName + '-' + variant + '/' + opacityKey 
        + '^' + colorsLines[i] + opacityValue
    }
  }
}
shortcuts['@C'] = colors


// parse @4 numbers
const numbers = '0!0.5!1!1.5!2!2.5!3!3.5!4!5!6!7!8!9!10!11!12!14!16!20!24!28!32!36!40!44!48!52!56!60!64!72!80!96'.split('!')
  .map(n => `${n}^${parseFloat(n)*4}px`).join('!')
const percentages ='1/2!1/3!2/3!1/4!2/4!3/4!1/5!2/5!3/5!4/5!1/6!2/6!3/6!4/6!5/6!1/12!2/12!3/12!4/12!5/12!6/12!7/12!8/12!9/12!10/12!11/12'.split('!')
  .map(fraction => {
    const [n, d] = fraction.split('/')
    return `${fraction}^${Number(n)/Number(d)*100}%`

  }).join('!')

shortcuts['@4'] = 'auto!full^100%!px^1px!' + numbers + '!' + percentages

// setup filters
const backdropFilterTemplate = filterTemplate.split('\n')
  .map(l => 'backdrop-' + l).join('\n')
  .replaceAll('--tw-', '--tw-backdrop-')
  .replaceAll('@f', '@g')



const completeRuleTemplate = ruleTemplate + '\n' + filterTemplate + '\n' + backdropFilterTemplate
export {completeRuleTemplate as ruleTemplate, shortcuts}



export const parseRuleTemplate = (defaultsTemplate: string, ruleTemplate : string, shortcuts : Record<string, string>) => {
  let resolvedRuleTemplate = ruleTemplate
  for(let [key, value] of Object.entries(shortcuts)){
    resolvedRuleTemplate = resolvedRuleTemplate.replaceAll(key, value);
  }

  const exact : Record<string, [string, [number, string?]]> = {}
  const arbitrary : Record<string, [string, [number, string?]]> = {}

  for(let line of defaultsTemplate.split('\n')){
    let [key, value] = line.split('!')

    let priority = 0
    let parent = ''
    if(key.startsWith('+++')){
      priority = 3
      key = key.substring(3)
    }else if(key.startsWith('++')){
      priority = 2
      key = key.substring(2)
    }else if(key.startsWith('+')){
      priority = 2
      key = key.substring(1)
    }
    if(key.startsWith('>')){
      parent = '> * + *'
      key = key.substring(1)
    }

    exact[key] = [value + ';', [priority, parent]]
  }

  for(let line of resolvedRuleTemplate.split('\n')){
    const els = line.split('!')
    let key = els[0]
    let priority = 0
    let parent = ''
    if(key.startsWith('+++')){
      priority = 3
      key = key.substring(3)
    }else if(key.startsWith('++')){
      priority = 2
      key = key.substring(2)
    }else if(key.startsWith('+')){
      priority = 2
      key = key.substring(1)
    }
    if(key.startsWith('>')){
      parent = '> * + *'
      key = key.substring(1)
    }

    const property = key === '' ? '' : key + '-'
    let resolvedValue = els[1] === '' ? key : els[1]
    if(!resolvedValue.includes('$')) resolvedValue += ':$'
    resolvedValue+=';'
    const admitArbitrary = els[2] === '$'
    if(admitArbitrary){
      arbitrary[property] = [resolvedValue, [priority, parent]]
    }
    for(let i = admitArbitrary ? 3 : 2; i < els.length; i++){
      const text = els[i]
      const caretIndex = text.indexOf('^')
      if(caretIndex === -1){
        exact[property + text] = [resolvedValue.replaceAll('$', text), [priority, parent]]
      }else if(caretIndex === 0){
        exact[property.substring(0, property.length - 1)] = [resolvedValue.replaceAll('$', text.substring(1)), [priority, parent]]
      }else{
        const key = text.substring(0, caretIndex)
        const value = text.substring(caretIndex + 1)
        exact[property + key] = [resolvedValue.replaceAll('$', value), [priority, parent]]
      }
    }
  }

  return [exact, arbitrary]

}