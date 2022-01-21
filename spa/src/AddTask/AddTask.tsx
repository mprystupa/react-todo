import { TextField } from '@mui/material';
import { useState } from 'react';
import FlexBox from '../Common/FlexBox';

export interface AddTaskProps {
  onAddTask: (taskName: string) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState<string>('');

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'Enter' && taskName.trim() !== '') {
      onAddTask(taskName);
      setTaskName('');
    }
  };

  return (
    <FlexBox sx={{ width: '100%' }}>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Add new task"
        variant="outlined"
        onChange={(e) => setTaskName(e.target.value)}
        onKeyUp={keyUp}
        value={taskName}
      />
    </FlexBox>
  );
};
