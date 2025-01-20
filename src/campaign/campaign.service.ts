import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './data/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService {
    constructor(
            @InjectRepository(Campaign)
            private campaignRepository: Repository<Campaign>,
          ) {}

    async create(campaign: Partial<Campaign>): Promise<Campaign> {
        const newCampaign = this.campaignRepository.create(campaign);
        return this.campaignRepository.save(newCampaign);
    }

    async findAll(): Promise<Campaign[]> {
        return this.campaignRepository.find();
    }

    async find(id: number): Promise<Campaign> {
        const campaign = await this.campaignRepository.findOneBy({id});
        if(!campaign) {
            throw new NotFoundException('No se encuentra personaje');
        }
        return campaign;    
        }

    async remove(id: number): Promise<void> {
        this.campaignRepository.delete(id);
    }        
          
}
