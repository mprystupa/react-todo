import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import FlexBox from '../Common/FlexBox';
import useTasks from '../hooks/useTasks';
import { Task, TaskListEntry } from '../TaskList/TaskListEntry';
import TaskList from '../TaskList/TaskList';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

const SearchTasks: React.FC = () => {
  const { tasks } = useTasks();

  const [searchText, setSearchText] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) => task.name.includes(searchText.trim()))
    );
  }, [searchText, tasks]);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', gap: '40px' }}>
      ToDos: {tasks.length}
      <FlexBox>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Search>
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.map((task) => (
          <TaskListEntry
            key={task.id}
            task={task}
            onEditTask={(_) => {}}
            onDeleteTask={(_) => {}}
            readOnly
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default SearchTasks;
