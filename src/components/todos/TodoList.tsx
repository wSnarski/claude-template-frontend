import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import type { Todo } from '../../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: number) => void;
  onRemove: (id: number) => void;
  isLoading?: boolean;
  error?: Error | null;
  updatingId?: number | null;
  onAddClick?: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onComplete,
  onRemove,
  isLoading,
  error,
  updatingId,
  onAddClick,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading todos: {error.message}
      </Alert>
    );
  }

  if (todos.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          backgroundColor: 'grey.50',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No todos yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create your first todo to get started
        </Typography>
        {onAddClick && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAddClick}
          >
            Add Your First Todo
          </Button>
        )}
      </Paper>
    );
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Your Todos
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body2" color="text.secondary">
          {activeCount} active, {completedCount} completed
        </Typography>
      </Box>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onRemove={onRemove}
          isUpdating={updatingId === todo.id}
        />
      ))}
    </Box>
  );
};