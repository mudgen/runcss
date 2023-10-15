(() => {
  // src/templates.preprocess.ts
  var defaultsTemplate = "container!width: 100%\ncol-auto!grid-column: auto\nrow-auto!grid-row: auto\nantialiased!-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale\nsubpixel-antialiased!-webkit-font-smoothing: auto;-moz-osx-font-smoothing: auto\ntruncate!overflow:hidden;text-overflow:ellipsis;white-space:nowrap\nbreak-normal!overflow-wrap: normal;word-break: normal\nbreak-words!overflow-wrap: break-word\nbreak-all!word-break: break-all\nbreak-keep!word-break: keep-all\noutline-none!outline:2px solid transparent;outline-offset:2px\nring-inset!--tw-ring-inset: inset\nsnap-none!scroll-snap-type: none\nsnap-x!scroll-snap-type: x var(--tw-scroll-snap-strictness)\nsnap-y!scroll-snap-type: y var(--tw-scroll-snap-strictness)\nsnap-both!scroll-snap-type: both var(--tw-scroll-snap-strictness)\nsnap-mandatory!--tw-scroll-snap-strictness: mandatory\nsnap-proximity!--tw-scroll-snap-strictness: proximity\nsr-only!position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0\nnot-sr-only!position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal";
  var filterTemplate = "blur!--tw-blur:$@f!$!none!sm^4px!^8px!md^12px!lg^16px!xl^24px!2xl^40px!3xl^64px\nbrightness!--tw-brightness:$@f!$!0!50^.5!75^.75!90^.9!95^.95!100^1!105^1.05!110^1.1!125^1.25!150^1.5!200^2\ncontrast!--tw-contrast:$@f!$!0!50^.5!75^.75!100^1!125^1.25!150^1.5!200^2\ngrayscale!--tw-grayscale:$@f!$!0!^100%\nhue-rotate!--tw-hue-rotate:$@f!$!0^0deg!15^15deg!30^30deg!60^60deg!90^90deg!180^180deg\ninvert!--tw-invert:$@f!$!0!^100%\nsaturate!--tw-saturate:$@f!$!0!50^.5!100^1!150^1.5!200^2\nsepia!--tw-sepia:$@f!$!0!^100%";
  var multiTemplate = 'aspect!aspect-ratio: $!$!auto!square^1/1!video^16/9\ncontainer!max-width: $px!sm^640!md^768!lg^1024!xl^1280!2xl^1536\ncolums!columns!$!1!2!3!4!5!6!7!8!9!10!11!12!auto!3xs^16rem!2xs^18rem!xs ^20rem!sm ^24rem!md ^28rem!lg ^32rem!xl ^36rem!2xl^42rem!3xl^48rem!4xl^56rem!5xl^64rem!6xl^72rem!7xl^80rem\nbreak-after!!auto!avoid!all!avoid-page!page!left!right!column\nbreak-before!!auto!avoid!all!avoid-page!page!left!right!column\nbreak-inside!!auto!avoid!all!avoid-page!avoid-column\nbox-decoration!box-decoration-break!clone!slice\nbox!box-sizing: $-box!border!content\n!display!block!inline-block!inline!flex!inline-flex!table!inline-table!table-caption!table-cell!table-column!table-column-group!table-footer-group!table-header-group!table-row-group!table-row!flow-root!grid!inline-grid!contents!list-item!hidden^none\nfloat!!right!left!none\nclear!!right!left!both!none\n!isolation!isolate!isolation-auto^auto\nobject!object-fit!contain!cover!fill!none!scale-down\nobject!object-position!$!bottom!center!left!left-bottom^left bottom!left-top^left top!right!right-bottom^right bottom!right-top^right top!top\noverflow!!auto!hidden!clip!visible!scroll\noverflow-x!!auto!hidden!clip!visible!scroll\noverflow-y!!auto!hidden!clip!visible!scroll\noverscroll!overscroll-behavior!auto!contain!none\noverscroll-y!overscroll-behavior-y!auto!contain!none\noverscroll-x!overscroll-behavior-x!auto!contain!none\n!position!static!fixed!absolute!relative!sticky\ninset!!@4\ninset-x!left:$;right:$!@4\ninset-y!top:$;bottom:$!@4\nstart!inset-inline-start!@4\nend!inset-inline-end!@4\ntop!!@4\nright!!@4\nbottom!!@4\nleft!!@4\n!visibility!visible!invisible!collapse\nz!z-index!0!10!20!30!40!50!auto\nbasis!flex-basis!@4\nflex!flex-direction!row!row-reverse!col^column!col-reverse^column-reverse\nflex-wrap!!wrap!wrap-reverse!nowrap\nflex!!$!1^1 1 0%!auto^1 1 auto!initial^0 1 auto!none\ngrow!flex-grow!$!^1!0\nshrink!flex-shrink!$!^1!0\norder!!$!1!2!3!4!5!6!7!8!9!10!11!12!first^-9999!last^9999!none^0\ngrid-cols!grid-template-columns: repeat($, minmax(0, 1fr))!1!2!3!4!5!6!7!8!9!10!11!12\ngrid-cols!grid-template-columns!$!none\ncol-span!grid-column: span $ / span $!1!2!3!4!5!6!7!8!9!10!11!12\ncol-span!grid-column!$!full^grid-column: 1 / -1\ncol-start!grid-column-start!$!1!2!3!4!5!6!7!8!9!10!11!12!13!auto\ncol-end!grid-column-end!$!1!2!3!4!5!6!7!8!9!10!11!12!13!auto\nrow-span!grid-row: span $ / span $!1!2!3!4!5!6!7!8!9!10!11!12\nrow-span!grid-row!$!full^grid-row: 1 / -1\nrow-start!grid-row-start!$!1!2!3!4!5!6!7!8!9!10!11!12!13!auto\nrow-end!grid-row-end!$!1!2!3!4!5!6!7!8!9!10!11!12!13!auto\ngrid-rows!grid-template-rows: repeat($, minmax(0, 1fr))!1!2!3!4!5!6\ngrid-rows!grid-template-rows!$!none\ngrid-flow!grid-auto-flow!row!col^column!dense!row-dense^row dense!col-dense^column dense\nauto-cols!grid-auto-columns!auto!min^min-content!max^max-content!fr^minmax(0,1fr)\nauto-rows!grid-auto-rows!auto!min^min-content!max^max-content!fr^minmax(0,1fr)\ngap!!$!@4\ngap-x!column-gap!$!@4\ngap-y!row-gap!$!@4\njustify!justify-content!normal!start^flex-start!end^flex-end!center!between^space-between!around^space-around!evenly^space-evenly!stretch\njustify-items!!start!end!center!stretch\njustify-items!!auto!start!end!center!stretch\ncontent!align-content!normal!center!start^flex-start!end^flex-end!between^space-between!around^space-around!evenly^space-evenly!baseline!stretch\nitems!align-items!start^flex-start!end^flex-end!center!baseline!stretch\nself!align-self!auto!start^flex-start!end^flex-end!center!baseline!stretch\nplace-content!!center!start^flex-start!end^flex-end!between^space-between!around^space-around!evenly^space-evenly!baseline!stretch\nplace-items!!start!end!center!baseline!stretch\nplace-self!!auto!start!end!center!stretch\np!padding!$!@4\npx!padding-left:$;padding-right:$!$!@4\npy!padding-top:$;padding-bottom:$!$!@4\nps!padding-inline-start!$!@4\npe!padding-inline-end!$!@4\npt!padding-top!$!@4\npr!padding-right!$!@4\npb!padding-bottom!$!@4\npl!padding-left!$!@4\nm!margin!$!@4\nmx!margin-left:$;margin-right:$!$!@4\nmy!margin-top:$;margin-bottom:$!$!@4\nms!margin-inline-start!$!@4\nme!margin-inline-end!$!@4\nmt!margin-top!$!@4\nmr!margin-right!$!@4\nmb!margin-bottom!$!@4\nml!margin-left!$!@4\n>space-x!margin-left!$!@4\n>space-x-reverse!	--tw-space-x-reverse!^1\n>space-y!margin-top!$!@4\n>space-y-reverse!	--tw-space-y-reverse!^1\nw!width!$!@4!screen^100vw\nw!width: $-content!min!max!fit\nmin-w!min-width!$!0^0px!full^100%!min^min-content!max^max-content!fit^fit-content\nmax-w!max-width!$!0^0rem!none^none!xs^20rem!sm^24rem!md^28rem!lg^32rem!xl^36rem!2xl^42rem!3xl^48rem!4xl^56rem!5xl^64rem!6xl^72rem!7xl^80rem!full^100%!min^min-content!max^max-content!fit^fit-content!prose^65ch!screen-sm^640px!screen-md^768px!screen-lg^1024px!screen-xl^1280px!screen-2xl^1536px\nh!height!$!@4\nmin-h!min-height!$!0^0px!full^100%!screen^100vh!min^min-content!max^max-content!fit^fit-content\nmax-h!max-height!$!@4!screen^100vh!min^min-content!max^max-content!fit^fit-content\nfont!font-family!sans^ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"!serif^ui-serif, Georgia, Cambria, "Times New Roman", Times, serif!mono^ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace\ntext!font-size!$!xs^0.75rem; line-height: 1rem!sm^0.875rem; line-height: 1.25rem!base^1rem; line-height: 1.5rem!lg^1.125rem; line-height: 1.75rem!xl^1.25rem; line-height: 1.75rem!2xl^1.5rem; line-height: 2rem!3xl^1.875rem; line-height: 2.25rem!4xl^2.25rem; line-height: 2.5rem!5xl^3rem; line-height: 1!6xl^3.75rem; line-height: 1!7xl^4.5rem; line-height: 1!8xl^6rem; line-height: 1!9xl^8rem; line-height: 1\n!font-style!italic!non-italic^normal\nfont!font-weight!$!thin^100!extralight^200!light^300!normal^400!medium^500!semibold^600!bold^700!extrabold^800!black^900\n!font-variant-numeric!normal-nums^normal!ordinal!slashed-zero!lining-nums!oldstyle-nums!proportional-nums!tabular-nums!diagonal-fractions!stacked-fractions\ntracking!letter-spacing!$!tighter^-0.05em!tight^-0.025em!normal^0em!wide^0.025em!wider^0.05em!widest^0.1em\nline-clamp!overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp!$!1!2!3!4!5!6!none\nleading!line-height!$!3^.75rem!4^1rem!5^1.25rem!6^1.5rem!7^1.75rem!8^2rem!9^2.25rem!10^2.5rem!none^1!tight^1.25!snug^1.375!normal^1.5!relaxed^1.625!loose^2\nlist-image!list-style-image!$!none\nlist!list-style-position!inside!outside\nlist!list-style-type!$!none!disc!decimal\ntext!text-align!left!center!right!justify!start!end\ntext!color!$!@C\n!text-decoration-line!underline!overline!line-through!no-underline^none\ndecoration!text-decoration-color!$!current^currentColor!@C\ndecoration!text-decoration-style!solid!double!dotted!dashed!wavy\ndecoration!text-decoration-thickness!$!auto!from-font!0^0px!1^1px!2^2px!4^4px!8^8px\nunderline-offset!text-underline-offset!$!auto!0^0px!1^1px!2^2px!4^4px!8^8px\n!text-transform!uppercase!lowercase!capitalize!normal-case^none\ntext!text-overflow!ellipsis!clip\nindent!text-indent!$!@4\nalign!vertical-align!$!baseline!top!middle!text-top!text-bottom!sub!super\nwhitespace!white-space!normal!nowrap!pre!pre-line!pre-wrap!break-spaces\nhyphens!!none!manual!auto\ncontent!!$!none\nbg!background-attachment!fixed!local!scroll\nbg-clip!background-clip!border^border-box!padding^padding-box!content^content-box!text\nbg!background-color!current^currentColor!@C\nbg-origin!background-origin:$-box!border!padding!content\nbg!background-position!$!bottom!center!left!left-bottom^left bottom!left-top^left top!right!right-bottom^right bottom!right-top^right top!top\nbg!background-repeat!repeat!no-repeat!repeat-x!repeat-y!repeat-round!repeat-space\nbg!background-size!$!auto!cover!contain\nbg!background!$\nrounded!border-radius!@R\nrounded-s!border-start-start-radius:$;border-end-start-radius:$!@R\nrounded-e!border-start-end-radius:$;border-end-end-radius:$!@R\nrounded-t!border-top-left-radius:$;border-top-right-radius:$!@R\nrounded-b!border-bottom-left-radius:$;border-bottom-right-radius:$!@R\nrounded-r!border-top-right-radius:$;border-bottom-right-radius:$!@R\nrounded-l!border-top-left-radius:$;border-bottom-left-radius:$!@R\nrounded-ss!border-start-start-radius!@R\nrounded-se!border-start-end-radius!@R\nrounded-ee!border-end-end-radius!@R\nrounded-es!border-end-start-radius!@R\nrounded-tl!border-top-left-radius!@R\nrounded-tr!border-top-right-radius!@R\nrounded-bl!border-bottom-left-radius!@R\nrounded-br!border-bottom-right-radius!@R\nborder!border-width!@B\nborder-x!border-left-width:$;border-right-width:$!$!@B\nborder-y!border-top-width:$;border-bottom-width:$!$!@B\nborder-s!border-inline-start-width!$!@B\nborder-e!border-inline-end-width!$!@B\nborder-t!border-top-width!@B\nborder-r!border-right-width!@B\nborder-b!border-bottom-width!@B\nborder-l!border-left-width!@B\nborder!border-color!$!@C\nborder!border-style!solid!dashed!dotted!double!hidden!none\n>divide-x!--tw-divide-x-reverse: 0;border-right-width:calc($ * calc(1 - var(--tw-divide-x-reverse)));border-left-width:calc($ * var(--tw-divide-x-reverse))!@B\n+divide-x-reverse!--tw-divide-x-reverse!^1\n>divide-y!--tw-divide-y-reverse: 0;border-top-width:calc($ * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc($ * var(--tw-divide-y-reverse))!@B\n+divide-y-reverse!--tw-divide-y-reverse!^1\n>divide!border-color!$!@C\n>divide!border-style!solid!dashed!dotted!double!none\noutline!outline-width!$!0^0px!1^1px!2^2px!4^4px!8^8px\noutline!outline-color!$!@C\noutline!outline-style!^solid!dashed!dotted!double\noutline-offset!!$!0^0px!1^1px!2^2px!4^4px!8^8px\nring!box-shadow: var(--tw-ring-inset) 0 0 0 calc($ + var(--tw-ring-offset-width)) var(--tw-ring-color)!$!^3px!0^0px!1^1px!2^2px!4^4px!8^8px\nring!--tw-ring-color!$!@C\nring-offset!--tw-ring-offset-width:$;box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)!$!0^0px!1^1px!2^2px!4^4px!8^8px\nring-offset!--tw-ring-offset-color:$;box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)!$!@C\nshadow!box-shadow!$!sm^0 1px 2px 0 rgb(0 0 0 / 0.05)!^0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)!md^0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)!lg^0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)!xl^0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)!2xl^0 25px 50px -12px rgb(0 0 0 / 0.25)!inner^inset 0 2px 4px 0 rgb(0 0 0 / 0.05)!none^0 0 #0000\nshadow!--tw-shadow-color!$!@C\nopacity!!$!0^0!5^0.05!10^0.1!20^0.2!25^0.25!30^0.3!40^0.4!50^0.5!60^0.6!70^0.7!75^0.75!80^0.8!90^0.9!95^0.95!100^1\nmix-blend!mix-blend-mode!normal!multiply!screen!overlay!darken!lighten!color-dodge!color-burn!hard-light!soft-light!difference!exclusion!hue!saturation!color!luminosity!plus-lighter\nbg-blend!background-blend-mode!normal!multiply!screen!overlay!darken!lighten!color-dodge!color-burn!hard-light!soft-light!difference!exclusion!hue!saturation!color!luminosity\nborder!border-collapse!collapse!separate\nborder-spacing!--tw-border-spacing-x:$;--tw-border-spacing-y:$@b!@4\n+border-spacing-x!--tw-border-spacing-x:$@b!@4\n+border-spacing-y!--tw-border-spacing-y:$@b!@4\ntable!table-layout!auto!fixed\ncaption!caption-side!top!bottom\ntransition!transition-property: $;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;!$!none!all!^color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter!colors^color, background-color, border-color, text-decoration-color, fill, stroke!opacity!shadow^box-shadow!transform\n+duration!transition-duration!$!0^0s!75^75ms!100^100ms!150^150ms!200^200ms!300^300ms!500^500ms!700^700ms!1000^1000ms\n+ease!transition-timing-function!linear!in^cubic-bezier(0.4, 0, 1, 1)!out^cubic-bezier(0, 0, 0.2, 1)!in-out^cubic-bezier(0.4, 0, 0.2, 1)\ndelay!transition-delay!$!0^0s!75^75ms!100^100ms!150^150ms!200^200ms!300^300ms!500^500ms!700^700ms!1000^1000ms\nanimate!animation!$!none!spin^spin 1s linear infinite!ping^ping 1s cubic-bezier(0, 0, 0.2, 1) infinite\nscale!--tw-scale-x:$;--tw-scale-y:$@t!$!0!50^.5!75^.75!90^.9!95^.95!100^1!105^1.05!110^1.1!125^1.25!150^1.5\n+scale-x!--tw-scale-x:$@t!$!0!50^.5!75^.75!90^.9!95^.95!100^1!105^1.05!110^1.1!125^1.25!150^1.5\n+scale-y!--tw-scale-y:$@t!$!0!50^.5!75^.75!90^.9!95^.95!100^1!105^1.05!110^1.1!125^1.25!150^1.5\nrotate!--tw-rotate:$@t!$!0^0deg!1^1deg!2^2deg!3^3deg!6^6deg!12^12deg!45^45deg!90^90deg!180^180deg\ntranslate-x!--tw-translate-x:$@t!@4\ntranslate-y!--tw-translate-y:$@t!@4\nskew-x!--tw-skew-x:$@t!$!0^0deg!1^1deg!2^2deg!3^3deg!6^6deg!12^12deg\nskew-y!--tw-skew-y:$@t!$!0^0deg!1^1deg!2^2deg!3^3deg!6^6deg!12^12deg\norigin!transform-origin!$!center!top!top-right^top right!right!bottom-right^bottom right!bottom!bottom-left^bottom left!left!top-left^top left\naccent!accent-color!$!@C\nappearence!!none\ncursor!!$!auto!default!pointer!wait!text!move!help!not-allowed!none!context-menu!progress!cell!crosshair!vertical-text!alias!copy!no-drop!grab!grabbing!all-scroll!col-resize!row-resize!n-resize!e-resize!s-resize!w-resize!ne-resize!nw-resize!se-resize!sw-resize!ew-resize!ns-resize!nesw-resize!nwse-resize!zoom-in!zoom-out\ncaret!caret-color!$!@C\npointer-events!!none!auto\nresize!!none!y^vertical!x^horizontal!^both\nscroll!scroll-behavior!auto!smooth\nsnap!scroll-snap-align!start!end!center!align-none^none\nsnap!scroll-snap-stop!normal!always\ntouch!touch-action!auto!none!pan-x!pan-left!pan-right!pan-y!pan-up!pan-down!pinch-zoom!manipulation\nselect!user-select!none!text!all!auto\nwill-change!!auto!scroll^scroll-position!contents!transform\nfill!!$!none!@C\nstroke!!$!none!@C\nstroke!stroke-width!$!0!1!2';
  var shorts = { "@R": "$!none^0px!sm^2px!^4px!md^6px!lg^8px!xl^12px!2xl^16px!3xl^24px!full^9999px", "@B": "0^0px!^1px!2^2px!4^4px!8^8px", "@b": ";border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)", "@t": ";transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "@f": ";filter: blur(var(--tw-blur)) brightness(var(--tw-brightness)) contrast(var(--tw-contrast)) grayscale(var(--tw-grayscale)) hue-rotate(var(--tw-hue-rotate)) invert(var(--tw-invert)) saturate(var(--tw-saturate)) sepia(var(--tw-sepia)) drop-shadow(var(--tw-drop-shadow))", "@g": ";backdrop-filter: blur(var(--tw-backdrop-blur)) brightness(var(--tw-backdrop-brightness)) contrast(var(--tw-backdrop-contrast)) grayscale(var(--tw-backdrop-grayscale)) hue-rotate(var(--tw-backdrop-hue-rotate)) invert(var(--tw-backdrop-invert)) opacity(var(--tw-backdrop-opacity)) saturate(var(--tw-backdrop-saturate)) sepia(var(--tw-backdrop-sepia))" };

  // src/colors.preprocess.ts
  var colorsTemplate = "slate\n#f8fafc\n#f1f5f9\n#e2e8f0\n#cbd5e1\n#94a3b8\n#64748b\n#475569\n#334155\n#1e293b\n#0f172a\n#020617\ngray\n#f9fafb\n#f3f4f6\n#e5e7eb\n#d1d5db\n#9ca3af\n#6b7280\n#4b5563\n#374151\n#1f2937\n#111827\n#030712\nzinc\n#fafafa\n#f4f4f5\n#e4e4e7\n#d4d4d8\n#a1a1aa\n#71717a\n#52525b\n#3f3f46\n#27272a\n#18181b\n#09090b\nneutral\n#fafafa\n#f5f5f5\n#e5e5e5\n#d4d4d4\n#a3a3a3\n#737373\n#525252\n#404040\n#262626\n#171717\n#0a0a0a\nstone\n#fafaf9\n#f5f5f4\n#e7e5e4\n#d6d3d1\n#a8a29e\n#78716c\n#57534e\n#44403c\n#292524\n#1c1917\n#0c0a09\nred\n#fef2f2\n#fee2e2\n#fecaca\n#fca5a5\n#f87171\n#ef4444\n#dc2626\n#b91c1c\n#991b1b\n#7f1d1d\n#450a0a\norange\n#fff7ed\n#ffedd5\n#fed7aa\n#fdba74\n#fb923c\n#f97316\n#ea580c\n#c2410c\n#9a3412\n#7c2d12\n#431407\namber\n#fffbeb\n#fef3c7\n#fde68a\n#fcd34d\n#fbbf24\n#f59e0b\n#d97706\n#b45309\n#92400e\n#78350f\n#451a03\nyellow\n#fefce8\n#fef9c3\n#fef08a\n#fde047\n#facc15\n#eab308\n#ca8a04\n#a16207\n#854d0e\n#713f12\n#422006\nlime\n#f7fee7\n#ecfccb\n#d9f99d\n#bef264\n#a3e635\n#84cc16\n#65a30d\n#4d7c0f\n#3f6212\n#365314\n#1a2e05\ngreen\n#f0fdf4\n#dcfce7\n#bbf7d0\n#86efac\n#4ade80\n#22c55e\n#16a34a\n#15803d\n#166534\n#14532d\n#052e16\nEmerald\n#ecfdf5\n#d1fae5\n#a7f3d0\n#6ee7b7\n#34d399\n#10b981\n#059669\n#047857\n#065f46\n#064e3b\n#022c22\nteal\n#f0fdfa\n#ccfbf1\n#99f6e4\n#5eead4\n#2dd4bf\n#14b8a6\n#0d9488\n#0f766e\n#115e59\n#134e4a\n#042f2e\ncyan\n#ecfeff\n#cffafe\n#a5f3fc\n#67e8f9\n#22d3ee\n#06b6d4\n#0891b2\n#0e7490\n#155e75\n#164e63\n#083344\nsky\n#f0f9ff\n#e0f2fe\n#bae6fd\n#7dd3fc\n#38bdf8\n#0ea5e9\n#0284c7\n#0369a1\n#075985\n#0c4a6e\n#082f49\nblue\n#eff6ff\n#dbeafe\n#bfdbfe\n#93c5fd\n#60a5fa\n#3b82f6\n#2563eb\n#1d4ed8\n#1e40af\n#1e3a8a\n#172554\nindigo\n#eef2ff\n#e0e7ff\n#c7d2fe\n#a5b4fc\n#818cf8\n#6366f1\n#4f46e5\n#4338ca\n#3730a3\n#312e81\n#1e1b4b\nviolet\n#f5f3ff\n#ede9fe\n#ddd6fe\n#c4b5fd\n#a78bfa\n#8b5cf6\n#7c3aed\n#6d28d9\n#5b21b6\n#4c1d95\n#2e1065\npurple\n#faf5ff\n#f3e8ff\n#e9d5ff\n#d8b4fe\n#c084fc\n#a855f7\n#9333ea\n#7e22ce\n#6b21a8\n#581c87\n#3b0764\nfuchsia\n#fdf4ff\n#fae8ff\n#f5d0fe\n#f0abfc\n#e879f9\n#d946ef\n#c026d3\n#a21caf\n#86198f\n#701a75\n#4a044e\npink\n#fdf2f8\n#fce7f3\n#fbcfe8\n#f9a8d4\n#f472b6\n#ec4899\n#db2777\n#be185d\n#9d174d\n#831843\n#500724\nrose\n#fff1f2\n#ffe4e6\n#fecdd3\n#fda4af\n#fb7185\n#f43f5e\n#e11d48\n#be123c\n#9f1239\n#881337\n#4c0519";
  var opacityKeysTemplate = "0!5!10!20!25!30!40!50!60!70!75!80!90!95!100";
  var opacityValuesTemplate = "00!0D!1A!33!40!4D!66!80!99!B3!BF!CC!E6!F2!FF";

  // src/parser.ts
  var opacityKeys = opacityKeysTemplate.split("!");
  var opacityValues = opacityValuesTemplate.split("!");
  var colorVariants = `50!100!200!300!400!500!600!700!800!900!950`.split("!");
  var colors = "transparent!inherit";
  for (let [colorName, value] of Object.entries({ "white": "#ffffff", "black": "#000000" })) {
    colors += "!" + colorName + "^" + value;
    for (let k = 0; k < opacityKeys.length; k++) {
      const opacityKey = opacityKeys[k];
      const opacityValue = opacityValues[k];
      colors += "!" + colorName + "/" + opacityKey + "^" + value + opacityValue;
    }
  }
  var colorsLines = colorsTemplate.split("\n");
  for (let i = 0; i < colorsLines.length; i++) {
    const colorName = colorsLines[i];
    for (let variant of colorVariants) {
      i += 1;
      colors += "!" + colorName + "-" + variant + "^" + colorsLines[i];
      for (let k = 0; k < opacityKeys.length; k++) {
        const opacityKey = opacityKeys[k];
        const opacityValue = opacityValues[k];
        colors += "!" + colorName + "-" + variant + "/" + opacityKey + "^" + colorsLines[i] + opacityValue;
      }
    }
  }
  shorts["@C"] = colors;
  var numbers = "0!0.5!1!1.5!2!2.5!3!3.5!4!5!6!7!8!9!10!11!12!14!16!20!24!28!32!36!40!44!48!52!56!60!64!72!80!96".split("!").map((n) => `${n}^${parseFloat(n) * 4}px`).join("!");
  var percentages = "1/2!1/3!2/3!1/4!2/4!3/4!1/5!2/5!3/5!4/5!1/6!2/6!3/6!4/6!5/6!1/12!2/12!3/12!4/12!5/12!6/12!7/12!8/12!9/12!10/12!11/12".split("!").map((fraction) => {
    const [n, d] = fraction.split("/");
    return `${fraction}^${Number(n) / Number(d) * 100}%`;
  }).join("!");
  shorts["@4"] = "auto!full^100%!px^1px!" + numbers + "!" + percentages;
  var backdropFilterTemplate = filterTemplate.split("\n").map((l) => "backdrop-" + l).join("\n").replaceAll("--tw-", "--tw-backdrop-").replaceAll("@f", "@g");
  var resolvedMultiTemplate = multiTemplate + "\n" + filterTemplate + "\n" + backdropFilterTemplate;
  for (let [key, value] of Object.entries(shorts)) {
    resolvedMultiTemplate = resolvedMultiTemplate.replaceAll(key, value);
  }
  var exact = {};
  var arbitrary = {};
  for (let line of defaultsTemplate.split("\n")) {
    let [key, value] = line.split("!");
    let priority = 0;
    let parent = "";
    if (key.startsWith("+++")) {
      priority = 3;
      key = key.substring(3);
    } else if (key.startsWith("++")) {
      priority = 2;
      key = key.substring(2);
    } else if (key.startsWith("+")) {
      priority = 2;
      key = key.substring(1);
    }
    if (key.startsWith(">")) {
      parent = "> * + *";
      key = key.substring(1);
    }
    exact[key] = [value + ";", [priority, parent]];
  }
  for (let line of resolvedMultiTemplate.split("\n")) {
    const els = line.split("!");
    let key = els[0];
    let priority = 0;
    let parent = "";
    if (key.startsWith("+++")) {
      priority = 3;
      key = key.substring(3);
    } else if (key.startsWith("++")) {
      priority = 2;
      key = key.substring(2);
    } else if (key.startsWith("+")) {
      priority = 2;
      key = key.substring(1);
    }
    if (key.startsWith(">")) {
      parent = "> * + *";
      key = key.substring(1);
    }
    const property = key === "" ? "" : key + "-";
    let resolvedValue = els[1] === "" ? key : els[1];
    if (!resolvedValue.includes("$"))
      resolvedValue += ":$";
    resolvedValue += ";";
    const admitArbitrary = els[2] === "$";
    if (admitArbitrary) {
      arbitrary[property] = [resolvedValue, [priority, parent]];
    }
    for (let i = admitArbitrary ? 3 : 2; i < els.length; i++) {
      const text = els[i];
      const caretIndex = text.indexOf("^");
      if (caretIndex === -1) {
        exact[property + text] = [resolvedValue.replaceAll("$", text), [priority, parent]];
      } else if (caretIndex === 0) {
        exact[property.substring(0, property.length - 1)] = [resolvedValue.replaceAll("$", text.substring(1)), [priority, parent]];
      } else {
        const key2 = text.substring(0, caretIndex);
        const value = text.substring(caretIndex + 1);
        exact[property + key2] = [resolvedValue.replaceAll("$", value), [priority, parent]];
      }
    }
  }

  // src/utils.ts
  var dictionarify = (template) => {
    const dictionary = {};
    const lines = template.split("\n");
    for (let line of lines) {
      line = line.trim();
      if (line.length === 0)
        continue;
      const values = line.split("!");
      dictionary[values[0]] = values[1] || values[0];
    }
    return dictionary;
  };

  // src/states.ts
  var pseudoClasses = dictionarify(`
hover
focus
focus-within
focus-visible
active
visited
target
first!first-child
last!last-child
only!only-child
odd!nth-child(odd)
even!:nth-child(even)
first-of-type
last-of-type
only-of-type
empty
disabled
enabled
checked
indeterminate
default
required
valid
invalid
in-range
out-of-range
placeholder-shown
autofill
read-only
`);
  var pseudoElements = dictionarify(`
before
after
placeholder
file!file-selector-button
marker
selection
first-line
first-letter
backdrop
`);
  var mediaQueries = dictionarify(`
sm!(min-width: 640px)
md!(min-width: 768px)
lg!(min-width: 1024px)
xl!(min-width: 1280px)
2xl!(min-width: 1536px)
max-sm!not all and (min-width: 640px)
max-md!not all and (min-width: 768px)
max-lg!not all and (min-width: 1024px)
max-xl!not all and (min-width: 1280px)
max-2xl!not all and (min-width: 1536px)
dark!(prefers-color-scheme: dark)
portrait!(orientation: portrait)
landscape!(orientation: landscape)
motion-safe!(prefers-reduced-motion: no-preference)
motion-reduce!(prefers-reduced-motion: reduce)
contrast-more!(prefers-contrast: more)
contrast-less!(prefers-contrast: less)
print!print
`);
  var modifiers = dictionarify(`
aria-checked![aria-checked="true"]
aria-disabled![aria-disabled="true"]
aria-expanded![aria-expanded="true"]
aria-hidden![aria-hidden="true"]
aria-pressed![aria-pressed="true"]
aria-readonly![aria-readonly="true"]
aria-required![aria-required="true"]
aria-selected![aria-selected="true"]
open![open]
`);
  var parentModifiers = dictionarify(`
rtl![dir="rtl"]
ltr![dir="ltr"]
`);
  var stateDictionaries = {
    pseudoClasses,
    pseudoElements,
    mediaQueries,
    modifiers,
    parentModifiers
  };

  // src/index.ts
  var initialized = false;
  var src_default = () => {
    if (initialized)
      throw "Error: can't initialize RunCSS twice";
    initialized = true;
    const sheets = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(() => document.head.appendChild(document.createElement("style")).sheet);
    const inserted = /* @__PURE__ */ new Set();
    const insert = (clazz, resolvedDeclaration) => {
      if (!resolvedDeclaration)
        return;
      inserted.add(clazz);
      const [resolvedValue, [priority, parent = ""]] = resolvedDeclaration;
      let increasePriority = false;
      const categorizedStates = {};
      for (const state of Object.keys(stateDictionaries))
        categorizedStates[state] = [];
      let peers = "", groups = "";
      const states = clazz.split(":");
      for (let i = 0; i < states.length - 1; i++) {
        if (states[i].startsWith("peer-")) {
          let peerName = "peer";
          let peerModifier = states[i].substring("peer-".length);
          const slash = peerModifier.indexOf("/");
          if (slash !== -1) {
            peerName = peerModifier.substring(0, slash);
            peerModifier = peerModifier.substring(slash + 1);
          }
          peers += `.${peerName}:${peerModifier}~`;
        }
        if (states[i].startsWith("group-")) {
          let peerName = "group";
          let peerModifier = states[i].substring("group-".length);
          const slash = peerModifier.indexOf("/");
          if (slash !== -1) {
            peerName = peerModifier.substring(0, slash);
            peerModifier = peerModifier.substring(slash + 1);
          }
          groups += `.${peerName}:${peerModifier} `;
        }
        for (let [key, dictionary] of Object.entries(stateDictionaries)) {
          if (states[i] in dictionary) {
            categorizedStates[key].push(dictionary[states[i]]);
          }
        }
      }
      let rule = `${groups}${peers}.${clazz.replace(/[\[\]'.:()&@~*^$%,#\/]/g, "\\$&") + categorizedStates.pseudoClasses.map((el) => ":" + el).join("") + categorizedStates.pseudoElements.map((el) => "::" + el).join("") + categorizedStates.modifiers.join("") + " " + parent} {${resolvedValue}}`;
      if (categorizedStates.mediaQueries.length > 0) {
        increasePriority = true;
        console.log("increased priority!", priority + (increasePriority ? 3 : 0), rule);
        rule = `@media ${categorizedStates.mediaQueries.join(" and ")}{${rule}}`;
      }
      const sheet = sheets[priority + (increasePriority ? 3 : 0)];
      sheet.insertRule(rule, sheet.cssRules.length);
    };
    const applyImportantModifier = (important, resolvedDeclaration) => important ? resolvedDeclaration.replaceAll(";", "!important;") : resolvedDeclaration;
    const resolveDeclaration = (clazz) => {
      if (clazz.length === 0)
        return;
      let important = false;
      let minus = false;
      if (clazz.startsWith("!")) {
        clazz = clazz.substring(1);
        important = true;
      }
      if (clazz.startsWith("-")) {
        clazz = clazz.substring(1);
        minus = true;
      }
      let bracketIndex = clazz.indexOf("-[");
      if (bracketIndex !== -1) {
        const stateIndex2 = clazz.lastIndexOf(":", bracketIndex);
        const declaration2 = stateIndex2 === -1 ? clazz : clazz.substring(clazz.lastIndexOf(":") + 1);
        bracketIndex += stateIndex2 + 1;
        const endBracketIndex = declaration2.lastIndexOf("]");
        const property = declaration2.substring(0, bracketIndex + 1);
        const value = declaration2.substring(bracketIndex + 2, endBracketIndex).replaceAll("_", " ");
        if (!(property in arbitrary))
          return;
        const [resolvedValue, args] = arbitrary[property];
        return [
          applyImportantModifier(important, resolvedValue.replaceAll("$", value)),
          args
        ];
      }
      const stateIndex = clazz.lastIndexOf(":");
      const opacityIndex = clazz.lastIndexOf("/");
      const declaration = clazz.substring(stateIndex + 1);
      if (declaration in exact) {
        const [resolvedValue, args] = exact[declaration];
        return [applyImportantModifier(important, resolvedValue), args];
      }
      console.log("unkwown", clazz);
      return;
    };
    const processClasses2 = (classes) => {
      classes.split(" ").forEach((clazz) => {
        clazz = clazz.trim();
        if (!clazz || inserted.has(clazz))
          return;
        insert(clazz, resolveDeclaration(clazz));
      });
    };
    let observers = [];
    const startWatching2 = (targetNode) => {
      const config = {
        attributes: true,
        attributeFilter: ["class"],
        childList: true,
        subtree: true
      };
      const callback = (mutationList) => {
        for (const mutation of mutationList) {
          if (mutation.addedNodes) {
            for (let node of mutation.addedNodes) {
              if (typeof node.hasAttribute === "function" && node.hasAttribute("class")) {
                processClasses2(node.getAttribute("class"));
              }
            }
          }
          if (mutation.type === "attributes" && typeof mutation.target.hasAttribute === "function" && mutation.target.hasAttribute("class")) {
            processClasses2(mutation.target.getAttribute("class"));
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(targetNode ?? document.body, config);
      observers.push(observer);
    };
    const stopWatching = () => {
      observers.forEach((observer) => observer.disconnect());
      observers = [];
    };
    const exportCSS = () => {
      let result = "";
      for (let sheet of sheets) {
        for (let rule of [...sheet.cssRules]) {
          result += rule.cssText + "\n\n";
        }
      }
      return result;
    };
    return { processClasses: processClasses2, startWatching: startWatching2, stopWatching, exportCSS };
  };

  // src/iife.ts
  var { processClasses, startWatching } = src_default();
  for (const element of document.querySelectorAll("*[class]")) {
    processClasses(element.getAttribute("class"));
  }
  if (document.currentScript.hasAttribute("watch")) {
    startWatching();
  }
  var hiddenNodes = document.querySelectorAll("*[runcss-cloak]");
  for (let node of hiddenNodes) {
    node.removeAttribute("runcss-cloak");
  }
})();
