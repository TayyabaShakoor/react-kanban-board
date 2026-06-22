import { apiClient } from '../client';
import type { Todo, TodoCreatePayload } from '../types/todo.types';

export const todosApi = {
  // GET all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>('/todos?_limit=8');
    return response.data;
  },

  // GET todos by user
  getTodosByUser: async (userId: number): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>(`/todos?userId=${userId}`);
    return response.data;
  },

  // CREATE todo
  createTodo: async (payload: TodoCreatePayload): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', payload);
    return response.data;
  },

  // UPDATE todo (toggle completed)
  toggleTodo: async (id: number, completed: boolean): Promise<Todo> => {
    const response = await apiClient.patch<Todo>(`/todos/${id}`, { completed });
    return response.data;
  },

  // DELETE todo
  deleteTodo: async (id: number): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};  