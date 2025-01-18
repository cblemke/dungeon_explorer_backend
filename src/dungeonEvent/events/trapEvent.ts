import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";


export class TrapEvent extends DungeonEvent {    
    
    isSuccess : boolean;
    stepsToAdd : number = 0;

    constructor() {
      super(Math.floor(Math.random() * 100), DungeonEventType.Trap );     
      this.isCompleted = false;
    }
  
    resolve(playerChoice: string): string {

        console.log(`Resolviendo evento trampa`);

        const dice = Math.floor(Math.random() * 20)
        
        this.isSuccess = dice < 10;

        if(!this.isSuccess)
        {
            this.stepsToAdd = Math.floor(Math.random()*3 + 1);
        }

        const message = this.isSuccess? `${playerChoice} intenta desactivar la trampa y... ¡lo consigue!`
            : `intenta desactivar la trampa y... ¡fracasa! El grupo debe dar un rodeo y se añaden ${this.stepsToAdd} pasos. ${playerChoice} recibe daño`;

        console.log(message);

        this.isCompleted = true;
        return message;       
    }            
    
}
    
    



