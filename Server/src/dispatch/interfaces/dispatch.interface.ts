import { Document } from 'mongoose';

export class IDispatch extends Document {
  deliveryNumber: number;
  shipmentNumber: number;
  sourceCode: string;
  destinationCode: string;
  vehicleNumber: string;
  transporterCode: string;
  startDate: string;
  endDate: string;
  driverName: string;
  driverPhone: string;
  createdAt: Date;
  updatedAt: Date;
}
