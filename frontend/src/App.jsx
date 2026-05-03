import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://tutam-sbd-10-mirza-adi-raffiansyah.vercel.app';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // 1. READ
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  // 2. CREATE
  const addTodo = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const response = await axios.post(API_URL, { task });
      setTodos([...todos, response.data]);
      setTask('');
    } catch (error) {
      console.error("Gagal menambah data:", error);
    }
  };

  // 3. DELETE
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 font-sans text-slate-100 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('https://media1.tenor.com/m/6m3I1g_WiokAAAAC/fish-spin-sha.gif')" }}
    >
      <div className="border-rgb bg-slate-900/70 backdrop-blur-md p-8 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-rgb drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          To Do List
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="istg it works bro trust"
            className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] text-white placeholder-slate-400 transition-all"
          />
          <button
            type="submit"
            className="bg-rgb hover:opacity-80 text-slate-700 font-bold py-3 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-slate-500 italic mt-4">No tasks found</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 group hover:border-purple-500/50 transition-colors"
              >
                <span className="text-slate-200">{todo.task}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;