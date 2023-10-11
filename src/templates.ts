import { dictionarify } from "./utils.js"



const transform = `transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`

// calculate top, bottom, left and right variant
const allSides = (prefix : string, resolver : string, rule :string) => `
${prefix}x!${resolver}!${rule}-left:$;${rule}-right:$
${prefix}y!${resolver}!${rule}-top:$;${rule}-bottom:$
${prefix}s!${resolver}!${rule}-inline-start
${prefix}e!${resolver}!${rule}-inline-end
${prefix}t!${resolver}!${rule}-top
${prefix}r!${resolver}!${rule}-right
${prefix}b!${resolver}!${rule}-bottom
${prefix}l!${resolver}!${rule}-left`


// calculate all the possible border radius rules
// those are a lot, and very convoluted
let borderDefaults = ''
let borderClasses = ''

const addBorder = (prefix: string, value: string) => {
  if(prefix !== '') prefix = '-' + prefix
  if(!value.includes('$')) value +=':$'
  // @ts-ignore
  borderDefaults += `rounded${prefix}!${value.replaceAll('$', '0.25rem')}\n`
  borderClasses +=`rounded${prefix}!b!${value}\n`
}

;`!border-radius: $;
s!border-start-start-radius: $; border-end-start-radius: $;
e!border-start-end-radius: $; border-end-end-radius: $;
t!border-top-left-radius: $;border-top-right-radius: $;
r!border-top-right-radius: $; border-bottom-right-radius: $;
b!border-bottom-right-radius: $; border-bottom-left-radius: $;
l!border-top-left-radius: $; border-bottom-left-radius: $;
`.split('\n').forEach(line => {
  if(!line.includes('!')) return
  //@ts-ignore
  addBorder(...line.split('!'))
})

;`ss!start-start
se!start-end
ee!end-end
es!end-start
tr!top-right
tl!top-left
br!bottom-right
bl!bottom-left
`.split('\n').forEach(line => {
  if(!line.includes('!')) return
  const values = line.split('!')
  //@ts-ignore
  addBorder(values[0], `border-${values[1]}-radius`)
})






