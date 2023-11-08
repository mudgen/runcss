import { dictionarify } from "./utils"

export const pseudoClasses = dictionarify(`
hover
focus
focus-within
focus-visible
active
visited
target
first!first-child
last!last-child
only!only-child
odd!nth-child(odd)
even!nth-child(even)
first-of-type
last-of-type
only-of-type
empty
disabled
enabled
checked
indeterminate
default
required
valid
invalid
in-range
out-of-range
placeholder-shown
autofill
read-only
`)

export const pseudoElements = dictionarify(`
before
after
placeholder
file!file-selector-button
marker
selection
first-line
first-letter
backdrop
`)

export const mediaQueries = dictionarify(`
sm!(min-width: 640px)
md!(min-width: 768px)
lg!(min-width: 1024px)
xl!(min-width: 1280px)
2xl!(min-width: 1536px)
max-sm!not all and (min-width: 640px)
max-md!not all and (min-width: 768px)
max-lg!not all and (min-width: 1024px)
max-xl!not all and (min-width: 1280px)
max-2xl!not all and (min-width: 1536px)
dark!(prefers-color-scheme: dark)
portrait!(orientation: portrait)
landscape!(orientation: landscape)
motion-safe!(prefers-reduced-motion: no-preference)
motion-reduce!(prefers-reduced-motion: reduce)
contrast-more!(prefers-contrast: more)
contrast-less!(prefers-contrast: less)
print!print
`)

export const modifiers = dictionarify(`
aria-checked![aria-checked="true"]
aria-disabled![aria-disabled="true"]
aria-expanded![aria-expanded="true"]
aria-hidden![aria-hidden="true"]
aria-pressed![aria-pressed="true"]
aria-readonly![aria-readonly="true"]
aria-required![aria-required="true"]
aria-selected![aria-selected="true"]
open![open]
`)

export const parentModifiers = dictionarify(`
rtl![dir="rtl"]
ltr![dir="ltr"]
`)


export const states = {
  pseudoClasses,
  pseudoElements,
  mediaQueries,
  modifiers,
  parentModifiers,
}

