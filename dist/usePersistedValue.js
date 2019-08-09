import { useRef } from "react";
const UNINITIALIZED_SENTINEL = {};
export default function usePersistedValue(factory) {
    const valueRef = useRef(UNINITIALIZED_SENTINEL);
    if (valueRef.current === UNINITIALIZED_SENTINEL) {
        valueRef.current = factory();
    }
    return valueRef.current;
}
