import { Lead } from "@prisma/client";

export abstract class LeadRepository {
  abstract create(fullName: string, email: string, phone: String, units: any): Promise<void>;
  abstract listAll(filters): Promise<Lead[]>;
  abstract getById(id: string): Promise<Lead>;
}
