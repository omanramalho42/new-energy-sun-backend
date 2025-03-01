import { IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateConsumerBody } from "./create-new-consumer";

export enum ModelPhasic {
  MONOFASICO = "monofasico",
  BIFASICO = "bifasico",
  TRIFASICO = "trifasico",
}

export enum Framing {
  AX = "AX",
  B1 = "B1",
  B2 = "B2",
  B3 = "B3",
}

export class CreateUnitBody {
  @IsNotEmpty({ message: "The unit code should not be empty" })
  unit_key: string;

  @IsEnum(ModelPhasic, { message: "Invalid model phasic" })
  phaseModel: ModelPhasic;

  @IsEnum(Framing, { message: "Invalid framing" })
  chargingModel: Framing;

  @IsNotEmpty({ message: "The history of consumption should not be empty" })
  @ValidateNested({ each: true })
  @Type(() => CreateConsumerBody)
  invoice: CreateConsumerBody[];
}
