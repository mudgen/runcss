# RunCSS

RunCSS is the runtime equivalent of TailwindCSS, featuring the same CSS utility class names, but with no build step required. It achieves this by generating CSS on the fly with JavaScript.


RunCSS comes with batteries included. By default all [additional variants](https://tailwindcss.com/docs/configuring-variants) such as `hover`, `active`, `visited`, `group-hover`, `sm`, `lg` etc work with all class names. All packaged in a single 25kb (8kb after compression) JS file!


## Usage

Add to `<head>`:
```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/runcss/dist/runcss.min.css">
  <script src="https://cdn.jsdelivr.net/npm/runcss/dist/runcss.min.js" defer watch></script>
```
Done! RunCSS will parse the documents and generate the corresponding classes, with no further configuration required. RunCSS will also watch for new element insertions and parse them. Remove the `watch` attribute to disable this feature.

Check the `examples/` directory for some examples.

### Avoid element popup

You may add the `runcss-cloak` attribute to any element to hide it until RunCSS processes it.

For example:
```html
<body runcss-cloak>
  <img class="w-3 h-3" src="mylargeimage.png">
</body>
```

### Custom configuration
**TODO - WORK IN PROGRESS**
Before loading `runcss.js`, add the following script:
```html
<script>
window.runcssConfig = {
  colors: {
    'main': '#fff',
    'secondary': {
      100:  '#09132aa'
    },
  },
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
}
</script>
<script></script>
```

You may use it to either extend or override default values. Currently, this is not yet implemented.  `colors`, `screens` and `fontFamily`.

## Advanced usage as module
```html
<script type="module">
  import RunCSS, {extendRunCSS} from "https://cdn.jsdelivr.net/npm/runcss/dist/runcss.min.mjs"

  // Add things to the RunCSS templates
  extendRunCSS( ({defaultsTemplate, ruleTemplate, shortcuts, states}) => {
    states.modifiers['myclass'] = '.myclass'
    return {defaultsTemplate, ruleTemplate, shortcuts, states}
  })

  // Setup theme
  const { processClasses, startWatching, stopWatching, exportCSS } = RunCSS({
    colors: {
      'main': '#fff',
    },
    //.... same options as above
  })

  // Add classes
  processClasses('sm:text-red text-blue') // don't worry about duplicates

  // Iterate through document
  for(const element of document.querySelectorAll('*[class]')) {
    processClasses(element.getAttribute("class"))
  }

  // Start watching for changes
  startWatching(document.getElementById('hello')) // if not specified, fallback to document.body

  // Stop watching
  stopWatching()

  // Log generated CSS file
  console.log(exportCSS())

  // Remove runcss-cloak attribute
  const hiddenNodes = document.querySelectorAll('*[runcss-cloak]')
  for(let node of hiddenNodes){
    node.removeAttribute('runcss-cloak')
  }
</script>
```

## Caveats and differences with TailwindCSS 
Currently, the project is production-ready, and should cover the totality of TailwindCSS classes.
However, since we underwent a major rewrite recently, there may be some less common feature missing or misbehaving compared to Tailwind.

If you find something missing, feel free to open an issue.

By design, this parser is way less strict than Tailwind's one. This allows smaller builds and faster load times, but also means that wrong values may be turned into CSS rules regardless. This is intentional, because the browser will discard those rules anyway.

### VSCode Intellisense
To enable Tailwind's autocompletion, install the [official Tailwind extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), and create an empty file called `tailwind.config.js` in the same folder of your html files.


## Build / contribute
Clone this repository and use [npm](https://nodejs.org/en/download/package-manager) to install dependencies:
```bash
git clone https://github.com/lucafabbian/runcss.git
cd runcss
npm i
```

Then, you may use:
```bash
npm run build    # Build for production
npm run dev      # Build, watch for changes + start server with live reload! 
```


## Authors and License

Current author: Luca Fabbian <luca.fabbian.1999@gmail.com>

Based on RunCSS of mudgen, [follow him on twitter](https://twitter.com/mudgen).

Distributed under MIT License.






















