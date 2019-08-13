import { useRef, DependencyList } from "react";
import areHookInputsEqual from "./areHookInputsEqual";

const UNINITIALIZED_SENTINEL: DependencyList = [];

/**
 * A hook that operates just like `useMemo` but can be relied upon to return the
 * same value if deps are equal. React's useMemo can throw away the value (used
 * for performance optimization, not semantic guarantee).
 *
 * function MyComponent() {
 *   // Because deps are constant, can guarantee myValue is always same instance
 *   const myValue = useStableMemo(() => [], [5]);
 *   ...
 * }
 */
export default function useStableMemo<T>(
  factory: () => T,
  deps: DependencyList
): T {
  const valueRef = useRef<T>();
  const depsRef = useRef<DependencyList>(UNINITIALIZED_SENTINEL);

  if (depsRef.current === UNINITIALIZED_SENTINEL) {
    valueRef.current = factory();
    depsRef.current = deps;
  } else if (!areHookInputsEqual(deps, depsRef.current)) {
    valueRef.current = factory();
    depsRef.current = deps;
  }
  return valueRef.current as T;
}
