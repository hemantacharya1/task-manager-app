// components/TaskForm.jsx
import { useState } from 'react';

export default function TaskForm({ setTasks }) {
  const [task, setTask] = useState({ title: '', assignee: '', dueDate: '', priority: 'P3' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...task, id: Date.now() };
    setTasks(prev => [...prev, newTask]);
    setTask({ title: '', assignee: '', dueDate: '', priority: 'P3' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-xl bg-white shadow">
      <input className="input" placeholder="Task" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} />
      <input className="input" placeholder="Assignee" value={task.assignee} onChange={e => setTask({ ...task, assignee: e.target.value })} />
      <input className="input" type="datetime-local" value={task.dueDate} onChange={e => setTask({ ...task, dueDate: e.target.value })} />
      <select className="input" value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })}>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
        <option value="P4">P4</option>
      </select>
      <button type="submit" className="btn">Add Task</button>
    </form>
  );
}
