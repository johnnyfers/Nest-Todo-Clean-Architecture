import { Module } from '@nestjs/common';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { ControllersModule } from './app/controllers/controllers.module';
import { PrismaService } from './infra/prisma/prisma-service/prisma-service.service';
import { TodoUsecasesProxyModule } from './infra/use-case-proxies/todo-use-case-proxy/todo-use-case-proxy.module';
import { PrismaServiceModule } from './infra/prisma/prisma-service/prisma-service.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    TodoUsecasesProxyModule,
    ControllersModule,
    PrismaServiceModule,
    RepositoriesModule,
  ],
  controllers: [],
  providers: [PrismaService]
})

export class AppModule { }
