import { splitOnFirst } from "./utils.js"
import { colorsTemplate } from "./templates.js"

const resolvers = {}

/** Register a resolver based on custom values */
const registerCustomValues = (resolver : string, template : string) => {
  const values : Record<string, string> = {}
  for(let line of template.trim().split('\n')){
    if(!line.includes('!')) continue
    const [key, value] = splitOnFirst('!', line)
    values[key.trim()] = value.trim()
  }
  resolvers[resolver] = (value : string) => {
    if(value in values){
      return values[value]
    }
    return null
  }
}


//numbers
const numResolverFactory = (scale : number) => (value : string) => {
  if(value === 'full') return '100%'
  if(value === 'px') return '1px'
  if(value.includes('/')){
    try{
      const split = value.split('/');
      const result = parseInt(split[0], 10) / parseInt(split[1], 10);
      return `${result*100}%`
    }catch(e){}

  }
  // @ts-ignore
  if(!isNaN(value)) return `${Number(value) * scale}px`

  return null
}

resolvers['1'] = numResolverFactory(1)
resolvers['4'] = numResolverFactory(4)


//numbers
resolvers['P'] = (value : string) => {
  // @ts-ignore
  if(!isNaN(value)) return `${Number(value) /100}`
  return null
}

//multivalues
resolvers['_'] = (value : string) => {
  // @ts-ignore
  return value.replaceAll('_', ' ')
}


// Colors

const colorVariants = `50!100!200!300!400!500!600!700!800!900!950`.split('!')
const colors = {}
const colorsLines = colorsTemplate.split('\n')
for(let i = 0; i < colorsLines.length; i++) {
  const colorName = colorsLines[i].trim().toLowerCase()

  for(let variant of colorVariants) {
    i+= 1
    colors[colorName + '-' + variant] = colorsLines[i].trim()
  }
}

colors['transparent'] = 'transparent';

resolvers['C'] = (value : string) => {
  if(value in colors){
    return colors[value]
  }
  return null
};



// ratios
registerCustomValues('r', `
auto!auto
square!1/1
video!16/9
`)

//container's layout
registerCustomValues('l',`
sm!640px
md!768px
lg!1024px
xl!1280px
2xl!1536px
`)


// columns
registerCustomValues('c',`
3xs !16rem
2xs !18rem
xs  !20rem
sm  !24rem
md  !28rem
lg  !32rem
xl  !36rem
2xl !42rem
3xl !48rem
4xl !56rem
5xl !64rem
6xl !72rem
7xl !80rem
`)

// border radius
registerCustomValues('b',`
none!0px
sm!0.125rem
md!0.375rem
lg!0.5rem
xl!0.75rem
2xl!1rem
3xl!1.5rem
full!9999px
`)


// orders
registerCustomValues('o',`
first!-9999
last!9999
none!0
`)


// spacings
registerCustomValues('s',`
start!flex-start
end!flex-end
between!space-between
around!space-around
evenly!space-evenly
`)

// dimensions
registerCustomValues('d',`
min!min-content
max!max-content
fit!fit-content
`)

// weightnesses
registerCustomValues('w',`
thin!100;
extralight!200;
light!300;
normal!400;
medium!500;
semibold!600;
bold!700;
extrabold!800;
black!900;
`)

// trackings
registerCustomValues('t',`
tighter!-0.05em;
tight!-0.025em;
normal!0em;
wide!0.025em;
wider!0.05em;
widest!0.1em;
`)



export {resolvers}