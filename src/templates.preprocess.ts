import { clean } from './utils'

/*

This file define all tailwind rules using a short, compat syntax.
Special chars such as !, +, $ and so on act as marks or separator and
provide a handful way to define common behaviours.

At the end, this file will be preprocessed and turned into a giant
multine string, which will be parsed at runtime. This is how we are able
to compress all of tailwind in such a little space.


You may add a rule in two ways.
Appending it directly to "defaultsTemplate". Use ! to separate the class name
from the class content, and put each rule in a new line. For example:

defaultsTemplate+= `
break-normal!overflow-wrap: normal;word-break: normal
break-words!overflow-wrap: break-word
break-all!word-break: break-all
break-keep!word-break: keep-all
`

Using the "addRule" shorthand to define multiple classes at once.
In its basic form, "addRule" takes the base tailwind class name,
the css property and some key-value pairs separated by ^.
For example, let's say we want to create two classes,
container-sm        max-width: 640px;
container-md        max-width: 768px;
We may do it with the following rule:

addRule('container', 'max-width: $px',
  'sm^640',
  'md^768',
)

We may use the $ in the second arg to specify where to insert
the value. If no $ is set, we will assume the value is at the end.
If the first arg would be the same as the second arg, we could
pass an empty string. In the same way, we could omit the ^.
For examples, let's say we want to create these two classes:
break-before-auto        break-before: auto;
break-before-all         break-before: all;
We could leverage that they have the same name, and avoid repeat both
'break-before' and 'auto'/'all'.

addRule('break-before', '',
  'auto',
  'all',
)


In tailwind, some properties allow for custom values, such as
bg-[customcolor]                 background-color: customcolor;
To allow this, pass $ as third argument. For example:

addRule('flex', '',
  '$',
  '1^1 1 0%',
  'auto^1 1 auto',
  'initial^0 1 auto',
  'none'
)

Other rules include common parameters, such as colors, thicknesses and so on.
To avoid reapeating those pattern, we defined some shortcuts, such as @C for colors.
Check them below.


Finally, you may prepend a rule with

>rule                this rule will be applied to the descendants to the element, instead of the element itself
+rule                this rule will have priority over non-priority rules (=would override them)
++rule, +++rule      even more priority


*/



let defaultsTemplate = '', ruleTemplate = '', filterTemplate = ''

export const shortcuts : Record<string, string> = {
  // colors @C are handled runtime
  // same for @4
  //border radius
  '@S': '',
  '@R': '$!none^0px!sm^2px!^4px!md^6px!lg^8px!xl^12px!2xl^16px!3xl^24px!full^9999px',
  '@B': '0^0px!^1px!2^2px!4^4px!8^8px',
  '@b': ';border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)',
  '@t': ';transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
  '@f': ';filter: blur(var(--tw-blur)) brightness(var(--tw-brightness)) contrast(var(--tw-contrast)) grayscale(var(--tw-grayscale)) hue-rotate(var(--tw-hue-rotate)) invert(var(--tw-invert)) saturate(var(--tw-saturate)) sepia(var(--tw-sepia)) drop-shadow(var(--tw-drop-shadow))',
  '@g': ';backdrop-filter: blur(var(--tw-backdrop-blur)) brightness(var(--tw-backdrop-brightness)) contrast(var(--tw-backdrop-contrast)) grayscale(var(--tw-backdrop-grayscale)) hue-rotate(var(--tw-backdrop-hue-rotate)) invert(var(--tw-backdrop-invert)) opacity(var(--tw-backdrop-opacity)) saturate(var(--tw-backdrop-saturate)) sepia(var(--tw-backdrop-sepia))'
}


const addRule = (...args : string[]) => ruleTemplate+= args.join('!') + '\n'

const addFilter = (...args : string[]) => filterTemplate+= args.join('!') + '\n'

// https://tailwindcss.com/docs/aspect-ratio
addRule('aspect', 'aspect-ratio: $',
  '$',
  'auto',
  'square^1/1',
  'video^16/9', 
)


// https://tailwindcss.com/docs/container
defaultsTemplate+= `container!width: 100%` + '\n'

addRule('container', 'max-width: $px',
  'sm^640',
  'md^768',
  'lg^1024',
  'xl^1280',
  '2xl^1536',
)


// https://tailwindcss.com/docs/columns

addRule('colums', 'columns', 
  '$',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  'auto',
  '3xs^16rem',
  '2xs^18rem',
  'xs ^20rem',
  'sm ^24rem',
  'md ^28rem',
  'lg ^32rem',
  'xl ^36rem',
  '2xl^42rem',
  '3xl^48rem',
  '4xl^56rem',
  '5xl^64rem',
  '6xl^72rem',
  '7xl^80rem',
)


// https://tailwindcss.com/docs/break-after
addRule('break-after', '',
  'auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'
)


// https://tailwindcss.com/docs/break-before
addRule('break-before', '',
  'auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'
)


// https://tailwindcss.com/docs/break-inside
addRule('break-inside', '',
  'auto', 'avoid', 'all', 'avoid-page', 'avoid-column'
)

