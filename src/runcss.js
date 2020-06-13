const isNum = (v) => !isNaN(v)

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
  }],
  ['font-sans', 'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'],
  ['font-serif', 'font-family:Georgia,Cambria,"Times New Roman",Times,serif'],
  ['font-mono', 'font-family:Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace']
])

const split = (s) => s.split(',')

// example: object-left-bottom -> object-position: left bottom
const convertClasses1 = (cName, value) => {
  const hPos = cName.indexOf('-') + 1
  classNames.set(cName, cName.slice(0, hPos) + value + ':' + cName.slice(hPos).replace('-', ' '))
}

// direct map from class to values
for (const c of split('box-border|box-sizing:border-box,box-content|box-sizing:content-box,hidden|display:none,object-scale-down|object-fit:scale-down,scrolling-touch|-webkit-overflow-scrolling:touch,scrolling-auto|-webkit-overflow-scrolling:auto,visible|visibility:visible,invisible|visibility:hidden,flex-row|flex-direction:row,flex-row-reverse|flex-direction:row-reverse,flex-col|flex-direction:column,flex-col-reverse|flex-direction:column-reverse,flex-no-wrap|flex-wrap:nowrap,flex-wrap|flex-wrap:wrap,flex-wrap-reverse|flex-wrap:wrap-reverse,items-stretch|align-items:stretch,items-start|align-items:flex-start,items-center|align-items:center,items-end|align-items:flex-end,items-baseline|align-items:baseline,content-start|align-content:flex-start,content-center|align-content:center,content-end|align-content:flex-end,content-between|align-content:space-between,content-around|align-content:space-around,self-auto|align-self:auto,self-start|align-self:flex-start,self-center|align-self:center,self-end|align-self:flex-end,self-stretch|align-self:stretch,justify-start|justify-content:flex-start,justify-center|justify-content:center,justify-end|justify-content:flex-end,justify-between|justify-content:space-between,justify-around|justify-content:space-around,flex-grow|flex-grow:1,flex-grow-0|flex-grow:0,flex-shrink|flex-shrink:1,flex-shrink-0|flex-shrink:0,order-first|order:-9999,order-last|order:9999,order-none|order:0,grid-cols-none|grid-template-columns:none,col-auto|grid-column:auto,col-start-auto|grid-column-start:auto,col-end-auto|grid-column-end:auto,grid-rows-none|grid-template-rows:none,row-auto|grid-row:auto,row-start-auto|grid-row-start:auto,row-end-auto|grid-row-end:auto,gap-px|gap:1px,row-gap-px|row-gap:1px,col-gap-px|column-gap:1px,grid-flow-row|grid-auto-flow:row,grid-flow-col|grid-auto-flow:column,grid-flow-row-dense|grid-auto-flow:row dens,grid-flow-col-dense|grid-auto-flow:column dense,min-w-full|min-width:100%,max-w-xs|max-width:20rem,max-w-sm|max-width:24rem,max-w-md|max-width:28rem,max-w-lg|max-width:32rem,max-w-xl|max-width:36rem,max-w-full|max-width:100%,max-w-screen-sm|max-width:640px,max-w-screen-md|max-width:768px,max-w-screen-lg|max-width:1024px,max-w-screen-xl|max-width:1280px,max-w-none|max-width:none,min-h-full|min-height:100%,min-h-screen|min-height:100vh,max-h-full|max-height:100%,max-h-screen:max-height:100vh,text-2xl|font-size:1.5rem,text-3xl|font-size:1.875rem,text-4xl|font-size:2.25rem,text-left|text-align:left,text-center|text-align:center,text-right|text-align:right,text-justify|text-align:justify,underline|text-decoration:underline,line-through|text-decoration:line-through,no-underline|text-decoration:none,uppercase|text-transform:uppercase,lowercase|text-transform:lowercase,capitalize|text-transform:capitalize,normal-case|text-transform:none')) {
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
const colors = split('f7fafc,edf2f7,e2e8f0,cbd5e0,a0aec0,718096,4a5568,2d3748,1a202c,fff5f5,fed7d7,feb2b2,fc8181,f56565,e53e3e,c53030,9b2c2c,742a2a,fffaf0,feebc8,fbd38d,f6ad55,ed8936,dd6b20,c05621,9c4221,7b341e,fffff0,fefcbf,faf089,f6e05e,ecc94b,d69e2e,b7791f,975a16,744210,f0fff4,c6f6d5,9ae6b4,68d391,48bb78,38a169,2f855a,276749,22543d,e6fffa,b2f5ea,81e6d9,4fd1c5,38b2ac,319795,2c7a7b,285e61,234e52,ebf8ff,bee3f8,90cdf4,63b3ed,4299e1,3182ce,2b6cb0,2c5282,2a4365,ebf4ff,c3dafe,a3bffa,7f9cf5,667eea,5a67d8,4c51bf,434190,3c366b,faf5ff,e9d8fd,d6bcfa,b794f4,9f7aea,805ad5,6b46c1,553c9a,44337a,fff5f7,fed7e2,fbb6ce,f687b3,ed64a6,d53f8c,b83280,97266d,702459')

const colorNames = split('gray,red,orange,yellow,green,teal,blue,indigo,purple,pink')

const setColor = (type) => {
  // const colorRule = () => setRule(type + '-color:' + color)
  if (parts.length > 3) {
    notFound()
    return
  }
  const starting = secondPart.slice(0, 3)
  if (starting.startsWith('#') || ['rgb', 'hsl'].includes(starting) || ['transparent', 'current'].includes(secondPart)) {
    setRule(type + 'color:' + secondPart)
    return true
  }
  if (parts.length === 3) {
    const num = parts[2]
    if (num.length !== 3 || !num.endsWith('00')) {
      notFound()
      return
    }
    const colorPos = colorNames.indexOf(secondPart)
    if (colorPos === -1) {
      notFound()
      return
    }
    setRule(type + 'color:' + '#' + colors[colorPos * 9 + (Number(secondPart[0]) - 1)])
    return true
  } else {
    let color
    if (secondPart === 'black') {
      color = '#000'
    } else if (secondPart === 'white') {
      color = '#fff'
    }
    if (color !== undefined) {
      setRule(type + 'color:' + color)
      return true
    }
  }
  notFound()
}

const cls2process = new Map([
  ['overflow', () => {
    setRule(firstPart + '-' + parts[1] + ':' + parts[2])
  }],
  ['text', () => {
    if (parts.length === 2) {
      const pos = split('xs,sm,base,lg,xl').indexOf(secondPart)
      if (pos > -1) {
        setRule('font-size:' + (0.75 + (0.125 * pos)) + 'rem')
        return
      }
      if (secondPart.endsWith('xl')) {
        const [num] = secondPart.split('x')
        if (isNum(num)) {
          setRule('font-size:' + (Number(num) - 2) + 'rem')
          return
        }
      }
    }
    setColor('')
  }],
  ['font', () => {
    if (parts.length === 2) {
      const pos = split('hairline,thin,light,normal,medium,semibold,bold,extrabold,black').indexOf(secondPart)
      if (pos > -1) {
        setRule('font-weight:' + (100 * (1 + pos)))
        return
      }
    }
    notFound()
  }]
])

let parts
let firstPart
let secondPart
let negative
let originalClass

function processClass () {
  sheet = styleElement.sheet
  negative = ''
  originalClass = cls
  parts = cls.split(':')
  if (parts.length > 1) {
    cls = parts[parts.length - 1]
    if (media.has(parts[0])) {
      sheet = media.get(parts[0])
    }
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
  ;[firstPart, secondPart] = parts
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
  } else if (isNum(secondPart)) { // is a number
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
      setRule(basicPart + position + ':' + value)
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
  cls = originalClass.replace(/[.:(),]/g, '\\$&')
  console.log(`.${cls}{${t}}`)
  sheet.insertRule(`.${cls}{${t}}`, sheet.length)
}
