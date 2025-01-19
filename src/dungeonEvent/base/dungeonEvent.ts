import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { DungeonEventType } from "src/dungeonEvent/base/dungeonEvent.enums";

export interface DungeonEvent <T> {

    type: DungeonEventType;
    description: string;
    isCompleted: boolean;

    resolve (dungeon : Dungeon, playerChoice : T): string;
    startEvent () : string;

}