// https://tailwindcss.com/docs/box-decoration-break
addRule('box-decoration', 'box-decoration-break',
  'clone', 'slice'
)


// https://tailwindcss.com/docs/box-sizing
addRule('box', 'box-sizing: $-box',
  'border', 'content'
)

// https://tailwindcss.com/docs/display
addRule('', 'display',
  'block',
  'inline-block',
  'inline',
  'flex',
  'inline-flex',
  'table',
  'inline-table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row-group',
  'table-row',
  'flow-root',
  'grid',
  'inline-grid',
  'contents',
  'list-item',
  'hidden^none',
)


// https://tailwindcss.com/docs/float
addRule('float', '',
  'right', 'left', 'none'
)


// https://tailwindcss.com/docs/clear
addRule('clear', '',
  'right', 'left', 'both', 'none'
)

// https://tailwindcss.com/docs/isolation
addRule('', 'isolation',
  'isolate',
  'isolation-auto^auto'
)

// https://tailwindcss.com/docs/object-fit
addRule('object', 'object-fit',
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
)


// https://tailwindcss.com/docs/object-position
addRule('object', 'object-position',
  '$',
  'bottom',
  'center',
  'left',
  'left-bottom^left bottom',
  'left-top^left top',
  'right',
  'right-bottom^right bottom',
  'right-top^right top',
  'top'
)

// https://tailwindcss.com/docs/overflow
addRule('overflow','',
  'auto',
  'hidden',
  'clip',
  'visible',
  'scroll',
)

addRule('overflow-x','',
  'auto',
  'hidden',
  'clip',
  'visible',
  'scroll',
)

addRule('overflow-y','',
  'auto',
  'hidden',
  'clip',
  'visible',
  'scroll',
)


// https://tailwindcss.com/docs/overscroll-behavior
addRule('overscroll','overscroll-behavior',
  'auto',
  'contain',
  'none',
)

addRule('overscroll-y','overscroll-behavior-y',
  'auto',
  'contain',
  'none',
)

addRule('overscroll-x','overscroll-behavior-x',
  'auto',
  'contain',
  'none',
)


// https://tailwindcss.com/docs/position
addRule('', 'position',
  'static',
  'fixed',
  'absolute',
  'relative',
  'sticky',
)

// https://tailwindcss.com/docs/top-right-bottom-left
addRule('inset', '', '@4')
addRule('inset-x', 'left:$;right:$', '@4')
addRule('inset-y', 'top:$;bottom:$', '@4')

addRule('start', 'inset-inline-start', '@4')
addRule('end', 'inset-inline-end', '@4')

addRule('top', '', '@4')
addRule('right', '', '@4')
addRule('bottom', '', '@4')
addRule('left', '', '@4')


// https://tailwindcss.com/docs/visibility
addRule('', 'visibility',
  'visible',
  'invisible^hidden',
  'collapse',
)

// https://tailwindcss.com/docs/z-index
addRule('z', 'z-index',
  '0',
  '10',
  '20',
  '30',
  '40',
  '50',
  'auto',
)

// https://tailwindcss.com/docs/flex-basis
addRule('basis', 'flex-basis', '@4')

// https://tailwindcss.com/docs/flex-direction
addRule('flex', 'flex-direction',
  'row',
  'row-reverse',
  'col^column',
  'col-reverse^column-reverse',
)


// https://tailwindcss.com/docs/flex-wrap
addRule('flex-wrap', '',
  'wrap',
  'wrap-reverse',
  'nowrap',
)


// https://tailwindcss.com/docs/flex
addRule('flex', '',
  '$',
  '1^1 1 0%',
  'auto^1 1 auto',
  'initial^0 1 auto',
  'none'
)


// https://tailwindcss.com/docs/flex-grow
addRule('grow', 'flex-grow',
  '$',
  '^1',
  '0',
)


// https://tailwindcss.com/docs/flex-shrink
addRule('shrink', 'flex-shrink',
  '$',
  '^1',
  '0',
)

// https://tailwindcss.com/docs/order
addRule('order','',
  '$',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'first^-9999',
  'last^9999',
  'none^0',

)

// https://tailwindcss.com/docs/grid-template-columns
addRule('grid-cols','grid-template-columns: repeat($, minmax(0, 1fr))',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
)

addRule('grid-cols', 'grid-template-columns', 
  '$',
  'none'
)


// https://tailwindcss.com/docs/grid-column
// https://tailwindcss.com/docs/grid-row
for(let [col, column] of Array.from([ 
  ['col', 'column'],
  ['row', 'row'],
])){
  defaultsTemplate+=`${col}-auto!grid-${column}: auto\n`

  addRule(`${col}-span`, `grid-${column}: span $ / span $`,
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  )

  addRule(`${col}-span`, `grid-${column}`,
    '$',
    `full^grid-${column}: 1 / -1`
  )

  addRule(`${col}-start`, `grid-${column}-start`,
    '$',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    'auto'
  )

  addRule(`${col}-end`, `grid-${column}-end`,
    '$',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    'auto'
  )

}


// https://tailwindcss.com/docs/grid-template-rows
addRule('grid-rows', 'grid-template-rows: repeat($, minmax(0, 1fr))',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
)

