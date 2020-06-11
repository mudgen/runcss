
const elementClassesCache = new Map()
const classesCache = new Map()

const styleElement = document.createElement('style')
document.head.appendChild(styleElement)
let sheet = styleElement.sheet

const media = new Map([
  ['sm', sheet.cssRules[sheet.insertRule('@media(min-width:640px){}', sheet.cssRules.length)]],
  ['md', sheet.cssRules[sheet.insertRule('@media(min-width:768px){}', sheet.cssRules.length)]],
  ['lg', sheet.cssRules[sheet.insertRule('@media(min-width:1024px){}', sheet.cssRules.length)]],
  ['xl', sheet.cssRules[sheet.insertRule('@media(min-width:1280px){}', sheet.cssRules.length)]]
])

let cls

export function processClasses (classes) {
  if (elementClassesCache.has(classes)) {
    return
  }
  elementClassesCache.set(classes, true)
  classes = classes.replace(/\s\s+/g, ' ').split(' ')
  for (cls of classes) {
    if (classesCache.has(cls)) {
      continue
    }
    processClass()
    classesCache.set(cls, true)
  }
}

const formatters = new Map([
  ['p', 'padding'],
  ['m', 'margin'],
  ['h', 'height'],
  ['z', 'z-index'],
  ['w', 'width']
])

const positions = new Map([
  ['t', '-top'],
  ['b', '-bottom'],
  ['l', '-left'],
  ['r', '-right']
])

const classNames = new Map([
  ['container', () => {
    setRule('width:100%')
    const m = ['640px', '768px', '1024px', '1280px']
    media.values().forEach((s, index) => {
      sheet = s
      setRule('max-width:' + m[index])
    })
  }],
  ['clearfix', () => {
    originalClass = 'clearfix::after'
    setRule('content:"";display:table;clear:both;')
  }]
])

const split = (s) => s.split(',')

// example: object-left-bottom -> object-position: left bottom
const convertClasses1 = (cName, value) => {
  const hPos = cName.indexOf('-') + 1
  classNames.set(cName, cName.slice(0, hPos) + value + ':' + cName.slice(hPos).replace('-', ' '))
}

// direct map from class to values
for (const c of split('box-border|box-sizing:border-box,box-content|box-sizing:content-box,hidden|display:none,object-scale-down|object-fit:scale-down,scrolling-touch|-webkit-overflow-scrolling:touch,scrolling-auto|-webkit-overflow-scrolling:auto,visible|visibility:visible,invisible|visibility:hidden,flex-row|flex-direction:row,flex-row-reverse|flex-direction:row-reverse,flex-col|flex-direction:column,flex-col-reverse|flex-direction:column-reverse,flex-no-wrap|flex-wrap:nowrap,flex-wrap|flex-wrap:wrap,flex-wrap-reverse|flex-wrap:wrap-reverse,items-stretch|align-items:stretch,items-start|align-items:flex-start,items-center|align-items:center,items-end|align-items:flex-end,items-baseline|align-items:baseline,content-start|align-content:flex-start,content-center|align-content:center,content-end|align-content:flex-end,content-between|align-content:space-between,content-around|align-content:space-around,self-auto|align-self:auto,self-start|align-self:flex-start,self-center|align-self:center,self-end|align-self:flex-end,self-stretch|align-self:stretch')) {
  classNames.set(...c.split('|'))
}

// for (const c of []) {

for (const c of split('object-contain,object-cover,object-fill,object-none,object-bottom')) {
  convertClasses1(c, 'fit')
}

for (const c of split('object-bottom,object-center,object-left,object-left-bottom,object-left-top,object-right,object-right-bottom,object-right-top,object-top')) {
  convertClasses1(c, 'position')
}

// class to value
for (const c of split('float-right,float-left,float-none,clear-left,clear-right,clear-both,clear-none')) {
  classNames.set(c, c.replace('-', ':'))
}

// display
for (const c of split('block,flow-root,inline-block,inline,flex,grid,inline-grid,table,table-caption,table-cell,table-column,table-column-group,table-footer-group,table-header-group,table-row-group,table-row')) {
  classNames.set(c, 'display:' + c)
}

