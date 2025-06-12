import { useState } from 'react';

export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setFormData({ ...task }); // Create a copy of the task
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (!formData.title?.trim()) return; // Don't save empty titles
    
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

  return (
    <div className="mt-4 space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="p-4 bg-white rounded-xl shadow">
          {editingId === task.id ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  className="input"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task"
                />
                <input
                  className="input"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  placeholder="Assignee"
                />
                <input
                  className="input"
                  name="dueDate"
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
                <select
                  className="input"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  <option value="P4">P4</option>
                </select>
              </div>
              <div className="space-x-2">
                <button onClick={handleSave} className="btn bg-green-500 hover:bg-green-600 text-white">Save</button>
                <button onClick={handleCancel} className="btn">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Task:</strong> {task.title}</p>
              <p><strong>Assigned To:</strong> {task.assignee}</p>
              <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <div className="space-x-2 mt-2">
                <button onClick={() => handleEditClick(task)} className="btn">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="btn bg-red-500 hover:bg-red-600 text-white">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
