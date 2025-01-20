const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

export const api = {
  async getTasks(address: string) {
    try {
      const response = await fetch(`${BASE_URL}/tasks?address=${address}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async createTask(data: any) {
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create task');
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async deleteTask(taskId: string, address: string) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) throw new Error('Failed to delete task');
      return await response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  async toggleTask(taskId: string, address: string) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) throw new Error('Failed to toggle task');
      return await response.json();
    } catch (error) {
      console.error('Error toggling task:', error);
      throw error;
    }
  }
};