import { useState, useEffect } from 'react'
import ItemList from "./components/ItemList.tsx";
import axios from 'axios';

interface Todo {
  'id': number,
  'title': string,
  'day'?: string,
  'month'?: string,
  'year'?: string,
  'completed': boolean,
  'description'?: string
}

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  // const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('api/todos');
        console.log('Response data:', response.data); // Logs fetched data
        setTodos(response.data);
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
      <ItemList todos={todos}></ItemList>
      <input type="checkbox" id="sidebar_toggle"/>
      <div id='sidebar'>
      </div>
    </>
  )
}

export default App
