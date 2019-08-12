import { DependencyList } from "react";

// https://github.com/facebook/react/blob/c2034716a5bff586ab68c41a14139a535cbd788e/packages/react-reconciler/src/ReactFiberHooks.js#L314
export default function areHookInputsEqual(
  nextDeps: DependencyList,
  prevDeps: DependencyList
): boolean {
  if (nextDeps.length !== prevDeps.length) {
    return false;
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}
