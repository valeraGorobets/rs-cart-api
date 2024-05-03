import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {
      '2e0c53d8-89a4-4b5b-b8e3-20a74d173f63': {
        id: '2e0c53d8-89a4-4b5b-b8e3-20a74d173f63',
        name: 'John Doe',
        password: 'lalala',
        email: 'johndoe@gmail.com',
      },
      '5d5e9a38-4b97-4b20-aaf7-d40c16502989': {
        id: '5d5e9a38-4b97-4b20-aaf7-d40c16502989',
        name: 'Mike Smith',
        password: 'gogogo',
        email: 'mikesmith@gmail.com',
      }
    }
  }

  findOne(userId: string): User {
    return this.users[ userId ];
  }

  createOne({ name, password }: User): User {
    const id = v4(v4());
    const newUser = { id: name || id, name, password };

    this.users[ id ] = newUser;

    return newUser;
  }

}
