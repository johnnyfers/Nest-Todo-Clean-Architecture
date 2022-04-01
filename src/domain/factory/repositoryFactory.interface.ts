import { TodoRepository } from "../repositories/todoRepository.interface";

export interface RepositoryFactory{
    getTodoRepository(): TodoRepository
} 