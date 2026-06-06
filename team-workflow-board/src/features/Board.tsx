import { formatDistanceToNow } from 'date-fns';
import { Select } from '../components/ui/Field';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { useTasks } from '../context/TaskContext';
import type { Task, TaskStatus } from '../types';
import { PRIORITY_LABELS, STATUSES, STATUS_LABELS } from '../types';
import styles from './Board.module.css';

interface BoardProps {
  onEdit: (task: Task) => void;
}

export function Board({ onEdit }: BoardProps) {
  const { tasks, setStatus } = useTasks();
  const { byStatus, hasTasks, hasVisible, hasActiveFilters, clear } = useTaskFilters(tasks);

  if (!hasTasks) {
    return (
      <div className={styles.empty}>
        <h2>No tasks yet</h2>
        <p>Create your first task to get started.</p>
      </div>
    );
  }

  if (!hasVisible) {
    return (
      <div className={styles.empty}>
        <h2>No tasks match your filters</h2>
        {hasActiveFilters && (
          <button type="button" className={styles.link} onClick={clear}>Clear filters</button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.board}>
      {STATUSES.map((status) => (
        <section key={status} className={styles.column} aria-label={STATUS_LABELS[status]}>
          <h2>{STATUS_LABELS[status]} <span className={styles.count}>{byStatus[status].length}</span></h2>
          <div className={styles.list}>
            {byStatus[status].length === 0 ? (
              <p className={styles.muted}>No tasks</p>
            ) : (
              byStatus[status].map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onStatusChange={(s) => setStatus(task.id, s)}
                />
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function TaskCard({
  task,
  onEdit,
  onStatusChange,
}: {
  task: Task;
  onEdit: (t: Task) => void;
  onStatusChange: (s: TaskStatus) => void;
}) {
  return (
    <Card
      tabIndex={0}
      aria-label={`Edit ${task.title}`}
      onClick={() => onEdit(task)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit(task);
        }
      }}
    >
      <div className={styles.cardTop}>
        <strong>{task.title}</strong>
        <Tag variant={task.priority}>{PRIORITY_LABELS[task.priority]}</Tag>
      </div>
      {task.assignee && <p className={styles.muted}>{task.assignee}</p>}
      {task.tags.length > 0 && (
        <div className={styles.tags}>
          {task.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      )}
      <p className={styles.muted}>
        Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
      </p>
      <div onClick={(e) => e.stopPropagation()}>
        <Select
          label="Status"
          value={task.status}
          options={STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
          onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
        />
      </div>
    </Card>
  );
}
