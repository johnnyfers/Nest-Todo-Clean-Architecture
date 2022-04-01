import { ApiProperty } from '@nestjs/swagger';
import { Todo } from 'src/domain/entity/todo.entity';

export class TodoPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(todo: Todo) {
    this.id = todo.getId();
    this.content = todo.getProps().content
    this.isDone = todo.getProps().isDone
    this.createdate = todo.getCreatedata()
    this.updateddate = todo.geUpdatedData()
  }
}