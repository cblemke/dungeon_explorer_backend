import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CharacterAppareance } from "./character.appareance";
import { CharacterRace, CharacterClass, CharacterGender, CharacterState } from "./character.enums";
import { CharacterStats } from "./character.stats";
import { CharacterWeapon } from "./character.weapon";
import { Adventure } from "src/adventure/data/adventure.entity";


@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({ type: 'int', default: 0})
    bronzeCoins: number;

    @Column({ type: 'int', default: 1})
    level: number;   

    @Column({ type: 'int', default: 0})
    experience: number;

    @Column()
    background: string;

    @Column({type: 'enum', enum: CharacterState})
    state: CharacterState;

    @Column({type: 'enum', enum: CharacterGender})
    gender: CharacterGender;

    @Column('jsonb')
    stats: CharacterStats;

    @Column({type: 'enum', enum: CharacterRace})
    race: CharacterRace;

    @Column({type: 'enum', enum: CharacterClass})
    class: CharacterClass;

    @Column('jsonb')
    weapon: CharacterWeapon;

    @Column('jsonb')
    appareance: CharacterAppareance;

    @Column()
    hasPotion: boolean;

    @Column()
    hasSupplies: boolean;

    @ManyToOne(() => Adventure, (adventure) => adventure.characters)
    adventure: Adventure;

}