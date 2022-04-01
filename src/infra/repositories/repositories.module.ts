import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '../prisma/prisma-service/prisma-service.module';
import { DatabaseTodoRepository } from './todoRepository.database';


@Module({
  imports: [PrismaServiceModule],
    providers: [DatabaseTodoRepository],
    exports: [DatabaseTodoRepository],
  })
  export class RepositoriesModule {}