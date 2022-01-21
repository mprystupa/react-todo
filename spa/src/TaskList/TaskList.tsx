import { useState } from 'react';
import { AddTask } from '../AddTask/AddTask';
import FlexBox from '../Common/FlexBox';
import { Task, TaskListEntry } from './TaskListEntry';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'test',
      isComplete: false,
    },
    { id: 2, isComplete: false, name: 'test2' },
  ]);

  const addTask = (taskName: string) => {
    const newTask: Task = {
      id: tasks.length,
      name: taskName,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: number) => {
    const tasksAfterDelete = [...tasks];
    setTasks(tasksAfterDelete.filter((task) => task.id != taskId));
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', gap: '10px' }}>
      <AddTask onAddTask={addTask} />
      {tasks.map((task) => (
        <TaskListEntry task={task} onDeleteTask={deleteTask} />
      ))}
    </FlexBox>
  );
};

export default TaskList;
