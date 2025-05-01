import { useEffect, useRef } from 'react';

export const useViewEvent = (eventCallback: () => void, enabled = true) => {
  const executedViewEvent = useRef(false);

  useEffect(() => {
    if (enabled && !executedViewEvent.current) {
      eventCallback();
      executedViewEvent.current = true;
    }
  }, [enabled, eventCallback]);
};
