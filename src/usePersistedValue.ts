import { useRef } from "react";

const UNINITIALIZED_SENTINEL = {};

export default function usePersistedValue<T>(factory: () => T): T {
  const valueRef = useRef<T>(UNINITIALIZED_SENTINEL as T);
  if (valueRef.current === UNINITIALIZED_SENTINEL) {
    valueRef.current = factory();
  }
  return valueRef.current;
}
