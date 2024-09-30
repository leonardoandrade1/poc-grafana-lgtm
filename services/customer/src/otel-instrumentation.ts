import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const otelDefaultEndpoint = 'http://grafana:4318';

const metricOTLPExporter = new OTLPMetricExporter({
  url: `${otelDefaultEndpoint}/v1/metrics`,
});
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricOTLPExporter,
  exportIntervalMillis: 5000,
});

const traceOTLPExporter = new OTLPTraceExporter({
  url: `${otelDefaultEndpoint}/v1/traces`,
  concurrencyLimit: 20,
});

const logExporter = new OTLPLogExporter({
  url: `${otelDefaultEndpoint}/v1/logs`,
});

export const nestOtelSDK = new NodeSDK({
  serviceName: 'customer-api',
  metricReader,
  traceExporter: traceOTLPExporter,
  logRecordProcessors: [new BatchLogRecordProcessor(logExporter)],
  textMapPropagator: new CompositePropagator({
    propagators: [
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-net': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-express': {
        ignoreLayersType: [
          'middleware' as any,
          'request_handler' as any,
          'router' as any,
        ],
      },
    }),
  ],
});

process.on('SIGTERM', () => {
  nestOtelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
