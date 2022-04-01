import { Todo } from "src/domain/entity/todo.entity";
import { TodoRepository } from "src/domain/repositories/todoRepository.interface";


export class GetTodoUseCases {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    async execute(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findById(id)
        return todo
    }
}
