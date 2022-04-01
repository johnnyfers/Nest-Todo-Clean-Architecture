import { AddTodoDto } from "src/app/dto/todo.dto";
import { Todo } from "src/domain/entity/todo.entity";
import { ILogger } from "src/domain/logger/logger.interface";
import { TodoRepository } from "src/domain/repositories/todoRepository.interface";

export class AddTodoUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly todoRepository: TodoRepository
    ) { }

    async execute(addTodoDto: AddTodoDto): Promise<Todo> {
        const todo = Todo.create(addTodoDto)
        await this.todoRepository.insert(todo)
        this.logger.log('addTodoUseCases execute', `New todo have been inserted -- id ${todo.getId()}`);
        return todo
    }
}
