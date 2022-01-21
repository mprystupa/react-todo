import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import FlexBox from '../Common/FlexBox';

export interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

export interface TaskListEntryProps {
  task: Task;
  onDeleteTask: (taskId: number) => void;
}

export const TaskListEntry: React.FC<TaskListEntryProps> = ({
  task,
  onDeleteTask,
}) => {
  return (
    <FlexBox>
      <Card sx={{ width: '100%' }}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: 14 }}>{task.name}</Typography>
          <IconButton
            color="default"
            component="span"
            onClick={() => onDeleteTask(task.id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </CardContent>
      </Card>
    </FlexBox>
  );
};
