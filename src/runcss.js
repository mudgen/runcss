const isNum = (v) => !isNaN(v)
const isStartNum = (v) => !isNaN(parseInt(v))
const split = (s) => s.split(',')
const indexOf = (s, v) => split(s).indexOf(v)
const includes = (s, v) => split(s).includes(v)
const ifRemTo = (v) => isNum(v) ? negative + Number(v) * 0.25 + 'rem' : v
const elementClassesCache = new Map()
const classesCache = new Map()

const styleElement = document.createElement('style')
document.head.appendChild(styleElement)
let sheet = styleElement.sheet

const media = new Map()

for (let a of split('sm|@media(min-width:640px){},md|@media(min-width:768px){},lg|@media(min-width:1024px){},xl|@media(min-width:1280px){}')) {
  a = a.split('|')
  media.set(a[0], sheet.cssRules[sheet.insertRule(a[1], sheet.cssRules.length)])
}

// sheet.insertRule(':root{--color-opacity:1}', sheet.length)

let cls
let originalClass
let classAdd

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
    setRule('content:""!important;display:table!important;clear:both')
  }],
  ['font-sans', 'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'],
  ['font-serif', 'font-family:Georgia,Cambria,"Times New Roman",Times,serif'],
  ['font-mono', 'font-family:Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace']
])

// example: object-left-bottom -> object-position: left bottom
const convertClasses1 = (cName, value) => {
  const hPos = cName.indexOf('-') + 1
  classNames.set(cName, cName.slice(0, hPos) + value + ':' + cName.slice(hPos).replace('-', ' '))
}

// direct map from class to values
for (const c of split('box-border|box-sizing:border-box,box-content|box-sizing:content-box,hidden|display:none,object-scale-down|object-fit:scale-down,scrolling-touch|-webkit-overflow-scrolling:touch,scrolling-auto|-webkit-overflow-scrolling:auto,visible|visibility:visible,invisible|visibility:hidden,flex-row|flex-direction:row,flex-row-reverse|flex-direction:row-reverse,flex-col|flex-direction:column,flex-col-reverse|flex-direction:column-reverse,flex-no-wrap|flex-wrap:nowrap,flex-wrap|flex-wrap:wrap,flex-wrap-reverse|flex-wrap:wrap-reverse,items-stretch|align-items:stretch,items-start|align-items:flex-start,items-center|align-items:center,items-end|align-items:flex-end,items-baseline|align-items:baseline,content-start|align-content:flex-start,content-center|align-content:center,content-end|align-content:flex-end,content-between|align-content:space-between,content-around|align-content:space-around,self-auto|align-self:auto,self-start|align-self:flex-start,self-center|align-self:center,self-end|align-self:flex-end,self-stretch|align-self:stretch,justify-start|justify-content:flex-start,justify-center|justify-content:center,justify-end|justify-content:flex-end,justify-between|justify-content:space-between,justify-around|justify-content:space-around,flex-grow|flex-grow:1,flex-grow-0|flex-grow:0,flex-shrink|flex-shrink:1,flex-shrink-0|flex-shrink:0,order-first|order:-9999,order-last|order:9999,order-none|order:0,grid-cols-none|grid-template-columns:none,col-auto|grid-column:auto,col-start-auto|grid-column-start:auto,col-end-auto|grid-column-end:auto,grid-rows-none|grid-template-rows:none,row-auto|grid-row:auto,row-start-auto|grid-row-start:auto,row-end-auto|grid-row-end:auto,gap-px|gap:1px,row-gap-px|row-gap:1px,col-gap-px|column-gap:1px,grid-flow-row|grid-auto-flow:row,grid-flow-col|grid-auto-flow:column,grid-flow-row-dense|grid-auto-flow:row dens,grid-flow-col-dense|grid-auto-flow:column dense,min-w-full|min-width:100%,max-w-full|max-width:100%,max-w-screen-sm|max-width:640px,max-w-screen-md|max-width:768px,max-w-screen-lg|max-width:1024px,max-w-screen-xl|max-width:1280px,max-w-none|max-width:none,min-h-full|min-height:100%,min-h-screen|min-height:100vh,max-h-full|max-height:100%,max-h-screen|max-height:100vh,text-2xl|font-size:1.5rem,text-3xl|font-size:1.875rem,text-4xl|font-size:2.25rem,text-left|text-align:left,text-center|text-align:center,text-right|text-align:right,text-justify|text-align:justify,underline|text-decoration:underline,line-through|text-decoration:line-through,no-underline|text-decoration:none,uppercase|text-transform:uppercase,lowercase|text-transform:lowercase,capitalize|text-transform:capitalize,normal-case|text-transform:none,whitespace-no-wrap|white-space:nowrap,break-normal|word-break:normal!important;overflow-wrap:normal,break-words|overflow-wrap:break-word,break-all|word-break:break-all,truncate|overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap,flex-initial|flex: 0 1 auto,flex-none|flex:none,h-auto|height:auto,max-w-2xl|max-width:42rem,tracking-tighter|letter-spacing:-0.05em,tracking-tight|letter-spacing:-0.025em,tracking-normal|0,tracking-wide:letter-spacing:0.025em,tracking-wider|letter-spacing:0.05em,tracking-widest|letter-spacing: 0.1em,leading-none|line-height:1,leading-tight|line-height:1.25,leading-snug|line-height:1.375,leading-normal|line-height:1.5,leading-relaxed|line-height:1.625,leading-loose|line-height:2')) {
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
  if (partsLength > 3) {
    notFound()
    return
  }
  const starting = secondPart.slice(0, 3)
  if (starting.startsWith('#') || includes('rgb,hsl', starting) || includes('transparent,current', secondPart)) {
    setRule(type + ':' + secondPart)
    return
  }
  let color
  if (partsLength === 3) {
    if (thirdPart.length !== 3 || !thirdPart.endsWith('00')) {
      notFound()
      return
    }
    const colorPos = colorNames.indexOf(secondPart)
    if (colorPos === -1) {
      notFound()
      return
    }
    color = colors[colorPos * 9 + (Number(thirdPart[0]) - 1)]
    const rgba = type + `:rgba(${parseInt(color.slice(0, 2), 16)},${parseInt(color.slice(2, 4), 16)},${parseInt(color.slice(4, 6), 16)},var(--${type}-opacity,1))`
    setRule(type + `:#${color}!important;` + rgba)
    return
  } else {
    if (secondPart === 'black') {
      color = '#000'
    } else if (secondPart === 'white') {
      color = '#fff'
    }
    if (color !== undefined) {
      setRule(type + ':' + color)
      return
    }
  }
  notFound()
}

