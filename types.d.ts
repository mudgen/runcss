declare module "runcss" {
  const _default: () => {
    extendRunCSS: (plugin: (arg0: any) => any) => void;
    processClasses: (classes: string) => void;
    startWatching: (targetNode?: Element) => void;
    stopWatching: () => void;
    exportCSS: () => string;
  };
  export default _default;
}