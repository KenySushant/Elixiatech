import { IsString, Matches, IsOptional, ValidateIf, IsNotEmpty } from 'class-validator';

export class FilterDispatchDto {
  @IsString()
  @Matches(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/)
  @IsOptional()
  vehicleNumber: string;

  @IsOptional()
  @IsString()
  transporterCode: string;

  @ValidateIf(e => Boolean(e.limit))
  @IsNotEmpty()
  offset: string;

  @ValidateIf(e => Boolean(e.offset))
  @IsNotEmpty()
  limit: string;
}
