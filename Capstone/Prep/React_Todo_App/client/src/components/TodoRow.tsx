import React from 'react';
import type {TodoRowProps} from "../types.ts";

const TodoRow: React.FC<TodoRowProps> =
  ({ todo, onDelete, onClick, onToggle}) => {

  const dueDate = (todo.month && todo.year) ? `${todo.month}/${todo.year}` : 'No Due Date'

  return (
    <tr data-id={todo.id} key={todo.id} >
      <td className="list_item" onClick={() => onToggle(todo.id)}>
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => null} // couldn't figure out a way to still click the row without passing in an onChange
        />
        <span className="check"></span>
        <label
          className="edit-link"
          htmlFor={`item_${todo.id}`}
          onClick={ (event) => {
            event.stopPropagation();
            onClick(todo.id)
          }}
        >
          {todo.title} - {dueDate}
        </label>
      </td>
      <td className="delete">
        <img
          src="../../public/images/trash.png"
          alt="Delete"
          onClick={() => onDelete && onDelete(Number(todo.id))}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
};

export default TodoRow;