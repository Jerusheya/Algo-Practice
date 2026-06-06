# Architecture Notes

## Component tree

```
App
├── TaskProvider / ToastProvider
│   ├── StorageBanner
│   ├── FilterBar
│   ├── Board
│   │   └── TaskCard (per task)
│   └── TaskModal
│       └── form with Field components
```

## Storage migration

Saved JSON shape:

```json
{ "schemaVersion": 2, "tasks": [...] }
```

Version 1 tasks only had `id`, `title`, and `status`. On load, `storage.ts` fills in defaults (`description: ''`, `priority: 'medium'`, etc.) and re-saves as version 2.

## Custom hooks

| Hook | Purpose |
|------|---------|
| `useTaskFilters` | Filter, sort, debounced search, URL query sync |
| `useDirtyForm` | Track unsaved edits + `beforeunload` warning |

## Performance note

Filter/sort results are memoized in `useTaskFilters` so typing in search does not rebuild the full task list on every keystroke (debounced 300ms).

## Refactor example

Earlier versions split the board into `BoardView`, `BoardColumn`, and separate utility folders. These were merged into a single `Board.tsx` and flat `storage.ts` / `validation.ts` files to keep the codebase easier to read for a small app.
