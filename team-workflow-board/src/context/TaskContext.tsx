import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { loadTasks, saveTasks, type StorageError } from '../storage';
import type { Task, TaskFormValues, TaskStatus } from '../types';
import { formToTaskFields } from '../validation';

interface TaskContextValue {
  tasks: Task[];
  storageError: StorageError | null;
  migrationRan: boolean;
  addTask: (values: TaskFormValues) => void;
  updateTask: (id: string, values: TaskFormValues) => void;
  setStatus: (id: string, status: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [storageError, setStorageError] = useState<StorageError | null>(null);
  const [migrationRan, setMigrationRan] = useState(false);

  useEffect(() => {
    const { tasks: loaded, migrated, error } = loadTasks();
    setTasks(loaded);
    setMigrationRan(migrated);
    setStorageError(error);
  }, []);

  const persist = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasks((prev) => {
      const next = updater(prev);
      const err = saveTasks(next);
      if (err) setStorageError(err);
      return next;
    });
  }, []);

  const addTask = useCallback(
    (values: TaskFormValues) => {
      const now = new Date().toISOString();
      persist((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...formToTaskFields(values), createdAt: now, updatedAt: now },
      ]);
    },
    [persist],
  );

  const updateTask = useCallback(
    (id: string, values: TaskFormValues) => {
      persist((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, ...formToTaskFields(values), updatedAt: new Date().toISOString() }
            : t,
        ),
      );
    },
    [persist],
  );

  const setStatus = useCallback(
    (id: string, status: TaskStatus) => {
      persist((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t,
        ),
      );
    },
    [persist],
  );

  const value = useMemo(
    () => ({ tasks, storageError, migrationRan, addTask, updateTask, setStatus }),
    [tasks, storageError, migrationRan, addTask, updateTask, setStatus],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}
