import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddTodoDto, UpdateTodoDto } from 'src/app/dto/todo.dto';
import { TodoPresenter } from 'src/app/presenters/todo.presenter';
import { AddTodoUseCases } from 'src/app/useCases/todo/addTodo.useCase';
import { DeleteTodoUseCases } from 'src/app/useCases/todo/deleteTodo.useCase';
import { GetTodoUseCases } from 'src/app/useCases/todo/getTodo.useCase';
import { GetTodosUseCases } from 'src/app/useCases/todo/getTodos.useCase';
import { UpdateTodoUseCases } from 'src/app/useCases/todo/updateTodo.useCase';
import { ApiResponseType } from 'src/infra/common/swagger/response.decorator';
import { TodoUsecasesProxyModule } from 'src/infra/use-case-proxies/todo-use-case-proxy/todo-use-case-proxy.module';
import { UseCaseProxy } from 'src/infra/use-case-proxies/useCases-proxy';

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TodoPresenter)
export class TodoController {
  constructor(
    @Inject(TodoUsecasesProxyModule.GET_TODO_USECASES_PROXY)
    private readonly getTodoUsecaseProxy: UseCaseProxy<GetTodoUseCases>,
    @Inject(TodoUsecasesProxyModule.GET_TODOS_USECASES_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<GetTodosUseCases>,
    @Inject(TodoUsecasesProxyModule.PUT_TODO_USECASES_PROXY)
    private readonly updateTodoUsecaseProxy: UseCaseProxy<UpdateTodoUseCases>,
    @Inject(TodoUsecasesProxyModule.DELETE_TODO_USECASES_PROXY)
    private readonly deleteTodoUsecaseProxy: UseCaseProxy<DeleteTodoUseCases>,
    @Inject(TodoUsecasesProxyModule.POST_TODO_USECASES_PROXY)
    private readonly addTodoUsecaseProxy: UseCaseProxy<AddTodoUseCases>,
  ) {}

  @Get('show')
  @ApiResponseType(TodoPresenter, false)
  async getTodo(@Query('id', ParseIntPipe) id: number) {
    const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
    return new TodoPresenter(todo);
  }

  @Get('list/all')
  @ApiResponseType(TodoPresenter, true)
  async getTodos() {
    const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
    return todos.map((todo) => new TodoPresenter(todo));
  }

  @Put('update')
  @ApiResponseType(TodoPresenter, true)
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
    await this.updateTodoUsecaseProxy.getInstance().execute(updateTodoDto);
    return 'success';
  }

  @Delete('delete')
  @ApiResponseType(TodoPresenter, true)
  async deleteTodo(@Query('id', ParseIntPipe) id: number) {
    await this.deleteTodoUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('create')
  @ApiResponseType(TodoPresenter, true)
  async addTodo(@Body() addTodoDto: AddTodoDto) {
    const todoCreated = await this.addTodoUsecaseProxy.getInstance().execute(addTodoDto);
    return new TodoPresenter(todoCreated);
  }
}