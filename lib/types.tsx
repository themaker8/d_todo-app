export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}