import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckCustomerAntifraudDto } from './check-customer-antifraud.dto';

@Controller('antifraud')
@ApiTags('antifraud')
export class AntiFraudController {
  constructor() {}

  @Post()
  checkIsFraud(@Body() customerDto: CheckCustomerAntifraudDto) {
    const isFraud = Math.floor(Math.random() * (100 - 1 + 1)) % 2 === 0;
    return {
      isFraud,
      customerData: customerDto,
    };
  }
}
