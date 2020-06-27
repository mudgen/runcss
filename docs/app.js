/* global CSSRule */

// First Part
import builders from 'https://unpkg.com/webscript@^0/dist/webscript.modern.js'
import createDOMElement from 'https://unpkg.com/webscript@^0/dist/createDOMElement.modern.js'
import processClasses, { component, configure } from '../src/runcss.js'
/*
configure({
  colors: {
    blue: '#ff0000',
    banana: {
      100: '#FFFFF0',
      200: '#FEFCBF',
      300: '#FAF089'
    }
  }
})

configure({
  screens: {
    watch: '300px',
    phone: '340px',
    tablet: '640px'
  }
})

*/
configure({ prefix: 'run-', separator: '&' })

// Second Part
function createElement (type, props, ...children) {
  if (props.class) {
    processClasses(props.class)
  }
  return createDOMElement(type, props, ...children)
}

// Third Part
const { div, img, h2 } = builders(createElement)

// Fourth Part
const card =
  div.class`md:flex bg-white rounded-lg p-6`(
    img.class`h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6`.src`./avatar.jpg`,
    div.class`text-center md:text-left`(
      h2.class`text-lg``Erin Lindford`,
      div.class`text-purple-500``Customer Support`,
      div.class`text-gray-600``erinlindford@example.com`,
      div.class`text-gray-600``(555) 765-4321`))

// console.log(document.styleSheets[0].selectorText + ':' + document.styleSheets[0].cssText)
const { body, p, ul, li, input, span, button } = builders(createElement)

/*
const { body, div, p, ul, li, input, span, button } = builders((type, props, ...children) => {
  if (props.class) {
    processClasses(props.class, { important: false, separator: ':' })
  }
  return createDOMElement(type, props, ...children)
})
*/

component(
  'btn',
  'r-p-2 r-rounded r-bg-blue hover:r-text-green-500 text-base lg:text-lg',
  'box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);outline: none;'
)

// component('mfun', 'mt-1', 'margin-left:500px')
// component('ml-4', null, 'margin-left:500px')
// component('ml-4', 'ml-200')

// component('myclass', 'ml-10 rounded-lg pl-10 bg-blue px-5')

const app =
  div.id`app`.class`mt-5 ml-1.7rem`(
    div.class`run-text-blue hover&run-text-yellow`(
      p`My test`
    ),
    div.class`lg:myclass`(
      button.class`xl:btn text-green``Click Me`,
      button.class`btn text-yellow``Click Me`

    ),
    div.class`container mx-auto border xl:border-5`(
      card
    ),
    ul(
      li.class`r-pl-1.9em lg:r-pl-100 r-tracking-widest``hello`,
      li.class`mt-30 text-pink-700 text-opacity-25``Great`,
      li.class`px-50 lg:hidden``fine`,
      li.class`px-5 text-pink-700``Another little test`,
      li.class`space-x-reverse space-x-4 flex flex-row-reverse bg-red rounded-t-none rounded-10px lg:rounded-tl-25px mx-5 `(
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
    div.class`xl:myclass``Transform`,
    div.class`ml-10 mt-10 transform rotate-10 scale-x-50 text-orange``Transform Again`,
    div(
      div.class`first:bg-yellow-600``one`,
      div.class`first:bg-yellow-600``two`,
      div.class`last:bg-yellow-600``three`,
      div.class`last:bg-yellow-600``four`
    ),
    div.class`mt-8`(
      div.class`md:nickwhat``one`,
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
    button.class`xl:hover:ml-4`(
      span.class`group-focus:text-gray-500``three`
    ),
    div.class`focus-within:text-green-500 border`(
      span`Interesting`,
      input.type`text`.value`I see here`
    )
  )

document.body = body(app)

for (const rule of document.styleSheets[0].cssRules) {
  if (rule.type === CSSRule.MEDIA_RULE) { console.log(rule.cssText) }
}
