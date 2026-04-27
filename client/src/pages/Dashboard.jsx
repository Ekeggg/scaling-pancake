import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/users/logout');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.post(`/tasks/delete/${id}`);
            fetchTasks();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => { setEditingTask(null); setShowForm(true); }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
                        >
                            <Plus size={20} className="mr-2" /> New Task
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300"
                        >
                            <LogOut size={20} className="mr-2" /> Logout
                        </button>
                    </div>
                </div>

                {showForm && (
                    <TaskForm
                        task={editingTask}
                        onClose={() => setShowForm(false)}
                        onSuccess={() => { setShowForm(false); fetchTasks(); }}
                    />
                )}

                <div className="grid gap-4">
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={() => handleDelete(task.id)}
                                onEdit={() => handleEdit(task)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No tasks found. Add one!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
