import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDispatch } from '../interfaces/dispatch.interface';
import { CreateDispatchDto } from '../dto/create-dispatch.dto';
import { ConflictException, BadRequestException } from '@nestjs/common';

export class DispatchRepository {
  constructor(@InjectModel('Dispatch') private readonly DispatchModel: Model<IDispatch>) {  }

  public async createDispatch(createDispatchDto: CreateDispatchDto): Promise<IDispatch> {
    const {
      deliveryNumber,
      shipmentNumber,
      sourceCode,
      destinationCode,
      vehicleNumber,
      transporterCode,
      startDate,
      endDate,
      driverName,
      driverPhone,
    } = createDispatchDto;

    const dispatch = new this.DispatchModel();

    dispatch.deliveryNumber = deliveryNumber;
    dispatch.shipmentNumber = shipmentNumber;
    dispatch.sourceCode = sourceCode;
    dispatch.destinationCode = destinationCode;
    dispatch.vehicleNumber = vehicleNumber;
    dispatch.transporterCode = transporterCode;
    dispatch.startDate = startDate;
    dispatch.endDate = endDate;
    dispatch.driverName = driverName;
    dispatch.driverPhone = driverPhone;

    try {
      const savedDispatch = await dispatch.save();
      return savedDispatch;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Dispatch with the Delivery Number: '${deliveryNumber}' already exists`);
      }

      if (error.message === 'End date must be greater than start date') {
        throw new BadRequestException(error.message);
      }

      if (error.message === 'Invalid vehicle number') {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
