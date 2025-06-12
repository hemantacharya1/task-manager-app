// pages/HomePage.jsx
import TaskForm from '../components/TaskForm';
// import NaturalLanguageInput from '../components/NaturalLanguageInput';
import TaskList from '../components/TaskList';
import { useState, useEffect } from 'react';

// Helper function to get tasks from localStorage
const getStoredTasks = () => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error);
    return [];
  }
};

export default function HomePage() {
  const [tasks, setTasks] = useState(() => getStoredTasks());

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
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
