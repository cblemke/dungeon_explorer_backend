import { IsEnum, IsNotEmpty } from 'class-validator';
import { DungeonEventType } from 'src/dungeonEvent/base/dungeonEvent.enums';

export class DungeonDecisionDto {
  
  @IsNotEmpty()
  decision: any; 
  
}