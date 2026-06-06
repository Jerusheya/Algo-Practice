import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Select, TextArea, TextInput } from '../components/ui/Field';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { useTasks } from '../context/TaskContext';
import { useDirtyForm } from '../hooks/useDirtyForm';
import type { Task } from '../types';
import { PRIORITY_LABELS, STATUS_LABELS, STATUSES } from '../types';
import { emptyForm, taskToForm, validateForm } from '../validation';
import styles from './TaskModal.module.css';

interface Props {
  open: boolean;
  task?: Task;
  onClose: () => void;
}

export function TaskModal({ open, task, onClose }: Props) {
  const { addTask, updateTask } = useTasks();
  const { toast } = useToast();
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const initial = task ? taskToForm(task) : emptyForm();
  const { values, isDirty, setField, reset, setIsDirty } = useDirtyForm(initial);
  const [errors, setErrors] = useState<ReturnType<typeof validateForm>>({});
  const [tried, setTried] = useState(false);

  useEffect(() => {
    reset(task ? taskToForm(task) : emptyForm());
    setErrors({});
    setTried(false);
  }, [task, open, reset]);

  const handleClose = () => {
    if (isDirty) setConfirmDiscard(true);
    else onClose();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    const errs = validateForm(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (task) {
      updateTask(task.id, values);
      toast('Task saved', 'success');
    } else {
      addTask(values);
      toast('Task created', 'success');
    }
    setIsDirty(false);
    onClose();
  };

  return (
    <>
      <Modal open={open && !confirmDiscard} title={task ? 'Edit task' : 'New task'} onClose={handleClose}>
        <form onSubmit={submit} className={styles.form} noValidate>
          {tried && Object.keys(errors).length > 0 && (
            <p role="alert" className={styles.summary}>Please fix the errors below.</p>
          )}
          <TextInput label="Title" value={values.title} onChange={(e) => setField('title', e.target.value)} error={errors.title} />
          <TextArea label="Description" value={values.description} onChange={(e) => setField('description', e.target.value)} error={errors.description} />
          <div className={styles.row}>
            <Select label="Status" value={values.status} onChange={(e) => setField('status', e.target.value as Task['status'])}
              options={STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))} />
            <Select label="Priority" value={values.priority} onChange={(e) => setField('priority', e.target.value as Task['priority'])}
              options={Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label }))} />
          </div>
          <TextInput label="Assignee" value={values.assignee} onChange={(e) => setField('assignee', e.target.value)} />
          <TextInput label="Tags" placeholder="Comma-separated" value={values.tags} onChange={(e) => setField('tags', e.target.value)} />
          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit">{task ? 'Save' : 'Create task'}</Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={confirmDiscard}
        title="Discard changes?"
        onClose={() => setConfirmDiscard(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDiscard(false)}>Keep editing</Button>
            <Button variant="destructive" onClick={() => { setConfirmDiscard(false); setIsDirty(false); onClose(); }}>Discard</Button>
          </>
        }
      >
        <p>You have unsaved changes.</p>
      </Modal>
    </>
  );
}
