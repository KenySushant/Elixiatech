import { IsNotEmpty, IsNumber, IsString, Matches, IsDate } from 'class-validator';

export class CreateDispatchDto {
  @IsNotEmpty()
  @IsNumber()
  deliveryNumber: number;

  @IsNumber()
  shipmentNumber: number;

  @IsNotEmpty()
  @IsString()
  sourceCode: string;

  @IsNotEmpty()
  @IsString()
  destinationCode: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/)
  vehicleNumber: string;

  @IsNotEmpty()
  @IsString()
  transporterCode: string;

  @IsDate()
  @IsNotEmpty()
  startDate: string;

  @IsDate()
  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  driverName: string;

  @IsNotEmpty()
  @IsString()
  driverPhone: string;
}
