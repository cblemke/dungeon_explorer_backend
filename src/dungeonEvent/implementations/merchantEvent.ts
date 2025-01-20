import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MerchantEvent implements DungeonEvent<boolean> {    
    
    isSuccess : boolean;
    stepsToAdd : number = 0;
    type: DungeonEventType;
    description: string;
    isCompleted: boolean;

    constructor() {
        this.type = DungeonEventType.Trap;
        this.isCompleted = false;
    }
    
    startEvent(): string {
        this.isCompleted = false;
        const message = "¡Hay un mercader misterioso!";   
        console.log(message);
        return message;  
    }
  
    resolve(dungeon : Dungeon, playerChoice: boolean): string {
        console.log(`Resolviendo evento con mercader`);      
        const message = "Los personajes compran sus cosas";
        console.log(message);
        this.isCompleted = true;
        dungeon.takeAStep();
        return message;       
    }            
    
}
    
    



