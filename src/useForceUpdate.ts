import { useCallback, useState } from "react";

export default function useForceUpdate(): () => void {
  const [, setState] = useState<{}>({});
  return useCallback(() => setState({}), []);
}
