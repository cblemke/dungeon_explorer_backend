import { Module } from '@nestjs/common';
import { RestEventController } from './restEvent.controller';
import { DungeonEventService } from './dungeonEvent.service';
import { ForkEventController } from './forkEvent.controller';
import { TrapEventController } from './trapEvent.controller';

@Module({
  controllers: [RestEventController, ForkEventController, TrapEventController],
  providers: [DungeonEventService]
})
export class DungeonEventModule {




    
}
