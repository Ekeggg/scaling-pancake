import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const TaskItem = ({ task, onDelete, onEdit }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
                {task.difficulty && (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                        Difficulty: {task.difficulty}
                    </span>
                )}
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
