import { Module } from '@nestjs/common';
import { AdventureService } from './adventure.service';
import { AdventureController } from './adventure.controller';

@Module({
  providers: [AdventureService],
  controllers: [AdventureController]
})
export class AdventureModule {}
