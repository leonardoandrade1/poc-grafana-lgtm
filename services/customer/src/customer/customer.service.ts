import { BadRequestException, Injectable } from '@nestjs/common';
import { AntifraudClient } from './antifraud.client';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from './customer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    private readonly antifraudClient: AntifraudClient,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(customerDto: CreateCustomerDto): Promise<Customer> {
    const isFraud = await this.antifraudClient.checkFraud(customerDto);
    // if (isFraud) {
    //   throw new BadRequestException('fraud detection');
    // }
    if (isFraud) {
      throw new BadRequestException('fraud detection');
    }
    const entity = Customer.New(
      customerDto.name,
      customerDto.email,
      customerDto.phoneNumber,
    );
    return this.customerRepository.save(entity);
  }
}
