import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Campaign } from './data/campaign.entity';

@Controller('campaign')
export class CampaignController {

  constructor(private readonly campaignService: CampaignService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Campaign> {
    return this.campaignService.find(id);
  }

  @Post()
  create(@Body() campaign: Partial<Campaign>) {
    return this.campaignService.create(campaign);
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Delete(':id')
    remove(@Param('id') id: number) {
  return this.campaignService.remove(id);
  }

}
