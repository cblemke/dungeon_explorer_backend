import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DungeonService } from './dungeon.service';
import { Dungeon } from './data/dungeon.entity';
import { DungeonDecisionDto } from './data/dungeonDecision.dto';

@Controller('dungeon')
export class DungeonController {

    constructor(private readonly dungeonService: DungeonService) {}
    
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Dungeon> {
        return this.dungeonService.find(id);
    }

    @Post()
    create(@Body() character: Partial<Dungeon>) {
        return this.dungeonService.create(character);
    }

    @Get()
    findAll() {
        return this.dungeonService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
    return this.dungeonService.remove(id);
    }
    
    @Post('next-step')
    takeAStep() : Promise<string> {
        const message = this.dungeonService.nextStep();
        return message;
    }

    @Post('decision')
    setPlayerDecision(@Body() decisionDTO: DungeonDecisionDto) : Promise<string>{
        return this.dungeonService.makeADecision(decisionDTO.decision);
    }

    @Post(':id/start')
        async startDungeon(@Param('id') id: number): Promise<string> {
        return this.dungeonService.startDungeon(id);
    }
}
