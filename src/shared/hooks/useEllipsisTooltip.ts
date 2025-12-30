import { useEffect, useRef, useState } from "react";

export const useEllipsisTooltip = <T extends HTMLElement>(
  deps: unknown[] = [],
) => {
  const ref = useRef<T>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setIsTruncated(el.scrollWidth > el.clientWidth);
  }, deps);

  return { ref, isTruncated };
};
