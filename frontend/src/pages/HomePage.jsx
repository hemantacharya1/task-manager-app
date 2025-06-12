// pages/HomePage.jsx
import TaskForm from '../components/TaskForm';
// import NaturalLanguageInput from '../components/NaturalLanguageInput';
import TaskList from '../components/TaskList';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <TaskForm setTasks={setTasks} />
      {/* <NaturalLanguageInput setTasks={setTasks} /> */}
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
