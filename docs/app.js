import builders from 'https://cdn.jsdelivr.net/npm/webscript@0.2.0/dist/webscript.modern.js'
import createDOMElement from 'https://cdn.jsdelivr.net/npm/webscript@0.2.0/dist/createDOMElement.modern.js'
import { processClasses } from '../src/runcss.js'
const { body, div, p, ul, li } = builders((type, props, ...children) => {
  if (props.class) {
    processClasses(props.class)
  }
  return createDOMElement(type, props, ...children)
})

const app =
  div.class`font-sans leading-300%`(
    ul(
      li.class`pl-1.9em lg:pl-100 tracking-widest``hello`,
      li.class`mt-30 text-pink-700 text-opacity-25``Great`,
      li.class`px-50 lg:hidden``fine`,
      li.class`px-5 text-pink-700``Another little test`,
      li.class`space-x-reverse space-x-4 flex flex-row-reverse`(
        p`Interesting`,
        p`Indeed`,
        p`Who told you?`
      )
    )
  )

document.body = body(app)
