import './App.css';
import { AddTask } from './AddTask/AddTask';
import FlexBox from './Common/FlexBox';
import TaskList from './TaskList/TaskList';
import Logo from './Logo/Logo';

function App() {
  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'lightblue',
      }}
    >
      <FlexBox
        sx={{
          width: '50%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <Logo />
        <TaskList />
      </FlexBox>
    </FlexBox>
  );
}

export default App;
