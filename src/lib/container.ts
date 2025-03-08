import { DatabaseClient } from '@/interfaces/database';
import { PocketBaseAdapter } from '@/adapters/pocketbase.adapter';
import { UsersRepository } from '@/repositories/users.repository';

class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerServices() {
    // Register database client
    const dbClient = new PocketBaseAdapter(process.env.NEXT_PUBLIC_DB_URL || '');
    this.services.set('DatabaseClient', dbClient);

    // Register repositories
    this.services.set('UsersRepository', new UsersRepository(dbClient));
  }

  get<T>(serviceIdentifier: string): T {
    const service = this.services.get(serviceIdentifier);
    if (!service) {
      throw new Error(`Service ${serviceIdentifier} not found in container`);
    }
    return service as T;
  }
}

export const container = Container.getInstance();

// Export commonly used services
export const getDatabase = () => container.get<DatabaseClient>('DatabaseClient');
export const getUsersRepository = () => container.get<UsersRepository>('UsersRepository'); 