addRule('grid-rows', 'grid-template-rows',
  '$',
  'none'
)


// https://tailwindcss.com/docs/grid-auto-flow
addRule('grid-flow', 'grid-auto-flow',
  'row',
  'col^column',
  'dense',
  'row-dense^row dense',
  'col-dense^column dense',
)


// https://tailwindcss.com/docs/grid-auto-columns
addRule('auto-cols', 'grid-auto-columns',
  'auto',
  'min^min-content',
  'max^max-content',
  'fr^minmax(0,1fr)',
)


// https://tailwindcss.com/docs/grid-auto-rows
addRule('auto-rows', 'grid-auto-rows',
  'auto',
  'min^min-content',
  'max^max-content',
  'fr^minmax(0,1fr)',
)

// https://tailwindcss.com/docs/gap
addRule('gap','',
  '$',
  '@4'
)

addRule('gap-x','column-gap',
  '$',
  '@4'
)

addRule('gap-y','row-gap',
  '$',
  '@4'
)


// https://tailwindcss.com/docs/justify-content
addRule('justify', 'justify-content',
  'normal',
  'start^flex-start',
  'end^flex-end',
  'center',
  'between^space-between',
  'around^space-around',
  'evenly^space-evenly',
  'stretch',
)


// https://tailwindcss.com/docs/justify-items
addRule('justify-items', '',
  'start',
  'end',
  'center',
  'stretch'
)


// https://tailwindcss.com/docs/justify-self
addRule('justify-items', '',
  'auto',
  'start',
  'end',
  'center',
  'stretch'
)


// https://tailwindcss.com/docs/align-content
addRule('content', 'align-content',
  'normal',
  'center',
  'start^flex-start',
  'end^flex-end',
  'between^space-between',
  'around^space-around',
  'evenly^space-evenly',
  'baseline',
  'stretch',
)


// https://tailwindcss.com/docs/align-items
addRule('items', 'align-items',
  'start^flex-start',
  'end^flex-end',
  'center',
  'baseline',
  'stretch',
)


// https://tailwindcss.com/docs/align-self
addRule('self', 'align-self',
  'auto',
  'start^flex-start',
  'end^flex-end',
  'center',
  'baseline',
  'stretch',
)


// https://tailwindcss.com/docs/place-content
addRule('place-content', '',
  'center',
  'start^flex-start',
  'end^flex-end',
  'between^space-between',
  'around^space-around',
  'evenly^space-evenly',
  'baseline',
  'stretch',
)


// https://tailwindcss.com/docs/place-items
addRule('place-items', '',
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
)


// https://tailwindcss.com/docs/place-self
addRule('place-self', '',
  'auto',
  'start',
  'end',
  'center',
  'stretch',
)



// SPACING


// https://tailwindcss.com/docs/padding
addRule('p', 'padding',
  '$',
  '@4',
)

addRule('px', 'padding-left:$;padding-right:$',
  '$',
  '@4',
)

addRule('py', 'padding-top:$;padding-bottom:$',
  '$',
  '@4',
)

addRule('ps', 'padding-inline-start',
  '$',
  '@4',
)

addRule('pe', 'padding-inline-end',
  '$',
  '@4',
)

addRule('pt', 'padding-top',
  '$',
  '@4',
)

addRule('pr', 'padding-right',
  '$',
  '@4',
)

addRule('pb', 'padding-bottom',
  '$',
  '@4',
)

addRule('pl', 'padding-left',
  '$',
  '@4',
)



// https://tailwindcss.com/docs/margin
addRule('m', 'margin',
  '$',
  '@4',
)

addRule('mx', 'margin-left:$;margin-right:$',
  '$',
  '@4',
)

addRule('my', 'margin-top:$;margin-bottom:$',
  '$',
  '@4',
)

addRule('ms', 'margin-inline-start',
  '$',
  '@4',
)

addRule('me', 'margin-inline-end',
  '$',
  '@4',
)

addRule('mt', 'margin-top',
  '$',
  '@4',
)

addRule('mr', 'margin-right',
  '$',
  '@4',
)

addRule('mb', 'margin-bottom',
  '$',
  '@4',
)

addRule('ml', 'margin-left',
  '$',
  '@4',
)


// https://tailwindcss.com/docs/space
addRule('>space-x', 'margin-left',
  '$',
  '@4'
)

addRule('>space-x-reverse', '	--tw-space-x-reverse',
  '^1'
)

addRule('>space-y', 'margin-top',
  '$',
  '@4'
)

addRule('>space-y-reverse', '	--tw-space-y-reverse',
  '^1'
)



// SIZING

// https://tailwindcss.com/docs/width
addRule('w', 'width',
  '$',
  '@4',
  'screen^100vw'
)

addRule('w', 'width: $-content',
  'min',
  'max',
  'fit',
)

// https://tailwindcss.com/docs/min-width
addRule('min-w', 'min-width',
  '$',
  '0^0px',
  'full^100%',
  'min^min-content',
  'max^max-content',
  'fit^fit-content',
)


