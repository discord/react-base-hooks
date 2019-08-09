import { DependencyList } from "react";

export default function areHookInputsEqual(
  nextDeps: DependencyList,
  prevDeps: DependencyList
): boolean {
  if (prevDeps === null) {
    return false;
  }

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
