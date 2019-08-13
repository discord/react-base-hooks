import { useRef } from "react";

const UNINITIALIZED_SENTINEL = {};

/**
 * A hook to hold a lazy-initialized value for a component's lifecycle.
 * This is similar to using `useState` and never updating. This is slightly
 * cheaper because we don't need to create functions for updating.
 *
 * Use this over useMemo when you need to guarantee that the value won't be
 * thrown away.
 *
 * function MyComponent() {
 *   // Can guarantee that animatedValue is always same instance
 *   const animatedValue = useLazyValue(() => new Animated.Value());
 *   ...
 * }
 */
export default function useLazyValue<T>(factory: () => T): T {
  const valueRef = useRef<T>(UNINITIALIZED_SENTINEL as T);
  if (valueRef.current === UNINITIALIZED_SENTINEL) {
    valueRef.current = factory();
  }
  return valueRef.current;
}
