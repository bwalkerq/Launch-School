import TodoRow from "./TodoRow.tsx";
import type {ItemListProps} from "../types.ts";

const ItemList = ({todos, onClick, onDelete, toggleModal, onToggle}: ItemListProps, ) => {
  return (
    <>
      <div id='content'></div>
      <div id="items">
        <header>
          <label htmlFor="sidebar_toggle" >
            <img src="../../public/images/hamburger.png" alt="Toggle Sidebar"/>
          </label>
          <dl>
            <dt>
              <time>All Todos</time></dt> {/* This would become dynamic if I have time to do the optional sidebar*/}
            <dd>{todos.length}</dd>
          </dl>
        </header>
        <main>
          <label id="add_new_label" htmlFor="new_item" onClick={toggleModal}>
            <img src="../../public/images/plus.png" alt="Add Todo Item"/>
            <h2>Add new to do</h2>
          </label>
          <table cellSpacing="0">
            <tbody>
            {todos.map(todo => (
              <TodoRow key={todo.id} todo={todo} onDelete={onDelete} onClick={onClick} onToggle={onToggle}/>
            ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

export default ItemList
//