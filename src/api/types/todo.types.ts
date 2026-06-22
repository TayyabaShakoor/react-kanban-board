export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoCreatePayload {
  userId: number;
  title: string;
  completed?: boolean;
}