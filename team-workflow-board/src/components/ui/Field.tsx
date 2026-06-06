import { useId } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './Field.module.css';

interface FieldProps {
  label: string;
  error?: string;
  id?: string;
}

export function TextInput({ label, error, id, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const uid = useId();
  const fieldId = id ?? uid;
  const errId = error ? `${fieldId}-err` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={error ? styles.errorInput : undefined}
        {...props}
      />
      {error && <span id={errId} role="alert" className={styles.error}>{error}</span>}
    </div>
  );
}

export function TextArea({ label, error, id, ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const uid = useId();
  const fieldId = id ?? uid;
  const errId = error ? `${fieldId}-err` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>
      <textarea
        id={fieldId}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={error ? styles.errorInput : undefined}
        {...props}
      />
      {error && <span id={errId} role="alert" className={styles.error}>{error}</span>}
    </div>
  );
}

export function Select({
  label,
  error,
  id,
  options,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
}) {
  const uid = useId();
  const fieldId = id ?? uid;
  const errId = error ? `${fieldId}-err` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>
      <select
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={error ? styles.errorInput : undefined}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <span id={errId} role="alert" className={styles.error}>{error}</span>}
    </div>
  );
}
