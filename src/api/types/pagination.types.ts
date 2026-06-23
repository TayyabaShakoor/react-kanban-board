/**
 * Generic pagination response interface
 * Uses TypeScript Generics (<T>) for type safety
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * API response wrapper with pagination metadata
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: PaginatedResponse<T>;
}