import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Task, TaskStatus } from '../types';
import {
  DEFAULT_FILTERS,
  filtersFromParams,
  filtersToParams,
  hasActiveFilters,
  matchFilters,
  sortTasks,
  type Filters,
} from '../urlParams';

export function useTaskFilters(tasks: Task[]) {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const filters = useMemo(() => filtersFromParams(params), [params]);

  useEffect(() => {
    const t = setTimeout(() => setSearch(filters.search), 300);
    return () => clearTimeout(t);
  }, [filters.search]);

  const active: Filters = useMemo(
    () => ({ ...filters, search }),
    [filters, search],
  );

  const filtered = useMemo(() => {
    const matched = tasks.filter((t) => matchFilters(t, active));
    return sortTasks(matched, active);
  }, [tasks, active]);

  const byStatus = useMemo(() => {
    const groups: Record<TaskStatus, Task[]> = {
      backlog: [],
      in_progress: [],
      done: [],
    };
    for (const task of filtered) {
      groups[task.status].push(task);
    }
    return groups;
  }, [filtered]);

  const update = useCallback(
    (patch: Partial<Filters>) => {
      setParams(filtersToParams({ ...filters, ...patch }), { replace: true });
    },
    [filters, setParams],
  );

  const clear = useCallback(() => setParams({}, { replace: true }), [setParams]);

  return {
    filters,
    update,
    clear,
    filtered,
    byStatus,
    hasActiveFilters: hasActiveFilters(filters),
    hasTasks: tasks.length > 0,
    hasVisible: filtered.length > 0,
  };
}

export { DEFAULT_FILTERS };
