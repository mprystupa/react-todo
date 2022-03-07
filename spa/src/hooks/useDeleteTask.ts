import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Task } from '../TaskList/TaskListEntry';
import { tasksQueryName } from './queryNames';

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, number, () => void>(
    (taskId) => axios.delete(`/todos/${taskId}`).then((res) => res.data),
    {
      onError: (_, __, rollback) => rollback && rollback(),
      onSuccess: (_, taskId) => {
        const previousTasks = queryClient.getQueryData<Task[]>(tasksQueryName);
        const optimisticTasks = previousTasks?.filter(
          (task) => task.id !== taskId
        );

        // On the frontend, we assume that we successfully deleted a task and then re-fetch to update with actual server state
        queryClient.setQueryData(tasksQueryName, optimisticTasks);
        queryClient.invalidateQueries(tasksQueryName);
      },
    }
  );
};

export default useDeleteTask;
