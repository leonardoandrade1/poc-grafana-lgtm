import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { HttpModule } from '@nestjs/axios';
import { AntifraudClient } from './antifraud.client';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.model';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [AntifraudClient, CustomerService],
})
export class CustomerModule {}
