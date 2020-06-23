import builders from 'https://cdn.jsdelivr.net/npm/webscript@0.2.0/dist/webscript.modern.js'
import createDOMElement from 'https://cdn.jsdelivr.net/npm/webscript@0.2.0/dist/createDOMElement.modern.js'
import { processClasses, component } from '../src/runcss.js'
const { body, div, p, ul, li, input, span, button } = builders((type, props, ...children) => {
  if (props.class) {
    processClasses(props.class, { important: false, separator: ':' })
  }
  return createDOMElement(type, props, ...children)
})

component('myclass', 'ml-10 rounded mt-10 text-green-500 hover:bg-white bg-black border-10 border-green-800')

component('mfun', 'mt-1', 'margin-left:500px')

// component('myclass', 'ml-10 rounded')

const app =
  div.id`app`.class``(
    ul(
      li.class`pl-1.9em lg:pl-100 tracking-widest``hello`,
      li.class`mt-30 text-pink-700 text-opacity-25``Great`,
      li.class`px-50 lg:hidden``fine`,
      li.class`px-5 text-pink-700``Another little test`,
      li.class`space-x-reverse space-x-4 flex flex-row-reverse hover:nickwhat`(
        p`Interesting`,
        p`Indeed`,
        p`Who told you?`
      ),
      li.class`space-x-4 flex`(
        p`Interesting`,
        p`Indeed`,
        p`Who told you?`
      )
    ),
    input.class`placeholder-blue-800 placeholder-opacity-70 text-blue-600 `.placeholder`jane@example.com`,
    input.class`placeholder-red-300 border-4 border-green-900`.placeholder`mytest!!!`,
    div.class`bg-blue-600 rounded-none lg:rounded-b-lg border-18 border-green-800 border-opacity-30``hello!`,
    div.class`border-0.7rem mfun``hello another`,
    div.class`grid grid-cols-3 divide-opacity-22 divide-x-5 divide-yellow-700 w-500px border-4 mt-20 ml-10   `(
      div.class`text-center bg-goldenrod``1`,
      div.class`text-center bg-rgba(100,200,10,0.5)``2`,
      div.class`text-center bg-activetext``3`),
    div.class`myclass``Transform`,
    div.class`ml-10 mt-10 transform rotate-10 scale-x-50 text-orange``Transform Again`,
    div(
      div.class`first:bg-yellow-600``one`,
      div.class`first:bg-yellow-600``two`,
      div.class`last:bg-yellow-600``three`,
      div.class`last:bg-yellow-600``four`
    ),
    div.class`mt-8`(
      div.class`hover:nickwhat``one`,
      div.class`even:bg-orange-600``two`,
      div.class`odd:bg-orange-600``three`,
      div.class`odd:bg-orange-600``four`
    ),
    div.class`group mt-8`(
      div.class```one`,
      div.class`group-hover_bg-blue-300``two`,
      div.class`group-focus:text-gray-500``three`,
      div.class```four`
    ),
    button.class`mt-8 ml-8 group button`(
      span.class`group-focus:text-gray-500``three`
    ),
    div.class`focus-within:text-green-500 border`(
      span`Interesting`,
      input.type`text`.value`I see here`
    )
  )

document.body = body(app)
