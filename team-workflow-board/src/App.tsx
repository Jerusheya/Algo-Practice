import { useEffect, useState } from 'react';
import { Button } from './components/ui/Button';
import { ToastProvider, useToast } from './components/ui/Toast';
import { TaskProvider, useTasks } from './context/TaskContext';
import { Board } from './features/Board';
import { FilterBar } from './features/FilterBar';
import { StorageBanner } from './features/StorageBanner';
import { TaskModal } from './features/TaskModal';
import type { Task } from './types';
import styles from './App.module.css';

function AppBody() {
  const { storageError, migrationRan } = useTasks();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | undefined>();

  useEffect(() => {
    if (migrationRan) toast('Tasks updated to the latest format.');
  }, [migrationRan, toast]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Team Workflow Board</h1>
        <Button onClick={() => { setEditing(undefined); setModalOpen(true); }}>+ New Task</Button>
      </header>
      <StorageBanner error={storageError} />
      <FilterBar />
      <Board onEdit={(t) => { setEditing(t); setModalOpen(true); }} />
      <TaskModal open={modalOpen} task={editing} onClose={() => { setModalOpen(false); setEditing(undefined); }} />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <ToastProvider>
        <AppBody />
      </ToastProvider>
    </TaskProvider>
  );
}
