import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FightEvent implements DungeonEvent<boolean> {    
    
    isSuccess : boolean;
    stepsToAdd : number = 0;
    type: DungeonEventType;
    description: string;
    isCompleted: boolean;

    constructor() {
        this.type = DungeonEventType.Fight;
        this.isCompleted = false;
    }
    
    startEvent(): string {
        this.isCompleted = false;
        const message = "¡Ha aparecido un enemigo! ¿Te enfrentarás a él?";   
        console.log(message);
        return message;  
    }
  
    resolve(dungeon : Dungeon, playerChoice: boolean): string {

        console.log(`Resolviendo combate`);

        const dice = Math.floor(Math.random() * 20)
        

        if(playerChoice == false)
        {
            this.stepsToAdd = Math.floor(Math.random()*3 + 1);
        }
        else
            this.stepsToAdd = 0;

        const message = playerChoice? `¡habéis derrotado al enemigo!`
            : `¡Habéis huido del combate! añadidos ${this.stepsToAdd} pasos extra`;

        console.log(message);

        dungeon.addSteps(this.stepsToAdd);
        this.isCompleted = true;
        dungeon.takeAStep();

        return message;       
    }            
    
}
    
    



