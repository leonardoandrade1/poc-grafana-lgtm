import { Module } from '@nestjs/common';
import { AntiFraudModule } from './antifraud/antifraud.module';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
        },
      },
    }),
    LoggerModule.forRoot(),
    AntiFraudModule,
  ],
})
export class AppModule {}
