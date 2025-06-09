export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  assignedTo?: string | null;
  dueDate?: string | null;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface TodoListResponse {
  data: Todo[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    pages: number;
    currentPage: number;
  };
}

export interface TodoFilters {
  completed?: boolean;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  limit?: number;
  offset?: number;
}