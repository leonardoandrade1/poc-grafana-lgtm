import { Module } from '@nestjs/common';
import { AntiFraudController } from './antifraud.controller';

@Module({
  controllers: [AntiFraudController],
})
export class AntiFraudModule {}
