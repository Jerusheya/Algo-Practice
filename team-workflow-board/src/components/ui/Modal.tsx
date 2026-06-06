import { useEffect, useRef, type ReactNode } from 'react';
import { Button } from './Button';
import styles from './Modal.module.css';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, title, onClose, children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open) {
      prevFocus.current = document.activeElement as HTMLElement;
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
      el.querySelector<HTMLElement>('input, textarea, select, button')?.focus();
    } else if (el.open) {
      if (typeof el.close === 'function') el.close();
      else el.removeAttribute('open');
      prevFocus.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancel = (e: Event) => { e.preventDefault(); onClose(); };
    el.addEventListener('cancel', onCancel);
    return () => el.removeEventListener('cancel', onCancel);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog ref={ref} className={styles.dialog} aria-labelledby="modal-title">
      <header className={styles.header}>
        <h2 id="modal-title">{title}</h2>
        <Button variant="secondary" size="sm" onClick={onClose} aria-label="Close">×</Button>
      </header>
      <div className={styles.body}>{children}</div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </dialog>
  );
}
