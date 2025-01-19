import { DungeonEventType } from "src/dungeonEvent/base/dungeonEvent.enums";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dungeon {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;  
 
    @Column({ type: 'int', default: 12 })
    numberOfSteps: number; 
  
    currentEvent : DungeonEventType;
    
    //@ManyToOne()
    //campaign: Campaign

    addSteps(amount: number) 
    {
        if(this.numberOfSteps < 20)
            this.numberOfSteps += amount;

        else 
            console.log("La mazmorra ya dura demasiado");
    }

    takeAStep() 
    {
        if(this.numberOfSteps > 0)
            this.numberOfSteps -= 1;
    }


}