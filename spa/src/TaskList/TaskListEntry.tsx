import {
  Card,
  CardContent,
  ClickAwayListener,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useState } from 'react';
import FlexBox from '../Common/FlexBox';

export interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

export interface PostTask extends Omit<Task, 'id'> {
  id?: number;
}

export interface TaskListEntryProps {
  task: Task;
  readOnly?: boolean;
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export const TaskListEntry: React.FC<TaskListEntryProps> = ({
  task,
  readOnly,
  onEditTask,
  onDeleteTask,
}) => {
  const [taskName, setTaskName] = useState<string | undefined>(task.name);
  const [editMode, setEditMode] = useState<boolean>();

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'Enter' && taskName !== undefined && taskName?.trim() !== '') {
      onEditTask({ ...task, name: taskName });
      setEditMode(false);
    }
  };

  return (
    <FlexBox>
      <ClickAwayListener onClickAway={(e) => setEditMode(false)}>
        <Card
          sx={{
            width: '100%',
            backgroundColor: readOnly ? 'lightgray' : 'white',
            transition: 'background-color 0.5s ease',
          }}
          onClick={(e) => setEditMode(true)}
        >
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {editMode && (
              <TextField
                fullWidth
                id="outlined-basic"
                label="Edit task"
                variant="outlined"
                onChange={(e) => setTaskName(e.target.value)}
                onKeyUp={keyUp}
                value={taskName}
              />
            )}
            {!editMode && (
              <Typography sx={{ fontSize: 14 }}>{task.name}</Typography>
            )}
            <IconButton
              color="default"
              component="span"
              onClick={() => onDeleteTask(task.id)}
              disabled={readOnly}
            >
              <DeleteForeverIcon />
            </IconButton>
          </CardContent>
        </Card>
      </ClickAwayListener>
    </FlexBox>
  );
};
