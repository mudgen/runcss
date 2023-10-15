import RunCSS from "./index.js"

const {processClasses, startWatching} = RunCSS()

for(const element of document.querySelectorAll('*[class]')) {
  processClasses(element.getAttribute("class"))
}


if(document.currentScript.hasAttribute('watch')){
  startWatching()
}

const hiddenNodes = document.querySelectorAll('*[runcss-cloak]')
for(let node of hiddenNodes){
  node.removeAttribute('runcss-cloak')
}