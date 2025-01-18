import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { Enemy } from './data/enemy.entity';

@Controller('enemy')
export class EnemyController {

 constructor(private readonly enemyService: EnemyService) {}

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Enemy> {
        return this.enemyService.find(id);
    }

    @Post()
    create(@Body() enemy: Partial<Enemy>) {
        return this.enemyService.create(enemy);
    }

    @Get()
    findAll() {
        return this.enemyService.findAll();
    }

    @Delete(':id')
        remove(@Param('id') id: number) {
    return this.enemyService.remove(id);
    }

    
}
