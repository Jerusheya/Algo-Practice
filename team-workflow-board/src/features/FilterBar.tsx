import { Button } from '../components/ui/Button';
import { Select, TextInput } from '../components/ui/Field';
import { useTasks } from '../context/TaskContext';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { PRIORITY_LABELS, STATUSES, STATUS_LABELS } from '../types';
import type { TaskPriority, TaskStatus } from '../types';
import styles from './FilterBar.module.css';

export function FilterBar() {
  const { tasks } = useTasks();
  const { filters, update, clear, hasActiveFilters } = useTaskFilters(tasks);

  const toggleStatus = (status: TaskStatus) => {
    const next = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    if (next.length) update({ statuses: next });
  };

  return (
    <div className={styles.bar} role="search">
      <TextInput
        label="Search"
        placeholder="Title or description..."
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
      />

      <fieldset className={styles.statuses}>
        <legend>Status</legend>
        {STATUSES.map((s) => (
          <label key={s}>
            <input
              type="checkbox"
              checked={filters.statuses.includes(s)}
              onChange={() => toggleStatus(s)}
            />
            {STATUS_LABELS[s]}
          </label>
        ))}
      </fieldset>

      <Select
        label="Priority"
        value={filters.priority}
        onChange={(e) => update({ priority: e.target.value as TaskPriority | 'all' })}
        options={[
          { value: 'all', label: 'All' },
          ...Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label })),
        ]}
      />

      <Select
        label="Sort by"
        value={filters.sortField}
        onChange={(e) => update({ sortField: e.target.value as typeof filters.sortField })}
        options={[
          { value: 'updatedAt', label: 'Updated' },
          { value: 'createdAt', label: 'Created' },
          { value: 'priority', label: 'Priority' },
        ]}
      />

      <Select
        label="Order"
        value={filters.sortOrder}
        onChange={(e) => update({ sortOrder: e.target.value as 'asc' | 'desc' })}
        options={[
          { value: 'desc', label: 'Newest first' },
          { value: 'asc', label: 'Oldest first' },
        ]}
      />

      {hasActiveFilters && (
        <Button variant="secondary" size="sm" onClick={clear}>Clear filters</Button>
      )}
    </div>
  );
}
