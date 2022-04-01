import { Injectable } from '@nestjs/common';
import { Todo } from '../../domain/entity/todo.entity';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
import { PrismaService } from '../prisma/prisma-service/prisma-service.service';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {

  constructor(
    private prisma: PrismaService
  ) { }

  async insert(todo: Todo): Promise<void> {
    await this.prisma.todo.create({
      data: todo.getProps()
    })
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany()
    return todos.map(todo => Todo.create(todo, todo.id))
  }

  async findById(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: { id }
    })
    return Todo.create(todo, todo.id)
  }

  async updateContent(id: number, todo: Todo): Promise<void> {
    await this.prisma.todo.update({
      where: { id: id },
      data: { 
        id: todo.getId(),
        updatedate: todo.geUpdatedData(),
        createdate: todo.getCreatedata(),
        ...todo.getProps() }
    })
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.todo.delete({ where: { id } })
  }
}