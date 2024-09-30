import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './create-customer.dto';

@Injectable()
export class AntifraudClient {
  constructor(private readonly httpService: HttpService) {}

  async checkFraud(customerDto: CreateCustomerDto): Promise<boolean> {
    const { data } = await this.httpService.axiosRef.post(
      'http://antifraud:3002/antifraud',
      {
        name: customerDto.name,
        email: customerDto.email,
        phoneNumber: customerDto.phoneNumber,
      },
    );
    return data.isFraud;
  }
}
