import { processClasses, startWatching } from "./index.js"


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