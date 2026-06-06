import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { ToastProvider } from '../src/components/ui/Toast';
import { TaskProvider } from '../src/context/TaskContext';
import { STORAGE_KEY } from '../src/types';

export function setupStorage() {
  localStorage.clear();
}

export function seedEmpty() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 2, tasks: [] }));
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <TaskProvider>
        <ToastProvider>{children}</ToastProvider>
      </TaskProvider>
    </MemoryRouter>
  );
}

export function renderApp(ui: ReactElement) {
  return render(ui, { wrapper: Wrapper });
}
