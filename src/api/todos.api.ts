import { apiClient } from './client';
import type { Todo, CreateTodoInput, TodoListResponse, TodoFilters } from '../types/todo.types';

export const todosApi = {
  list: async (filters?: TodoFilters): Promise<TodoListResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await apiClient.get<TodoListResponse>(`/todo/list?${params}`);
    return response.data;
  },

  create: async (input: CreateTodoInput): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todo/create', input);
    return response.data;
  },

  complete: async (id: number): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todo/complete', { id });
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.post('/todo/remove', { id });
  },
};