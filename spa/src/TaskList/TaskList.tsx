import { AddTask } from '../AddTask/AddTask';
import FlexBox from '../Common/FlexBox';
import useTasks from '../hooks/useTasks';
import { PostTask, TaskListEntry } from './TaskListEntry';

const TaskList: React.FC = () => {
  const { tasks, error, loading, addTask, updateTask, deleteTask } = useTasks();

  const addNewTask = (taskName: string) => {
    const newTask: PostTask = {
      name: taskName,
      isComplete: false,
    };

    addTask(newTask);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', gap: '10px' }}>
      <AddTask onAddTask={addNewTask} />
      {tasks.map((task) => (
        <TaskListEntry
          key={task.id}
          task={task}
          onEditTask={updateTask}
          onDeleteTask={deleteTask}
          readOnly={loading}
        />
      ))}
    </FlexBox>
  );
};

export default TaskList;
