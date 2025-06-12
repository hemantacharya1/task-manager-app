import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to TaskFlow</h1>
      <p className="mb-8">Manage your tasks with AI-powered natural language input.</p>
      <Link to="/home" className="px-6 py-2 bg-white text-indigo-600 rounded-xl shadow-lg hover:bg-gray-100 transition">
        Get Started
      </Link>
    </div>
  );
}