const setOpacity = (type) => {
  if (isNaN(thirdPart)) {
    notFound()
    return
  }
  setRule(`--${type}:` + (thirdPart === '100' ? '1' : '0.' + thirdPart))
}

const setPosition = () => {
  if (!includes('auto,initial,inherit', lastPart) && !isStartNum(lastPart)) {
    notFound()
    return
  }
  const v = negative + lastPart
  if (partsLength === 3) {
    if (secondPart === 'y') {
      setRule(`top:${v}!important;bottom:` + v)
      return
    } else if (secondPart === 'x') {
      setRule(`left:${v}!important;right:` + v)
      return
    }
  } else if (partsLength === 2) {
    if (firstPart === 'inset') {
      setRule(`top:${v}!important;right:${v}!important;bottom:${v}!important;left:` + v)
      return
    }
    setRule(firstPart + ':' + v)
    return
  }
  notFound()
}

const cls2process = new Map([
  ['overflow', () => {
    setRule(firstPart + `-${secondPart}:` + thirdPart)
  }],
  ['text', () => {
    if (partsLength === 2) {
      const pos = indexOf('xs,sm,base,lg,xl', secondPart)
      if (pos > -1) {
        setRule(`font-size:${0.75 + (0.125 * pos)}rem`)
        return
      }
      if (secondPart.endsWith('xl')) {
        const [num] = secondPart.split('x')
        if (isNum(num)) {
          setRule(`font-size:${Number(num) - 2}rem`)
          return
        }
      }
    }
    if (partsLength === 3) {
      if (secondPart === 'opacity') {
        setOpacity('color-opacity')
      }
    }
    setColor('color')
  }],
  ['font', () => {
    if (partsLength === 2) {
      const pos = indexOf('hairline,thin,light,normal,medium,semibold,bold,extrabold,black', secondPart)
      if (pos > -1) {
        setRule('font-weight:' + (100 * (1 + pos)))
        return
      }
    }
    notFound()
  }],
  ['align', () => {
    const r = cls.slice(6)
    if (includes('baseline,top,middle,bottom,text-top,text-bottom', r)) {
      setRule('vertical-align:' + r)
      return
    }
    notFound()
  }],
  ['whitespace', () => {
    const r = cls.slice(6)
    if (includes('normal,pre,pre-line,pre-wrap', r)) {
      setRule('white-space:' + r)
      return
    }
    notFound()
  }],
  ['inset', setPosition],
  ['top', setPosition],
  ['right', setPosition],
  ['bottom', setPosition],
  ['left', setPosition],
  ['flex', () => {
    if (secondPart === 'grow' || secondPart === 'shrink') {
      if (partsLength === 2) {
        setRule(`flex-${secondPart}:1`)
        return
      } else if (partsLength === 3 && isNum(thirdPart)) {
        setRule(`flex-${secondPart}:` + thirdPart)
        return
      }
      notFound()
    }
    if (!isNum(secondPart) && secondPart !== 'auto') {
      notFound()
      return
    }
    if (partsLength === 2) {
      setRule(`flex:${secondPart} 1 0%`)
      return
    }
    if (partsLength === 3 && (isNum(thirdPart) || thirdPart === 'auto')) {
      setRule(`flex:${secondPart} ${thirdPart} 0%`)
      return
    }
    const fp = parts[3]
    if (partsLength === 4 && (isNum(thirdPart) || thirdPart === 'auto') && (isStartNum(fp) || fp === 'auto')) {
      setRule(`flex:${secondPart} ${thirdPart} ` + fp)
      return
    }
    notFound()
  }],
  ['order', () => {
    if (partsLength !== 2 || !isNum(secondPart)) {
      notFound()
      return
    }
    setRule(firstPart + ':' + negative + secondPart)
  }],
  ['grid', () => {
    if (partsLength === 3 && isNum(thirdPart)) {
      switch (secondPart) {
        case 'cols':
          setRule(`grid-template-columns: repeat(${thirdPart}, minmax(0, 1fr))`)
          return
        case 'span':
          setRule(`grid-column: span ${thirdPart} / span ` + thirdPart)
          return
        case 'start':
          setRule('grid-column-start:' + thirdPart)
          return
        case 'end':
          setRule('grid-column-end:' + thirdPart)
          return
        case 'rows':
          setRule(`grid-template-rows: repeat(${thirdPart}, minmax(0, 1fr))`)
          return
      }
    }
    notFound()
  }],
  ['row', () => {
    if (partsLength === 3 && isStartNum(thirdPart)) {
      switch (secondPart) {
        case 'span':
          setRule(`grid-row: span ${thirdPart} / span ${thirdPart}`)
          return
        case 'start':
          setRule('grid-row-start:' + thirdPart)
          return
        case 'end':
          setRule('grid-row-end:' + thirdPart)
          return
        case 'gap':
          setRule('row-gap:' + ifRemTo(thirdPart))
          return
      }
    }
    notFound()
  }],
  ['col', () => {
    if (partsLength === 3 && isStartNum(thirdPart)) {
      switch (secondPart) {
        case 'gap':
          setRule('column-gap:' + ifRemTo(thirdPart))
          return
      }
    }
    notFound()
  }],
  ['gap', () => {
    if (partsLength === 2 && isStartNum(secondPart)) {
      setRule('gap:' + ifRemTo(secondPart))
      return
    }
    notFound()
  }],
  ['space', () => {
    classAdd = '>:not(template)~:not(template)'
    if (thirdPart === 'px') {
      thirdPart = '1px'
    }
    if (partsLength === 3) {
      if (isStartNum(thirdPart)) {
        const v = ifRemTo(thirdPart)
        if (secondPart === 'x') {
          setRule(`margin-right:calc(${v}*var(--space-x-reverse,0))!important;margin-left:calc(${v}*(1 - var(--space-x-reverse,0)))`)
          return
        } else if (secondPart === 'y') {
          setRule(`margin-top:calc(${v}*(1 - var(--space-y-reverse,0)))!important; margin-bottom:calc(${v}*var(--space-y-reverse,0))`)
          return
        }
      } else if (thirdPart === 'reverse') {
        if (secondPart === 'y' || secondPart === 'x') {
          setRule(`--space-${secondPart}-reverse:1`)
          return
        }
      }
    }
    notFound()
  }],
  ['min', () => {
    if (partsLength === 3 && isStartNum(thirdPart)) {
      if (secondPart === 'w' || secondPart === 'h') {
        const p = secondPart === 'w' ? 'width' : 'height'
        setRule(`min-${p}:` + thirdPart)
        return
      }
    }
    notFound()
  }],
  ['max', () => {
    if (partsLength === 3) {
      if (secondPart === 'w') {
        const pos = indexOf('xs,sm,md,lg,xl', thirdPart)
        if (pos > -1) {
          setRule(`max-width:${pos * 4 + 20}rem`)
          return
        } else if (isStartNum(thirdPart)) {
          if (thirdPart.endsWith('xl')) {
            setRule(`max-width:${parseInt(thirdPart) * 8 + 24}rem`)
            return
          }
          setRule('max-width:' + thirdPart)
          return
        }
      } else if (secondPart === 'h' && isStartNum(thirdPart)) {
        setRule('max-height:' + thirdPart)
        return
      }
    }
    notFound()
  }],
  ['tracking', () => {
    if (partsLength === 2 && isStartNum(secondPart)) {
      setRule('letter-spacing:' + secondPart)
      return
    }
    notFound()
  }],
  ['leading', () => {
    if (partsLength === 2) {
      if (isNum(secondPart)) {
        setRule(`line-height:${Number(secondPart) * 0.25}rem`)
        return
      }
      if (isStartNum(secondPart)) {
        setRule('line-height:' + secondPart)
        return
      }
    }
    notFound()
  }]

])

