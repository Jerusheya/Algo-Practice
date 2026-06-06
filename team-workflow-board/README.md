# Team Workflow Board

A simple React + TypeScript kanban board with a small UI component library. Tasks persist in `localStorage`.

## Run

```bash
npm install
npm run dev    # http://localhost:5173
npm test
npm run build
```

## Structure

```
src/
  components/ui/   Button, Field (TextInput/TextArea/Select), Tag, Card, Modal, Toast
  context/         TaskProvider — load/save tasks
  features/        Board, FilterBar, TaskModal, StorageBanner
  hooks/           useTaskFilters (URL sync), useDirtyForm
  types.ts         Task model and labels
  storage.ts       localStorage + v1→v2 migration
  validation.ts    Form validation
  urlParams.ts     Filter/sort URL helpers
```

## Decisions

- **State:** React Context for tasks; filters live in a custom hook synced to the URL via React Router.
- **No UI kit:** All components are hand-built with CSS Modules.
- **Migration:** Older saves with only `{ id, title, status }` are upgraded on load; a toast notifies the user.

## Limitations

- Single browser, no backend sync
- Status changes via dropdown (no drag-and-drop)
- No delete task action

## AI assistance

Built with Cursor AI help for scaffolding and component structure. Simplified to match the assignment spec only — removed virtualization, seed data, and extra abstraction layers.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for more detail.
