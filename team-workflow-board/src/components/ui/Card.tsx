import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Card({ children, className = '', ...props }: Props) {
  return (
    <article className={[styles.card, className].join(' ')} {...props}>
      {children}
    </article>
  );
}
