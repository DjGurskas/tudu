import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/create.google.dto';

@Injectable()
export class AuthService {
 
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  validateUser(details: User) {
    console.log('AuthService');
    console.log(details);
    const user = this.userRepository.findOneBy({ email: details.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

  }

  async createUser(createAuthDto: UserDTO) {
    const newUser = new User();
    newUser.id = createAuthDto.id;
    newUser.name = createAuthDto.name;
    newUser.email = createAuthDto.email;
    newUser.picture = createAuthDto.picture;

      // Salvar o novo usuário no banco de dados
      return await this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      throw new NotFoundException(`User ${id} not found`);
    } else {
      return findUser;
    }
  }

  async updateUser(id: number, updateAuthDto: UserDTO) {
    const user = await this.findUser(id);
    const updateUser = Object.assign(user, updateAuthDto);

    if (!updateUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.userRepository.save(updateUser);
  }

  async removeUser(id: number) {
    const deleteUser = await this.findUser(id);
    await this.userRepository.remove(deleteUser);

    if (!deleteUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return deleteUser;
  }
}