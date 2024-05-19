import { useEffect, useState } from "react";

export function useTimeoutHide(initialState: boolean, delay: number): boolean {
  const [visible, setVisible] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return visible;
}
