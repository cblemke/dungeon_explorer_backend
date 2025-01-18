import { Module } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { EnemyController } from './enemy.controller';
import { Enemy } from './data/enemy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Enemy])],
  providers: [EnemyService],
  controllers: [EnemyController]
})
export class EnemyModule {}
