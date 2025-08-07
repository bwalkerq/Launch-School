import {useEffect, useState} from 'react'
import ItemList from "./components/ItemList.tsx";
import axios from 'axios';
import type {Todo} from "./types.ts";

const baseUrl = 'http://localhost:3000/api/todos';

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(`${baseUrl}`);
        console.log('Response data:', response.data); // Logs fetched data
        setTodos(response.data.map(todo => ({ ...todo, day: todo.day || '' })));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const onCreate = async (newTodo: Omit<Todo, 'id'>) => {
    try {
      const response = await axios.post<Todo>(`${baseUrl}`, newTodo);
      console.log("success creating: ", response.data);
      setTodos((prevTodos) => [...prevTodos, response.data]); // Add the new todo to state
    } catch (error) {
      console.error("error creating: ", error);
    }
  };
  
  const onDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      console.log("success deleting: ", response.status);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove deleted todo from state
    } catch (error) {
      console.error("error deleting: ", error);
    }
  };

  const handleRowClick = (id: number) => {
    console.log(id)
  }


  useEffect(() => {
    console.log(todos);
  }, [todos]); // This runs whenever `todos` is updated

  return (
    <>
      <ItemList 
        todos={todos}
        onCreate={onCreate}
        onDelete={onDelete} 
        onClick={handleRowClick} 
      ></ItemList>
      <input type="checkbox" id="sidebar_toggle"/>
      <div id='sidebar'>
      </div>
    </>
  )
}

export default App