// https://tailwindcss.com/docs/max-width
addRule('max-w', 'max-width',
  '$',
  '0^0rem',
  'none^none',
  'xs^20rem',
  'sm^24rem',
  'md^28rem',
  'lg^32rem',
  'xl^36rem',
  '2xl^42rem',
  '3xl^48rem',
  '4xl^56rem',
  '5xl^64rem',
  '6xl^72rem',
  '7xl^80rem',
  'full^100%',
  'min^min-content',
  'max^max-content',
  'fit^fit-content',
  'prose^65ch',
  'screen-sm^640px',
  'screen-md^768px',
  'screen-lg^1024px',
  'screen-xl^1280px',
  'screen-2xl^1536px',
)


// https://tailwindcss.com/docs/height
addRule('h', 'height',
  '$',
  '@4',
)

// https://tailwindcss.com/docs/min-height
addRule('min-h', 'min-height',
  '$',
  '0^0px',
  'full^100%',
  'screen^100vh',
  'min^min-content',
  'max^max-content',
  'fit^fit-content',
)

//https://tailwindcss.com/docs/max-height
addRule('max-h', 'max-height',
  '$',
  '@4',
  'screen^100vh',
  'min^min-content',
  'max^max-content',
  'fit^fit-content',
)



// TYPOGRAPHY

// https://tailwindcss.com/docs/font-family
addRule('font', 'font-family',
  'sans^ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'serif^ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  'mono^ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
)

// https://tailwindcss.com/docs/font-size
addRule('text', 'font-size',
  '$',
  'xs^0.75rem; line-height: 1rem',
  'sm^0.875rem; line-height: 1.25rem',
  'base^1rem; line-height: 1.5rem',
  'lg^1.125rem; line-height: 1.75rem',
  'xl^1.25rem; line-height: 1.75rem',
  '2xl^1.5rem; line-height: 2rem',
  '3xl^1.875rem; line-height: 2.25rem',
  '4xl^2.25rem; line-height: 2.5rem',
  '5xl^3rem; line-height: 1',
  '6xl^3.75rem; line-height: 1',
  '7xl^4.5rem; line-height: 1',
  '8xl^6rem; line-height: 1',
  '9xl^8rem; line-height: 1',
)


// https://tailwindcss.com/docs/font-smoothing
defaultsTemplate+=`
antialiased!-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale
subpixel-antialiased!-webkit-font-smoothing: auto;-moz-osx-font-smoothing: auto
`

// https://tailwindcss.com/docs/font-style
addRule('', 'font-style',
  'italic',
  'non-italic^normal'
)

// https://tailwindcss.com/docs/font-weight

addRule('font', 'font-weight',
  '$',
  'thin^100',
  'extralight^200',
  'light^300',
  'normal^400',
  'medium^500',
  'semibold^600',
  'bold^700',
  'extrabold^800',
  'black^900',
)

// https://tailwindcss.com/docs/font-variant-numeric
addRule('', 'font-variant-numeric',
  'normal-nums^normal',
  'ordinal',
  'slashed-zero',
  'lining-nums',
  'oldstyle-nums',
  'proportional-nums',
  'tabular-nums',
  'diagonal-fractions',
  'stacked-fractions',
)

// https://tailwindcss.com/docs/letter-spacing
addRule('tracking', 'letter-spacing',
  '$',
  'tighter^-0.05em',
  'tight^-0.025em',
  'normal^0em',
  'wide^0.025em',
  'wider^0.05em',
  'widest^0.1em',
)



// https://tailwindcss.com/docs/line-clamp
addRule('line-clamp', 'overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp',
  '$',
  '1', '2','3','4','5','6', 'none'
)


// https://tailwindcss.com/docs/line-height
addRule('leading', 'line-height',
  '$',
  '3^.75rem',
  '4^1rem',
  '5^1.25rem',
  '6^1.5rem',
  '7^1.75rem',
  '8^2rem',
  '9^2.25rem',
  '10^2.5rem',
  'none^1',
  'tight^1.25',
  'snug^1.375',
  'normal^1.5',
  'relaxed^1.625',
  'loose^2',
)

// https://tailwindcss.com/docs/list-style-image
addRule('list-image', 'list-style-image',
  '$',
  'none'
)

// https://tailwindcss.com/docs/list-style-position
addRule('list', 'list-style-position',
  'inside',
  'outside',
)

// https://tailwindcss.com/docs/list-style-type
addRule('list', 'list-style-type',
  '$',
  'none',
  'disc',
  'decimal'
)

// https://tailwindcss.com/docs/text-align
addRule('text', 'text-align',
  'left',
  'center',
  'right',
  'justify',
  'start',
  'end'
)

// https://tailwindcss.com/docs/text-color
addRule('text', 'color',
  '$',
  '@C'
)

// https://tailwindcss.com/docs/text-decoration
addRule('', 'text-decoration-line',
  'underline',
  'overline',
  'line-through',
  'no-underline^none'
)

// https://tailwindcss.com/docs/text-decoration-color
addRule('decoration', 'text-decoration-color',
  '$',
  'current^currentColor',
  '@C'
)

