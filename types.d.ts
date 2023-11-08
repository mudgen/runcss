/** RunCSS - Generate tailwind classes on the fly 
 * 
 * RunCSS is the runtime equivalent of TailwindCSS, featuring the same CSS utility class names, but with no build step required. It achieves this by generating CSS on the fly with JavaScript.
 * RunCSS comes with batteries included. By default all additional variants such as hover, active, visited, group-hover, sm, lg etc work with all class names. All packaged in a single 25kb (8kb after compression) JS file!
*/
declare module "runcss" {

  /** Use extendRunCSS to extend RunCSS templates.
   *
   * IMPORTANT: do not call after initializing RunCSS() */
  export const extendRunCSS: (plugin: (arg0: any) => any) => void;

  export const defaultsTemplate : string;
  export const ruleTemplate: string;
  export const shortcuts: Record<string, string>;


  export const states : Record<string, Record<string, string>>;

  /** RunCSS main constructor. Call once. */
  const _default: (options?: Record<string, any>) => {

    /** Add classes to the main stylesheet.
     * @example processClasses('bg-gray-500 text-xl') */
    processClasses: (classes: string) => void;

    /** Watch for new elements using the MutationObserver API, and automatically add their classes. */
    startWatching: (targetNode?: Element) => void;

    /** Stop all the mutationObservers created with startWatching. */
    stopWatching: () => void;

    /** Return the current generated CSS stylesheet as string. */
    exportCSS: () => string;
  };
  export default _default;
}