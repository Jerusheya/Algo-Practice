import type { Task, TaskFormValues } from './types';

export function validateForm(values: TaskFormValues): Partial<Record<keyof TaskFormValues, string>> {
  const errors: Partial<Record<keyof TaskFormValues, string>> = {};

  if (!values.title.trim()) {
    errors.title = 'Title is required';
  } else if (values.title.length > 100) {
    errors.title = 'Title must be 100 characters or fewer';
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required';
  } else if (values.description.length > 2000) {
    errors.description = 'Description must be 2000 characters or fewer';
  }

  return errors;
}

export function formToTaskFields(values: TaskFormValues) {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    status: values.status,
    priority: values.priority,
    assignee: values.assignee.trim(),
    tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean),
  };
}

export function taskToForm(task: Task): TaskFormValues {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assignee: task.assignee,
    tags: task.tags.join(', '),
  };
}

export function emptyForm(status: Task['status'] = 'backlog'): TaskFormValues {
  return {
    title: '',
    description: '',
    status,
    priority: 'medium',
    assignee: '',
    tags: '',
  };
}
