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
  onToggle: (id: number) => void;
}

export type ItemListProps = {
  todos: Todo[],
  onClick: (id: number) => void,
  onDelete: (id: number) => void,
  toggleModal: () => void
  onToggle: (id: number) => void,
};

export interface ModalProps {
  isModalVisible: boolean,
  toggleModal: (() => void),
  onCreate: (newTodo: Omit<Todo, "id">) => Promise<void>,
}