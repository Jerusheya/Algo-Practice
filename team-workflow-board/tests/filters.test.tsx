import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../src/App';
import { STORAGE_KEY } from '../src/types';
import { renderApp, setupStorage } from './testUtils';

describe('filters', () => {
  beforeEach(() => {
    setupStorage();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 2,
      tasks: [
        {
          id: '1', title: 'High bug', description: 'Critical', status: 'backlog',
          priority: 'high', assignee: 'Alex', tags: [], createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2', title: 'Write docs', description: 'README update', status: 'backlog',
          priority: 'low', assignee: 'Sam', tags: [], createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    }));
  });

  it('filters by priority', async () => {
    const user = userEvent.setup();
    renderApp(<App />);

    await waitFor(() => expect(screen.getByText('High bug')).toBeInTheDocument());

    await user.selectOptions(screen.getByLabelText(/^Priority$/), 'high');

    await waitFor(() => {
      expect(screen.getByText('High bug')).toBeInTheDocument();
      expect(screen.queryByText('Write docs')).not.toBeInTheDocument();
    });
  });
});
