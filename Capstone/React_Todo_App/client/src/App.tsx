import {useEffect, useState} from 'react'
import ItemList from "./components/ItemList.tsx";
import axios from 'axios';
import type {Todo} from "./types.ts";

const baseUrl = 'http://localhost:3000/api/todos';

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo>()

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(`${baseUrl}`);
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

  function populateSelectedTodo(selectedTodo: Todo) {
    const form = document.querySelector('#todo_form') as HTMLFormElement;
    if (form) {
      (form.querySelector('#title') as HTMLInputElement).value = selectedTodo.title;
      (form.querySelector('#due_day') as HTMLInputElement).value = selectedTodo.day;
      (form.querySelector('#due_month') as HTMLInputElement).value = selectedTodo.month;
      (form.querySelector('#due_year') as HTMLInputElement).value = selectedTodo.year;
      (form.querySelector('#description') as HTMLTextAreaElement).value = selectedTodo.description;
    }
  }

  const onClick = (id: number) => {
    setSelectedTodo(todos.find(todo => todo.id === id));
    if (selectedTodo) {
      toggleModal();
      // Set the selected todo to a new state for displaying in the modal
      populateSelectedTodo(selectedTodo);
    }
  }

  const onToggle = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        const response = await axios.put(`${baseUrl}/${id}`, {
          completed: !todoToUpdate.completed,
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
          )
        );
        console.log("success updating: ", response.status);
      }
    } catch (error) {
      console.error("error updating: ", error);
    }
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]); // This runs whenever `todos` is updated

  return (
    <>
      <ItemList 
        todos={todos}
        onCreate={onCreate}
        onDelete={onDelete}
        onClick={onClick}
        onToggle={onToggle}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      ></ItemList>
      <input type="checkbox" id="sidebar_toggle"/>
      <div id='sidebar'>
      </div>
    </>
  )
}

export default App
