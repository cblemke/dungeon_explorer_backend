import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character/data/character.entitiy';
import { DungeonEventModule } from './dungeonEvent/dungeonEvent.module';
import { EnemyModule } from './enemy/enemy.module';
import { Enemy } from './enemy/data/enemy.entity';
import { DungeonModule } from './dungeon/dungeon.module';
import { Dungeon } from './dungeon/data/dungeon.entity';
import { CampaignModule } from './campaign/campaign.module';
import { Campaign } from './campaign/data/campaign.entity';
import { AdventureModule } from './adventure/adventure.module';
import { AdventureControllerController } from './adventure-controller/adventure-controller.controller';
import { AdventureServiceService } from './adventure.service/adventure.service.service';
import { AdventureserviceService } from './adventureservice/adventureservice.service';



@Module({
  imports: [CharacterModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'dungeon_explorer_db',
      entities: [Character, Enemy, Dungeon, Campaign],
      synchronize: true
    }), DungeonEventModule, EnemyModule, DungeonModule, CampaignModule, AdventureModule],
  controllers: [AppController, AdventureControllerController],
  providers: [AppService, AdventureServiceService, AdventureserviceService],
})
export class AppModule {}
