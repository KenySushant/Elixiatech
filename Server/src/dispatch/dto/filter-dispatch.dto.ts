import { IsString, Matches, IsOptional } from "class-validator";

export class FilterDispatchDto {
  @IsString()
  @Matches(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/)
  @IsOptional()
  vehicleNumber: string;

  @IsOptional()
  @IsString()
  transporterCode: string;
}
