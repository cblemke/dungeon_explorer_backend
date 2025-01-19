import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RestEvent implements DungeonEvent<boolean> {    

    type: DungeonEventType;
    description: string;
    isCompleted: boolean;
    
    constructor() {
      this.type = DungeonEventType.Rest;     
      this.isCompleted = false;
    }
    
    startEvent() : string {
        this.isCompleted = false;
        console.log(`se ha iniciado un nuevo evento tipo "descanso". ¿Quieres descansar? (se consumirán suministros).`);         
        const message = "Has llegado a un área tranquila. ¿Quieres descansar? (se consumirán suministros)";   
        return message;  
    }
  
    resolve(dungeon : Dungeon,playerChoice: boolean): string {

        console.log(`Resolviendo evento descanso`);

        const message =
        playerChoice == true
            ? `Es hora de un merecido descanso. Cada personaje consumirá sus suministros`
            : `El descanso puede esperar!`;

        console.log(message);

        this.isCompleted = true;
        dungeon.takeAStep();

        return message;       
    }            
    
}
    
    



