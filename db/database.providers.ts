import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DJANGO_DB_USER)
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: process.env.DJANGO_DB_USE,
        password: process.env.DJANGO_DB_PASSWORD,
        database: process.env.DJANGO_DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // TODO fix: Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
