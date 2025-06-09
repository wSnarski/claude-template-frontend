import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { TodoForm } from '../components/todos/TodoForm';
import { TodoList } from '../components/todos/TodoList';
import { useTodos, useCreateTodo, useCompleteTodo, useRemoveTodo } from '../hooks/use-todos';
import type { CreateTodoInput } from '../types/todo.types';

export const TodosView: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const { data: todosData, isLoading, error: fetchError } = useTodos();
  const createTodoMutation = useCreateTodo();
  const completeTodoMutation = useCompleteTodo();
  const removeTodoMutation = useRemoveTodo();

  const handleCreateTodo = async (input: CreateTodoInput) => {
    try {
      await createTodoMutation.mutateAsync(input);
    } catch {
      setError('Failed to create todo');
    }
  };

  const handleCompleteTodo = async (id: number) => {
    setUpdatingId(id);
    try {
      await completeTodoMutation.mutateAsync(id);
    } catch {
      setError('Failed to complete todo');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveTodo = async (id: number) => {
    setUpdatingId(id);
    try {
      await removeTodoMutation.mutateAsync(id);
    } catch {
      setError('Failed to remove todo');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Todos
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
        gap: { xs: 0, lg: 4 },
        alignItems: 'start'
      }}>
        <Box>
          <TodoForm
            onSubmit={handleCreateTodo}
            isLoading={createTodoMutation.isPending}
          />
        </Box>
        
        <Box>
          <TodoList
            todos={todosData?.data || []}
            onComplete={handleCompleteTodo}
            onRemove={handleRemoveTodo}
            isLoading={isLoading}
            error={fetchError}
            updatingId={updatingId}
          />
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};