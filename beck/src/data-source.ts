import 'dotenv/config';
import path from 'path';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: ['src/entities/*.ts'],
      }
    : {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        logging: true,
        synchronize: false,
        entities: [path.join(__dirname, './entities/**.{js,ts}')],
        migrations: [path.join(__dirname, './migrations/**.{js,ts}')],
      }
);

export default AppDataSource;
