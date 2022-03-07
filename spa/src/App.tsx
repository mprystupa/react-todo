import './App.css';
import { Divider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import FlexBox from './Common/FlexBox';
import TaskList from './TaskList/TaskList';
import Logo from './Logo/Logo';
import SearchTasks from './SearchTasks/SearchTasks';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FlexBox
        sx={{
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'lightblue',
        }}
      >
        <FlexBox
          sx={{
            width: '60%',
            height: '100%',
            margin: '0 40px',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <Logo />
          <TaskList />
        </FlexBox>

        <Divider orientation="vertical" />

        <FlexBox
          sx={{
            width: '30%',
            height: '100%',
            margin: '0 40px',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <SearchTasks />
        </FlexBox>
      </FlexBox>
    </QueryClientProvider>
  );
}

export default App;
