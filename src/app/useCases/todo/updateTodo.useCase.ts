import { UpdateTodoDto } from "src/app/dto/todo.dto";
import { IException } from "src/domain/expections/exceptions.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { TodoRepository } from "src/domain/repositories/todoRepository.interface";

export class UpdateTodoUseCases {
    constructor(
        private readonly exception: IException,
        private readonly logger: ILogger,
        private readonly todoRepository: TodoRepository
    ) { }

    async execute(updateTodoDto: UpdateTodoDto): Promise<void> {
        const todo = await this.todoRepository.findById(updateTodoDto.id)
        if (!todo) throw new this.exception.badRequestException({
                message: 'Todo not found',
                code_error: 404
            }
        )
        todo.finishTodo()
        todo.setUpdatedate(new Date())
        await this.todoRepository.updateContent(todo.getId(), todo)
        this.logger.log('updateTodoUseCases execute', `Todo ${todo.getId()} have been updated`)
    }
}