// https://tailwindcss.com/docs/text-decoration-style
addRule('decoration', 'text-decoration-style',
  'solid',
  'double',
  'dotted',
  'dashed',
  'wavy'
)

// https://tailwindcss.com/docs/text-decoration-thickness
addRule('decoration', 'text-decoration-thickness',
  '$',
  'auto',
  'from-font',
  '0^0px',
  '1^1px',
  '2^2px',
  '4^4px',
  '8^8px'
)

// https://tailwindcss.com/docs/text-underline-offset
addRule('underline-offset', 'text-underline-offset',
  '$',
  'auto',
  '0^0px',
  '1^1px',
  '2^2px',
  '4^4px',
  '8^8px'
)

// https://tailwindcss.com/docs/text-transform
addRule('', 'text-transform',
  'uppercase',
  'lowercase',
  'capitalize',
  'normal-case^none'
)


// https://tailwindcss.com/docs/text-overflow
defaultsTemplate+='truncate!overflow:hidden;text-overflow:ellipsis;white-space:nowrap\n'

addRule('text', 'text-overflow',
  'ellipsis',
  'clip'
)


// https://tailwindcss.com/docs/text-indent
addRule('indent', 'text-indent',
  '$',
  '@4',
)
// https://tailwindcss.com/docs/vertical-align
addRule('align', 'vertical-align',
  '$',
  'baseline',
  'top',
  'middle',
  'text-top',
  'text-bottom',
  'sub',
  'super',
)

// https://tailwindcss.com/docs/whitespace
addRule('whitespace', 'white-space',
  'normal',
  'nowrap',
  'pre',
  'pre-line',
  'pre-wrap',
  'break-spaces',
)

// https://tailwindcss.com/docs/word-break
defaultsTemplate+= `
break-normal!overflow-wrap: normal;word-break: normal
break-words!overflow-wrap: break-word
break-all!word-break: break-all
break-keep!word-break: keep-all
`

// https://tailwindcss.com/docs/hyphens
addRule('hyphens', '',
  'none',
  'manual',
  'auto',
)

// https://tailwindcss.com/docs/content
addRule('content', '',
  '$',
  'none'
)


// BACKGROUNDS

// https://tailwindcss.com/docs/background-attachment
addRule('bg', 'background-attachment',
  'fixed',
  'local',
  'scroll'
)

// https://tailwindcss.com/docs/background-clip
addRule('bg-clip', 'background-clip',
  'border^border-box',
  'padding^padding-box',
  'content^content-box',
  'text'
)

// https://tailwindcss.com/docs/background-color
// NOTE: 
addRule('bg', 'background-color',
  'current^currentColor',
  '@C'
)


// https://tailwindcss.com/docs/background-origin
addRule('bg-origin', 'background-origin:$-box',
  'border',
  'padding',
  'content'
)

// https://tailwindcss.com/docs/background-position
addRule('bg', 'background-position',
  '$',
  'bottom',
  'center',
  'left',
  'left-bottom^left bottom',
  'left-top^left top',
  'right',
  'right-bottom^right bottom',
  'right-top^right top',
  'top'
)

// https://tailwindcss.com/docs/background-repeat
addRule('bg', 'background-repeat',
  'repeat',
  'no-repeat',
  'repeat-x',
  'repeat-y',
  'repeat-round',
  'repeat-space',
)

// https://tailwindcss.com/docs/background-size
addRule('bg', 'background-size',
  '$',
  'auto',
  'cover',
  'contain'
)


// https://tailwindcss.com/docs/background-image
addRule('bg', 'background',
  '$'
)
// TODO
// https://tailwindcss.com/docs/gradient-color-stops
// TODO



// BORDERS

// https://tailwindcss.com/docs/border-radius
addRule('rounded', 'border-radius', '@R')
addRule('rounded-s', 'border-start-start-radius:$;border-end-start-radius:$', '@R')
addRule('rounded-e', 'border-start-end-radius:$;border-end-end-radius:$', '@R')

addRule('rounded-t', 'border-top-left-radius:$;border-top-right-radius:$', '@R')
addRule('rounded-b', 'border-bottom-left-radius:$;border-bottom-right-radius:$', '@R')
addRule('rounded-r', 'border-top-right-radius:$;border-bottom-right-radius:$', '@R')
addRule('rounded-l', 'border-top-left-radius:$;border-bottom-left-radius:$', '@R')

addRule('rounded-ss', 'border-start-start-radius', '@R')
addRule('rounded-se', 'border-start-end-radius', '@R')
addRule('rounded-ee', 'border-end-end-radius', '@R')
addRule('rounded-es', 'border-end-start-radius', '@R')

addRule('rounded-tl', 'border-top-left-radius', '@R')
addRule('rounded-tr', 'border-top-right-radius', '@R')
addRule('rounded-bl', 'border-bottom-left-radius', '@R')
addRule('rounded-br', 'border-bottom-right-radius', '@R')



// https://tailwindcss.com/docs/border-width
addRule('border', 'border-width', '@B')

addRule('border-x', 'border-left-width:$;border-right-width:$', '$', '@B')
addRule('border-y', 'border-top-width:$;border-bottom-width:$', '$', '@B')

