import { Dungeon } from "src/dungeon/data/dungeon.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Campaign{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Dungeon, (dungeon) => dungeon.campaign, { eager: true })
    dungeons: Dungeon[]     

}