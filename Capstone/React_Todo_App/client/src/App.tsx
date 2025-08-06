import {useEffect, useState} from 'react'
import ItemList from "./components/ItemList.tsx";
import axios from 'axios';
import type {Todo} from "./types.ts";

const baseUrl = 'http://localhost:3000/api';

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  // const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(`${baseUrl}/todos`);
        console.log('Response data:', response.data); // Logs fetched data
        setTodos(response.data.map(todo => ({ ...todo, day: todo.day || '' })));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]); // This runs whenever `todos` is updated

  return (
    <>
      <ItemList todos={todos} onDelete={handleDelete} onClick={handleRowClick} ></ItemList>
      <input type="checkbox" id="sidebar_toggle"/>
      <div id='sidebar'>
      </div>
    </>
  )
}

export default App