addRule('border-s', 'border-inline-start-width', '$','@B')
addRule('border-e', 'border-inline-end-width', '$','@B')

addRule('border-t', 'border-top-width', '@B')
addRule('border-r', 'border-right-width', '@B')
addRule('border-b', 'border-bottom-width', '@B')
addRule('border-l', 'border-left-width', '@B')




// https://tailwindcss.com/docs/border-color
addRule('border', 'border-color',
  '$',
  '@C'
)

// https://tailwindcss.com/docs/border-style
addRule('border', 'border-style',
  'solid',
  'dashed',
  'dotted',
  'double',
  'hidden',
  'none'
)


// https://tailwindcss.com/docs/divide-width
addRule('>divide-x','--tw-divide-x-reverse: 0;' 
      + 'border-right-width:calc($ * calc(1 - var(--tw-divide-x-reverse)));'
      + 'border-left-width:calc($ * var(--tw-divide-x-reverse))',
  '@B'
)

addRule('+divide-x-reverse', '--tw-divide-x-reverse',
  '^1'
)

addRule('>divide-y','--tw-divide-y-reverse: 0;' 
    + 'border-top-width:calc($ * calc(1 - var(--tw-divide-y-reverse)));'
    + 'border-bottom-width:calc($ * var(--tw-divide-y-reverse))',
  '@B'
)

addRule('+divide-y-reverse', '--tw-divide-y-reverse',
  '^1'
)

// https://tailwindcss.com/docs/divide-color
addRule('>divide', 'border-color',
  '$',
  '@C',
)

// https://tailwindcss.com/docs/divide-style
addRule('>divide', 'border-style',
  'solid',
  'dashed',
  'dotted',
  'double',
  'none'
)
// https://tailwindcss.com/docs/outline-width
addRule('outline', 'outline-width',
  '$',
  '0^0px',
  '1^1px',
  '2^2px',
  '4^4px',
  '8^8px'
)

// https://tailwindcss.com/docs/outline-color
addRule('outline', 'outline-color',
  '$',
  '@C'
)


// https://tailwindcss.com/docs/outline-style
defaultsTemplate+= `
outline-none!outline:2px solid transparent;outline-offset:2px
`

addRule('outline', 'outline-style',
  '^solid',
  'dashed',
  'dotted',
  'double'
)


// https://tailwindcss.com/docs/outline-offset
addRule('outline-offset', '',
  '$',
  '0^0px',
  '1^1px',
  '2^2px',
  '4^4px',
  '8^8px'
)

// https://tailwindcss.com/docs/ring-width
defaultsTemplate+=`
ring-inset!--tw-ring-inset: inset
`
addRule('ring', 'box-shadow: var(--tw-ring-inset) 0 0 0 calc($ + var(--tw-ring-offset-width)) var(--tw-ring-color)',
  '$', 
  '^3px',
  '0^0px',
  '1^1px',
  '2^2px',
  '4^4px',
  '8^8px'
)

// https://tailwindcss.com/docs/ring-color
addRule('ring', '--tw-ring-color',
  '$',
  '@C'
)

// https://tailwindcss.com/docs/ring-offset-width
addRule('ring-offset', '--tw-ring-offset-width:$;box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)',
'$', 
'0^0px',
'1^1px',
'2^2px',
'4^4px',
'8^8px'
)

// https://tailwindcss.com/docs/ring-offset-color
addRule('ring-offset', '--tw-ring-offset-color:$;box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)',
  '$',
  '@C'
)

// EFFECTS

// https://tailwindcss.com/docs/box-shadow
addRule('shadow', '--tw-shadow:$;box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
  'sm^0 1px 2px 0 rgb(0 0 0 / 0.05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color)',
  'md^0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color)',
  '^0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color)',
  'lg^0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)',
  'xl^0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)',
  '2xl^0 25px 50px -12px rgb(0 0 0 / 0.25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color)',
  'inner^--tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);--tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color)',
  'none^0 0 #0000;--tw-shadow-colored: 0 0 #0000',
)

// https://tailwindcss.com/docs/box-shadow-color
addRule('+shadow', '--tw-shadow-color:$;--tw-shadow: var(--tw-shadow-colored)',
  '$',
  '@C'
)

// https://tailwindcss.com/docs/opacity
addRule('opacity', '',
  '$',
  '0^0',
  '5^0.05',
  '10^0.1',
  '20^0.2',
  '25^0.25',
  '30^0.3',
  '40^0.4',
  '50^0.5',
  '60^0.6',
  '70^0.7',
  '75^0.75',
  '80^0.8',
  '90^0.9',
  '95^0.95',
  '100^1',
)

// https://tailwindcss.com/docs/mix-blend-mode
addRule('mix-blend', 'mix-blend-mode',
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
  'plus-lighter',
)


// https://tailwindcss.com/docs/background-blend-mode
addRule('bg-blend', 'background-blend-mode',
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
)


// FILTERS

// https://tailwindcss.com/docs/blur
addFilter('blur', '--tw-blur:$' + '@f',
  '$',
  'none',
  'sm^4px',
  '^8px',
  'md^12px',
  'lg^16px',
  'xl^24px',
  '2xl^40px',
  '3xl^64px',
)

