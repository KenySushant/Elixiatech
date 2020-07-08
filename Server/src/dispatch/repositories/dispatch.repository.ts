import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDispatch } from '../interfaces/dispatch.interface';
import { CreateDispatchDto } from '../dto/create-dispatch.dto';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { FilterDispatchDto } from '../dto/filter-dispatch.dto';

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

  public async getAllDispatches(): Promise<IDispatch[]> {
    const dispatches: IDispatch[] = await this.DispatchModel.find();
    return dispatches;
  }

  public async filterDispatches(
    filterDispatchDto: FilterDispatchDto
  ): Promise<IDispatch[]> {
    const {
      vehicleNumber,
      transporterCode,
      offset,
      limit,
    } = filterDispatchDto;

    const filter: {
      vehicleNumber?: string,
      transporterCode?: string
    } = {};

    if (vehicleNumber) {
      filter.vehicleNumber = vehicleNumber;
    }

    if (transporterCode) {
      filter.transporterCode = transporterCode;
    }

    if (offset && limit) {
      const dispatches: IDispatch[] = await this.DispatchModel
        .find(filter)
        .skip(Number(offset))
        .limit(Number(limit));

      return dispatches;
    }

    const dispatches: IDispatch[] = await this.DispatchModel.find(filter);
    return dispatches;
  }
}
