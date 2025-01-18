import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";

export enum ForkType {
    TwoWays = 'two_ways',
    ThreeWays = 'three_ways',
}

export class ForkEvent extends DungeonEvent {    

    forkType : ForkType;
    bestPath: number; // Camino considerado el mejor
    stepsToAdd: number;
    constructor() {
      super(Math.floor(Math.random() * 100), DungeonEventType.Fork );
      this.forkType = Math.floor(Math.random() * 2) == 0 ? ForkType.TwoWays  : ForkType.ThreeWays;
      this.bestPath = Math.floor(Math.random() * (this.forkType === ForkType.TwoWays ? 2 : 3)) + 1; // Generar el mejor camino   
      this.isCompleted = null;
    }
  
    resolve(playerChoice: number): string {


        console.log(`Iniciando evento bifurcación`);

        const numberOfPaths = this.forkType === ForkType.TwoWays ? 2 : 3;

        if (playerChoice < 1 || playerChoice > numberOfPaths) {
            return 'Elección no válida. Inténtalo de nuevo.';
          }       

        if (this.bestPath == playerChoice)
        {
            this.stepsToAdd = 0;
        }
        else 
        {
            this.stepsToAdd = Math.floor(Math.random() * 3) + 1;
        }
        

        // dungeon.AddSteps(stepsToAdd);

        console.log(`El mejor camino es el ${this.bestPath}`);
        const message =
        playerChoice === this.bestPath
            ? `Has elegido el camino ${playerChoice}. Tienes la impresión de que vas por buena dirección'.`
            : `Has elegido el camino ${playerChoice}. Tras diez minutos caminando piensas que este camino no era la mejor opción, pero es tarde para cambiar de opinión`;

        console.log(message);

        this.isCompleted = true;
        return message;       

    }            
    
}
    
    



