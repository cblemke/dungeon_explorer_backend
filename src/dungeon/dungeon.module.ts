import { Module } from '@nestjs/common';
import { DungeonService } from './dungeon.service';
import { DungeonController } from './dungeon.controller';
import { Dungeon } from './data/dungeon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DungeonEventModule } from 'src/dungeonEvent/dungeonEvent.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dungeon]), DungeonEventModule],
  providers: [DungeonService],
  controllers: [DungeonController]
})
export class DungeonModule {}
