import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TrapEvent implements DungeonEvent<string> {    
    
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
        const message = "¡Hay una trampa en tu camino! ¿Quién intentará desactivarla?";   
        console.log(message);
        return message;  
    }
  
    resolve(dungeon : Dungeon, playerChoice: string): string {

        console.log(`Resolviendo evento trampa`);

        const dice = Math.floor(Math.random() * 20)
        
        this.isSuccess = dice < 10;

        if(!this.isSuccess)
        {
            this.stepsToAdd = Math.floor(Math.random()*3 + 1);
        }
        else
            this.stepsToAdd = 0;

        const message = this.isSuccess? `${playerChoice} intenta desactivar la trampa y... ¡lo consigue!`
            : `intenta desactivar la trampa y... ¡fracasa! El grupo debe dar un rodeo y se añaden ${this.stepsToAdd} pasos. ${playerChoice} recibe daño`;

        console.log(message);

        dungeon.addSteps(this.stepsToAdd);
        this.isCompleted = true;
        dungeon.takeAStep();

        return message;       
    }            
    
}
    
    



