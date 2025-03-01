import { Framing, ModelPhasic } from "@prisma/client";

export interface Lead {
  email: string;
  fullName: string;
  phone: string;
  units: Units[]
}

export interface Consumers {
  consumo_fp: number;
  consumo_date: string;
}

export interface Units {
  barcode: string;
  phaseModel: ModelPhasic;
  energy_company_id: string;
  invoice: Consumers[];
  chargingModel: Framing;
  unit_key: string;
  valor: number;
}


