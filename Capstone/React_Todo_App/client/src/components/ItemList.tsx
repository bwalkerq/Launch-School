// import Todo from '../types';
//
// const MainProps = {
//   todos: Todo[]
// }

interface Todo {
  'id': number,
  'title': string,
  'day'?: string,
  'month'?: string,
  'year'?: string,
  'completed': boolean,
  'description'?: string
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
            {todos.map(todo => {
                return (
                  <tr data-id={todo.id} key={todo.id}>
                    <td className="list_item">
                      {todo.completed
                        ?
                        <input type="checkbox" name="item_{{id}}" id="" checked/>
                        :
                        <input type="checkbox" name="item_{{id}}"/> //remember to add back in the id property
                      }
                      <span className="check"></span>
                      <label className="edit-link" htmlFor="item_{{id}}">{todo.title} - </label>
                    </td>
                    <td className="delete"><img src="../../public/images/trash.png" alt="Delete"/></td>
                  </tr>
                )
              }
            )}
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

export default ItemList
//