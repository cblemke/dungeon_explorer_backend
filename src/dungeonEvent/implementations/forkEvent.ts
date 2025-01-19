import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { DungeonEvent } from "../base/dungeonEvent";
import { DungeonEventType } from "../base/dungeonEvent.enums";
import { Injectable } from "@nestjs/common";


export enum ForkType {
    TwoWays = 'two_ways',
    ThreeWays = 'three_ways',
}

@Injectable()
export class ForkEvent implements DungeonEvent<number> {    

    type: DungeonEventType;
    description: string;
    isCompleted: boolean;
    forkType : ForkType;
    bestPath: number; 
    stepsToAdd: number;

    constructor() {
      this.type = DungeonEventType.Fork;
      this.isCompleted = false;
    }

    startEvent() : string {
        this.isCompleted = false;
        console.log(`se ha iniciado un nuevo evento tipo "bifurcación". El jugador debe elegir un camino.`)       
        const message = `estás ante una bifurcación de ${this.forkType == ForkType.TwoWays ? 2 : 3} caminos... ¿cuál eligirás?`;
        return message;
    }
  

    resolve(dungeon : Dungeon, playerChoice: number): string {

        this.forkType = Math.floor(Math.random() * 2) == 0 ? ForkType.TwoWays  : ForkType.ThreeWays;
        this.bestPath = Math.floor(Math.random() * (this.forkType === ForkType.TwoWays ? 2 : 3)) + 1; // Generar el mejor camino   

        console.log(`Iniciando evento bifurcación`);

        if (this.isCompleted) {
            return 'El evento se ha completado y no se puede repetir' 
        };

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
        

        dungeon.addSteps(this.stepsToAdd);

        console.log(`El mejor camino es el ${this.bestPath}`);
        const message =
        playerChoice === this.bestPath
            ? `Has elegido el camino ${playerChoice}. Tienes la impresión de que vas por buena dirección'.`
            : `Has elegido el camino ${playerChoice}. Tras diez minutos caminando piensas que este camino no era la mejor opción, pero es tarde para cambiar de opinión`;

        console.log(message);

        this.isCompleted = true;
        dungeon.takeAStep();
        return message;       

    }            
    
}
    
    

