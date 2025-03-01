import { IsNotEmpty, IsInt, IsDateString } from "class-validator";

export class CreateConsumerBody {
  @IsNotEmpty({ message: "The consumer consumption should not be empty" })
  @IsInt({ message: "The consumer consumption should be an integer" })
  consumo_fp: number;

  @IsNotEmpty({ message: "The consumer month should not be empty" })
  @IsDateString()
  consumo_date: string;
}
