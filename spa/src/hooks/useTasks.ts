import { useState } from 'react';
import { Task } from '../TaskList';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | undefined>();

  const fetchTasks = async () => {
    try {
    } catch (err: Error) {}
  };
};
