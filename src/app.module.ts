import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CustomersModule, 
    MongooseModule,forRoot(
      'mongodb+srv://natwikan:kozume3362882@cluster0.vtoyvr5.mongodb.net/ecommercedb?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