export const defaults = dictionarify(`
${borderDefaults}
container!width: 100%
box-border!box-sizing: border-box
box-content!box-sizing: content-box;

block!display: block
inline-block!display: inline-block
inline!display: inline
flex!display: flex
inline-flex!display: inline-flex
table!display: table
inline-table!display: inline-table
table-caption!display: table-caption
table-cell!display: table-cell
table-column!display: table-column
table-column-group!display: table-column-group
table-footer-group!display: table-footer-group
table-header-group!display: table-header-group
table-row-group!display: table-row-group
table-row!display: table-row
flow-root!display: flow-root
grid!display: grid
inline-grid!display: inline-grid
contents!display: contents
list-item!display: list-item
hidden!display: none

isolate!isolation: isolate
isolation-auto!isolation: auto

static!position: static
fixed!position: fixed
absolute!position: absolute
relative!position: relative
sticky!position: sticky

visible!visibility: visible
invisible!visibility: hidden
collapse!visibility: collapse

flex-row!flex-direction: row
flex-row-reverse!flex-direction: row-reverse
flex-col!flex-direction: column
flex-col-reverse!flex-direction: column-reverse


flex-1!flex: 1 1 0%
flex-auto!flex: 1 1 auto
flex-initial!flex: 0 1 auto
grow!flex-grow: 1
shrink!flex-shrink: 1;

grid-cols-none!grid-template-columns: none
col-auto!grid-column: auto

w-screen!width: 100vw
h-screen!height: 100vh

max-w-0!max-width: 0rem;
max-w-none!max-width: none;
max-w-xs!max-width: 20rem;
max-w-sm!max-width: 24rem;
max-w-md!max-width: 28rem;
max-w-lg!max-width: 32rem;
max-w-xl!max-width: 36rem;
max-w-2xl!max-width: 42rem;
max-w-3xl!max-width: 48rem;
max-w-4xl!max-width: 56rem;
max-w-5xl!max-width: 64rem;
max-w-6xl!max-width: 72rem;
max-w-7xl!max-width: 80rem;
max-w-full!max-width: 100%;
max-w-min!max-width: min-content;
max-w-max!max-width: max-content;
max-w-fit!max-width: fit-content;
max-w-prose!max-width: 65ch;
max-w-screen-sm!max-width: 640px;
max-w-screen-md!max-width: 768px;
max-w-screen-lg!max-width: 1024px;
max-w-screen-xl!max-width: 1280px;
max-w-screen-2xl!max-width: 1536px;

font-sans!font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
font-serif!font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif
font-mono!font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace

text-xs!font-size: 0.75rem; line-height: 1rem;
text-sm!font-size: 0.875rem; line-height: 1.25rem;
text-base!font-size: 1rem; line-height: 1.5rem;
text-lg!font-size: 1.125rem;line-height: 1.75rem;
text-xl!font-size: 1.25rem; line-height: 1.75rem;
text-2xl!font-size: 1.5rem;line-height: 2rem;
text-3xl!font-size: 1.875rem;line-height: 2.25rem;
text-4xl!font-size: 2.25rem; line-height: 2.5rem;
text-5xl!font-size: 3rem; line-height: 1;
text-6xl!font-size: 3.75rem;line-height: 1;
text-7xl!font-size: 4.5rem; line-height: 1;
text-8xl!font-size: 6rem; line-height: 1;
text-9xl!font-size: 8rem; line-height: 1;

antialiased!-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
subpixel-antialiased!-webkit-font-smoothing: auto;-moz-osx-font-smoothing: auto;

italic!font-style: italic;
not-italic!font-style: normal;

normal-nums!font-variant-numeric: normal;
ordinal!font-variant-numeric: ordinal;
slashed-zero!font-variant-numeric: slashed-zero;
lining-nums!font-variant-numeric: lining-nums;
oldstyle-nums!font-variant-numeric: oldstyle-nums;
proportional-nums!font-variant-numeric: proportional-nums;
tabular-nums!font-variant-numeric: tabular-nums;
diagonal-fractions!font-variant-numeric: diagonal-fractions;
stacked-fractions!font-variant-numeric: stacked-fractions;
leading-none!line-height: 1;
leading-tight!line-height: 1.25;
leading-snug!line-height: 1.375;
leading-normal!line-height: 1.5;
leading-relaxed!line-height: 1.625;
leading-loose!line-height: 2;
list-image-none!list-style-image: none;
list-inside!list-style-position: inside;
list-outside!list-style-position: outside;
text-left!text-align: left;
text-center!text-align: center;
text-right!text-align: right;
text-justify!text-align: justify;
text-start!text-align: start;
text-end!text-align: end;
underline!text-decoration-line: underline;
overline!text-decoration-line: overline;
line-through!text-decoration-line: line-through;
no-underline!text-decoration-line: none;
decoration-solid!text-decoration-style: solid;
decoration-double!text-decoration-style: double;
decoration-dotted!text-decoration-style: dotted;
decoration-dashed!text-decoration-style: dashed;
decoration-wavy!text-decoration-style: wavy;
decoration-auto!text-decoration-thickness: auto;
decoration-from-font!text-decoration-thickness: from-font;
decoration-0!text-decoration-thickness: 0px;
decoration-1!text-decoration-thickness: 1px;
decoration-2!text-decoration-thickness: 2px;
decoration-4!text-decoration-thickness: 4px;
decoration-8!text-decoration-thickness: 8px;
uppercase!text-transform: uppercase;
lowercase!text-transform: lowercase;
capitalize!text-transform: capitalize;
normal-case!text-transform: none;
truncate!overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
text-ellipsis!text-overflow: ellipsis;
text-clip!text-overflow: clip;
break-normal!overflow-wrap: normal;word-break: normal;
break-words!overflow-wrap: break-word;
break-all!word-break: break-all;
break-keep!word-break: keep-all;
bg-fixed!background-attachment: fixed;
bg-local!background-attachment: local;
bg-scroll!background-attachment: scroll;
bg-clip-border!background-clip: border-box;
bg-clip-padding!background-clip: padding-box;
bg-clip-content!background-clip: content-box;
bg-clip-text!background-clip: text;
bg-origin-border!background-origin: border-box;
bg-origin-padding!background-origin: padding-box;
bg-origin-content!background-origin: content-box;
bg-repeat!background-repeat: repeat;
bg-no-repeat!background-repeat: no-repeat;
bg-repeat-x!background-repeat: repeat-x;
bg-repeat-y!background-repeat: repeat-y;
bg-repeat-round!background-repeat: round;
bg-repeat-space!background-repeat: space;
bg-auto!background-size: auto;
bg-cover!background-size: cover;
bg-contain!background-size: contain;
bg-none!background-image: none;
bg-gradient-to-t!background-image: linear-gradient(to top, var(--tw-gradient-stops));
bg-gradient-to-tr!background-image: linear-gradient(to top right, var(--tw-gradient-stops));
bg-gradient-to-r!background-image: linear-gradient(to right, var(--tw-gradient-stops));
bg-gradient-to-br!background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
bg-gradient-to-b!background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
bg-gradient-to-bl!background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));
bg-gradient-to-l!background-image: linear-gradient(to left, var(--tw-gradient-stops));
bg-gradient-to-tl!background-image: linear-gradient(to top left, var(--tw-gradient-stops));

drop-shadow-sm!filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
drop-shadow!filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
drop-shadow-md!filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
drop-shadow-lg!filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
drop-shadow-xl!filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
drop-shadow-2xl!filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
drop-shadow-none!filter: drop-shadow(0 0 #0000);
shadow-sm!box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
shadow!box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
shadow-md!box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
shadow-lg!box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
shadow-xl!box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
shadow-2xl!box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
shadow-inner!box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
shadow-none!box-shadow: 0 0 #0000;

backdrop-invert!backdrop-filter: invert(100%);
backdrop-sepia!backdrop-filter: sepia(100%);

border-collapse!border-collapse: collapse;
border-separate!border-collapse: separate;
border!border-width: 1px;

ease-linear!transition-timing-function: linear;
ease-in!transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
ease-out!transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
ease-in-out!transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

resize-none!resize: none;
resize-y!resize: vertical;
resize-x!resize: horizontal;
resize!resize: both;

snap-start!scroll-snap-align: start;
snap-end!scroll-snap-align: end;
snap-center!scroll-snap-align: center;
snap-align-none!scroll-snap-align: none;
snap-normal!scroll-snap-stop: normal;
snap-always!scroll-snap-stop: always;
snap-none!scroll-snap-type: none;
snap-x!scroll-snap-type: x var(--tw-scroll-snap-strictness);
snap-y!scroll-snap-type: y var(--tw-scroll-snap-strictness);
snap-both!scroll-snap-type: both var(--tw-scroll-snap-strictness);
snap-mandatory!--tw-scroll-snap-strictness: mandatory;
snap-proximity!--tw-scroll-snap-strictness: proximity;

sr-only!position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0, 0, 0, 0);white-space: nowrap;border-width: 0;
not-sr-only!position: static;width: auto;height: auto;padding: 0;margin: 0;overflow: visible;clip: auto;white-space: normal;
`)


