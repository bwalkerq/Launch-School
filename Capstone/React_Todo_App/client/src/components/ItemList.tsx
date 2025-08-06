import TodoRow from "./TodoRow.tsx";

interface Todo {
  'id': number,
  'title': string,
  'day': string,
  'month': string,
  'year': string,
  'completed': boolean,
  'description': string
}

const handleDelete = () => {

}

const ItemList = ({ todos }: {todos: Todo[]}) => {
  return (
    <>
      <div id='content'></div>
      <div id="items">
        <header>
          <label htmlFor="sidebar_toggle">
            <img src="../../public/images/hamburger.png" alt="Toggle Sidebar"/>
          </label>
          <dl>
            <dt>
              <time>All Todos</time></dt> {/* This would become dynamic if I have time to do the optional sidebar*/}
            <dd>{todos.length}</dd>
          </dl>
        </header>
        <main>
          <label id="add_new_label" htmlFor="new_item">
            <img src="../../public/images/plus.png" alt="Add Todo Item"/>
            <h2>Add new to do</h2>
          </label>
          <table cellSpacing="0">
            <tbody>
            {todos.map(todo => (
              <TodoRow key={todo.id} todo={todo} onDelete={handleDelete} />
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