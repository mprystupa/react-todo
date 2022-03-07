export const tasksQueryName = 'tasks';
export const getTaskByIdQueryName = (taskId: number) => [
  tasksQueryName,
  taskId,
];
