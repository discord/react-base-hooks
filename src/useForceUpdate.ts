import { useCallback, useState } from "react";

/**
 * Returns a forceUpdate function that will re-render your component when
 * called. Useful when logic relies on state not represented in "React state"
 * (e.g. refs or external sources).
 *
 * Guaranteed to return same function every time.
 *
 * function MyComponent() {
 *   const forceUpdate = useForceUpdate();
 *   useEffect(() => DataStore.subscribe(() => forceUpdate()), []);
 *   return <div>{DataStore.data}</div>;
 * }
 *
 */
export default function useForceUpdate(): () => void {
  const [, setState] = useState<{}>({});
  return useCallback(() => setState({}), []);
}
