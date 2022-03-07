import axios from 'axios';
import { useQuery } from 'react-query';
import { Task } from '../TaskList';
import { tasksQueryName } from './queryNames';

const useTasks = () =>
  useQuery<Task[]>(tasksQueryName, () =>
    axios.get('/todos').then((res) => res.data as Task[])
  );

export default useTasks;
