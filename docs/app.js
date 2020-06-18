import builders from 'https://cdn.jsdelivr.net/npm/webscript@0.2.0/dist/webscript.modern.js'
import createDOMElement from 'https://cdn.jsdelivr.net/npm/webscript@0.2.0/dist/createDOMElement.modern.js'
import { processClasses } from '../src/runcss.js'
const { body, div, p, ul, li, input } = builders((type, props, ...children) => {
  if (props.class) {
    processClasses(props.class)
  }
  return createDOMElement(type, props, ...children)
})

const app =
  div.class``(
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
    ),
    input.class`placeholder-gray-800 placeholder-opacity-20 text-blue-600 `.placeholder`jane@example.com`,
    input.class`placeholder-red-300 border-green-900`.placeholder`mytest!!!`,
    div.class`bg-blue-600 rounded-none lg:rounded-b-lg border-8 border-green-800 border-opacity-30``hello!`,
    div.class`border-0.7rem``hello another`,
    div.class`grid grid-cols-3 divide-opacity-22 divide-x-5 divide-yellow-700 w-500px border-4 mt-20 ml-10 `(
      div.class`text-center``1`,
      div.class`text-center``2`,
      div.class`text-center``3`)

  )

document.body = body(app)
