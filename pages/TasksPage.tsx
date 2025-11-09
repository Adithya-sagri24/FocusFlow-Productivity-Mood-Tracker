import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAppStore } from '../store/useAppStore';
import type { Task } from '../types';
import TaskItem from '../components/TaskItem';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const session = useAppStore((state) => state.session);

    const fetchTasks = useCallback(async () => {
        if (!session?.user) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', session.user.id)
                .order('inserted_at', { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session?.user]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim() || !session?.user) return;

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{ title: newTaskTitle, user_id: session.user.id }])
                .select();

            if (error) throw error;
            
            if (data) {
                setTasks([data[0], ...tasks]);
            }
            setNewTaskTitle('');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleToggleTask = async (id: number, is_completed: boolean) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ is_completed })
                .eq('id', id);
            if (error) throw error;
            setTasks(tasks.map(t => t.id === id ? { ...t, is_completed } : t));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>
            <Card>
                <div className="p-6">
                    <form onSubmit={handleAddTask} className="flex gap-3 mb-6">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                        <Button type="submit">Add Task</Button>
                    </form>

                    {loading && <p>Loading tasks...</p>}
                    {error && <p className="text-red-400">{error}</p>}
                    
                    <div className="space-y-3">
                        {tasks.map(task => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                onToggle={handleToggleTask} 
                                onDelete={handleDeleteTask} 
                            />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TasksPage;
