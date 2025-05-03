/**
 * Throttles a function to limit how often it can be called
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      requestAnimationFrame(() => (inThrottle = false));
    }
  };
} 