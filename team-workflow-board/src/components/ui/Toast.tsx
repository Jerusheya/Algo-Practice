import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import styles from './Toast.module.css';

type Variant = 'info' | 'success' | 'error';

const ToastContext = createContext<{ toast: (msg: string, v?: Variant) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<{ id: string; message: string; variant: Variant }[]>([]);

  const toast = useCallback((message: string, variant: Variant = 'info') => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.list} aria-live="polite">
        {items.map((t) => (
          <div key={t.id} role="alert" className={[styles.toast, styles[t.variant]].join(' ')}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast requires ToastProvider');
  return ctx;
}
