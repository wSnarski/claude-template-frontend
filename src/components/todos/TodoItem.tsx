import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Checkbox,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import { Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import type { Todo } from '../../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: number) => void;
  onRemove: (id: number) => void;
  isUpdating?: boolean;
}

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
} as const;

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onComplete,
  onRemove,
  isUpdating,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState(false);

  const handleComplete = () => {
    if (!todo.completed) {
      onComplete(todo.id);
    }
  };

  return (
    <Card
      elevation={todo.completed ? 0 : 1}
      sx={{
        mb: 2,
        opacity: todo.completed ? 0.7 : 1,
        transition: 'all 0.3s ease',
        backgroundColor: todo.completed ? theme.palette.grey[50] : 'white',
        '&:hover': {
          transform: todo.completed ? 'none' : 'translateY(-2px)',
          boxShadow: todo.completed ? 'none' : theme.shadows[3],
        },
      }}
    >
      <CardContent sx={{ pb: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="flex-start" gap={1}>
          <Checkbox
            checked={todo.completed}
            onChange={handleComplete}
            disabled={isUpdating || todo.completed}
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircle />}
            sx={{ mt: -0.5 }}
          />
          
          <Box flexGrow={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              flexWrap="wrap"
              gap={1}
              onClick={() => setExpanded(!expanded)}
              sx={{ cursor: todo.description ? 'pointer' : 'default' }}
            >
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                  flexGrow: 1,
                }}
              >
                {todo.title}
              </Typography>
              
              <Box display="flex" gap={1} alignItems="center">
                <Chip
                  label={todo.priority}
                  size="small"
                  color={priorityColors[todo.priority]}
                  sx={{ height: 24 }}
                />
                {!isMobile && todo.assignedTo && (
                  <Typography variant="caption" color="text.secondary">
                    {todo.assignedTo}
                  </Typography>
                )}
              </Box>
            </Box>

            {todo.description && (
              <Collapse in={expanded}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, ml: 0 }}
                >
                  {todo.description}
                </Typography>
              </Collapse>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="caption" color="text.secondary">
                {new Date(todo.createdAt).toLocaleDateString()}
              </Typography>
              
              <IconButton
                size="small"
                onClick={() => onRemove(todo.id)}
                disabled={isUpdating}
                color="error"
                sx={{ ml: 'auto' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};