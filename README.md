# jira-todos

Todos and reminders in a JIRA-like format.

## API

Users follow this interface:

```typescript
{
    username: string,  // A lowercase and url-safe string to uniquely identify users.
    name: string,      // A display name. Optional and same as username by default.
    tasks: Array<Task> // An array of all the user's tasks (both present and complete)
}
```

Tasks:

```typescript
{
    id: number                // A unique ID to represent to todo.
    title: string,            // A 1-sentence description of the task.
    description: string?,     // A longer description, possibly including requirements or steps. Optional.
    status: Status as number, // A memebr of the status enum representing the what step of completion the task is in.
    due: string?,             // The date the task is due, in the format "YYYY/MM/DD". Optional.
    difficulty: number?       // The relative difficulty of the task. Difficulty is determined in batches and coordinates to relative time to complete.
}
```

Statuses:

```typescript
enum Status {
    NotStarted = 0,
    InProgress = 1,
    Complete   = 2,
    Canceled   = 3
}
```

## Todos

- [X] User accounts
- [ ] Basic displays
- [ ] Adding new tasks
- [ ] Linking tasks
- [ ] Backlogs/buckets
- [ ] Notifications via ntfy.sh
- [ ] Relative difficulty setting in a session
## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the [LICENSE](./LICENSE) file for details.
