import { Module } from '@nestjs/common';
import { DungeonService } from './dungeon.service';
import { DungeonController } from './dungeon.controller';
import { Dungeon } from './data/dungeon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DungeonEventModule } from 'src/dungeonEvent/dungeonEvent.module';
import { Campaign } from 'src/campaign/data/campaign.entity';
import { CampaignService } from 'src/campaign/campaign.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dungeon, Campaign]), DungeonEventModule],
  providers: [DungeonService, CampaignService],
  controllers: [DungeonController]
})
export class DungeonModule {}
