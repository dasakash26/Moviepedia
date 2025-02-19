import { useEffect, useCallback } from "react";

export function useInfiniteScroll(
  onIntersect,
  targetRef,
  enabled = true,
  delay = 500
) {
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && enabled) {
        setTimeout(() => {
          onIntersect();
        }, delay);
      }
    },
    [onIntersect, enabled, delay]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    const currentTarget = targetRef.current;
    if (currentTarget && enabled) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef, enabled, handleObserver]);
}
