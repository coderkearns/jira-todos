# jira-todos

Todos and reminders in a JIRA-like format.

## API

Todos currently have the following interface:

```typescript
{
    title: string,                // A 1-sentence description of the task
    description: string?,         // A longer description, possibly including requirements or steps. Optional.
    due: `<year>/<month>/<day>`?, // The date the task is due, in the format "YYYY/MM/DD". Optional.
    difficulty: number?           // The relative difficulty of the task. Difficulty is determined in batches and coordinates to relative time to complete.
}
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the [LICENSE](./LICENSE) file for details.
