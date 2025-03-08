import { DatabaseClient, DatabaseRecord } from '@/interfaces/database';
import { BaseRepository } from './base.repository';

export interface User extends DatabaseRecord {
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export class UsersRepository extends BaseRepository<User> {
  constructor(db: DatabaseClient) {
    super(db, 'users');
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.findOneByQuery(`email="${email}"`);
    } catch (error) {
      return null;
    }
  }

  async authenticate(email: string, password: string): Promise<{ token: string; user: User } | null> {
    try {
      const result = await this.db.authenticate(email, password);
      return {
        token: result.token,
        user: result.user as User,
      };
    } catch (error) {
      return null;
    }
  }
} 