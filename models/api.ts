export type ApiResponse<T> = {
  data?: T;
  status: 200 | 500;
  message?: string;
};
