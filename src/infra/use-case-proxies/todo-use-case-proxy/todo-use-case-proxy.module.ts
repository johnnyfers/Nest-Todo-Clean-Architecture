import { DynamicModule, Module } from '@nestjs/common';
import { AddTodoUseCases } from 'src/app/useCases/todo/addTodo.useCase';
import { DeleteTodoUseCases } from 'src/app/useCases/todo/deleteTodo.useCase';
import { GetTodoUseCases } from 'src/app/useCases/todo/getTodo.useCase';
import { GetTodosUseCases } from 'src/app/useCases/todo/getTodos.useCase';
import { UpdateTodoUseCases } from 'src/app/useCases/todo/updateTodo.useCase';
import { IException } from 'src/domain/expections/exceptions.interface';
import { ExceptionsModule } from 'src/infra/exceptions/exceptions.module';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { LoggerModule } from 'src/infra/logger/logger.module';
import { LoggerService } from 'src/infra/logger/logger.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { DatabaseTodoRepository } from 'src/infra/repositories/todoRepository.database';
import { UseCaseProxy } from '../useCases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class TodoUsecasesProxyModule {
  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: TodoUsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseTodoRepository],
          provide: TodoUsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: TodoUsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new GetTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: TodoUsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new AddTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [ExceptionsService ,LoggerService, DatabaseTodoRepository],
          provide: TodoUsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (exception: IException, logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new UpdateTodoUseCases(exception, logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: TodoUsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new DeleteTodoUseCases(logger, todoRepository)),
        },
      ],
      exports: [
        TodoUsecasesProxyModule.GET_TODO_USECASES_PROXY,
        TodoUsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        TodoUsecasesProxyModule.POST_TODO_USECASES_PROXY,
        TodoUsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        TodoUsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
      ],
    };
  }
}