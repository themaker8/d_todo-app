'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}

export default function TaskList({ address }: { address: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks(address);
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.deleteTask(taskId, address);
      await fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  useEffect(() => {
    if (address) {
      fetchTasks();
    }
  }, [address]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-lg shadow-sm border hover:shadow transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-sm text-gray-500">
                      {task.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}