const BASE_URL = 'https://task-manager-backend-qqxr.onrender.com/api';

export const api = {
  async getTasks(address: string) {
    try {
      console.log('Fetching tasks for address:', address);
      console.log('Fetch URL:', `${BASE_URL}/tasks?address=${address}`);
      
      const response = await fetch(`${BASE_URL}/tasks?address=${address}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      console.log('Fetched tasks:', data);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async createTask(data: any) {
    try {
      console.log('Creating task with data:', data);
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to create task');
      }
      
      const result = await response.json();
      console.log('Created task:', result);
      return result;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
};