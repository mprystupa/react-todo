import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Task } from '../TaskList';
import { getTaskByIdQueryName, tasksQueryName } from './queryNames';

const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, Task, () => void>(
    (task: Task) =>
      axios.put(`/todos/${task.id}`, task).then((res) => res.data),
    {
      onMutate: (task) => {
        // Let's stop all of the queries being made to the backend...
        queryClient.cancelQueries(tasksQueryName);

        // ...and update stale data in the cache!
        const oldTask = queryClient.getQueryData<Task>(
          getTaskByIdQueryName(task.id)
        );
        queryClient.setQueryData<Task>(getTaskByIdQueryName(task.id), task);

        // We have to handle the error, so we rollback to old value of task
        return () =>
          queryClient.setQueryData(getTaskByIdQueryName(task.id), oldTask);
      },
      onError: (_, __, rollback) => rollback && rollback(),
      onSuccess: (_, task: Task) => {
        queryClient.invalidateQueries(tasksQueryName);
        queryClient.invalidateQueries(getTaskByIdQueryName(task.id));
      },
    }
  );
};

export default useUpdateTask;
