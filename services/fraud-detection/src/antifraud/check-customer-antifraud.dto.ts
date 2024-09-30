import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CheckCustomerAntifraudDto {
  @ApiProperty({
    example: faker.person.fullName(),
  })
  name: string;

  @ApiProperty({
    example: faker.internet.email(),
  })
  email: string;

  @ApiProperty({
    example: faker.phone.number(),
  })
  phoneNumber: string;
}
