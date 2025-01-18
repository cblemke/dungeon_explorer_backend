import { Injectable, NotFoundException } from '@nestjs/common';
import { Enemy } from './data/enemy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnemyService {

    constructor(
            @InjectRepository(Enemy)
            private enemyRepository: Repository<Enemy>,
          ) {}
          
    async create(enemy: Partial<Enemy>): Promise<Enemy> {
        const newEnemy = this.enemyRepository.create(enemy);
        return this.enemyRepository.save(newEnemy);
      }
    
      async findAll(): Promise<Enemy[]> {
        return this.enemyRepository.find();
      }

      async find(id: number): Promise<Enemy> {
        const enemy = await this.enemyRepository.findOneBy({id});
        if(!enemy) {
            throw new NotFoundException('No se encuentra ese enemigo');
        }
        return enemy;    
    }

    async remove(id: number): Promise<void> {
        this.enemyRepository.delete(id);
    }


}
