import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
    constructor(
        @InjectRepository(Character)
        private characterRepository: Repository<Character>,
      ) {}
    
      async create(character: Partial<Character>): Promise<Character> {
        const newCharacter = this.characterRepository.create(character);
        return this.characterRepository.save(newCharacter);
      }
    
      async findAll(): Promise<Character[]> {
        return this.characterRepository.find();
      }

      async find(id: number): Promise<Character> {
        const character = await this.characterRepository.findOneBy({id});
        if(!character) {
            throw new NotFoundException('No se encuentra personaje');
        }
        return character;    
    }

    async remove(id: number): Promise<void> {
        this.characterRepository.delete(id);
    }
    


}
