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

const Main = ({ todos }: {todos: Todo[]}) => {
  return (
    <div id="items">
      hey
      {todos.map(todos => {
        return <p>{todos.title}</p>
        }
      )}
      {/*<header>*/}
      {/*  insert header here*/}
      {/*</header>*/}
      {/*<main>*/}
      {/*  <label id="add_new_label" htmlFor="new_item">*/}
      {/*    <img src="../images/plus.png" alt="Add Todo Item"/>*/}
      {/*    <h2>Add new to do</h2>*/}
      {/*  </label>*/}
      {/*  <table cellSpacing="0">*/}
      {/*    <tbody>*/}
      {/*    */}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*</main>*/}
    </div>
  )
}

export default Main