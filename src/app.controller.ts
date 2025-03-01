import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateNewLeadBody } from './dtos/create-new-lead';
import { LeadRepository } from './repositories/lead-repository';
import { Lead } from '@prisma/client';

@Controller('app')
export class AppController {
  constructor(
    private leadRepository: LeadRepository,
  ) {}

  @Post('lead')
  async postLead(@Body() body: CreateNewLeadBody): Promise<any> {
    const {
      fullName,
      email,
      phone,
      units
    } = body;

    await this.leadRepository.create(fullName, email, phone, units)
  }

  @Get('leads')
  async getAllLeads(
    @Query('fullName') fullName?: string,
    @Query('email') email?: string,
    @Query('codeOfConsumerUnit') codeOfConsumerUnit?: string,
  ): Promise<Lead[] | null> {
    return await 
      this.leadRepository.listAll({
        fullName,
        email,
        codeOfConsumerUnit
      })
  }

  @Get('lead/:id')
  async getLeadById(@Param("id") id: string): Promise<Lead | null> {
    return await this.leadRepository.getById(id)
  }
}
