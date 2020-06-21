/* eslint-disable prefer-const */

let isNum = (v) => !isNaN(v)
let isStartNum = (v) => !isNaN(parseInt(v))
let split = (s) => s.split('!')
let indexOf = (s, v) => split(s).indexOf(v)
let includes = (s, v) => split(s).includes(v)
let ifRemTo = (v) => isNum(v) ? negative + Number(v) * 0.25 + 'rem' : negative + v
let newObject = (o) => Object.assign(Object.create(null), o)
let elementClassesCache = new Map()
let classesCache = new Map()
let sheet
let parentSheet
if (document.styleSheets.length === 0) {
  parentSheet = document.head.appendChild(document.createElement('style')).sheet
} else {
  parentSheet = document.styleSheets[0]
}

let media = new Map()

for (let a of split('sm|@media(min-width:640px){}!md|@media(min-width:768px){}!lg|@media(min-width:1024px){}!xl|@media(min-width:1280px){}')) {
  a = a.split('|')
  media.set(a[0], parentSheet.cssRules[parentSheet.insertRule(a[1], parentSheet.cssRules.length)])
}

let cls
let originalClass
let classAdd

export let processClasses = (classes) => {
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

let formatters = newObject({
  p: 'padding',
  m: 'margin',
  h: 'height',
  z: 'z-index',
  w: 'width'
})

let classNames = newObject({})

// direct map from class to values
for (let c of split('box-border|-webkit-box-sizing:border-box;box-sizing:border-box!box-content|-webkit-box-sizing:content-box;box-sizing:content-box!hidden|display:none!object-scale-down|object-fit:scale-down;-o-object-fit:scale-down!scrolling-touch|-webkit-overflow-scrolling:touch!scrolling-auto|-webkit-overflow-scrolling:auto!visible|visibility:visible!invisible|visibility:hidden!order-first|order:-9999!order-last|order:9999!order-none|order:0!grid-cols-none|grid-template-columns:none!col-auto|grid-column:auto!col-start-auto|-ms-grid-column:auto;grid-column-start:auto!col-end-auto|-ms-grid-column-span:auto;grid-column-end:auto!grid-rows-none|-ms-grid-rows:none;grid-template-rows:none!row-auto|grid-row:auto!row-start-auto|-ms-grid-row:auto;grid-row-start:auto!row-end-auto|-ms-grid-row-span:auto;grid-row-end:auto!gap-px|gap:1px!row-gap-px|row-gap:1px!grid-flow-row|grid-auto-flow:row!grid-flow-col|grid-auto-flow:column!grid-flow-row-dense|grid-auto-flow:row dense!grid-flow-col-dense|grid-auto-flow:column dense!min-w-full|min-width:100%!max-w-full|max-width:100%!max-w-screen-sm|max-width:640px!max-w-screen-md|max-width:768px!max-w-screen-lg|max-width:1024px!max-w-screen-xl|max-width:1280px!max-w-none|max-width:none!min-h-full|min-height:100%!min-h-screen|min-height:100vh!max-h-full|max-height:100%!max-h-screen|max-height:100vh!text-2xl|font-size:1.5rem!text-3xl|font-size:1.875rem!text-4xl|font-size:2.25rem!text-left|text-align:left!text-center|text-align:center!text-right|text-align:right!text-justify|text-align:justify!underline|text-decoration:underline!line-through|text-decoration:line-through!no-underline|text-decoration:none!uppercase|text-transform:uppercase!lowercase|text-transform:lowercase!capitalize|text-transform:capitalize!normal-case|text-transform:none!whitespace-no-wrap|white-space:nowrap!break-normal|word-break:normal;overflow-wrap:normal!break-words|overflow-wrap:break-word!break-all|word-break:break-all!truncate|overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap!h-auto|height:auto!max-w-2xl|max-width:42rem!tracking-tighter|letter-spacing:-0.05em!tracking-tight|letter-spacing:-0.025em!tracking-normal|0!tracking-wide:letter-spacing:0.025em!tracking-wider|letter-spacing:0.05em!tracking-widest|letter-spacing: 0.1em!leading-none|line-height:1!leading-tight|line-height:1.25!leading-snug|line-height:1.375!leading-normal|line-height:1.5!leading-relaxed|line-height:1.625!leading-loose|line-height:2!list-none|list-style-type:none!list-disc|list-style-type:disc!list-decimal|list-style-type:decimal!list-inside|list-style-position:inside!list-outside|list-style-position:outside!border|border-width:1px!border-collapse|border-collapse:collapse!border-separate|border-collapse:separate!table-auto|table-layout:auto!table-fixed|table-layout:fixed!appearance-none|-webkit-appearance:none;-moz-appearance:none;appearance:none!outline-none|outline:0!resize-none|resize:none!resize|resize:both!resize-y|resize:vertical!resize-x|resize:horizontal!fill-current|fill:currentColor!stroke-current|stroke:currentColor!sr-only|position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0!not-sr-only|position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal!font-sans|font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji!font-serif|font-family:Georgia,Cambria,"Times New Roman",Times,serif!font-mono|font-family:Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace')) {
  let [k, v] = c.split('|')
  classNames[k] = v
}

// class to value
for (let c of split('float-right!float-left!float-none!clear-left!clear-right!clear-both!clear-none')) {
  classNames[c] = c.replace('-', ':')
}

// display
for (let c of split('block!flow-root!inline-block!inline!flex!grid!inline-grid!table!table-caption!table-cell!table-column!table-column-group!table-footer-group!table-header-group!table-row-group!table-row')) {
  let p = c
  if (c === 'flex') {
    p = '-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex'
  } else if (c === 'inline-flex') {
    p = '-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex'
  } else if (c === 'grid') {
    p = '-ms-grid;display:grid'
  } else if (c === 'inline-grid') {
    p = '-ms-inline-grid;display:inline-grid'
  }
  classNames[c] = 'display:' + p
}

// position
for (let c of split('static!fixed!absolute!relative!sticky')) {
  classNames[c] = 'position:' + c
}

let colors = split('f7fafc!edf2f7!e2e8f0!cbd5e0!a0aec0!718096!4a5568!2d3748!1a202c!fff5f5!fed7d7!feb2b2!fc8181!f56565!e53e3e!c53030!9b2c2c!742a2a!fffaf0!feebc8!fbd38d!f6ad55!ed8936!dd6b20!c05621!9c4221!7b341e!fffff0!fefcbf!faf089!f6e05e!ecc94b!d69e2e!b7791f!975a16!744210!f0fff4!c6f6d5!9ae6b4!68d391!48bb78!38a169!2f855a!276749!22543d!e6fffa!b2f5ea!81e6d9!4fd1c5!38b2ac!319795!2c7a7b!285e61!234e52!ebf8ff!bee3f8!90cdf4!63b3ed!4299e1!3182ce!2b6cb0!2c5282!2a4365!ebf4ff!c3dafe!a3bffa!7f9cf5!667eea!5a67d8!4c51bf!434190!3c366b!faf5ff!e9d8fd!d6bcfa!b794f4!9f7aea!805ad5!6b46c1!553c9a!44337a!fff5f7!fed7e2!fbb6ce!f687b3!ed64a6!d53f8c!b83280!97266d!702459')

let colorNames = split('gray!red!orange!yellow!green!teal!blue!indigo!purple!pink')

let roundedSize = split('none!sm!nm!md!lg!full')

let edge = newObject({ l: 'left', r: 'right', t: 'top', b: 'bottom' })

let setColor = (type) => {
  let color
  if (thirdPart) {
    let colorPos = colorNames.indexOf(secondPart)
    color = colors[colorPos * 9 + (Number(thirdPart[0]) - 1)]
    if (color) {
      let rgba = type + `:rgba(${parseInt(color.slice(0, 2), 16)},${parseInt(color.slice(2, 4), 16)},${parseInt(color.slice(4, 6), 16)},var(--${type}-opacity,1))`
      rule = type + `:#${color};` + rgba
    } else if (secondPart === 'opacity' && isNum(thirdPart)) {
      rule = `--${type}-opacity:` + (thirdPart === '100' ? '1' : thirdPart / 100)
    }
  } else if (secondPart) {
    let starting = secondPart.slice(0, 3)
    if (starting.startsWith('#') || includes('rgb!hsl', starting) || includes('transparent!current', secondPart)) {
      rule = type + ':' + secondPart
    } else {
      if (secondPart === 'black') {
        color = '#000'
      } else if (secondPart === 'white') {
        color = '#fff'
      }
      if (color) {
        rule = type + ':' + color
      }
    }
  }
}

let setPosition = () => {
  if (includes('auto!initial!inherit', lastPart) && !isStartNum(lastPart)) {
    let v = negative + lastPart
    if (thirdPart) {
      if (secondPart === 'y') {
        rule = `top:${v};bottom:` + v
      } else if (secondPart === 'x') {
        rule = `left:${v};right:` + v
      }
    } else if (secondPart) {
      if (firstPart === 'inset') {
        rule = `top:${v};right:${v};bottom:${v};left:` + v
      } else {
        rule = firstPart + ':' + v
      }
    }
  }
}

let timeProp = () => {
  let v
  if (isNum(secondPart)) {
    v = secondPart + 'ms'
  } else if (isStartNum(secondPart)) {
    v = secondPart
  }
  if (v) {
    rule = `-webkit-transition-${firstPart}:${v};-o-transition-${firstPart}:${v};transition-${firstPart}:` + v
  }
}

let cls2process = newObject({
  object: () => {
    if (includes('contain!cover!fill!none!bottom', rest)) {
      rule = `-o-object-fit:${rest};object-fit:` + rest
    } else if (includes('bottom!center!left!left-bottom!left-top!right!right-bottom!right-top!top', rest)) {
      rest = rest.replace('-', ' ')
      rule = `-o-object-position:${rest};object-position:` + rest
    }
  },
  overflow: () => {
    rule = partsWithoutEnd + ':' + lastPart
  },
  clearfix: () => {
    originalClass = 'clearfix::after'
    rule = 'content:"";display:table;clear:both'
  },
  text: () => {
    let pos = indexOf('xs!sm!base!lg!xl', secondPart)
    if (pos > -1) {
      rule = `font-size:${0.75 + (0.125 * pos)}rem`
    } else if (secondPart.endsWith('xl')) {
      let [num] = secondPart.split('x')
      if (isNum(num)) {
        rule = `font-size:${Number(num) - 2}rem`
      }
    } else {
      setColor('color')
    }
  },
  font: () => {
    let pos = indexOf('hairline!thin!light!normal!medium!semibold!bold!extrabold!black', secondPart)
    if (pos > -1) {
      rule = 'font-weight:' + (100 * (1 + pos))
    } else if (isNum(secondPart)) {
      rule = 'font-weight:' + secondPart
    }
  },
  whitespace: () => {
    if (includes('normal!pre!pre-line!pre-wrap', rest)) {
      rule = 'white-space:' + rest
    }
  },
  inset: setPosition,
  top: setPosition,
  right: setPosition,
  bottom: setPosition,
  left: setPosition,
  flex: () => {
    let ruleFunc = (v1, v2 = 1, v3 = '0%') => `-webkit-box-flex:${v1};-ms-flex:${v1} ${v2} ${v3};flex:${v1} ${v2} ` + v3
    if (includes('row!row-reverse!col!col-reverse', rest)) {
      rest = rest.replace('col', 'column')
      rule = `-webkit-box-orient:${secondPart === 'row' ? 'horizontal' : 'vertical'};-webkit-box-direction:${thirdPart === 'reverse' ? thirdPart : 'normal'};-ms-flex-direction:${rest};flex-direction:${rest}`
    } else if (includes('no-wrap!flex-wrap!wrap-reverse', rest)) {
      if (rest === 'no-wrap') {
        rest = 'nowrap'
      }
      rule = `-ms-flex-wrap:${rest};flex-wrap:${rest}`
    } else if (includes('grow!shrink', secondPart)) {
      let v = thirdPart || 1
      if (secondPart === 'grow') {
        rule = `-webkit-box-flex:${v};-ms-flex-positive:${v};flex-grow:${v}`
      } else {
        rule = `-ms-flex-negative:${v};flex-shrink:${v}`
      }
    } else if (rest === 'initial') {
      rule = ruleFunc(0, 1, 'auto')
    } else if (rest === 'auto') {
      rule = ruleFunc(1, 1, 'auto')
    } else if (rest === 'none') {
      rule = '-webkit-box-flex:0;-ms-flex:none;flex:none'
    } else if (partsLength === 4) {
      rule = ruleFunc(secondPart, thirdPart, parts[3])
    } else if (thirdPart) {
      rule = ruleFunc(secondPart, thirdPart)
    } else {
      rule = ruleFunc(secondPart)
    }
  },
  order: () => {
    if (isNum(secondPart)) {
      let num = negative + secondPart
      rule = `-webkit-box-ordinal-group:${Number(num) + 1};-ms-flex-order:${num};order:` + num
    }
  },
  grid: () => {
    if (isNum(thirdPart)) {
      rule = newObject({
        cols: `-ms-grid-columns:(minmax(0,1fr))[${thirdPart}];grid-template-columns: repeat(${thirdPart}, minmax(0, 1fr))`,
        span: `-ms-grid-column-span:${thirdPart};grid-column: span ${thirdPart} / span ` + thirdPart,
        start: `-ms-grid-column:${thirdPart};grid-column-start:` + thirdPart,
        end: `-ms-grid-column-span:${thirdPart};grid-column-end:` + thirdPart,
        rows: `-ms-grid-rows:(minmax(0,1fr))[${thirdPart}];grid-template-rows: repeat(${thirdPart}, minmax(0, 1fr))`
      })[secondPart]
    }
  },
  row: () => {
    if (isStartNum(thirdPart)) {
      rule = newObject({
        span: `-ms-grid-row-span:${thirdPart};grid-row: span ${thirdPart} / span ${thirdPart}`,
        start: `-ms-grid-row:${thirdPart};grid-row-start:` + thirdPart,
        end: `-ms-grid-row-span:${thirdPart};grid-row-end:` + thirdPart,
        gap: 'row-gap:' + ifRemTo(thirdPart)
      })[secondPart]
    }
  },
  col: () => {
    if (isNum(thirdPart)) {
      if (secondPart === 'span') {
        rule = `-ms-grid-column-span:${thirdPart};grid-column:span ${thirdPart} / span ${thirdPart};`
      } else if (secondPart === 'start') {
        rule = `-ms-grid-column:${thirdPart};grid-column-start:${thirdPart}`
      } else if (secondPart === 'end') {
        rule = `-ms-grid-column-span:${thirdPart};grid-column-end:${thirdPart}`
      }
    }
    if (isStartNum(thirdPart) && secondPart === 'gap') {
      let v = thirdPart === 'px' ? '1px' : ifRemTo(thirdPart)
      rule = `-webkit-column-gap:${v};-moz-column-gap:${v}column-gap:` + v
    }
  },
  gap: () => {
    if (isStartNum(secondPart)) {
      rule = 'gap:' + ifRemTo(secondPart)
    }
  },
  space: () => {
    classAdd = '>:not(template)~:not(template)'
    if (thirdPart === 'px') {
      thirdPart = '1px'
    }
    if (thirdPart) {
      if (isStartNum(thirdPart)) {
        let v = ifRemTo(thirdPart)
        if (secondPart === 'x') {
          rule = `margin-right:calc(${v}*var(--space-x-reverse,0));margin-left:calc(${v}*(1 - var(--space-x-reverse,0)))`
        } else if (secondPart === 'y') {
          rule = `margin-top:calc(${v}*(1 - var(--space-y-reverse,0)));margin-bottom:calc(${v}*var(--space-y-reverse,0))`
        }
      } else if (thirdPart === 'reverse') {
        rule = `--space-${secondPart}-reverse:1`
      }
    }
  },
  divide: () => {
    classAdd = '>:not(template)~:not(template)'
    if (partsLength < 4) {
      let v
      if (isNum(thirdPart)) {
        v = thirdPart + 'px'
      } else if (isStartNum(thirdPart)) {
        v = thirdPart
      } else if (thirdPart === 'reverse') {
        rule = `--divide-${secondPart}-reverse:1`
      } else if (secondPart) {
        v = '1px'
      }

      if (v) {
        if (secondPart === 'y') {
          rule = `border-top-width:calc(${v}*calc(1 - var(--divide-y-reverse,0)));border-bottom-width:calc(${v}*var(--divide-y-reverse,0)))`
        } else if (secondPart === 'x') {
          rule = `border-right-width:calc(${v}*var(--divide-x-reverse,0));border-left-width:calc(${v}*calc(1 - var(--divide-x-reverse,0)))`
        }
      }
    }
    if (!rule) {
      setColor('border-color')
    }
  },
  min: () => {
    if (isStartNum(thirdPart)) {
      if (secondPart === 'w' || secondPart === 'h') {
        let p = secondPart === 'w' ? 'width' : 'height'
        rule = `min-${p}:` + thirdPart
      }
    }
  },
  max: () => {
    if (secondPart === 'w') {
      let pos = indexOf('xs!sm!md!lg!xl', thirdPart)
      if (pos > -1) {
        rule = `max-width:${pos * 4 + 20}rem`
      } else if (isStartNum(thirdPart)) {
        if (thirdPart.endsWith('xl')) {
          rule = `max-width:${parseInt(thirdPart) * 8 + 24}rem`
        } else {
          rule = 'max-width:' + thirdPart
        }
      }
    } else if (secondPart === 'h' && isStartNum(thirdPart)) {
      rule = 'max-height:' + thirdPart
    }
  },
  tracking: () => {
    if (isStartNum(secondPart)) {
      rule = 'letter-spacing:' + secondPart
    }
  },
  leading: () => {
    if (isNum(secondPart)) {
      rule = `line-height:${Number(secondPart) * 0.25}rem`
    } else if (isStartNum(secondPart)) {
      rule = 'line-height:' + secondPart
    }
  },
  placeholder: () => {
    classAdd = '::placeholder'
    setColor('color')
  },
  align: () => {
    if (includes('baseline!top!middle!bottom!text-top!text-bottom', rest)) {
      rule = 'vertical-align:' + rest
    }
  },
  bg: () => {
    rest = rest.replace('-', ' ')
    if (includes('bottom!center!left!left bottom!left top!right!right bottom!right top!top', rest)) {
      rule = 'background-position:' + rest
    } else if (includes('repeat!no-repeat!repeat-x!repeat-y', rest)) {
      rule = 'background-repeat:' + rest
    } else if (includes('repeat-round!repeat-space', rest)) {
      rule = 'background-repeat:' + thirdPart
    } else if (includes('auto!cover!contain', rest)) {
      rule = 'background-size:' + rest
    } else if (includes('fixed!local!scroll', secondPart)) {
      rule = 'background-attachment:' + secondPart
    } else {
      setColor('background-color')
    }
  },
  rounded: () => {
    let v
    let pos = roundedSize.indexOf(lastPart)
    if (isStartNum(lastPart)) {
      v = lastPart
      pos = 9
    } else if (pos === 5) {
      v = '9999px'
    } else if (pos > -1) {
      v = pos * 0.125 + 'rem'
    } else if (!secondPart || edge[secondPart] || (includes('t!b', secondPart[0]) && includes('r!l', secondPart[1]))) {
      v = '0.25rem'
    }
    if (v) {
      let place1 = edge[secondPart[0]]
      if (!secondPart || (!thirdPart && pos > -1)) {
        rule = 'border-radius:' + v
      } else if (includes('t!b', secondPart)) {
        rule = `border-${place1}-left-radius:${v};border-${place1}-right-radius:` + v
      } else if (includes('l!r', secondPart)) {
        rule = `border-top-${place1}-radius:${v};border-bottom-${place1}-radius:` + v
      } else {
        rule = `border-${place1}-${edge[secondPart[1]]}-radius:` + v
      }
    }
  },
  border: () => {
    let b = edge[secondPart]
    if (thirdPart && b) {
      if (isNum(thirdPart)) {
        rule = `border-${b}-width:${thirdPart}px`
      } else if (isStartNum(thirdPart)) {
        rule = `border-${b}-width:` + thirdPart
      }
    } else {
      if (includes('solid!dashed!dotted!double!none', secondPart)) {
        rule = 'border-style:' + secondPart
      } else if (b) {
        rule = `border-${b}-width:1px`
      } else if (isNum(secondPart)) {
        rule = `border-width:${secondPart}px`
      } else if (isStartNum(secondPart)) {
        rule = 'border-width:' + secondPart
      } else {
        setColor('border-color')
      }
    }
  },
  opacity: () => {
    if (isNum(secondPart)) {
      rule = 'opacity:' + 100 / secondPart
    }
  },
  transition: () => {
    let ruleFunc = (value) => `-webkit-transition-property:${value};-o-transition-property:${value};transition-property:` + value
    let ruleFunc2 = (value) => `-webkit-transition-property:-webkit-${value};transition-property:-webkit-${value};-o-transition-property:${value};transition-property:${value};transition-property:${value},-webkit-${value}`
    if (!secondPart) {
      rule = '-webkit-transition-property:S-webkit-box-shadow,-webkit-transform;transition-property:S-webkit-box-shadow,-webkit-transform;-o-transition-property:Sbox-shadow,transform;transition-property:Sbox-shadow,transform;transition-property:Sbox-shadow,transform,-webkit-box-shadow,-webkit-transform'
      rule = rule.replace('S', 'background-color,border-color,color,fill,stroke,opacity,')
    } else if (secondPart === 'colors') {
      rule = ruleFunc('background-color,border-color,color,fill,stroke')
    } else if (secondPart === 'shadow') {
      rule = ruleFunc2('box-shadow')
    } else if (secondPart === 'transform') {
      rule = ruleFunc2('transform')
    } else if (secondPart) {
      rule = ruleFunc(secondPart)
    }
  },
  duration: timeProp,
  delay: timeProp,
  ease: () => {
    let ruleFunc = (value) => `-webkit-transition-timing-function:${value};-o-transition-timing-function:${value};transition-timing-function:${value}`
    if (rest === 'in') {
      rule = ruleFunc('cubic-bezier(0.4,0,1,1)')
    } else if (rest === 'out') {
      rule = ruleFunc('cubic-bezier(0,0,0.2,1)')
    } else if (rest === 'in-out') {
      rule = ruleFunc('cubic-bezier(0.4,0,0.2,1)')
    } else if (rest === 'linear') {
      rule = ruleFunc('linear')
    }
  },
  scale: () => {
    if (isNum(lastPart)) {
      let v = lastPart / 100
      if (includes('x!y', secondPart)) {
        rule = `--transform-scale-${secondPart}:` + v
      } else {
        rule = `--transform-scale-x:${v};--transform-scale-y:` + v
      }
    }
  },
  rotate: () => {
    if (isNum(secondPart)) {
      rule = `--transform-rotate:${negative}${secondPart}deg`
    }
  },
  translate: () => {
    if (includes('x!y', secondPart)) {
      if (thirdPart === 'px') {
        thirdPart = '1px'
      } else if (thirdPart === 'full') {
        thirdPart = '100%'
      } else if (thirdPart.includes('/')) {
        let fractions = thirdPart.split('/')
        if (fractions.length === 2) {
          thirdPart = Number(fractions[0]) / Number(fractions[1]) + '%'
        }
      }
      if (isStartNum(thirdPart)) {
        rule = `--transform-translate-${secondPart}:` + ifRemTo(thirdPart)
      }
    }
  },
  skew: () => {
    if (includes('x!y', secondPart) && isNum(thirdPart)) {
      rule = `--transform-skew-${secondPart}:${negative + thirdPart}deg`
    }
  },
  transform: () => {
    let v = 'translatex(var(--transform-translate-x,0))translatey(var(--transform-translate-y,0))rotate(var(--transform-rotate,0))skewx(var(--transform-skew-x,0))skewy(var(--transform-skew-y,0))scalex(var(--transform-scale-x,1))scaley(var(--transform-scale-y,1))'
    rule = `-webkit-transform:${v};-ms-transform:${v};transform:` + v
  },
  origin: () => {
    if (includes('center!top!top-right!right!bottom-right!bottom!bottom-left!left!top-left', rest)) {
      rest = rest.replace('-', ' ')
      rule = `-webkit-transform-origin:${rest};-ms-transform-origin:${rest};transform-origin:` + rest
    }
  },
  cursor: () => {
    if (includes('auto!default!pointer!wait!text!move!not-allowed', rest)) {
      rule = 'cursor:' + rest
    }
  },
  box: () => {
    if (secondPart === 'shadow') {
      let shadows = newObject({
        xs: '0 0 0 1pxR.05)',
        sm: '0 1px 2px 0R.05)',
        '': '0 1px 3px 0R.1), 0 1px 2px 0R.06)',
        md: '0 4px 6px -1pxR.1), 0 2px 4px -1pxR.06)',
        lg: '0 10px 15px -3pxR.1), 0 4px 6px -2pxR.05)',
        xl: '0 20px 25px -5pxR.1), 0 10px 10px -5pxR.04)',
        '2xl': '0 25px 50px -12pxR.25)',
        inner: 'inset 0 2px 4px 0R.06)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none'
      })
      let v = shadows[thirdPart]
      if (v) {
        v = v.replace('R', ' rgba(0, 0, 0, 0')
        rule = `-webkit-box-shadow:${v};box-shadow:` + v
      }
    }
  },
  outline: () => {
    if (secondPart) {
      rule = 'outline:' + rest.replace('-', ' ')
    }
  },
  pointer: () => {
    if (secondPart) {
      rule = 'pointer-events:' + secondPart
    }
  },
  select: () => {
    if (includes('none!auto!text!contain!all!inherit!initial!unset', rest)) {
      rule = `-webkit-user-select:${rest};-moz-user-select:${rest};-ms-user-select:${rest};user-select:` + rest
    }
  },
  fill: () => {
    if (secondPart) {
      rule = 'fill:' + secondPart
    }
  },
  stroke: () => {
    if (isNum(secondPart)) {
      rule = 'stroke-width:' + secondPart
    } else if (secondPart) {
      rule = 'stroke:' + secondPart
    }
  },
  items: () => {
    if (includes('stretch!start!center!end!baseline', rest)) {
      rule = `-webkit-box-align:${rest};-ms-flex-align:${rest};align-items:` + (includes('start,end', rest) ? 'flex-' : '') + rest
    }
  },
  content: () => {
    if (includes('start!center!end!between!around')) {
      let v = rest
      if (includes('start,end', rest)) {
        rest = 'flex-' + rest
      } else if (rest === 'between') {
        v = 'justify'
        rest = 'space-' + rest
      } else if (rest === 'around') {
        v = 'distribute'
        rest = 'space-' + rest
      }

      rule = `-ms-flex-line-pack:${v};align-content:` + rest
    }
  },
  self: () => {
    if (includes('auto!start!center!end!stretch', rest)) {
      let gridRowAlign = `-ms-grid-row-align:${rest};`
      let v = rest
      if (includes('start!end', rest)) {
        rest = 'flex-' + rest
        gridRowAlign = ''
      }
      rule = `-ms-flex-item-align:${v};${gridRowAlign}align-self:` + rest
    }
  },
  justify: () => {
    if (includes('start!center!end!between!around', rest)) {
      let v = rest
      if (v === 'between') {
        v = 'justify'
        rest = 'space-' + rest
      } else if (includes('start!end')) {
        rest = 'flex-' + rest
      }
      let webkit = `-webkit-box-pack:${v};`
      if (v === 'around') {
        v = 'distribute'
        rest = 'space-' + rest
        webkit = ''
      }
      rule = webkit + `-ms-flex-pack:${v};justify-content:` + rest
    }
  }
})

let parts
let firstPart // first  part
let secondPart // second part
let thirdPart // third part
let lastPart // last part
let partsWithoutEnd // without end
let rest
let partsLength // parts.length
let negative
let rule

function processClass () {
  sheet = parentSheet
  rule = ''
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
  parts = cls.split('-')
  partsLength = parts.length
  ;[firstPart, secondPart = '', thirdPart = ''] = parts
  lastPart = parts[partsLength - 1]
  partsWithoutEnd = parts.slice(0, -1).join('-')
  rest = parts.slice(1).join('-')

  let process
  if (!(rule = classNames[cls]) && (process = cls2process[firstPart])) {
    process()
  } else if (firstPart.length < 3) {
    formatClass()
  }

  if (rule) {
    setRule(rule)
  } else if (cls === 'container') {
    setRule('width:100%')
    let m = split('640px!768px!1024px!1280px')
    media.values().forEach((s, index) => {
      sheet = s
      setRule('max-width:' + m[index])
    })
  } else {
    notFound()
  }
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
    }
  } else if (isNum(secondPart)) {
    v = negative + Number(secondPart) * 0.25 + 'rem'
  } else if (secondPart.indexOf('/') > -1) {
    let [top, bottom] = secondPart.split('/')
    if (isNum(top) && isNum(bottom)) {
      v = negative + (Number(top) / Number(bottom)).toFixed(6) + '%'
    }
  } else if (isStartNum(secondPart)) {
    v = negative + secondPart
  }

  let basicPart = formatters[firstPart[0]]
  let e = edge[firstPart[1]]
  if (v && basicPart) {
    if (firstPart[1] === 'x') {
      rule = basicPart + `-right:${v};${basicPart}-left:` + v
    } else if (firstPart[1] === 'y') {
      rule = basicPart + `-top:${v};${basicPart}-bottom:` + v
    } else if (e) {
      rule = basicPart + `-${e}:` + v
    } else {
      rule = basicPart + ':' + v
    }
  }
}

function notFound () {
  if (sheet === parentSheet) {
    return
  }
  for (let s of document.styleSheets) {
    // console.log(s)
    for (let rule of s.cssRules) {
      // eslint-disable-next-line no-undef
      if (rule.type === CSSRule.STYLE_RULE) {
        if (rule.selectorText.split(',').map((item) => item.trim()).includes('.' + cls)) {
          cls = originalClass.replace(/[.:]/, '\\$&')
          // console.log(`.${cls}${rule.cssText.slice(rule.cssText.indexOf('{'))}`)
          sheet.insertRule(`.${cls}${rule.cssText.slice(rule.cssText.indexOf('{'))}`, sheet.length)
          return
        }
      }
    }
  }
}

function setRule (t) {
  cls = originalClass.replace(/[.:()%,#]/g, '\\$&') + classAdd
  // console.log(`.${cls}{${t}}`)
  sheet.insertRule(`.${cls}{${t}}`, sheet.length)
}
