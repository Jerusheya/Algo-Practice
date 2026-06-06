import { useCallback, useEffect, useRef, useState } from 'react';

export function useDirtyForm<T extends object>(initial: T) {
  const [values, setValues] = useState(initial);
  const [isDirty, setIsDirty] = useState(false);
  const initialRef = useRef(initial);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      setIsDirty(JSON.stringify(next) !== JSON.stringify(initialRef.current));
      return next;
    });
  }, []);

  const reset = useCallback((next: T) => {
    initialRef.current = next;
    setValues(next);
    setIsDirty(false);
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty]);

  return { values, isDirty, setField, reset, setValues, setIsDirty };
}
