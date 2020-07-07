import { Schema } from 'mongoose';

export const DispatchSchema = new Schema({
  deliveryNumber: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
  shipmentNumber: {
    type: Number,
  },
  sourceCode: {
    type: String,
    required: true
  },
  destinationCode: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  transporterCode: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  driverPhone: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'Dispatch Master'
});
