// Contiene los parámetros de persistencia dinámicos

import { Adventure } from "src/adventure/data/adventure.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dungeon } from "./dungeon.entity";
import { DungeonEvent } from "src/dungeonEvent/base/dungeonEvent";

@Entity()
export class DungeonState {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Adventure, (adventure) => adventure.dungeonStates)
    adventure: Adventure;
  
    @ManyToOne(() => Dungeon)
    dungeon: Dungeon; // Mazmorra fija asociada
  
    @Column({ type: 'boolean', default: false })
    isActive: boolean;
  
    @Column({ type: 'int' })
    stepsRemaining: number;
  
    @Column('jsonb', { nullable: true })
    currentEvent: DungeonEvent<any>;
  
    // Inicializar `stepsRemaining` con el valor por defecto de la mazmorra fija
    @BeforeInsert()
    initializeSteps() {
      this.stepsRemaining = this.dungeon.numberOfSteps;
      this.currentEvent = this.dungeon.currentEvent;
    }
    

    
}