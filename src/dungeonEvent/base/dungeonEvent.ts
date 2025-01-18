import { DungeonEventType } from "src/dungeonEvent/base/dungeonEvent.enums";

export abstract class DungeonEvent {

    step: number;
    type: DungeonEventType;
    description: string;
    isCompleted: boolean;

    constructor(step: number, type: DungeonEventType, description?: string) {
        this.step = step;
        this.type = type;
        this.description = description;
        this.isCompleted = false; 
    }

}
