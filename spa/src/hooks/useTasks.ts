import axios from 'axios';
import { useEffect, useState } from 'react';
import { PostTask, Task } from '../TaskList';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasksResponse = await axios.get('/todos');

      if (tasksResponse.data as Task[]) {
        setLoading(false);
        setTasks(tasksResponse.data);
      }
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (newTask: PostTask) => {
    try {
      const postResponse = await axios.post('/todos', newTask);

      if (postResponse.status >= 200 && postResponse.status < 300) {
        await fetchTasks();
      }
    } catch (err: any) {
      setError(err);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const putResponse = await axios.put(
        `/todos/${updatedTask.id}`,
        updatedTask
      );

      if (putResponse.status >= 200 && putResponse.status < 300) {
        await fetchTasks();
      }
    } catch (err: any) {
      setError(err);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const deleteResponse = await axios.delete(`/todos/${taskId}`);

      if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
        await fetchTasks();
      }
    } catch (err: any) {
      setError(err);
    }
  };

  return { tasks, error, loading, addTask, updateTask, deleteTask };
};

export default useTasks;
