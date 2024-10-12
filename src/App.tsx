import React, { useState } from 'react';
import './App.css';

interface Task {
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (): void => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index: number): void => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index: number): void => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App bg-sky-700 h-screen flex items-center justify-center">
      <header className="bg-sky-950 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">To-Do List</h1>
        <div className="input-container mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="w-full h-[50px] bg-sky-600 text-white rounded hover:bg-sky-500"
          >
            Add Task
          </button>
        </div>
        <ul className="task-list space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`p-2 flex justify-between items-center rounded shadow-sm text-white `}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-2"
                />
                <span className={`${task.completed ? 'line-through' : ''}`}>{index + 1} - {task.text}</span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
