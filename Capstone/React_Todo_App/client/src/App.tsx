import { useState, useEffect } from 'react'
import Main from "./components/Main";
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
  const [showModal, setshowModal] = useState(false)

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
      <Main todos={todos}></Main>
      <div id='sidebar'>
      </div>
    </>
  )
}

export default App