// https://tailwindcss.com/docs/brightness
addFilter('brightness', '--tw-brightness:$' + '@f',
  '$',
  '0',
  '50^.5',
  '75^.75',
  '90^.9',
  '95^.95',
  '100^1',
  '105^1.05',
  '110^1.1',
  '125^1.25',
  '150^1.5',
  '200^2',
)

// https://tailwindcss.com/docs/contrast
addFilter('contrast', '--tw-contrast:$' + '@f',
  '$',
  '0',
  '50^.5',
  '75^.75',
  '100^1',
  '125^1.25',
  '150^1.5',
  '200^2',
)

// TODO drop shadow

// https://tailwindcss.com/docs/grayscale
addFilter('grayscale', '--tw-grayscale:$' + '@f',
  '$',
  '0',
  '^100%',
)

// https://tailwindcss.com/docs/hue-rotate
addFilter('hue-rotate', '--tw-hue-rotate:$' + '@f',
'$',
'0^0deg',
'15^15deg',
'30^30deg',
'60^60deg',
'90^90deg',
'180^180deg',
)

// https://tailwindcss.com/docs/invert
addFilter('invert', '--tw-invert:$' + '@f',
  '$',
  '0',
  '^100%',
)

// https://tailwindcss.com/docs/saturate
addFilter('saturate', '--tw-saturate:$' + '@f',
  '$',
  '0',
  '50^.5',
  '100^1',
  '150^1.5',
  '200^2',
)

// https://tailwindcss.com/docs/sepia
addFilter('sepia', '--tw-sepia:$' + '@f',
  '$',
  '0',
  '^100%',
)






// TABLE

// https://tailwindcss.com/docs/border-collapse
addRule('border', 'border-collapse',
  'collapse',
  'separate',
)

// https://tailwindcss.com/docs/border-spacing
addRule('border-spacing', '--tw-border-spacing-x:$;--tw-border-spacing-y:$' + '@b',
  '@4'
)

addRule('+border-spacing-x', '--tw-border-spacing-x:$' + '@b',
  '@4'
)

addRule('+border-spacing-y', '--tw-border-spacing-y:$' + '@b',
  '@4'
)


// https://tailwindcss.com/docs/table-layout
addRule('table', 'table-layout',
  'auto',
  'fixed'
)

// https://tailwindcss.com/docs/caption-side
addRule('caption', 'caption-side',
  'top',
  'bottom'
)

// https://tailwindcss.com/docs/transition-property
addRule('transition','transition-property: $;'
    + 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;',
  '$',
  'none',
  'all',
  '^color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
  'colors^color, background-color, border-color, text-decoration-color, fill, stroke',
  'opacity',
  'shadow^box-shadow',
  'transform',

)
// https://tailwindcss.com/docs/transition-duration
addRule('+duration', 'transition-duration',
  '$',
  '0^0s',
  '75^75ms',
  '100^100ms',
  '150^150ms',
  '200^200ms',
  '300^300ms',
  '500^500ms',
  '700^700ms',
  '1000^1000ms',
)

// https://tailwindcss.com/docs/transition-timing-function
addRule('+ease', 'transition-timing-function',
  'linear',
  'in^cubic-bezier(0.4, 0, 1, 1)',
  'out^cubic-bezier(0, 0, 0.2, 1)',
  'in-out^cubic-bezier(0.4, 0, 0.2, 1)',
)

// https://tailwindcss.com/docs/transition-delay
addRule('delay', 'transition-delay',
'$',
'0^0s',
'75^75ms',
'100^100ms',
'150^150ms',
'200^200ms',
'300^300ms',
'500^500ms',
'700^700ms',
'1000^1000ms',
)

// https://tailwindcss.com/docs/animation
// NOTE: the spin keyframes have been added to index.css file
addRule('animate', 'animation',
  '$',
  'none',
  'spin^spin 1s linear infinite',
  'ping^ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
)

// https://tailwindcss.com/docs/scale
addRule('scale',  '--tw-scale-x:$;--tw-scale-y:$' + '@t',
  '$',
  '0',
  '50^.5',
  '75^.75',
  '90^.9',
  '95^.95',
  '100^1',
  '105^1.05',
  '110^1.1',
  '125^1.25',
  '150^1.5',
)

addRule('+scale-x',  '--tw-scale-x:$' + '@t',
  '$',
  '0',
  '50^.5',
  '75^.75',
  '90^.9',
  '95^.95',
  '100^1',
  '105^1.05',
  '110^1.1',
  '125^1.25',
  '150^1.5',
)

addRule('+scale-y',  '--tw-scale-y:$' + '@t',
  '$',
  '0',
  '50^.5',
  '75^.75',
  '90^.9',
  '95^.95',
  '100^1',
  '105^1.05',
  '110^1.1',
  '125^1.25',
  '150^1.5',
)

// https://tailwindcss.com/docs/rotate
addRule('rotate',  '--tw-rotate:$' + '@t',
  '$',
  '0^0deg',
  '1^1deg',
  '2^2deg',
  '3^3deg',
  '6^6deg',
  '12^12deg',
  '45^45deg',
  '90^90deg',
  '180^180deg',

)

