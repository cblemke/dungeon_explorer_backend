import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Dungeon } from './data/dungeon.entity';
import { DungeonEventType } from 'src/dungeonEvent/base/dungeonEvent.enums';
import { RestEvent } from 'src/dungeonEvent/implementations/restEvent';
import { DUNGEON_EVENT_SERVICES } from 'src/dungeonEvent/dungeonEvent.token';
import { DungeonEvent } from 'src/dungeonEvent/base/dungeonEvent';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DungeonService {

    private currentDungeon: Dungeon | null = null;
    private lastEvent: DungeonEventType;

    constructor(
        @Inject(DUNGEON_EVENT_SERVICES)
        private readonly eventServices: Record<string, DungeonEvent<any>>, // Mapa de servicios
        @InjectRepository(Dungeon)
                private dungeonRepository: Repository<Dungeon>,
      ) {}
      
    async create(dungeon: Partial<Dungeon>): Promise<Dungeon> {
        const newDungeon = this.dungeonRepository.create(dungeon);
        return this.dungeonRepository.save(newDungeon);
    }
    
    async findAll(): Promise<Dungeon[]> {
        return this.dungeonRepository.find();
    }

    async find(id: number): Promise<Dungeon> {
        const dungeon = await this.dungeonRepository.findOneBy({id});
        if(!dungeon) {
            throw new NotFoundException('No se encuentra esa mazmorra');
        }
        return dungeon;    
    }

    async remove(id: number): Promise<void> {
        this.dungeonRepository.delete(id);
    }


    async nextStep() : Promise<string>  {
        console.log (`Dando un nuevo paso. Quedan ${this.currentDungeon.numberOfSteps} pasos`)
        if(this.currentDungeon.numberOfSteps <= 0)
        {
            this.finishDungeon();
            return "ERROR: Esta mazmorra ya ha sido completada";
        }
        else
        {   
            if(this.currentDungeon.currentEvent)
                {
                    return "¡Debes completar el evento en curso primero!";
                } 
            const newEvent = this.chooseNextEvent();
            this.currentDungeon.currentEvent=newEvent; 
            const message =  this.eventServices[this.currentDungeon.currentEvent].startEvent();   
            return message;
        }
    }

    async makeADecision(decision : any) : Promise<string> {

        if (!this.eventServices[this.currentDungeon.currentEvent].isCompleted)
        {
            const message = this.eventServices[this.currentDungeon.currentEvent].resolve(this.currentDungeon, decision);    
            this.lastEvent = this.currentDungeon.currentEvent; 
            this.currentDungeon.currentEvent = null;
            return message;
        }
        else
        {
            return "¡Este evento ya ha sido completado!";
        }
    }

    chooseNextEvent() : DungeonEventType
    {
        const randomEvent = Object.values(DungeonEventType)[Math.floor(Math.random() * Object.values(DungeonEventType).length)];

        console.log(`Elegido ${randomEvent}`)

        if (randomEvent == this.lastEvent)
        {
            return this.chooseNextEvent();
        }
        else
        {
            return randomEvent;
        }
    }

 
    finishDungeon() : void {
        console.log("Se ha completado la mazmorra");
    }

    async startDungeon(dungeonId: number): Promise<string> {
        const dungeon = await this.dungeonRepository.findOne({ where: { id: dungeonId } });
        if (!dungeon) {
          throw new Error(`Mazmorra con ID ${dungeonId} no encontrada.`);
        }
        this.currentDungeon = dungeon;
        const message = `Iniciando la mazmorra: ${dungeon.name}`;
        console.log(message);
        return message;
    }
}
