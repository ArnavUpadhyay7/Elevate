let lenisInstance = null;

export function setLenis(instance) { lenisInstance = instance; }
export function pauseLenis() { lenisInstance?.stop(); }
export function resumeLenis() { lenisInstance?.start(); }