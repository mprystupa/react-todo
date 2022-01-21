import FlexBox from '../Common/FlexBox';
import useTasks from '../hooks/useTasks';

const SearchTasks: React.FC = () => {
  const { tasks, loading } = useTasks();

  return <FlexBox>ToDos: {tasks.length}</FlexBox>;
};

export default SearchTasks;
