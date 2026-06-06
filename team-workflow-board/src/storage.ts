import type { Task } from './types';
import { SCHEMA_VERSION, STORAGE_KEY } from './types';

interface StoredData {
  schemaVersion: number;
  tasks: Task[];
}

/** v1 only had id, title, status */
interface LegacyTask {
  id: string;
  title: string;
  status: Task['status'];
}

export type StorageError = 'unavailable' | 'read_failed' | 'write_failed';

function migrateV1(tasks: LegacyTask[]): Task[] {
  const now = new Date().toISOString();
  return tasks.map((t) => ({
    id: t.id,
    title: t.title,
    description: '',
    status: t.status,
    priority: 'medium' as const,
    assignee: '',
    tags: [],
    createdAt: now,
    updatedAt: now,
  }));
}

function parseStored(raw: string): { tasks: Task[]; migrated: boolean } {
  const data = JSON.parse(raw) as { schemaVersion?: number; tasks: unknown[] };
  const version = data.schemaVersion ?? 1;

  if (version >= SCHEMA_VERSION) {
    return { tasks: data.tasks as Task[], migrated: false };
  }

  return { tasks: migrateV1(data.tasks as LegacyTask[]), migrated: true };
}

export function loadTasks(): { tasks: Task[]; migrated: boolean; error: StorageError | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { tasks: [], migrated: false, error: null };
    }
    const { tasks, migrated } = parseStored(raw);
    if (migrated) saveTasks(tasks);
    return { tasks, migrated, error: null };
  } catch {
    try {
      localStorage.getItem('test');
    } catch {
      return { tasks: [], migrated: false, error: 'unavailable' };
    }
    return { tasks: [], migrated: false, error: 'read_failed' };
  }
}

export function saveTasks(tasks: Task[]): StorageError | null {
  try {
    const data: StoredData = { schemaVersion: SCHEMA_VERSION, tasks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return null;
  } catch {
    return 'write_failed';
  }
}
