const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./src/config/mongoose.config');
const { swaggerConfig } = require('./src/config/swagger.config');
const MainRouter = require('./src/app.routes');
const NotFoundHandler = require('./src/common/exception/not-found.handler');
const AllExceptionHandler = require('./src/common/exception/all-exception.handler');
const cookieParser = require('cookie-parser');

dotenv.config();

const main = async () => {
  const app = express();

  swaggerConfig(app);

  await connectToDB();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  app.use(MainRouter);
  NotFoundHandler(app);
  AllExceptionHandler(app);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
