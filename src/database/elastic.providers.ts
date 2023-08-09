import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ElasticsearchModule,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';

/**
 * Setup default connection in the application
 * @param config {ConfigService}
 */

const defaultConnection = (
  config: ConfigService,
): ElasticsearchModuleOptions => ({
  node: config.get('ELASTICSEARCH_NODE'),
  // maxRetries: 10,
  // requestTimeout: 60000,
  // pingTimeout: 60000,
  // sniffOnStart: true,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    username: config.get('ELASTICSEARCH_USER'),
    password: config.get('ELASTICSEARCH_PASS'),
  },
});

export const elasticsearchProviders = [
  ElasticsearchModule.registerAsync({
    imports: [ConfigModule],
    useFactory: defaultConnection,
    inject: [ConfigService],
  }),
];
