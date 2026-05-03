import React from 'react';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const priorityColors = {
        Low: 'bg-green-50 text-green-600',
        Medium: 'bg-yellow-50 text-yellow-600',
        High: 'bg-red-50 text-red-600',
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start space-x-3">
                <button onClick={onToggleComplete} className="mt-1 text-gray-400 hover:text-blue-500">
                    {task.completed ? <CheckCircle className="text-green-500" size={20} /> : <Circle size={20} />}
                </button>
                <div>
                    <h3 className={`text-lg font-semibold text-gray-800 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                    <div className="flex space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority] || 'bg-gray-50 text-gray-600'}`}>
                            {task.priority}
                        </span>
                        {task.difficulty && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                                Difficulty: {task.difficulty}
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