const classesDictionarify = (template: string) => {
  const results = {}
  for(let line of template.split('\n')) {
    line = line.trim()
    if(line === '') continue
    //console.log(line)
    let [rule, ...values] = line.split('!').map(el => el.trim())

    if(values.length == 0) values.push('');
    if(values.length == 1) values.push(rule);
    for(let i = 1; i < values.length; i++){
      if(!values[i].includes('$')) values[i] +=':$'
    }
    let atTop = false
    if(rule.startsWith('+')){
      rule = rule.substring(1)
      atTop = true
    }
    //console.log(rule, values)
    results[rule] = [atTop, ...values]
  }
  return results
}

export const classes = classesDictionarify(`
${borderClasses}
aspect!r!aspect-ratio
container!l!max-width
columns!c
break-after
break-before
break-inside
box-decoration!!box-decoration-break
float
clear
object!!object-fit
overflow
overflow-x
overflow-y
overscroll!!overscroll-behavior
inset!4
inset-x!4!left!right
inset-y!4!top!bottom
start!4!inset-inline-start
end!4!inset-inline-end
top!4
right!4
bottom!4
left!4

z!!z-index

basis!4!flex-basis
flex
grow!!flex-grow
shrink!!flex-shrink
order!o
grid-cols!!grid-template-columns: repeat($, minmax(0, 1fr))
col-span!!grid-column: span $ / span $
grid-rows!!grid-template-rows: repeat($, minmax(0, 1fr));
row-span!!grid-row: span $ / span $


gap!4!gap
gap-x!4!column-gap
gap-y!4!row-gap
justify!s!justify-content
justify-items!!
justify-self!!
content!s!align-content
items!s!align-items
self!s!align-self
place-content!s!
place-items!!
place-self!!
p!4!padding
${allSides('p', '4', 'padding')}
m!4!margin
${allSides('m', '4', 'margin')}
w!4d!width
min-w!l!min-width
max-w!!
h!4d!height
min-h!4d!min-height
max-h!4d!max-height

font!w!font-weight
tracking!t!letter-spacing
line-clamp!!overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:
leading!4!line-height
list!!list-style-type
text!C!color
decoration!C!text-decoration-color
underline-offset!4!text-underline-offset
indent!4!text-indent
align!!vertical-align
whitespace!!white-space
hyphens
content
bg!C!background-color

shadow
drop-shadow!!filter: drop-shadow($)
opacity!P
mix-blend
bg-blend!!background-blend-mode
brightness!P!filter: brightness($)
contrast!P!filter: contrast($)
backdrop-invert!!backdrop-filter: invert($);
backdrop-opacity!P!backdrop-filter: opacity($)
backdrop-saturate!P!backdrop-filter: saturate($)
backdrop-sepia!!backdrop-filter: sepia($);

+border!1C!border-width!border-color
border-b!1!border-bottom-width

table!!table-layout
caption!!caption-side
duration!!transition-duration: $ms;
ease!!transition-timing-function
delay!!transition-delay:$ms
scale!P!--tw-scale-x:$;--tw-scale-y:$;${transform}
scale-x!P!--tw-scale-x:$;${transform}
scale-y!P!--tw-scale-y:$;${transform}
rotate!!--tw-rotate:$deg;${transform}
translate-x!4!--tw-translate-x:$;${transform}
translate-y!4!--tw-translate-y:$;${transform}
skew-x!!--tw-skew-x:$deg;${transform}
skew-y!!--tw-skew-y:$deg;${transform}
origin!_!transform-origin
accent!C!accent-color
appearance
cursor
caret!C!caret-color
pointer-events
scroll!!scroll-behavior
scroll-m!4!scroll-margin
scroll-mx!4!scroll-margin-left:$;scroll-margin-right:$
scroll-my!4!scroll-margin-top:$;scroll-margin-bottom:$
scroll-ms!4!scroll-margin-inline-start
scroll-me!4!scroll-margin-inline-end
scroll-mt!4!scroll-margin-top
scroll-mr!4!scroll-margin-right
scroll-mb!4!scroll-margin-bottom
scroll-ml!4!scroll-margin-left
scroll-p!4!scroll-padding
scroll-px!4!scroll-padding-left:$;scroll-padding-right:$
scroll-py!4!scroll-padding-top:$;scroll-padding-bottom:$
scroll-ps!4!scroll-padding-inline-start
scroll-pe!4!scroll-padding-inline-end
scroll-pt!4!scroll-padding-top
scroll-pr!4!scroll-padding-right
scroll-pb!4!scroll-padding-bottom
scroll-pl!4!scroll-padding-left

touch!!touch-action
select!!user-select
will-change
fill!C
stroke!!stroke-width
`)


