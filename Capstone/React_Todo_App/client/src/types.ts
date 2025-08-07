export interface Todo {
  'id': number,
  'title': string,
  'day': string,
  'month': string,
  'year': string,
  'completed': boolean,
  'description': string
}

export interface TodoRowProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

export type ItemListProps = {
  todos: Todo[],
  onClick: (id: number) => void,
  onDelete: (id: number) => void,
  onCreate?: (newTodo: Omit<Todo, "id">) => Promise<void>,
  isModalVisible?: boolean,
  toggleModal?: () => void
};

export interface ModalProps {
  isModalVisible?: boolean | undefined,
  toggleModal?: (() => void) | undefined
}