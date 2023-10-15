

## Configuration
RunCSS provides the `configure` function that can be used to configure parts of RunCSS. The following sections in this article that can use `configure` show how to use it.

## Exporting
If after using RunCSS to build a page you want to decrease scripts being run or provide support for non-JavaScript-enabled users, but you don't need the complexity of a full Tailwind setup, the CSS generated can be exported using the `exportCSS` function. This returns a minified string of all the class styles so-far processed.

E.g.
```javascript
// import the exportCSS function
import processClasses, { exportCSS } from 'https://cdn.statically.io/gh/mudgen/runcss/master/src/runcss.min.js'

// process some classes
processClasses('bg-gray-100 p-12 hover:text-red');

// log the generated styles
console.log(exportCSS());
```

This will give you:
```css
@media { .bg-gray-100 { background-color: rgba(247,250,252,var(--background-color-opacity,1)); } .p-12 { padding: 3rem; } .hover\:text-red:hover { color: red; } }@media (min-width: 768px) { .md\:flex { display: flex; } }
```


## Colors
RunCSS provides the same [default color palette](https://tailwindcss.com/docs/customizing-colors#default-color-palette) as TailwindCSS.

These colors can be used in all the same class names as can be used in TailwindCSS. They can be used in text, borders, placeholders, divides, and backgrounds.

### Color Example:
```javascript
// Using Webscript with RunCSS
div.class`bg-blue-500 border-3 border-yellow-700`(
  p.class`text-white``Example Colors`
)
```
Did you know that CSS specifications and browsers support [150 color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)? RunCSS supports them all too. From `black` to [rebeccapurple](https://codepen.io/trezy/post/honoring-a-great-man).

RunCSS supports all valid CSS color formats. For example hex, rgb/rgba and hsl/hsla formats

Here is an example that uses various color formats:
```javascript
div.class`bg-rebeccapurple border-10 border-rgba(200,10,10,0.1)`(
  p.class`text-hsl(120,100%,60%) xl:text-#ecc94b``Example Colors`
)
```
> *Note: Make sure there are no spaces in your class names because class names are separated by spaces.*

It is possible to make your own color palette by configuring colors with the `configure` function. You can create your own color keywords.

Here is an example that sets the 'blue' keyword to the color red and sets some banana colors:
```javascript
// import the configure function
import processClasses, { configure } from 'https://cdn.statically.io/gh/mudgen/runcss/master/src/runcss.min.js'

// create our own color palette
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
```
> Note that the CSS for these color classes is only generated if they are used.

> Note that only hex values can be used in the `configure` function for colors.

## Responsive Design

Responsive design with RunCSS works the same way as it does with TailwindCSS. [Checkout Tailwind's documentation about it.](https://tailwindcss.com/docs/responsive-design/)

By default RunCSS provides the same responsive breakpoints as TailwindCSS:
```javascript
{ sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }
```

Just like TailwindCSS all RunCSS classes can use the breakpoint prefixes without any configuration. __However, in addition, any CSS class not generated and coming from RunCSS can use them too!__

For example, if you create your own CSS file with some custom CSS you don't have to create media queries for different breakpoints.  Just use the responsive prefixes from RunCSS.

### Example

Here is a custom CSS file. Notice there are no media queries for responsive versions of the class:
```css
.myclass {
  margin: 0 10px;
  background-color: red;
  border-radius: 0.5rem;
}
```
Go ahead and make it responsive by using RunCSS's responsive prefixes in your DOM building code:
```javascript
div.class`lg:myclass`(
  p`Example text`
)
```
RunCSS only generates CSS for responsive breakpoint classes that are used.

### Configure Your Own Responsive Breakpoints

You can set your own responsive breakpoints and prefixes by calling RunCSS's `configure` function. Here is an example:

```javascript
configure({
  screens: {
    watch: '300px',
    phone: '340px',
    tablet: '640px'
   }
})
```
> Note: Make sure you configure screens before you start processing CSS class names with `processClasses`.

## Pseudo-Class Variants

Pseudo-class variants like `hover`, `focus` etc. work with RunCSS class names the same way they do with TailwindCSS class names.

TailwindCSS [provides a number of pseduo-class variants](https://tailwindcss.com/docs/pseudo-class-variants) that are not enabled by default due to file-size constraints.

RunCSS, not having build file-size constraints, has enabled, by default, all of TailwindCSS's pseudo-class variants.

RunCSS only generates the needed CSS for the class names and variants that are actually used.

By default, RunCSS also provides and has enabled all [psuedo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#Index_of_standard_pseudo-classes) and [psuedo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#Index_of_standard_pseudo-elements) variants that are supported by web browsers.

Just like RunCSS responsive prefixes can be used by CSS class names from third-party CSS style sheets, RunCSS's psuedo-class and psuedo-element prefixes can be used by CSS class names from third-party CSS style sheets.

### Example

Here is a custom CSS file. Notice there are no psuedo-class versions of the class name:
```css
.myclass {
  margin: 0 10px;
  background-color: red;
  border-radius: 0.5rem;
}
```
Go ahead and apply a RunCSS pseudo-class prefix to it:
```javascript
div.class`hover:myclass`(
  p`Example text`
)
```
No configuration for pseudo-classes and pseudo-elements is needed because they are all available.

## Extracting Components

RunCSS provides the `component` function to create CSS components. This is a way to create your own CSS utilities or components using RunCSS class names and/or CSS properties.

The `component(name, classNames, properties)` function takes three strings as arguments. The third argument is optional.

CSS will be generated using the last two arguments.

### Component Example
```javascript
import processClasses, { component } from 'https://cdn.statically.io/gh/mudgen/runcss/master/src/runcss.min.js'

component(
  'btn', // new class name
  'p-2 bg-blue text-white hover:text-green-500 text-base lg:text-lg', // extracting CSS from class names
  'box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5); outline: none;' // using CSS properties
)

// Use the CSS component
const button = button.class`btn text-yellow``Click Me`
```
RunCSS utility class names will override CSS components. This enables you to customize or specialize CSS components when they are used.

You can think of CSS components as default styles that can be overridden with utility classes.

In the example above the `text-yellow` class overrides the `text-white` class that is defined in the CSS component.

## Increasing Specificity with Important

You can increase specificity of your RunCSS utilities by calling `configure` with `{important: true}`. That will add `!important` to RunCSS styles.

If you want more specificity but less than `!important` then give the important option a selector. Like this: `{important: '#app'}`. And make sure that your RunCSS classes are added under an element with the 'app' id or whatever you specified.

## Prefix

It is possible to add a prefix to all RunCSS utilities by calling `configure` with a prefix option.

Here is an example:
```Javascript
configure({ prefix: 'run-' })

div.class`run-text-blue hover:run-text-yellow`(
  p`My test`
)
```

## Separator

Instead of using `:` to separate variants such as `hover`, `sm`, `focus` and the rest you can use a different separator. Call `configure` with the `separator` option. Here is an example:

```Javascript
configure({separator: '$'})

div.class`run-text-blue hover$run-text-yellow`(
  p`My test`
)
```