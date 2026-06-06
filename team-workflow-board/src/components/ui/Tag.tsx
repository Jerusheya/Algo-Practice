import type { ReactNode } from 'react';
import styles from './Tag.module.css';

type Variant = 'default' | 'low' | 'medium' | 'high';

export function Tag({ children, variant = 'default' }: { children: ReactNode; variant?: Variant }) {
  return <span className={[styles.tag, styles[variant]].join(' ')} role="status">{children}</span>;
}
