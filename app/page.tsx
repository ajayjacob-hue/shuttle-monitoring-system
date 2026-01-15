'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: string;
  text: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, mounted]);

  function addTask() {
    if (!task.trim()) return;
    setTasks(prev => [...prev, { id: crypto.randomUUID(), text: task }]);
    setTask('');
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Student Task Manager</h1>
        <div className="flex gap-2">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="border p-2 flex-1 rounded"
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-4 rounded">Add</button>
        </div>
        <ul className="mt-4 space-y-2">
          {tasks.length === 0 && <li className="text-center text-gray-400">No tasks yet</li>}
          {tasks.map(t => (
            <li key={t.id} className="flex justify-between bg-gray-100 p-2 rounded">
              <span>{t.text}</span>
              <button onClick={() => deleteTask(t.id)} className="text-red-500">✕</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}