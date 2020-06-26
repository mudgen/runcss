# RunCSS

RunCSS is a runtime version of TailwindCSS. It has no build. RunCSS provides all the same CSS utility class names that we know and love from TailwindCSS.

RunCSS is batteries included. It has feature parity with TailwindCSS and beyond. RunCSS defaults are the same as TailwindCSS defaults plus TailwindCSS's [additional variants](https://tailwindcss.com/docs/configuring-variants). By default all variants such as hover, active, visited, group-hover etc. and responsive variants such as sm, lg etc work with all class names.

RunCSS is possible because it is a Javascript file that generates CSS at runtime.

The tradeoff to using RunCSS is a small amount of Javascript execution to generate CSS at runtime. The necessary CSS is generated once for each class name when it is first encountered. CSS is only generated for class names that are actually used.

# Installation

Add a CSS reset or base CSS file, such as TailwindCSS's preflight, to your web application:

```
<link href="https://unpkg.com/runcss@^0/dist/preflight.css" 
rel="stylesheet">
```

Import the RunCSS Javascript file into your application:


