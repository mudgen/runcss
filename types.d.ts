declare module "runcss" {
  const _default: () => {
      processClasses: (classes: string) => void;
      startWatching: (targetNode?: Element) => void;
      stopWatching: () => void;
      exportCSS: () => string;
  };
  export default _default;
}