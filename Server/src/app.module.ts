import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { DispatchModule } from './dispatch/dispatch.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Elixiatech', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    DispatchModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
