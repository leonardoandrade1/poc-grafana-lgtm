import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './customer.model';
import { CreateCustomerDto } from './create-customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse({ type: Customer })
  create(@Body() customerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(customerDto);
  }
}
