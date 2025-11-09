import React from 'react';
import type { Task } from '../types';
import IconButton from './ui/IconButton';
import { CheckIcon, TrashIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, is_completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
        task.is_completed ? 'bg-gray-700/50' : 'bg-gray-700'
      }`}
    >
      <button
        onClick={() => onToggle(task.id, !task.is_completed)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-all ${
          task.is_completed
            ? 'border-green-500 bg-green-500'
            : 'border-gray-500 hover:border-green-400'
        }`}
      >
        {task.is_completed && <CheckIcon className="w-4 h-4 text-white" />}
      </button>
      <span
        className={`flex-grow text-white transition-colors ${
          task.is_completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {task.title}
      </span>
      {onDelete && (
        <IconButton onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 ml-2">
            <TrashIcon className="w-5 h-5"/>
        </IconButton>
      )}
    </div>
  );
};

export default TaskItem;
