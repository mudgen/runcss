import RunCSS from "./index.js"

const runcss = RunCSS()
const {processClasses, startWatching} = runcss

for(const element of document.querySelectorAll('*[class]')) {
  processClasses(element.getAttribute("class"))
}


if(document.currentScript && document.currentScript.hasAttribute('watch')){
  startWatching()
}

const hiddenNodes = document.querySelectorAll('*[runcss-cloak]')
for(let node of hiddenNodes){
  node.removeAttribute('runcss-cloak')
}

if(window){
  // @ts-ignore
  window.runcss = runcss
}
