import type { StorageError } from '../storage';
import styles from './StorageBanner.module.css';

const MSG: Record<StorageError, string> = {
  unavailable: 'Storage is unavailable. Changes will not be saved.',
  read_failed: 'Could not load saved tasks.',
  write_failed: 'Could not save changes.',
};

export function StorageBanner({ error }: { error: StorageError | null }) {
  if (!error) return null;
  return <div role="alert" className={styles.banner}>{MSG[error]}</div>;
}
