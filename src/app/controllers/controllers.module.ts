import { Module } from '@nestjs/common';
import { TodoUsecasesProxyModule } from 'src/infra/use-case-proxies/todo-use-case-proxy/todo-use-case-proxy.module';
import { TodoController } from './todo/todo.controller';


@Module({
  imports: [TodoUsecasesProxyModule.register()],
  controllers: [TodoController],
})
export class ControllersModule {}