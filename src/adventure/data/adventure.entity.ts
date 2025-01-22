import { Campaign } from "src/campaign/data/campaign.entity";
import { Character } from "src/character/data/character.entitiy";
import { DungeonState } from "src/dungeon/data/dungeonState.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Adventure 
{

    @PrimaryGeneratedColumn()    
    id: number;
 
    @ManyToOne(() => Campaign)
    campaign: Campaign; // Campaña asociada

    @OneToMany(() => Character, (character) => character.adventure)
    characters: Character[]; // Relación con los personajes

    @OneToMany(() => DungeonState, (dungeonState) => dungeonState.adventure, { cascade: true })
    dungeonStates: DungeonState[]; // Estados dinámicos de las mazmorras

    @Column({ type: 'boolean', default: false })
    isCompleted: boolean; // Si la aventura está finalizada

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date; // Fecha de inicio de la aventura


}