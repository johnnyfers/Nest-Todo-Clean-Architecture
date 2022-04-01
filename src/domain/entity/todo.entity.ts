import { BaseEntity } from "./baseEntity.entity"

interface TodoProps {
  content: string
  isDone?: boolean
}

export class Todo extends BaseEntity<TodoProps> {
  constructor(props: TodoProps, id?: number) {
    super(props, id)
  }

  static create(props: TodoProps, id?: number){
    return new Todo(props, id)
  }

  finishTodo(): void{
    this.props.isDone = true
  }
}