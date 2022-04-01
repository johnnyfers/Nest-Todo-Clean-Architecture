import { Todo } from "src/domain/entity/todo.entity";
import { TodoRepository } from "src/domain/repositories/todoRepository.interface";


export class GetTodosUseCases {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    async execute(): Promise<Todo[]> {
        const todos = await this.todoRepository.findAll()
        return todos
    }
}
