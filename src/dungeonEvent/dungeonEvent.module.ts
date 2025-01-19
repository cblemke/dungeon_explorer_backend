import { Module } from '@nestjs/common';
import { DUNGEON_EVENT_SERVICES } from './dungeonEvent.token';
import { DungeonEventType } from './base/dungeonEvent.enums';
import { ForkEvent } from './implementations/forkEvent';
import { RestEvent } from './implementations/restEvent';
import { TrapEvent } from './implementations/trapEvent';
import { FightEvent } from './implementations/fightEvent';
import { MerchantEvent } from './implementations/merchantEvent';

@Module({
  controllers: [],
  providers: [ 
    {
      provide: DUNGEON_EVENT_SERVICES,
      useFactory: () => {
        return {
          [DungeonEventType.Fork]: new ForkEvent(),
          [DungeonEventType.Rest]: new RestEvent(),
          [DungeonEventType.Trap]: new TrapEvent(),
          [DungeonEventType.Fight]: new FightEvent(),
          [DungeonEventType.Merchant]: new MerchantEvent(),
          // Registra más servicios según sea necesario
        };
      },
    },
    ForkEvent,
    RestEvent,
    TrapEvent,
    FightEvent,
    MerchantEvent
  ],
  exports: [DUNGEON_EVENT_SERVICES],
})
export class DungeonEventModule {    
}
