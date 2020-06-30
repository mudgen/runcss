# RunCSS

[RunCSS, A Runtime Version of TailwindCSS and Beyond](https://dev.to/mudgen/runcss-a-runtime-version-of-tailwindcss-5dic)

RunCSS is a runtime version of TailwindCSS. It has no build. RunCSS provides all the same CSS utility class names that we know and love from TailwindCSS. 

RunCSS is batteries included. It has feature parity with TailwindCSS and beyond. RunCSS defaults are the same as TailwindCSS defaults plus TailwindCSS's [additional variants](https://tailwindcss.com/docs/configuring-variants), plus more. By default all variants such as `hover`, `active`, `visited`, `group-hover` etc. and responsive variants such as `sm`, `lg` etc work with all class names.

RunCSS is possible because it is a Javascript file that generates CSS at runtime.

> The primary difference between TailwindCSS and RunCSS is that TailwindCSS generates CSS at build time and RunCSS generates CSS at runtime.

RunCSS has no build. Just use it. Off to the races!

The tradeoff to using RunCSS is a small amount of Javascript execution to generate CSS at runtime. The necessary CSS for each class name is generated one time as it is encountered. CSS is only generated for class names that are actually used. 

### How to use RunCSS

__Step 1.__ Add a CSS reset or base CSS file, such as TailwindCSS's [preflight](https://unpkg.com/tailwindcss@%5E1/dist/base.css), to your web application:
```html
<link href="https://unpkg.com/runcss@^0/dist/preflight.css" 
rel="stylesheet">
```
__Step 2.__ Import the RunCSS Javascript file into your application:
```javascript
import processClasses from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'
```
__Step 3.__ Call the `processClasses` function on CSS class names. It is possible to integrate RunCSS into existing Javascript libraries so that `processClass` is called automatically when CSS class names are used. RunCSS ignores class names it has already generated CSS for so `processClasses` can be called repeatedly on the same class names.
### Example
Here is an example that integrates RunCSS with [Webscript](https://mudgen.github.io/webscript/docs/) and creates the same card example given on TailwindCSS's homepage:

```javascript
// Importing Webscript
import builders from 'https://unpkg.com/webscript@^0/dist/webscript.modern.js'
import createDOMElement from 'https://unpkg.com/webscript@^0/dist/createDOMElement.modern.js'
// Importing RunCSS
import processClasses from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'

// Integrating RunCSS with Webscript
function createElement (type, props, ...children) {
  if (props.class) {
    processClasses(props.class)
  }
  return createDOMElement(type, props, ...children)
}

// Create the builders used to build DOM elements
const { div, img, h2 } = builders(createElement)

// Card display
const card =
  div.class`md:flex bg-white rounded-lg p-6`(
    img.class`h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6`.src`./avatar.jpg`,
    div.class`text-center md:text-left`(
      h2.class`text-lg``Erin Lindford`,
      div.class`text-purple-500``Customer Support`,
      div.class`text-gray-600``erinlindford@example.com`,
      div.class`text-gray-600``(555) 765-4321`))
```

Here is the result of the above code:
![Result of above code](https://dev-to-uploads.s3.amazonaws.com/i/zfjfxvjwg96y8njyo5wl.png)

## Using RunCSS Without a Javascript Library

Here is a simple example of how to use RunCSS without integration with an existing Javascript library or framework:
```html
<html>
<head><head>
<body style="display: none;">
  <!-- HTML that uses RunCSS here. -->
  <div class="md:flex bg-white rounded-lg p-6">
    <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
    <div class="text-center md:text-left">
      <h2 class="text-lg">Erin Lindford</h2>
      <div class="text-purple-500">Customer Support</div>
      <div class="text-gray-600">erinlindford@example.com</div>
      <div class="text-gray-600">(555) 765-4321</div>
    </div>
  </div>    
  <!-- This code generates all the CSS needed for the webpage. -->
  <script type="module">
    import processClasses from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'
    // Get all elements that have a class attribute.
    for(const element of document.querySelectorAll('*[class]')) {    
      processClasses(element.className)
    }  
    // Display elements
    document.body.style.display = "block"
  </script>
</body>
```


## RunCSS File Size

[runcss.modern.js](https://github.com/mudgen/runcss/blob/master/dist/runcss.modern.js) is 8kb compressed and 20kb raw. It has no dependencies.

## Optional Node.js Package

RunCSS can optionally be installed like this:
```shell
npm install runcss
```

## Going Beyond TailwindCSS

Because RunCSS doesn't have build-time constraints it can easily go beyond TailwindCSS and it does. RunCSS provides all the same utility CSS class names that TailwindCSS does plus many more.

For example, by default, TailwindCSS's margin classes have holes in them. There is `m-6`, but no `m-7`. There are no margin classes between `m-24` and `m-32`. The margin classes stop at `m-64`. With TailwindCSS it is possible to plug these holes by manually adding configuration to the TailwindCSS build configuration file. RunCSS doesn't require configuration and has no such holes and the class names don't end. RunCSS includes `m-65` and `m-66` and so on forever or until the browser can't take it anymore.

But there is more. RunCSS accepts any valid CSS length unit in many class names. For example, you could use `m-5%` or `m-1.25rem` or `m-25px` or whatever valid CSS length unit you want to use.

One of the benefits of using utility classes is "designing with constraints". It is easier to build consistent visual designs if you pick your styles from a limited set. With RunCSS this can be done by convention and enforced, if desired, by a linter. In addition with RunCSS you can go outside your design system in special cases where you need maximum control.

Many of the following sections show RunCSS's extended capabilities.

## Configuration
RunCSS provides the `configure` function that can be used to configure parts of RunCSS. The following sections in this article that can use `configure` show how to use it.

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
import processClasses, { configure } from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'

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
import processClasses, { component } from 'https://unpkg.com/runcss@^0/dist/runcss.modern.js'

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

## No Build Movement

RunCSS is another tool that's part of the No Build Movement.  

The No Build Movement is a change in web development that favors building web applications without build tools except for minification of resources.

[Follow me on twitter.](https://twitter.com/mudgen)























