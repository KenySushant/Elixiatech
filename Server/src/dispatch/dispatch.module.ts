import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DispatchController } from './dispatch.controller';
import { DispatchService } from './services/dispatch.service';
import { DispatchSchema } from './schemas/dispatch.schema';
import { Schema } from 'mongoose';
import { DispatchRepository } from './repositories/dispatch.repository';
import { IDispatch } from './interfaces/dispatch.interface';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'Dispatch',
        useFactory: (): Schema => {
          const schema = DispatchSchema;

          schema.pre<IDispatch>('save', function (next) {
            if (new Date(this.startDate) > new Date(this.endDate)) {
              next(new Error('End date must be greater than start date'));
            }

            const vehicleNumberValidation = new RegExp('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$');

            if (!vehicleNumberValidation.test(this.vehicleNumber)) {
              next(new Error('Invalid vehicle number'));
            }

            return next();
          });

          return schema;
        }
      }
    ])
  ],
  controllers: [DispatchController],
  providers: [
    DispatchService,
    { provide: DispatchRepository, useClass: DispatchRepository },
  ]
})
export class DispatchModule {}
