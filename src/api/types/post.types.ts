// Strict TypeScript interfaces - NO "any" types allowed!
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostCreatePayload {
  userId: number;
  title: string;
  body: string;
}

export interface PostUpdatePayload {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
}

// For API response with metadata
export interface PostsApiResponse {
  data: Post[];
  total?: number;
  limit?: number;
  page?: number;
}