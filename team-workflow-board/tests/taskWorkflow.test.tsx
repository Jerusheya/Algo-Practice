import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../src/App';
import { renderApp, seedEmpty, setupStorage } from './testUtils';

describe('create task workflow', () => {
  beforeEach(() => {
    setupStorage();
    seedEmpty();
  });

  it('creates a task and shows it on the board', async () => {
    const user = userEvent.setup();
    renderApp(<App />);

    await waitFor(() => expect(screen.getByText('No tasks yet')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: /new task/i }));
    await user.type(screen.getByLabelText(/^Title$/), 'Fix bug');
    await user.type(screen.getByLabelText(/^Description$/), 'Something is broken');
    await user.click(screen.getByRole('button', { name: /create task/i }));

    await waitFor(() => expect(screen.getByText('Fix bug')).toBeInTheDocument());
    expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument();
  });
});
