import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAppStore } from '../store/useAppStore';
import type { Task } from '../types';
import TaskItem from './TaskItem';
import Card from './ui/Card';

const TaskWidget: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useAppStore((state) => state.session);

  const fetchTasks = useCallback(async () => {
    if (!session?.user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('is_completed', false)
        .order('inserted_at', { ascending: true })
        .limit(3);

      if (error) throw error;
      setTasks(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleTask = async (id: number, is_completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_completed })
        .eq('id', id);
      if (error) throw error;
      setTasks(tasks.filter(t => t.id !== id)); // Remove from widget when completed
    } catch (err: any) {
      console.error(err.message);
    }
  };


  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Today's Tasks</h2>
          <button onClick={onNavigate} className="text-sm text-purple-400 hover:underline">
            View All
          </button>
        </div>
        {loading && <p className="text-sm text-gray-400">Loading...</p>}
        {!loading && tasks.length === 0 && (
          <p className="text-sm text-gray-400">No pending tasks. Great job!</p>
        )}
        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="text-sm">
                <TaskItem 
                    task={task} 
                    onToggle={handleToggleTask}
                    onDelete={() => {}} // Delete handled in full tasks page
                />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TaskWidget;