let parts
let firstPart // first  part
let secondPart // second part
let thirdPart // third part
let lastPart // last part
let partsWithoutEnd // without end
let partsLength // parts.length
let negative

function processClass () {
  sheet = styleElement.sheet
  negative = ''
  classAdd = ''
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
  partsLength = parts.length
  ;[firstPart, secondPart, thirdPart] = parts
  lastPart = parts[partsLength - 1]
  partsWithoutEnd = parts.slice(0, -1).join('-')
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
  if (partsLength < 2) {
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
  let v
  if (secondPart === 'px') {
    v = `${negative}1px`
  } else if (secondPart === 'full') {
    v = '100%'
  } else if (secondPart === 'screen') {
    if (firstPart === 'w') {
      v = '100vw'
    } else if (firstPart === 'h') {
      v = '100vh'
    } else {
      notFound()
      return
    }
  } else if (isNum(secondPart)) {
    v = negative + Number(secondPart) * 0.25 + 'rem'
  } else if (secondPart.indexOf('/') > -1) {
    let [top, bottom] = secondPart.split('/')
    top = Number(top)
    bottom = Number(bottom)
    if (isNaN(top) || isNaN(bottom)) {
      notFound()
      return
    }
    v = negative + (Number(top) / Number(bottom)).toFixed(6) + '%'
  } else if (isStartNum(secondPart)) {
    v = negative + secondPart
  } else {
    notFound()
    return
  }

  const basicPart = formatters.get(firstPart[0])
  if (basicPart === undefined) {
    notFound()
    return
  }
  if (firstPart.length > 1) {
    if (firstPart[1] === 'x') {
      setRule(basicPart + `-right:${v}!important;${basicPart}-left:` + v)
    } else if (firstPart[1] === 'y') {
      setRule(basicPart + `-top:${v}!important;${basicPart}-bottom:` + v)
    } else {
      const position = positions.get(firstPart[1])
      if (position === undefined) {
        notFound()
        return
      }
      setRule(basicPart + position + ':' + v)
    }
  } else {
    setRule(basicPart + ':' + v)
  }
}

// for (const s of document.styleSheets) {
//   console.log(s)
// }

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
  cls = originalClass.replace(/[.:()%,]/g, '\\$&') + classAdd
  console.log(`.${cls}{${t}!important}`)
  sheet.insertRule(`.${cls}{${t}!important}`, sheet.length)
}
