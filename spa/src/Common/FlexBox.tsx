import { Box, BoxProps } from '@mui/material';

const FlexBox: React.FC<BoxProps> = ({ sx, ...props }) => {
  return <Box sx={{ display: 'flex', ...sx }} {...props} />;
};

export default FlexBox;
