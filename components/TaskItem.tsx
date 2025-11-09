import React from 'react';
import type { Task } from '../types';
import { CheckIcon, TrashIcon } from './icons';
import IconButton from './ui/IconButton';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg">
      <button
        onClick={() => onToggle(task.id, !task.is_completed)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${task.is_completed ? 'border-green-500 bg-green-500' : 'border-gray-500'
          } flex items-center justify-center transition-all`}
      >
        {task.is_completed && <CheckIcon className="w-4 h-4 text-white" />}
      </button>
      <p className={`flex-grow ${task.is_completed ? 'line-through text-gray-500' : 'text-white'}`}>
        {task.title}
      </p>
      <IconButton onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500">
        <TrashIcon className="w-5 h-5" />
      </IconButton>
    </div>
  );
};

export default TaskItem;
