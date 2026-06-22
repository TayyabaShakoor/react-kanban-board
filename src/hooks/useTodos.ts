import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi } from '../api/endpoints/todos.api';
import type { Todo } from '../api/types/todo.types';

const TODOS_QUERY_KEY = ['todos'];

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: TODOS_QUERY_KEY,
    queryFn: todosApi.getTodos,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (oldData) => {
        return oldData ? [newTodo, ...oldData] : [newTodo];
      });
    },
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.toggleTodo(id, completed),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (oldData) => {
        return oldData?.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        ) ?? [];
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.deleteTodo,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (oldData) => {
        return oldData?.filter((todo) => todo.id !== deletedId) ?? [];
      });
    },
  });
}