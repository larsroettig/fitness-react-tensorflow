import { useEffect, useRef } from "react";

export function useMemoCompare<T>(
  next: T,
  compare: (prev: T | undefined, next: T) => boolean
): T | undefined {
  // Ref for storing previous value
  const previousRef = useRef<T | undefined>();
  const prev = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(prev, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual ? prev : next;
}
