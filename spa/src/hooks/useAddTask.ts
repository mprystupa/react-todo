import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { PostTask, Task } from '../TaskList/TaskListEntry';
import { tasksQueryName } from './queryNames';

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, PostTask, () => void>(
    (task: PostTask) => axios.post('/todos', task).then((res) => res.data),
    {
      onMutate: (task) => {
        queryClient.cancelQueries(tasksQueryName);

        const oldTasks = queryClient.getQueryData<Task[]>(tasksQueryName);

        // We are generating stale task with frontend generated ID, to be replaced by backend fetch
        const staleIdTask: Task = {
          ...task,
          id:
            (oldTasks?.map((oldTask) => oldTask.id).sort((a, b) => a - b)[0] ??
              0) + 1,
        };

        queryClient.setQueryData<Task[]>(tasksQueryName, (staleData) => {
          return [...(staleData ?? []), staleIdTask];
        });

        return () => queryClient.setQueryData(tasksQueryName, oldTasks);
      },
      onError: (_, __, rollback) => rollback && rollback(),
      onSuccess: () => queryClient.invalidateQueries(tasksQueryName),
    }
  );
};

export default useAddTask;