// position
for (const c of split('static,fixed,absolute,relative,sticky')) {
  classNames.set(c, 'position:' + c)
}

/*
const processClass1 = (value) => {
  const hPos = cls.indexOf('-') + 1
  setRule(cls.slice(0, hPos) + value + ':' + cls.slice(hPos).replace('-', ' '))
}
*/

const cls2process = new Map([
  ['overflow', () => {
    setRule(firstPart + '-' + parts[1] + ':' + parts[2])
  }]
])

let parts
let firstPart
let pseudoClasses
let negative
let originalClass

function processClass () {
  sheet = styleElement.sheet
  firstPart = undefined
  pseudoClasses = undefined
  negative = ''
  originalClass = cls
  parts = cls.split(':')
  cls = parts[parts.length - 1]
  parts = parts.slice(0, -1)
  for (const part of parts) {
    if (media.has(part)) {
      sheet = media.get(part)
      continue
    }
    pseudoClasses.push(part)
  }
  if (cls[0] === '-') {
    negative = '-'
    cls = cls.slice(1)
  }
  if (cls.length < 3) {
    notFound()
    return
  }
  parts = cls.split('-')
  firstPart = parts[0]
  if (firstPart.length < 3 && firstPart !== 'bg') {
    formatClass()
    return
  }
  const classValue = classNames.get(cls)
  if (classValue !== undefined) {
    if (typeof classValue === 'function') {
      classValue()
    } else {
      setRule(classValue)
    }
    return
  }
  if (parts.length < 2) {
    notFound()
    return
  }
  const process = cls2process.get(firstPart)
  if (typeof process === 'function') {
    process()
    return
  }
  notFound()
}

function formatClass () {
  const secondPart = parts[1]
  let value
  if (secondPart === 'px') {
    value = `${negative}1px`
  } else if (secondPart === 'full') {
    value = '100%'
  } else if (secondPart === 'screen') {
    if (firstPart === 'w') {
      value = '100vw'
    } else if (firstPart === 'h') {
      value = '100vh'
    } else {
      notFound()
      return
    }
  } else if (!isNaN(secondPart)) { // is a number
    value = `${negative}${Number(secondPart) * 0.25}rem`
  } else if (secondPart.indexOf('/') > -1) {
    let [top, bottom] = secondPart.split('/')
    top = Number(top)
    bottom = Number(bottom)
    if (isNaN(top) || isNaN(bottom)) {
      notFound()
      return
    }
    value = `${negative}${(Number(top) / Number(bottom)).toFixed(6)}%`
  } else {
    value = `${negative}${secondPart}`
  }

  const basicPart = formatters.get(firstPart[0])
  if (basicPart === undefined) {
    notFound()
    return
  }
  if (firstPart.length > 1) {
    if (firstPart[1] === 'x') {
      setRule(basicPart + '-right:' + value)
      setRule(basicPart + '-left:' + value)
    } else if (firstPart[1] === 'y') {
      setRule(basicPart + '-top:' + value)
      setRule(basicPart + '-bottom:' + value)
    } else {
      const position = positions.get(firstPart[1])
      if (position === undefined) {
        notFound()
        return
      }
      setRule(basicPart + position + value)
    }
  } else {
    setRule(basicPart + ':' + value)
  }
}

for (const s of document.styleSheets) {
  console.log(s)
}

function notFound () {
  if (sheet === styleElement.sheet) {
    return
  }
  for (const s of document.styleSheets) {
    console.log(s)
    for (const rule of s.cssRules) {
      // eslint-disable-next-line no-undef
      if (rule.type === CSSRule.STYLE_RULE) {
        if (rule.selectorText.split(',').map((item) => item.trim()).includes('.' + cls)) {
          cls = originalClass.replace(/[.:]/, '\\$&')
          console.log(`.${cls}${rule.cssText.slice(rule.cssText.indexOf('{'))}`)
          sheet.insertRule(`.${cls}${rule.cssText.slice(rule.cssText.indexOf('{'))}`, sheet.length)
          return
        }
      }
    }
  }
}

function setRule (t) {
  cls = originalClass.replace(/[.:]/, '\\$&')
  console.log(`.${cls}{${t}}`)
  sheet.insertRule(`.${cls}{${t}}`, sheet.length)
}
