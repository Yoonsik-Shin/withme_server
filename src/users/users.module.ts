import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Job } from './entities/job.entity';
import { DevCareer } from './entities/dev-career.entity';
import { Study } from '../studies/entities/study.entity';
import { Recruit } from '../studies/entities/recruit.entity';
import { TechStack } from '../commons/entities/tech-stack.entity';
import { Inquiry } from '../studies/entities/Inquiry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      Job,
      DevCareer,
      Study,
      Recruit,
      TechStack,
      Inquiry,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
