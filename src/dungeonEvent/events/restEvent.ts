import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";


export class RestEvent extends DungeonEvent {    

    
    constructor() {
      super(Math.floor(Math.random() * 100), DungeonEventType.Rest );     
      this.isCompleted = false;
    }
  
    resolve(playerChoice: boolean): string {

        console.log(`Resolviendo evento descanso`);

        const message =
        playerChoice == true
            ? `Es hora de un merecido descanso. Cada personaje consumirá sus suministros`
            : `El descanso puede esperar!`;

        console.log(message);

        this.isCompleted = true;
        return message;       
    }            
    
}
    
    



