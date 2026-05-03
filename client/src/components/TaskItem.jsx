import React from 'react';
import { Trash2, Edit2, CheckCircle, Circle, Calendar } from 'lucide-react';

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const priorityColors = {
        Low: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        Medium: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
        High: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-start transition-colors duration-200 ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start space-x-3">
                <button onClick={onToggleComplete} className="mt-1 text-gray-400 dark:text-gray-500 hover:text-blue-500">
                    {task.completed ? <CheckCircle className="text-green-500" size={20} /> : <Circle size={20} />}
                </button>
                <div>
                    <h3 className={`text-lg font-semibold text-gray-800 dark:text-white ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority] || 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                            {task.priority}
                        </span>
                        {task.difficulty && (
                            <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded">
                                Difficulty: {task.difficulty}
                            </span>
                        )}
                        {task.dueDate && (
                            <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded flex items-center">
                                <Calendar size={12} className="mr-1" /> {formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex space-x-2 text-gray-400">
                <button onClick={onEdit} className="hover:text-blue-500 transition-colors">
                    <Edit2 size={18} />
                </button>
                <button onClick={onDelete} className="hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
