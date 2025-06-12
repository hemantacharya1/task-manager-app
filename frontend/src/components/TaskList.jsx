import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  XIcon as XMarkIcon, 
  ClockIcon, 
  UserCircleIcon,
  CheckCircleIcon as CheckCircleOutline
} from '@heroicons/react/outline';
import { 
  CheckCircleIcon as CheckCircleSolid
} from '@heroicons/react/solid';

const priorityColors = {
  P1: 'bg-red-500/20 text-red-400 border-red-500/30',
  P2: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  P3: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  P4: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const priorityIcons = {
  P1: '🔴',
  P2: '🟠',
  P3: '🔵',
  P4: '⚪',
};

export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setFormData({ ...task });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (!formData.title?.trim()) return;
    
    setTasks(prev =>
      prev.map(t => (t.id === editingId ? { ...formData } : t))
    );
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.priority !== b.priority) return a.priority.localeCompare(b.priority);
    if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
    return 0;
  });

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {sortedTasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
            className={`relative p-5 rounded-xl backdrop-blur-sm transition-all duration-200 ${
              task.completed 
                ? 'bg-white/5 border border-white/5' 
                : 'bg-white/10 border border-white/10 hover:border-indigo-500/30 hover:bg-white/15'
            }`}
          >
            {editingId === task.id ? (
              // Edit Mode
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Task title"
                      autoFocus
                    />
                  </div>
                  <div>
                    <div className="relative">
                      <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
                      <input
                        type="text"
                        name="assignee"
                        value={formData.assignee || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Assignee"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
                    <input
                      type="datetime-local"
                      name="dueDate"
                      value={formData.dueDate || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      name="priority"
                      value={formData.priority || 'P3'}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg bg-white/5 border ${priorityColors[formData.priority] || 'border-white/10'} text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer`}
                    >
                      <option value="P1" className="bg-gray-900 text-red-400">🔴 P1 - Critical</option>
                      <option value="P2" className="bg-gray-900 text-amber-400">🟠 P2 - High</option>
                      <option value="P3" className="bg-gray-900 text-blue-400">🔵 P3 - Medium</option>
                      <option value="P4" className="bg-gray-900 text-gray-400">⚪ P4 - Low</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-indigo-500/30"
                  >
                    <CheckIcon className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 ${
                        task.completed 
                          ? 'border-green-500 bg-green-500/20' 
                          : 'border-indigo-400/70 hover:border-indigo-300'
                      } transition-colors duration-200`}
                      aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.completed && (
                        <CheckIcon className="w-3.5 h-3.5 mx-auto text-green-400" />
                      )}
                    </button>
                    <div>
                      <h3 className={`text-lg font-medium ${
                        task.completed ? 'line-through text-indigo-300/70' : 'text-white'
                      }`}>
                        {task.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm">
                        {task.assignee && (
                          <span className="inline-flex items-center text-indigo-200/80">
                            <UserCircleIcon className="w-4 h-4 mr-1" />
                            {task.assignee}
                          </span>
                        )}
                        
                        {task.dueDate && (
                          <span className="inline-flex items-center text-indigo-200/80">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                        
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          priorityColors[task.priority] || 'bg-gray-500/20 text-gray-400'
                        } border`}>
                          {priorityIcons[task.priority] || '○'} {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {!task.completed && (
                      <button
                        onClick={() => handleEditClick(task)}
                        className="p-1.5 text-indigo-300/70 hover:text-indigo-200 hover:bg-white/10 rounded-lg transition-colors duration-200"
                        aria-label="Edit task"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1.5 text-rose-400/70 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors duration-200"
                      aria-label="Delete task"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {task.completed && (
                  <div className="flex items-center text-xs text-green-400/80 bg-green-500/10 px-3 py-1.5 rounded-lg">
                    <CheckCircleSolid className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    Completed on {new Date().toLocaleDateString()}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
