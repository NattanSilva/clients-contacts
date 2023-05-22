import 'dotenv/config';
import app from './app';
import AppDataSource from './data-source';

const PORT = process.env.APP_PORT;

(async () => {
  await AppDataSource.initialize()
    .then((res) => {
      console.log('✅ Database connected');
    })
    .catch((err) => {
      console.error('❌ Error during Data Source initialization -> ', err);
    });

  app.listen(4012, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
