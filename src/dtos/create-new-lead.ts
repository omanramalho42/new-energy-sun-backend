import { IsNotEmpty, Length, ValidateNested, IsEmail } from "class-validator";
import { Type } from "class-transformer";
import { CreateUnitBody } from "./create-new-unit";

export class CreateNewLeadBody {
  @IsNotEmpty({ message: "The lead fullName should not be empty" })
  @Length(5, 100, { message: "The full name must be between 5 and 100 characters" })
  fullName: string;

  @IsNotEmpty({ message: "The lead email should not be empty" })
  @IsEmail({}, { message: "The lead email must be valid" })
  email: string;

  @IsNotEmpty({ message: "The lead phone should not be empty" })
  phone: string;

  @IsNotEmpty({ message: "The lead units should not be empty" })
  @ValidateNested({ each: true })
  @Type(() => CreateUnitBody)
  units: CreateUnitBody[];
}
