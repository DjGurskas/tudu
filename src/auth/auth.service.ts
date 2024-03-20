import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { Repository } from 'typeorm';

@Injectable()
export class authService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(details: CreateAuthDto) {
    console.log('AuthService');
    console.log('details', details);
    const user = await this.userRepository.findOneBy({ email: details.email });
    console.log('user', user);

    if (user) return user;

    const newUser = this.userRepository.create(details);
    console.log('new user', newUser);

    return this.userRepository.save(newUser);
  }
}