// https://tailwindcss.com/docs/translate
addRule('translate-x',  '--tw-translate-x:$' + '@t',
  '@4',
)

addRule('translate-y',  '--tw-translate-y:$' + '@t',
  '@4',
)

// https://tailwindcss.com/docs/skew
addRule('skew-x',  '--tw-skew-x:$' + '@t',
  '$',
  '0^0deg',
  '1^1deg',
  '2^2deg',
  '3^3deg',
  '6^6deg',
  '12^12deg',
)

addRule('skew-y',  '--tw-skew-y:$' + '@t',
  '$',
  '0^0deg',
  '1^1deg',
  '2^2deg',
  '3^3deg',
  '6^6deg',
  '12^12deg',
)


// https://tailwindcss.com/docs/transform-origin
addRule('origin', 'transform-origin',
  '$',
  'center',
  'top',
  'top-right^top right',
  'right',
  'bottom-right^bottom right',
  'bottom',
  'bottom-left^bottom left',
  'left',
  'top-left^top left',
)


// INTERACTIVITY

// https://tailwindcss.com/docs/accent-color
addRule('accent', 'accent-color',
  '$',
  '@C'
)


// https://tailwindcss.com/docs/appearance
addRule('appearence', '',
  'none'
)

// https://tailwindcss.com/docs/cursor
addRule('cursor', '',
  '$',
  'auto',
  'default',
  'pointer',
  'wait',
  'text',
  'move',
  'help',
  'not-allowed',
  'none',
  'context-menu',
  'progress',
  'cell',
  'crosshair',
  'vertical-text',
  'alias',
  'copy',
  'no-drop',
  'grab',
  'grabbing',
  'all-scroll',
  'col-resize',
  'row-resize',
  'n-resize',
  'e-resize',
  's-resize',
  'w-resize',
  'ne-resize',
  'nw-resize',
  'se-resize',
  'sw-resize',
  'ew-resize',
  'ns-resize',
  'nesw-resize',
  'nwse-resize',
  'zoom-in',
  'zoom-out',
)

// https://tailwindcss.com/docs/caret-color
addRule('caret', 'caret-color',
  '$',
  '@C'
)

// https://tailwindcss.com/docs/pointer-events
addRule('pointer-events', '',
  'none',
  'auto',
)

// https://tailwindcss.com/docs/resize
addRule('resize', '',
  'none',
  'y^vertical',
  'x^horizontal',
  '^both'
)

// https://tailwindcss.com/docs/scroll-behavior
addRule('scroll', 'scroll-behavior',
  'auto',
  'smooth'
)

// https://tailwindcss.com/docs/scroll-margin
// https://tailwindcss.com/docs/scroll-padding
// TODO

// https://tailwindcss.com/docs/scroll-snap-align
addRule('snap', 'scroll-snap-align',
  'start',
  'end',
  'center',
  'align-none^none' // otherwise will overlap with snap type

)

// https://tailwindcss.com/docs/scroll-snap-stop
addRule('snap', 'scroll-snap-stop',
  'normal',
  'always',
)

// https://tailwindcss.com/docs/scroll-snap-type
defaultsTemplate+=`
snap-none!scroll-snap-type: none
snap-x!scroll-snap-type: x var(--tw-scroll-snap-strictness)
snap-y!scroll-snap-type: y var(--tw-scroll-snap-strictness)
snap-both!scroll-snap-type: both var(--tw-scroll-snap-strictness)
snap-mandatory!--tw-scroll-snap-strictness: mandatory
snap-proximity!--tw-scroll-snap-strictness: proximity
`

// https://tailwindcss.com/docs/touch-action
addRule('touch', 'touch-action',
  'auto',
  'none',
  'pan-x',
  'pan-left',
  'pan-right',
  'pan-y',
  'pan-up',
  'pan-down',
  'pinch-zoom',
  'manipulation',
)

// https://tailwindcss.com/docs/user-select
addRule('select', 'user-select',
  'none',
  'text',
  'all',
  'auto',
)

// https://tailwindcss.com/docs/will-change
addRule('will-change', '',
  'auto',
  'scroll^scroll-position',
  'contents',
  'transform',
)


// SVG

// https://tailwindcss.com/docs/fill
addRule('fill', '',
  '$',
  'none',
  '@C'
)

// https://tailwindcss.com/docs/stroke
addRule('stroke', '',
  '$',
  'none',
  '@C'
)


// https://tailwindcss.com/docs/stroke-width
addRule('stroke', 'stroke-width',
  '$',
  '0',
  '1',
  '2',
)

// ACCESSIBILITY

// https://tailwindcss.com/docs/screen-readers
defaultsTemplate+=`
sr-only!position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0
not-sr-only!position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal
`








const defaultsTemplateParsed = clean(defaultsTemplate)
const ruleParsed = clean(ruleTemplate)
const filterParsed = clean(filterTemplate)
export {ruleParsed as ruleTemplate, filterParsed as filterTemplate, defaultsTemplateParsed as defaultsTemplate}







