import { ILogger } from "src/domain/logger/logger.interface";
import { TodoRepository } from "src/domain/repositories/todoRepository.interface";


export class DeleteTodoUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly todoRepository: TodoRepository
    ) { }

    async execute(id: number) {
        await this.todoRepository.deleteById(id)
        this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
    }
}
