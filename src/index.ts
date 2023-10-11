/*

RunCSS




Terminology:
in the following example:

!sm:text-blue -> @media query (min-width: 640px){ color: blue !important; }


- !sm:text-blue is the class (often spelled as clazz to avoid using the "class" js keyword)
- ! is the modifier
- sm is the state
- text-blue is the declaration
- text is the property
- blue is the value

- @media query (min-width: 640px){ color: blue !important; } is the rule
- @media query (min-width: 640px) is the resolvedState
- color: blue !important; is the resolvedDeclaration
- blue is the resolvedValue  

*/

import { defaults, classes } from "./templates.js"
import { resolvers } from "./resolvers"
import { stateDictionaries } from "./states.js"


/** Main stylesheet where we append parsed classes */
const {sheet} = document.head.appendChild(document.createElement('style'))

/** List of classes already inserted */
const inserted = new Set()

/** Insert the class in the sheet, with the resolved declaration.
 * It resolves states such as media queries and pseudo classes.
 * This should be the last function called.
 * @param clazz 
 * @param */
const insert = (clazz :string, resolvedDeclaration?:string, atTop?: boolean) : void => {
  if(!resolvedDeclaration) return
  inserted.add(clazz)

  // divide states by categories (media queries, pseudo classes, ...)
  const categorizedStates : Record<string, Array<string>> = {}
  for(const state of Object.keys(stateDictionaries)) categorizedStates[state] = []
  let peers = '', groups = ''

  const states = clazz.split(':')
  for(let i = 0; i < states.length - 1; i++) {
    if(states[i].startsWith('peer-')){
      let peerName = 'peer'
      let peerModifier = states[i].substring('peer-'.length)
      const slash = peerModifier.indexOf('/')
      if(slash !== -1) {
        peerName = peerModifier.substring(0, slash)
        peerModifier = peerModifier.substring(slash + 1)
      }
      peers+=`.${peerName}:${peerModifier}~`
    }
    if(states[i].startsWith('group-')){
      let peerName = 'group'
      let peerModifier = states[i].substring('group-'.length)
      const slash = peerModifier.indexOf('/')
      if(slash !== -1) {
        peerName = peerModifier.substring(0, slash)
        peerModifier = peerModifier.substring(slash + 1)
      }
      groups+=`.${peerName}:${peerModifier} `
    }

    for(let [key, dictionary] of Object.entries(stateDictionaries)){
      if(states[i] in dictionary){
        categorizedStates[key].push(dictionary[states[i]]);
      }
    }
  }

  let rule = `${groups}${peers}.${clazz.replace(/[\[\].:()&@~*^$%,#\/]/g, '\\$&')
    + categorizedStates.pseudoClasses.map(el => ':' + el).join('')
    + categorizedStates.pseudoElements.map(el => '::' + el).join('')
    + categorizedStates.modifiers.join('')
  } {${resolvedDeclaration}}`

  if(categorizedStates.mediaQueries.length > 0) {
    rule = `@media ${categorizedStates.mediaQueries.join(' and ')}{${rule}}`
  }

  sheet!.insertRule(rule, atTop ? 0 : sheet!.cssRules.length);
}




const resolveValue = (resolversList : string, value: string) => {
  if(value.startsWith('[')){
    return [value.substring(1, value.lastIndexOf(']')), 9999];
  }

  let i = 0;
  for(let resolver of resolversList.split('')){
    if(resolver in resolvers){
      const result = resolvers[resolver](value);
      if(result !== null) return [result, i];
      i+=1
    }
  }
  return [value, 9999]
}


const applyImportantModifier = (important : boolean, resolvedDeclaration : string) => important ?
  resolvedDeclaration.replaceAll(';', '!important;') : resolvedDeclaration 


/** Resolve tailwind classes into css declarations 
 * @param clazz a class, such as !sm:text-blue
 * @returns an array with 
 *  - the declaration(s) text-color: blue !important;
 *  - the atTop priority of those declaration(s) */
const resolveDeclaration = (clazz : string) : [string, boolean] | [] => {
  if(clazz.length === 0) return []

  // check modifiers
  let important = false;
  let minus = false;
  if(clazz.startsWith('!')){
    clazz = clazz.substring(1)
    important = true;
  }

  if(clazz.startsWith('-')){
    clazz = clazz.substring(1)
    minus = true;
  }

  // extract declaration
  const stateIndex = clazz.lastIndexOf(':')
  const declaration = stateIndex === -1 ? clazz : clazz.substring(clazz.lastIndexOf(':') + 1)

  // loop trying to find where to split property-value
  let lastIndex = declaration.length
  if(declaration in defaults) return [applyImportantModifier(important, defaults[declaration]), false]
  while(true) {
    const index = declaration.lastIndexOf('-', lastIndex - 1)
    if(index === -1 || index === 0) return []
    lastIndex = index
    const property = declaration.substring(0, index).trim()
    const value = declaration.substring(index + 1).trim()

    // we found a match!
    if(property in classes) {
      const [atTop, resolversList, ...cssClasses] = classes[property]
      const [resolved, resolvedIndex] = resolveValue(resolversList, value)
      const classIndex = Math.min(cssClasses.length - 1, resolvedIndex)
      return [applyImportantModifier(important, `${cssClasses[classIndex].replaceAll('$', (minus? '-' : '') + resolved)};`), atTop]

    }
  }
}



/**
 * 
 * @param classes space-separated list of classes to process
 */
export const processClasses = (classes : string) => {
  classes.split(' ').forEach(clazz => {
    clazz = clazz!.trim()
    if(!clazz || inserted.has(clazz)) return
    const [resolvedDeclaration, atTop] =  resolveDeclaration(clazz)
    insert(clazz, resolvedDeclaration, atTop)
  })
}


// Add classes on node insertion
let observers = []

/** Start watching for changes, and process classes as needed
 * @param targetNode Root node to watch - default document.body
 */
export const startWatching = (targetNode? : Element ) => {

  const config = {
    attributes: true, 
    attributeFilter: ['class'],
    childList: true,
    subtree: true
  };

  const callback = (mutationList : any) => {
    for (const mutation of mutationList) {
      if(mutation.addedNodes){
        for(let node of mutation.addedNodes){
          if(node.hasAttribute('class')){
            processClasses(node.getAttribute('class'))
          }
        }
      }

      if (mutation.type === "attributes" && mutation.target.hasAttribute('class')){
        processClasses(mutation.target.getAttribute('class'))
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode ?? document.body, config);
  observers.push(observer)
}


/** Stop watching for changes */
export const stopWatching =  () => {
  observers.forEach(observer => observer.disconnect());
  observers = []
}


export const exportCSS = () : string => {
  let result = ''
  for(let rule of [...sheet.cssRules]){
    result += rule.cssText + '\n\n'
  }
  return result;
}


export const configure = (conf = {}) => {

}