!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).runcss={})}(this,function(e){function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function r(e,r){var o;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(o=function(e,r){if(e){if("string"==typeof e)return t(e,void 0);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,void 0):void 0}}(e))||r&&e&&"number"==typeof e.length){o&&(e=o);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(o=e[Symbol.iterator]()).next.bind(o)}var o,i,n,a=function(e){return!isNaN(e)},l=function(e){return!isNaN(parseInt(e))},s=function(e){return e.split("!")},c=function(e,t){return s(e).indexOf(t)},f=function(e,t){return s(e).includes(t)},d=function(e){return a(e)?K+.25*Number(e)+"rem":K+e},p=function(e){return Object.assign(Object.create(null),e)},u=new Map,m=new Map,b=p({separator:":"}),g=function(e){return"[object Object]"===Object.prototype.toString.call(e)},x=function(e){if("string"!=typeof e)throw Error("Hex value is not a hex string.");if(e.startsWith("#")||(e="#"+e),e=4===e.length?e.slice(1).split("").map(function(e){return e+e}).join(""):e.slice(1),!/^[0-9a-f]{6}$/i.test(e))throw Error("Incorrect hex color format.");return e},w=function(e){if(g(e))throw Error("Config value must be an object.")},h=new Map([["black","000000"],["white","ffffff"]]);i=0===document.styleSheets.length?document.head.appendChild(document.createElement("style")).sheet:document.styleSheets[0];for(var v,y,k,j=new Map,z=function(e,t){return j.set(e,i.cssRules[i.insertRule("@media(min-width:"+t+"){}",i.cssRules.length)])},S=r(s("sm|640px!md|768px!lg|1024px!xl|1280px"));!(v=S()).done;)z.apply(void 0,v.value.split("|"));for(var R,N=p({p:"padding",m:"margin",h:"height",z:"z-index",w:"width"}),O=p({}),I=r(s('box-border|-webkit-box-sizing:border-box;box-sizing:border-box!box-content|-webkit-box-sizing:content-box;box-sizing:content-box!hidden|display:none!object-scale-down|object-fit:scale-down;-o-object-fit:scale-down!scrolling-touch|-webkit-overflow-scrolling:touch!scrolling-auto|-webkit-overflow-scrolling:auto!visible|visibility:visible!invisible|visibility:hidden!order-first|order:-9999!order-last|order:9999!order-none|order:0!grid-cols-none|grid-template-columns:none!col-auto|grid-column:auto!col-start-auto|-ms-grid-column:auto;grid-column-start:auto!col-end-auto|-ms-grid-column-span:auto;grid-column-end:auto!grid-rows-none|-ms-grid-rows:none;grid-template-rows:none!row-auto|grid-row:auto!row-start-auto|-ms-grid-row:auto;grid-row-start:auto!row-end-auto|-ms-grid-row-span:auto;grid-row-end:auto!gap-px|gap:1px!row-gap-px|row-gap:1px!grid-flow-row|grid-auto-flow:row!grid-flow-col|grid-auto-flow:column!grid-flow-row-dense|grid-auto-flow:row dense!grid-flow-col-dense|grid-auto-flow:column dense!min-w-full|min-width:100%!max-w-full|max-width:100%!max-w-screen-sm|max-width:640px!max-w-screen-md|max-width:768px!max-w-screen-lg|max-width:1024px!max-w-screen-xl|max-width:1280px!max-w-none|max-width:none!min-h-full|min-height:100%!min-h-screen|min-height:100vh!max-h-full|max-height:100%!max-h-screen|max-height:100vh!text-2xl|font-size:1.5rem!text-3xl|font-size:1.875rem!text-4xl|font-size:2.25rem!underline|text-decoration:underline!line-through|text-decoration:line-through!no-underline|text-decoration:none!uppercase|text-transform:uppercase!lowercase|text-transform:lowercase!capitalize|text-transform:capitalize!normal-case|text-transform:none!whitespace-no-wrap|white-space:nowrap!break-normal|word-break:normal;overflow-wrap:normal!break-words|overflow-wrap:break-word!break-all|word-break:break-all!truncate|overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap!h-auto|height:auto!max-w-2xl|max-width:42rem!tracking-tighter|letter-spacing:-0.05em!tracking-tight|letter-spacing:-0.025em!tracking-normal|0!tracking-wide:letter-spacing:0.025em!tracking-wider|letter-spacing:0.05em!tracking-widest|letter-spacing: 0.1em!leading-none|line-height:1!leading-tight|line-height:1.25!leading-snug|line-height:1.375!leading-normal|line-height:1.5!leading-relaxed|line-height:1.625!leading-loose|line-height:2!list-none|list-style-type:none!list-disc|list-style-type:disc!list-decimal|list-style-type:decimal!list-inside|list-style-position:inside!list-outside|list-style-position:outside!border|border-width:1px!border-collapse|border-collapse:collapse!border-separate|border-collapse:separate!table-auto|table-layout:auto!table-fixed|table-layout:fixed!appearance-none|-webkit-appearance:none;-moz-appearance:none;appearance:none!outline-none|outline:0!resize-none|resize:none!resize|resize:both!resize-y|resize:vertical!resize-x|resize:horizontal!fill-current|fill:currentColor!stroke-current|stroke:currentColor!sr-only|position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0!not-sr-only|position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal!font-sans|font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji!font-serif|font-family:Georgia,Cambria,"Times New Roman",Times,serif!font-mono|font-family:Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace!sticky|position:-webkit-sticky;position:sticky'));!(R=I()).done;){var C=R.value.split("|");O[C[0]]=C[1]}for(var E,M=r(s("float-right!float-left!float-none!clear-left!clear-right!clear-both!clear-none"));!(E=M()).done;){var A=E.value;O[A]=A.replace("-",":")}for(var W,T=r(s("block!flow-root!inline-block!inline!flex!grid!inline-grid!table!table-caption!table-cell!table-column!table-column-group!table-footer-group!table-header-group!table-row-group!table-row"));!(W=T()).done;){var P=W.value,U=P;"flex"===P?U="-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex":"inline-flex"===P?U="-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex":"grid"===P?U="-ms-grid;display:grid":"inline-grid"===P&&(U="-ms-inline-grid;display:inline-grid"),O[P]="display:"+U}for(var $,L=r(s("static!fixed!absolute!relative"));!($=L()).done;){var F=$.value;O[F]="position:"+F}var H,B,G,Y,_,q,D,J,K,Q,V,X=s("f7fafc!edf2f7!e2e8f0!cbd5e0!a0aec0!718096!4a5568!2d3748!1a202c!fff5f5!fed7d7!feb2b2!fc8181!f56565!e53e3e!c53030!9b2c2c!742a2a!fffaf0!feebc8!fbd38d!f6ad55!ed8936!dd6b20!c05621!9c4221!7b341e!fffff0!fefcbf!faf089!f6e05e!ecc94b!d69e2e!b7791f!975a16!744210!f0fff4!c6f6d5!9ae6b4!68d391!48bb78!38a169!2f855a!276749!22543d!e6fffa!b2f5ea!81e6d9!4fd1c5!38b2ac!319795!2c7a7b!285e61!234e52!ebf8ff!bee3f8!90cdf4!63b3ed!4299e1!3182ce!2b6cb0!2c5282!2a4365!ebf4ff!c3dafe!a3bffa!7f9cf5!667eea!5a67d8!4c51bf!434190!3c366b!faf5ff!e9d8fd!d6bcfa!b794f4!9f7aea!805ad5!6b46c1!553c9a!44337a!fff5f7!fed7e2!fbb6ce!f687b3!ed64a6!d53f8c!b83280!97266d!702459"),Z=s("gray!red!orange!yellow!green!teal!blue!indigo!purple!pink"),ee=s("none!sm!nm!md!lg!full"),te=p({l:"left",r:"right",t:"top",b:"bottom"}),re=function(e){if("opacity"===G&&a(Y))Q="--"+e+"-opacity:"+("100"===Y?"1":Y/100);else{var t=h.get(D);if(!t)if(Y){var r=Z.indexOf(G);t=X[9*r+(Number(Y[0])-1)]}else if(G&&G.startsWith("#"))try{t=x(G)}catch(e){}if(t){var o=e+":rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+",var(--"+e+"-opacity,1))";Q=e+":#"+t+";"+o}else Q="current"===G?e+":currentColor":e+":"+D}},oe=function(){if(f("auto!initial!inherit",_)&&!l(_)){var e=K+_;Y?"y"===G?Q="top:"+e+";bottom:"+e:"x"===G&&(Q="left:"+e+";right:"+e):G&&(Q="inset"===B?"top:"+e+";right:"+e+";bottom:"+e+";left:"+e:B+":"+e)}},ie=function(){var e;a(G)?e=G+"ms":l(G)&&(e=G),e&&(Q="-webkit-transition-"+B+":"+e+";-o-transition-"+B+":"+e+";transition-"+B+":"+e)},ne=p({object:function(){f("contain!cover!fill!none!bottom",D)?Q="-o-object-fit:"+D+";object-fit:"+D:f("bottom!center!left!left-bottom!left-top!right!right-bottom!right-top!top",D)&&(D=D.replace("-"," "),Q="-o-object-position:"+D+";object-position:"+D)},overflow:function(){Q=q+":"+_},clearfix:function(){k="clearfix::after",Q='content:"";display:table;clear:both'},text:function(){var e=c("xs!sm!base!lg!xl",G);if(e>-1)Q="font-size:"+(.75+.125*e)+"rem";else if(G.endsWith("xl")){var t=G.split("x")[0];a(t)&&(Q="font-size:"+(Number(t)-2)+"rem")}else f("left!center!right!justify",D)?Q="text-align:"+D:re("color")},font:function(){var e=c("hairline!thin!light!normal!medium!semibold!bold!extrabold!black",G);e>-1?Q="font-weight:"+100*(1+e):a(G)&&(Q="font-weight:"+G)},whitespace:function(){f("normal!pre!pre-line!pre-wrap",D)&&(Q="white-space:"+D)},inset:oe,top:oe,right:oe,bottom:oe,left:oe,flex:function(){var e=function(e,t,r){return void 0===t&&(t=1),void 0===r&&(r="0%"),"-webkit-box-flex:"+e+";-ms-flex:"+e+" "+t+" "+r+";flex:"+e+" "+t+" "+r};if(f("row!row-reverse!col!col-reverse",D))D=D.replace("col","column"),Q="-webkit-box-orient:"+("row"===G?"horizontal":"vertical")+";-webkit-box-direction:"+("reverse"===Y?Y:"normal")+";-ms-flex-direction:"+D+";flex-direction:"+D;else if(f("no-wrap!flex-wrap!wrap-reverse",D))"no-wrap"===D&&(D="nowrap"),Q="-ms-flex-wrap:"+D+";flex-wrap:"+D;else if(f("grow!shrink",G)){var t=Y||1;Q="grow"===G?"-webkit-box-flex:"+t+";-ms-flex-positive:"+t+";flex-grow:"+t:"-ms-flex-negative:"+t+";flex-shrink:"+t}else Q="initial"===D?e(0,1,"auto"):"auto"===D?e(1,1,"auto"):"none"===D?"-webkit-box-flex:0;-ms-flex:none;flex:none":4===J?e(G,Y,H[3]):Y?e(G,Y):e(G)},order:function(){if(a(G)){var e=K+G;Q="-webkit-box-ordinal-group:"+(Number(e)+1)+";-ms-flex-order:"+e+";order:"+e}},grid:function(){a(Y)&&(Q=p({cols:"-ms-grid-columns:(minmax(0,1fr))["+Y+"];grid-template-columns: repeat("+Y+", minmax(0, 1fr))",span:"-ms-grid-column-span:"+Y+";grid-column: span "+Y+" / span "+Y,start:"-ms-grid-column:"+Y+";grid-column-start:"+Y,end:"-ms-grid-column-span:"+Y+";grid-column-end:"+Y,rows:"-ms-grid-rows:(minmax(0,1fr))["+Y+"];grid-template-rows: repeat("+Y+", minmax(0, 1fr))"})[G])},row:function(){l(Y)&&(Q=p({span:"-ms-grid-row-span:"+Y+";grid-row: span "+Y+" / span "+Y,start:"-ms-grid-row:"+Y+";grid-row-start:"+Y,end:"-ms-grid-row-span:"+Y+";grid-row-end:"+Y,gap:"row-gap:"+d(Y)})[G])},col:function(){if(a(Y)&&("span"===G?Q="-ms-grid-column-span:"+Y+";grid-column:span "+Y+" / span "+Y+";":"start"===G?Q="-ms-grid-column:"+Y+";grid-column-start:"+Y:"end"===G&&(Q="-ms-grid-column-span:"+Y+";grid-column-end:"+Y)),l(Y)&&"gap"===G){var e="px"===Y?"1px":d(Y);Q="-webkit-column-gap:"+e+";-moz-column-gap:"+e+"column-gap:"+e}},gap:function(){l(G)&&(Q="gap:"+d(G))},space:function(){if(V=[">:not(template)~:not(template)"],"px"===Y&&(Y="1px"),Y)if(l(Y)){var e=d(Y);"x"===G?Q="margin-right:calc("+e+"*var(--space-x-reverse,0));margin-left:calc("+e+"*(1 - var(--space-x-reverse,0)))":"y"===G&&(Q="margin-top:calc("+e+"*(1 - var(--space-y-reverse,0)));margin-bottom:calc("+e+"*var(--space-y-reverse,0))")}else"reverse"===Y&&(Q="--space-"+G+"-reverse:1")},divide:function(){var e;V=[">:not(template)~:not(template)"],J<4&&(a(Y)?e=Y+"px":l(Y)?e=Y:"reverse"===Y?Q="--divide-"+G+"-reverse:1":G&&(e="1px"),e&&("y"===G?Q="border-top-width:calc("+e+"*calc(1 - var(--divide-y-reverse,0)));border-bottom-width:calc("+e+"*var(--divide-y-reverse,0)))":"x"===G&&(Q="border-right-width:calc("+e+"*var(--divide-x-reverse,0));border-left-width:calc("+e+"*calc(1 - var(--divide-x-reverse,0)))"))),Q||re("border-color")},min:function(){l(Y)&&("w"!==G&&"h"!==G||(Q="min-"+("w"===G?"width":"height")+":"+Y))},max:function(){if("w"===G){var e=c("xs!sm!md!lg!xl",Y);e>-1?Q="max-width:"+(4*e+20)+"rem":l(Y)&&(Q=Y.endsWith("xl")?"max-width:"+(8*parseInt(Y)+24)+"rem":"max-width:"+Y)}else"h"===G&&l(Y)&&(Q="max-height:"+Y)},tracking:function(){l(G)&&(Q="letter-spacing:"+G)},leading:function(){a(G)?Q="line-height:"+.25*Number(G)+"rem":l(G)&&(Q="line-height:"+G)},placeholder:function(){V.push("::placeholder"),re("color")},align:function(){f("baseline!top!middle!bottom!text-top!text-bottom",D)&&(Q="vertical-align:"+D)},bg:function(){D=D.replace("-"," "),f("bottom!center!left!left bottom!left top!right!right bottom!right top!top",D)?Q="background-position:"+D:f("repeat!no-repeat!repeat-x!repeat-y",D)?Q="background-repeat:"+D:f("repeat-round!repeat-space",D)?Q="background-repeat:"+Y:f("auto!cover!contain",D)?Q="background-size:"+D:f("fixed!local!scroll",G)?Q="background-attachment:"+G:re("background-color")},rounded:function(){var e,t=ee.indexOf(_);if(l(_)?(e=_,t=9):5===t?e="9999px":t>-1?e=.125*t+"rem":(!G||te[G]||f("t!b",G[0])&&f("r!l",G[1]))&&(e="0.25rem"),e){var r=te[G[0]];Q=!G||!Y&&t>-1?"border-radius:"+e:f("t!b",G)?"border-"+r+"-left-radius:"+e+";border-"+r+"-right-radius:"+e:f("l!r",G)?"border-top-"+r+"-radius:"+e+";border-bottom-"+r+"-radius:"+e:"border-"+r+"-"+te[G[1]]+"-radius:"+e}},border:function(){var e=te[G];Y&&e?a(Y)?Q="border-"+e+"-width:"+Y+"px":l(Y)&&(Q="border-"+e+"-width:"+Y):f("solid!dashed!dotted!double!none",G)?Q="border-style:"+G:e?Q="border-"+e+"-width:1px":a(G)?Q="border-width:"+G+"px":l(G)?Q="border-width:"+G:re("border-color")},opacity:function(){a(G)&&(Q="opacity:"+100/G)},transition:function(){var e=function(e){return"-webkit-transition-property:"+e+";-o-transition-property:"+e+";transition-property:"+e},t=function(e){return"-webkit-transition-property:-webkit-"+e+";transition-property:-webkit-"+e+";-o-transition-property:"+e+";transition-property:"+e+";transition-property:"+e+",-webkit-"+e};G?"colors"===G?Q=e("background-color,border-color,color,fill,stroke"):"shadow"===G?Q=t("box-shadow"):"transform"===G?Q=t("transform"):G&&(Q=e(G)):Q=(Q="-webkit-transition-property:S-webkit-box-shadow,-webkit-transform;transition-property:S-webkit-box-shadow,-webkit-transform;-o-transition-property:Sbox-shadow,transform;transition-property:Sbox-shadow,transform;transition-property:Sbox-shadow,transform,-webkit-box-shadow,-webkit-transform").replace(/S/g,"background-color,border-color,color,fill,stroke,opacity,")},duration:ie,delay:ie,ease:function(){var e=function(e){return"-webkit-transition-timing-function:"+e+";-o-transition-timing-function:"+e+";transition-timing-function:"+e};"in"===D?Q=e("cubic-bezier(0.4,0,1,1)"):"out"===D?Q=e("cubic-bezier(0,0,0.2,1)"):"in-out"===D?Q=e("cubic-bezier(0.4,0,0.2,1)"):"linear"===D&&(Q=e("linear"))},scale:function(){if(a(_)){var e=_/100;Q=f("x!y",G)?"--transform-scale-"+G+":"+e:"--transform-scale-x:"+e+";--transform-scale-y:"+e}},rotate:function(){a(G)&&(Q="--transform-rotate:"+K+G+"deg")},translate:function(){if(f("x!y",G)){if("px"===Y)Y="1px";else if("full"===Y)Y="100%";else if(Y.includes("/")){var e=Y.split("/");2===e.length&&(Y=Number(e[0])/Number(e[1])+"%")}l(Y)&&(Q="--transform-translate-"+G+":"+d(Y))}},skew:function(){f("x!y",G)&&a(Y)&&(Q="--transform-skew-"+G+":"+(K+Y)+"deg")},transform:function(){var e="translatex(var(--transform-translate-x,0))translatey(var(--transform-translate-y,0))rotate(var(--transform-rotate,0))skewx(var(--transform-skew-x,0))skewy(var(--transform-skew-y,0))scalex(var(--transform-scale-x,1))scaley(var(--transform-scale-y,1))";Q="-webkit-transform:"+e+";-ms-transform:"+e+";transform:"+e},origin:function(){f("center!top!top-right!right!bottom-right!bottom!bottom-left!left!top-left",D)&&(D=D.replace("-"," "),Q="-webkit-transform-origin:"+D+";-ms-transform-origin:"+D+";transform-origin:"+D)},cursor:function(){f("auto!default!pointer!wait!text!move!not-allowed",D)&&(Q="cursor:"+D)},box:function(){if("shadow"===G){var e=p({xs:"0 0 0 1pxR.05)",sm:"0 1px 2px 0R.05)","":"0 1px 3px 0R.1), 0 1px 2px 0R.06)",md:"0 4px 6px -1pxR.1), 0 2px 4px -1pxR.06)",lg:"0 10px 15px -3pxR.1), 0 4px 6px -2pxR.05)",xl:"0 20px 25px -5pxR.1), 0 10px 10px -5pxR.04)","2xl":"0 25px 50px -12pxR.25)",inner:"inset 0 2px 4px 0R.06)",outline:"0 0 0 3px rgba(66, 153, 225, 0.5)",none:"none"})[Y];e&&(e=e.replace(/R/g," rgba(0, 0, 0, 0"),Q="-webkit-box-shadow:"+e+";box-shadow:"+e)}},outline:function(){G&&(Q="outline:"+D.replace("-"," "))},pointer:function(){G&&(Q="pointer-events:"+G)},select:function(){f("none!auto!text!contain!all!inherit!initial!unset",D)&&(Q="-webkit-user-select:"+D+";-moz-user-select:"+D+";-ms-user-select:"+D+";user-select:"+D)},fill:function(){G&&(Q="fill:"+G)},stroke:function(){a(G)?Q="stroke-width:"+G:G&&(Q="stroke:"+G)},items:function(){f("stretch!start!center!end!baseline",D)&&(Q="-webkit-box-align:"+D+";-ms-flex-align:"+D+";align-items:"+(f("start,end",D)?"flex-":"")+D)},content:function(){if(f("start!center!end!between!around")){var e=D;f("start,end",D)?D="flex-"+D:"between"===D?(e="justify",D="space-"+D):"around"===D&&(e="distribute",D="space-"+D),Q="-ms-flex-line-pack:"+e+";align-content:"+D}},self:function(){if(f("auto!start!center!end!stretch",D)){var e="-ms-grid-row-align:"+D+";",t=D;f("start!end",D)&&(D="flex-"+D,e=""),Q="-ms-flex-item-align:"+t+";"+e+"align-self:"+D}},justify:function(){if(f("start!center!end!between!around",D)){var e=D;"between"===e?(e="justify",D="space-"+D):f("start!end")&&(D="flex-"+D);var t="-webkit-box-pack:"+e+";";"around"===e&&(e="distribute",D="space-"+D,t=""),Q=t+"-ms-flex-pack:"+e+";justify-content:"+D}}}),ae=/[^:]+::?|.+/g,le=/[.*+\-?^${}()|[\]\\]/g;function se(){o=i,Q="",K="",k=y;var e=b.separator;if(":"!==e&&(y=y.replace(new RegExp(e.replace(le,"\\$&"),"g"),":")),V=y.match(ae),y=V.pop(),(V=V.map(function(e){return e.endsWith("::")?"::"+e.slice(0,-2):":"+e.slice(0,-1)})).length>0){var t=j.get(V[0].slice(1));t&&(o=t,V.shift())}if("-"===y[0]&&(K="-",y=y.slice(1)),"string"==typeof b.prefix){if(!y.startsWith(b.prefix))return void ce();y=y.slice(b.prefix.length)}H=y.split("-"),B=H[0];var r=H[1];G=void 0===r?"":r;var n,c=H[2];if(Y=void 0===c?"":c,_=H[(J=H.length)-1],q=H.slice(0,-1).join("-"),D=H.slice(1).join("-"),!(Q=O[y])&&(n=ne[B])?n():B.length<3&&function(){var e;if("px"===G)e=K+"1px";else if("full"===G)e="100%";else if("screen"===G)"w"===B?e="100vw":"h"===B&&(e="100vh");else if(a(G))e=K+.25*Number(G)+"rem";else if(G.indexOf("/")>-1){var t=G.split("/"),r=t[0],o=t[1];a(r)&&a(o)&&(e=K+(Number(r)/Number(o)).toFixed(6)+"%")}else l(G)&&(e=K+G);var i=N[B[0]],n=te[B[1]];e&&i&&(Q="x"===B[1]?i+"-right:"+e+";"+i+"-left:"+e:"y"===B[1]?i+"-top:"+e+";"+i+"-bottom:"+e:n?i+"-"+n+":"+e:i+":"+e)}(),Q)de(Q);else if("container"===y){de("width:100%");var f=s("640px!768px!1024px!1280px");j.values().forEach(function(e,t){o=e,de("max-width:"+f[t])})}else ce()}function ce(){if(o!==i||V.length>0)for(var e,t=r(document.styleSheets);!(e=t()).done;)for(var n=0,a=[].concat(e.value.cssRules);n<a.length;n++){var l=a[n];if(l.type===CSSRule.STYLE_RULE&&l.selectorText.split(",").map(function(e){return e.trim()}).includes("."+y)){var s=l.cssText,c=s.lastIndexOf(";");c=-1===c?s.lastIndexOf("}"):c,de(s.slice(s.indexOf("{")+1,c))}}}var fe=p({"::placeholder":"::-webkit-input-P!::-moz-P!:-ms-input-P!::-ms-input-P".replace(/P/g,"placeholder"),"::selection":":::-moz-selection"});function de(e){var t=n||k;t=t.replace(/[.:()%,#]/g,"\\$&");var i="";if(b.important&&(!0===b.important?e=e.replace(/;/g,"!important;")+"!important":"string"==typeof b.important&&(i=b.important+" ")),V.length>0){for(var a=0,l=[].concat(V);a<l.length;a++){var c,d=fe[l[a]];d&&(c=V).push.apply(c,s(d))}for(var p,u=r(V);!(p=u()).done;){var m=p.value;f(":first!:last",m)?m+="-child":f(":odd!:even",m)?m=":nth-child("+m.slice(1)+")":m.startsWith(":group")&&(t=m.slice(1).replace("-",":")+" ."+t,m="");try{o.insertRule(i+"."+t+m+"{"+e+"}",o.length)}catch(e){console.log(e)}}}else try{o.insertRule(i+"."+t+"{"+e+"}",o.length)}catch(e){console.log(e)}}e.component=function(e,t,a){if(n=e.trim(),"string"==typeof t)for(var l,s=r(t=t.trim().replace(/\s\s+/g," ").split(" "));!(l=s()).done;)y=l.value,se();o=i,V=[],a&&"string"==typeof a&&de(a),n=""},e.configure=function(e){void 0===e&&(e={});for(var t,o=r(s("separator!prefix"));!(t=o()).done;){var i=t.value;if(void 0!==e[i]&&"string"!=typeof e[i])throw Error("config."+i+" must be a string.")}if(e.screens){w(e.screen);for(var n=0,a=Object.entries(e.screens);n<a.length;n++){var l=a[n];z(l[0],l[1])}}else if(e.colors){w(e.colors);for(var c=0,f=Object.entries(e.colors);c<f.length;c++){var d=f[c],p=d[0],u=d[1];if(g(u))for(var m=0,v=Object.entries(u);m<v.length;m++){var y=v[m];h.set(p+"-"+y[0],x(y[1]))}else h.set(p,x(u))}}else Object.assign(b,e)},e.processClasses=function(e){if(e=e.trim(),!u.has(e)){u.set(e,!0);for(var t,o=r(e.replace(/\s\s+/g," ").split(" "));!(t=o()).done;)m.has(y=t.value)||(m.set(y,!0),se())}}});
//# sourceMappingURL=runcss.umd.js.map
