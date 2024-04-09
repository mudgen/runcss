import * as esbuild from 'esbuild'


/** This hook would run ".preprocess.ts" files at build time and
 * include the result instead of the source files. */
const preprocessPlugin = {
  name: 'preprocess',
  setup(build) {
    build.onLoad({ filter: /\.preprocess(\.js|\.ts|)$/ }, async (args) =>{
      const module = await import(args.path);
      let contents = ''
      for(let [key, value] of Object.entries(module)){
        contents+=`export ${key === 'default' ? 'default' : 'const ' + key + ' ='} ${JSON.stringify(value)}\n`
      }
      return { contents, loader: "js" };
    })
  },
}

// css
esbuild.build({
  entryPoints: ['./src/index.css'],
  bundle: true,
  outfile: 'dist/runcss.css',
})

esbuild.build({
  entryPoints: ['./src/index.css'],
  bundle: true,
  minify: true,
  outfile: 'dist/runcss.min.css',
})


// iife script
esbuild.build({
  entryPoints: ['./src/iife.js'],
  bundle: true,
  outfile: 'dist/runcss.js',
  plugins: [preprocessPlugin]
})

esbuild.build({
  entryPoints: ['./src/iife.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/runcss.min.js',
  plugins: [preprocessPlugin]
})


// module
esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/runcss.mjs',
  plugins: [preprocessPlugin]
})

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  outfile: 'dist/runcss.min.mjs',
  plugins: [preprocessPlugin]
})


