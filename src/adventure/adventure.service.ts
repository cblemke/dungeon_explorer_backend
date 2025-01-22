import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adventure } from './data/adventure.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { Campaign } from 'src/campaign/data/campaign.entity';
import { Character } from 'src/character/data/character.entitiy';

@Injectable()
export class AdventureService {

    constructor(
        @InjectRepository(Adventure)
        private readonly adventureRepository: Repository<Adventure>,
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
        @InjectRepository(Character)
        private readonly characterRepository: Repository<Character>,
      ) {}


      async startAdventure(campaignId: number, characterIds: number[]): Promise<Adventure> {
        
        if (characterIds.length > 4) {
          throw new Error('Solo puedes seleccionar hasta 4 personajes para una aventura.');
        }
    
        // Verificar que los personajes no estén en otras aventuras activas
        const busyCharacters = await this.characterRepository.find({
          where: { id: In(characterIds), adventure: Not(IsNull()) },
        });
    
        if (busyCharacters.length > 0) {
          throw new Error('Algunos personajes ya están en otras aventuras activas.');
        }
    
        const campaign = await this.campaignRepository.findOne({
          where: { id: campaignId },
          relations: ['dungeons'],
        });
    
        if (!campaign) {
          throw new Error('Campaña no encontrada.');
        }
    
        // Crear la aventura
        const adventure = this.adventureRepository.create({
          campaign,
        });
    
        const savedAdventure = await this.adventureRepository.save(adventure);
    
        await this.characterRepository.update(
          { id: In(characterIds) },
          { adventure: savedAdventure },
        );
    
        return savedAdventure;
      }




}
