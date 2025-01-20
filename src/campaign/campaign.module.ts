import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Campaign } from './data/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dungeon } from 'src/dungeon/data/dungeon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign,Dungeon])],
  providers: [CampaignService],
  controllers: [CampaignController]
})
export class CampaignModule {}
