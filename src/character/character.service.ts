import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './data/character.entitiy';
import { Repository } from 'typeorm';
import { CharacterState, CharacterWeaponRarity } from './data/character.enums';
import { CharacterWeapon } from './data/character.weapon';

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

    receiveDamage(char : Character): Character {      
      
      switch(char.state)
      {
        case CharacterState.Healthy:
          char.state = CharacterState.SlightlyInjured;
          break;
        case CharacterState.SlightlyInjured:
          char.state = CharacterState.SeverelyInjured;
          break;
        case CharacterState.SeverelyInjured:
          if(char.hasPotion == true)
            this.drinkPotion(char);
          else
            char.state = CharacterState.Dead;
      }
      return char;
    }

    drinkPotion(char : Character): Character {      
      
      char.state = CharacterState.Healthy;
      char.hasPotion = false;
      return char;
    }

    doDamage(char : Character): number {     
      
      const dice = Math.floor(Math.random() * 6 + 1);
      switch (char.weapon.rarity)
      {  
        case CharacterWeaponRarity.Rare:
          return dice + 2 + char.level;
        case CharacterWeaponRarity.Epic:
          return dice + 5 + char.level;
        case CharacterWeaponRarity.Legendary:
          return dice + 10 + char.level;
        default:
          return dice + char.level;      
      }
    }
    


}
