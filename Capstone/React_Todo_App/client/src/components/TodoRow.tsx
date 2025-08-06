import React from 'react';
import type {TodoRowProps} from "../types.ts";

const TodoRow: React.FC<TodoRowProps> = ({ todo, onDelete }) => {

  const dueDate = (todo.month && todo.year) ? `${todo.month}/${todo.year}` : 'No Due Date'

  return (
    <tr data-id={todo.id} key={todo.id}>
      <td className="list_item">
        {todo.completed ? (
          <input
            type="checkbox"
            name={`item_${todo.id}`}
            id={`item_${todo.id}`}
            checked
          />
        ) : (
          <input
            type="checkbox"
            name={`item_${todo.id}`}
            id={`item_${todo.id}`}
          />
        )}
        <span className="check"></span>
        <label
          className="edit-link"
          htmlFor={`item_${todo.id}`}
        >
          {todo.title} - {dueDate}
        </label>
      </td>
      <td className="delete">
        <img
          src="../../public/images/trash.png"
          alt="Delete"
          onClick={() => onDelete && onDelete(todo.id)}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
};

export default TodoRow;