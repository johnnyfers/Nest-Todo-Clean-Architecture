import { Todo } from "../entity/todo.entity";

export interface TodoRepository {
  insert(todo: Todo): Promise<void>;
  findAll(): Promise<Todo[]>;
  findById(id: number): Promise<Todo>;
  updateContent(id: number, todo: Todo): Promise<void>;
  deleteById(id: number): Promise<void>;
}