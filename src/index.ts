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
import { exact, arbitrary } from "./parser.js"
import { stateDictionaries } from "./states.js"


let initialized = false

export default () => {
  if(initialized) throw "Error: can't initialize RunCSS twice"
  initialized = true

  /** Main stylesheets where we append parsed classes */
  const sheets = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map( () => document.head.appendChild(document.createElement('style')).sheet)


  /** List of classes already inserted */
  const inserted = new Set()



  /** Insert the class in the sheet, with the resolved declaration.
   * It resolves states such as media queries and pseudo classes.
   * This should be the last function called.
   * @param clazz 
   * @param */
  const insert = (clazz :string, resolvedDeclaration?: [string, [number, string?]]) : void => {
    if(!resolvedDeclaration) return
    inserted.add(clazz)

    const [resolvedValue, [priority, parent = '']] = resolvedDeclaration
    let increasePriority = false


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

    let rule = `${groups}${peers}.${clazz.replace(/[\[\]'.:()&@~*^$%,#\/]/g, '\\$&')
      + categorizedStates.pseudoClasses.map(el => ':' + el).join('')
      + categorizedStates.pseudoElements.map(el => '::' + el).join('')
      + categorizedStates.modifiers.join('') + ' ' + parent
    } {${resolvedValue}}`

    if(categorizedStates.mediaQueries.length > 0) {
      increasePriority = true
      rule = `@media ${categorizedStates.mediaQueries.join(' and ')}{${rule}}`
    }

    const sheet = sheets[priority + (increasePriority ? 3:0)]
    sheet.insertRule(rule, sheet.cssRules.length);
  }




  const applyImportantModifier = (important : boolean, resolvedDeclaration : string) => important ?
    resolvedDeclaration.replaceAll(';', '!important;') : resolvedDeclaration 

  /** Resolve tailwind classes into css declarations 
   * @param clazz a class, such as !sm:text-blue
   * @returns an array with 
   *  - the declaration(s) text-color: blue !important;
   *  - the atTop priority of those declaration(s) */
  const resolveDeclaration = (clazz : string) : [string, [number, string?]] => {
    if(clazz.length === 0) return 

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
    let bracketIndex = clazz.indexOf('-[')
    if(bracketIndex !== -1){
      const stateIndex = clazz.lastIndexOf(':', bracketIndex)
      const declaration = stateIndex === -1 ? clazz : clazz.substring(clazz.lastIndexOf(':') + 1)  
      bracketIndex += stateIndex + 1
      const endBracketIndex = declaration.lastIndexOf(']')
      const property = declaration.substring(0, bracketIndex + 1)
      const value = declaration.substring(bracketIndex + 2, endBracketIndex).replaceAll('_', ' ')
      if(!(property in arbitrary)) return
      const [resolvedValue, args] = arbitrary[property]
      return [
        applyImportantModifier(important, resolvedValue.replaceAll('$',value)),
        args
      ]

    }

    const stateIndex = clazz.lastIndexOf(':')
    const declaration = clazz.substring(stateIndex + 1)
    

    if(declaration in exact){
      const [resolvedValue, args] = exact[declaration]
      return [applyImportantModifier(important,resolvedValue), args]
    } 

    return
  }



  /**
   * 
   * @param classes space-separated list of classes to process
   */
  const processClasses = (classes : string) => {
    classes.split(' ').forEach(clazz => {
      clazz = clazz!.trim()
      if(!clazz || inserted.has(clazz)) return
      insert(clazz, resolveDeclaration(clazz))
    })
  }


  // Add classes on node insertion
  let observers = []

  /** Start watching for changes, and process classes as needed
   * @param targetNode Root node to watch - default document.body
   */
  const startWatching = (targetNode? : Element ) => {

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
            if(typeof node.hasAttribute === 'function' && node.hasAttribute('class')){
              processClasses(node.getAttribute('class'))
            }
          }
        }

        if (mutation.type === "attributes" && 
          typeof mutation.target.hasAttribute === 'function' &&
          mutation.target.hasAttribute('class')){
            processClasses(mutation.target.getAttribute('class'))
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode ?? document.body, config);
    observers.push(observer)
  }


  /** Stop watching for changes */
  const stopWatching =  () => {
    observers.forEach(observer => observer.disconnect());
    observers = []
  }


  const exportCSS = () : string => {
    let result = ''
    for(let sheet of sheets){
      for(let rule of [...sheet.cssRules]){
        result += rule.cssText + '\n\n'
      }
    }
    return result;
  }



  return { processClasses, startWatching, stopWatching, exportCSS }

}




