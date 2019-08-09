import { useRef, DependencyList } from "react";
import areHookInputsEqual from "./areHookInputsEqual";

const UNINITIALIZED_SENTINEL: DependencyList = [];

export default function usePersistentMemo<T>(
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
