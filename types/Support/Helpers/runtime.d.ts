type Runtime = 'node' | 'bun' | 'deno'

/**
 * Get the current runtime.
 *
 * @returns {string} The current runtime.
 */
export default function runtime<T = unknown>(): Runtime & T;

export { Runtime }
