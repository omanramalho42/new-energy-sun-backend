import { PrismaService } from "src/database/prisma.service";
import { LeadRepository } from "../lead-repository";
import { Injectable } from "@nestjs/common";
import { Lead } from "@prisma/client";
import { Units } from "src/types/units-types";

@Injectable()
export class PrismaLeadRepository implements LeadRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(fullName: string, email: string, phone: string, units: Units[]): Promise<void> {
    await this.prisma.lead.create({
      data: {
        fullName,
        email,
        phone,
        units: {
          create: units.map((unit) => ({
            codeOfConsumerUnit: unit.unit_key,
            framing: unit.chargingModel,
            modelPhasic: unit.phaseModel,
            historyOfConsumptionInKWH: {
              create: unit.invoice.map((consumer) => ({
                consumptionForaPontaEmKWH: consumer.consumo_fp,
                monthOfConsumption: new Date(consumer.consumo_date),
              }))
            }
          }))
        }
      },
      include: {
        units: {
          include: {
            historyOfConsumptionInKWH: true
          }
        }
      }
    })    
  }

  async listAll(filters: { fullName?: string; email?: string; codeOfConsumerUnit?: string }): Promise<Lead[] | null> {
    return await this.prisma.lead.findMany({
      where: {
        fullName: filters.fullName ? { contains: filters.fullName } : undefined,
        email: filters.email ? { contains: filters.email } : undefined,
        units: filters.codeOfConsumerUnit
          ? {
              some: {
                codeOfConsumerUnit: { contains: filters.codeOfConsumerUnit },
              },
            }
          : undefined,
      },
      include: {
        units: {
          include: {
            historyOfConsumptionInKWH: true
          }
        }
      }
    })
  }

  async getById(id: string): Promise<Lead | null> {
    return await this.prisma.lead.findUnique({
      where: { id },
      include: {
        units: {
          include: {
            historyOfConsumptionInKWH: true
          }
        }
      }
    })
  }
}