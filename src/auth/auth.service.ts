import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { Repository } from 'typeorm';

@Injectable()
export class authService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createAuthDto: CreateAuthDto) {
    const { id } = createAuthDto;
    const createdUser = await this.userRepository.findOneBy({ id });
    if (createdUser) {
      return 'User already exist';
    } else {
      const user = this.userRepository.create(createAuthDto);
      await this.userRepository.save(user);
      return user;
    }
  }

  async findUser(id: number){
    const findUser = await this.userRepository.findOneBy({id});
  if (!findUser) {
    throw new NotFoundException(`User ${id} not found`);
  } else {
    return findUser;
  }
  }

  async removeUser(id: number) {
    const deleteUser = await this.findUser(id);
    await this.userRepository.remove(deleteUser);

    if (!deleteUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
     return deleteUser;
   }

   async update (id: number, updateAuthDto: CreateAuthDto) {
    const user = await this.findUser(id);
    const updateUser = Object.assign(user, updateAuthDto);
    
    if (!updateUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.userRepository.save(updateUser);
    
   }

}
