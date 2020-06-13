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
  div(
    ul(
      li.class`pl-1.9em lg:pl-100``hello`,
      li.class`mt-30 text-rgb(200,100,100)``Great`,
      li.class`px-50 lg:hidden``fine`
    )
  )

document.body = body(app)
