import { AddTask } from '../AddTask/AddTask';
import FlexBox from '../Common/FlexBox';
import useAddTask from '../hooks/useAddTask';
import useDeleteTask from '../hooks/useDeleteTask';
import useTasks from '../hooks/useTasks';
import useUpdateTask from '../hooks/useUpdateTask';
import { PostTask, TaskListEntry } from './TaskListEntry';

const TaskList: React.FC = () => {
  const tasksQuery = useTasks();
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const addNewTask = (taskName: string) => {
    const newTask: PostTask = {
      name: taskName,
      isComplete: false,
    };

    addTaskMutation.mutate(newTask);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', gap: '10px' }}>
      <AddTask onAddTask={addNewTask} />
      {tasksQuery.data?.map((task) => (
        <TaskListEntry
          key={task.id}
          task={task}
          onEditTask={updateTaskMutation.mutate}
          onDeleteTask={deleteTaskMutation.mutate}
          readOnly={tasksQuery.isLoading}
        />
      ))}
    </FlexBox>
  );
};

export default TaskList;
