import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnemyAttacks } from "./enemyAttacks";

@Entity()
export class Enemy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    maxHealth: number;
   
    @Column({ type: 'int', default: 1})
    level: number;   

    @Column()
    isBoss: boolean;
   
    @Column({type: 'int', default: 1})
    baseCopper: number;

    @Column('jsonb')
    attacks: EnemyAttacks;

}