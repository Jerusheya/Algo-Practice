import type { Task, TaskPriority, TaskStatus } from './types';

export interface Filters {
  statuses: TaskStatus[];
  priority: TaskPriority | 'all';
  search: string;
  sortField: 'createdAt' | 'updatedAt' | 'priority';
  sortOrder: 'asc' | 'desc';
}

export const DEFAULT_FILTERS: Filters = {
  statuses: ['backlog', 'in_progress', 'done'],
  priority: 'all',
  search: '',
  sortField: 'updatedAt',
  sortOrder: 'desc',
};

const PRIORITY_RANK: Record<TaskPriority, number> = { low: 1, medium: 2, high: 3 };

export function filtersFromParams(params: URLSearchParams): Filters {
  const statuses = params.get('status')?.split(',').filter(
    (s): s is TaskStatus => ['backlog', 'in_progress', 'done'].includes(s),
  );
  const priority = params.get('priority');
  const sort = params.get('sort');
  const order = params.get('order');

  return {
    statuses: statuses?.length ? statuses : DEFAULT_FILTERS.statuses,
    priority: priority === 'low' || priority === 'medium' || priority === 'high' ? priority : 'all',
    search: params.get('search') ?? '',
    sortField: sort === 'createdAt' || sort === 'priority' ? sort : 'updatedAt',
    sortOrder: order === 'asc' ? 'asc' : 'desc',
  };
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.statuses.length < 3) p.set('status', filters.statuses.join(','));
  if (filters.priority !== 'all') p.set('priority', filters.priority);
  if (filters.search.trim()) p.set('search', filters.search.trim());
  if (filters.sortField !== 'updatedAt') p.set('sort', filters.sortField);
  if (filters.sortOrder !== 'desc') p.set('order', filters.sortOrder);
  return p;
}

export function matchFilters(task: Task, filters: Filters): boolean {
  if (!filters.statuses.includes(task.status)) return false;
  if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
  const q = filters.search.trim().toLowerCase();
  if (q && !task.title.toLowerCase().includes(q) && !task.description.toLowerCase().includes(q)) {
    return false;
  }
  return true;
}

export function sortTasks(tasks: Task[], filters: Filters): Task[] {
  const list = [...tasks];
  list.sort((a, b) => {
    let cmp = 0;
    if (filters.sortField === 'priority') {
      cmp = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    } else {
      cmp = new Date(a[filters.sortField]).getTime() - new Date(b[filters.sortField]).getTime();
    }
    return filters.sortOrder === 'asc' ? cmp : -cmp;
  });
  return list;
}

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.statuses.length < 3 ||
    filters.priority !== 'all' ||
    filters.search.trim() !== '' ||
    filters.sortField !== 'updatedAt' ||
    filters.sortOrder !== 'desc'
  );
}
