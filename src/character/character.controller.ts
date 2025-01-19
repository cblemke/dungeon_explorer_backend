import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './data/character.entitiy';

@Controller('character')
export class CharacterController {

  constructor(private readonly characterService: CharacterService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Character> {
    return this.characterService.find(id);
  }

  @Post()
  create(@Body() character: Partial<Character>) {
    return this.characterService.create(character);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Delete(':id')
    remove(@Param('id') id: number) {
  return this.characterService.remove(id);
  }
  
}