// TODO: SOLVE THESE

// https://tailwindcss.com/docs/object-position
// https://tailwindcss.com/docs/grid-template-columns
// https://tailwindcss.com/docs/grid-column
// https://tailwindcss.com/docs/space
// https://tailwindcss.com/docs/max-width
// https://tailwindcss.com/docs/animation
// https://tailwindcss.com/docs/transition-property
// https://tailwindcss.com/docs/border-spacing


// NEGATIVE VALUES THAT START WITH MINUS -

// SOLVE CONFLICT WITH DECORATION AND BG
//https://tailwindcss.com/docs/text-decoration-thickness
// https://tailwindcss.com/docs/background-position
// https://tailwindcss.com/docs/gradient-color-stops
// stroke


/** List of colors and their variants, taken from:
 *  https://tailwindcss.com/docs/customizing-colors#using-the-default-colors */
export const colorsTemplate = `Slate
#f8fafc
#f1f5f9
#e2e8f0
#cbd5e1
#94a3b8
#64748b
#475569
#334155
#1e293b
#0f172a
#020617
Gray
#f9fafb
#f3f4f6
#e5e7eb
#d1d5db
#9ca3af
#6b7280
#4b5563
#374151
#1f2937
#111827
#030712
Zinc
#fafafa
#f4f4f5
#e4e4e7
#d4d4d8
#a1a1aa
#71717a
#52525b
#3f3f46
#27272a
#18181b
#09090b
Neutral
#fafafa
#f5f5f5
#e5e5e5
#d4d4d4
#a3a3a3
#737373
#525252
#404040
#262626
#171717
#0a0a0a
Stone
#fafaf9
#f5f5f4
#e7e5e4
#d6d3d1
#a8a29e
#78716c
#57534e
#44403c
#292524
#1c1917
#0c0a09
Red
#fef2f2
#fee2e2
#fecaca
#fca5a5
#f87171
#ef4444
#dc2626
#b91c1c
#991b1b
#7f1d1d
#450a0a
Orange
#fff7ed
#ffedd5
#fed7aa
#fdba74
#fb923c
#f97316
#ea580c
#c2410c
#9a3412
#7c2d12
#431407
Amber
#fffbeb
#fef3c7
#fde68a
#fcd34d
#fbbf24
#f59e0b
#d97706
#b45309
#92400e
#78350f
#451a03
Yellow
#fefce8
#fef9c3
#fef08a
#fde047
#facc15
#eab308
#ca8a04
#a16207
#854d0e
#713f12
#422006
Lime
#f7fee7
#ecfccb
#d9f99d
#bef264
#a3e635
#84cc16
#65a30d
#4d7c0f
#3f6212
#365314
#1a2e05
Green
#f0fdf4
#dcfce7
#bbf7d0
#86efac
#4ade80
#22c55e
#16a34a
#15803d
#166534
#14532d
#052e16
Emerald
#ecfdf5
#d1fae5
#a7f3d0
#6ee7b7
#34d399
#10b981
#059669
#047857
#065f46
#064e3b
#022c22
Teal
#f0fdfa
#ccfbf1
#99f6e4
#5eead4
#2dd4bf
#14b8a6
#0d9488
#0f766e
#115e59
#134e4a
#042f2e
Cyan
#ecfeff
#cffafe
#a5f3fc
#67e8f9
#22d3ee
#06b6d4
#0891b2
#0e7490
#155e75
#164e63
#083344
Sky
#f0f9ff
#e0f2fe
#bae6fd
#7dd3fc
#38bdf8
#0ea5e9
#0284c7
#0369a1
#075985
#0c4a6e
#082f49
Blue
#eff6ff
#dbeafe
#bfdbfe
#93c5fd
#60a5fa
#3b82f6
#2563eb
#1d4ed8
#1e40af
#1e3a8a
#172554
Indigo
#eef2ff
#e0e7ff
#c7d2fe
#a5b4fc
#818cf8
#6366f1
#4f46e5
#4338ca
#3730a3
#312e81
#1e1b4b
Violet
#f5f3ff
#ede9fe
#ddd6fe
#c4b5fd
#a78bfa
#8b5cf6
#7c3aed
#6d28d9
#5b21b6
#4c1d95
#2e1065
Purple
#faf5ff
#f3e8ff
#e9d5ff
#d8b4fe
#c084fc
#a855f7
#9333ea
#7e22ce
#6b21a8
#581c87
#3b0764
Fuchsia
#fdf4ff
#fae8ff
#f5d0fe
#f0abfc
#e879f9
#d946ef
#c026d3
#a21caf
#86198f
#701a75
#4a044e
Pink
#fdf2f8
#fce7f3
#fbcfe8
#f9a8d4
#f472b6
#ec4899
#db2777
#be185d
#9d174d
#831843
#500724
Rose
#fff1f2
#ffe4e6
#fecdd3
#fda4af
#fb7185
#f43f5e
#e11d48
#be123c
#9f1239
#881337
#4c0519`
