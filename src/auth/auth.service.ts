import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { Repository } from 'typeorm';
import { UserDetails } from './dtos/create.google.dto';

@Injectable()
export class AuthService {
 
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = this.userRepository.findOneBy({ email: details.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

  }

  findUser(id: number) {
    const findUser = this.userRepository.findOneBy({ id });
    if (!findUser) {
      throw new NotFoundException(`User ${id} not found`);
    } else {
      return findUser;
    }
  }

  // async createUser(createAuthDto: SignInGoogle) {
  //   const { id } = createAuthDto;
  //   const createdUser = await this.userRepository.findOneBy({ id });
  //   if (createdUser) {
  //     return 'User already exist';
  //   } else {
  //   //  const user = this.userRepository.create(SignInGoogle);
  //   //  await this.userRepository.save(user);
  //    // return user;
  //   }
  // }

  // async findUser(id: number) {
  //   const findUser = await this.userRepository.findOneBy({ id });
  //   if (!findUser) {
  //     throw new NotFoundException(`User ${id} not found`);
  //   } else {
  //     return findUser;
  //   }
  // }

  // async updateUser(id: number, updateAuthDto: SignInGoogle) {
  //   const user = await this.findUser(id);
  //   const updateUser = Object.assign(user, updateAuthDto);

  //   if (!updateUser) {
  //     throw new NotFoundException(`User ${id} not found`);
  //   }
  //   return this.userRepository.save(updateUser);
  // }

  // async removeUser(id: number) {
  //   const deleteUser = await this.findUser(id);
  //   await this.userRepository.remove(deleteUser);

  //   if (!deleteUser) {
  //     throw new NotFoundException(`User ${id} not found`);
  //   }
  //   return deleteUser;
  // }
}
