import { useRef } from "react";
import areHookInputsEqual from "./areHookInputsEqual";
const UNINITIALIZED_SENTINEL = [];
/**
 * A hook that operates just like `useMemo` but can be relied upon to return the
 * same value if deps are equal. React's useMemo can throw away the value (used
 * for performance optimization, not semantic guarantee).
 *
 * function MyComponent() {
 *   // Because deps are constant, can guarantee myValue is always same instance
 *   const myValue = usePersistedMemo(() => [], [5]);
 *   ...
 * }
 */
export default function usePersistedMemo(factory, deps) {
    const valueRef = useRef();
    const depsRef = useRef(UNINITIALIZED_SENTINEL);
    if (depsRef.current === UNINITIALIZED_SENTINEL) {
        valueRef.current = factory();
        depsRef.current = deps;
    }
    else if (!areHookInputsEqual(deps, depsRef.current)) {
        valueRef.current = factory();
        depsRef.current = deps;
    }
    return valueRef.current;
}
