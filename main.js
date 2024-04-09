const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./src/config/mongoose.config');
const { swaggerConfig } = require('./src/config/swagger.config');

dotenv.config();

const main = async () => {
  const app = express();

  const PORT = process.env.PORT || 3000;

  swaggerConfig(app);
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
