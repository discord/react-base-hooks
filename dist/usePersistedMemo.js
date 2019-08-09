import { useRef } from "react";
import areHookInputsEqual from "./areHookInputsEqual";
const UNINITIALIZED_SENTINEL = [];
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
